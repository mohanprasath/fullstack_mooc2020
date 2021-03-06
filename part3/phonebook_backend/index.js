require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('data', (req) => {
  if (req.method == 'POST') {
    return JSON.stringify(req.body);
  }
  return null;
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

// display the phonebook when the user opens the url
app.get('/', (req, res) => {
  res.sendFile('./build/static/index.html');
  // send html automatically
});

// get all the persons in the phonebook
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result.map((person) => person.toJSON()));
    })
    .catch((error) => next(error));
});

// Lists the count of all the persons in the phonebook
app.get('/info', (request, response, next) => {
  Person.find({}).then((result) => {
    const info = `<div><p>Phonebook has info for ${result.length} people </p><p>${new Date()}</p></div>`;
    response.send(info);
  }).catch((error) => next(error));
});

// Lists a person when an id is provided in the url
app.get('/api/persons/:id', (request, response, next) => {
  // error was here, previously converted the it to Number resulting in sending a NAN to the mongo DB page
  const { id } = request.params;
  Person.findById(id).then(
    (result) => {
      if (!result) {
        return response.status(404).end();
      }
      return response.json(result);
    },
  ).catch((error) => {
    next(error);
  });
});

// remove a person from the phonebook when the user chooses the id button
app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  Person.findByIdAndRemove(id).then(() => {
    response.status(204).end();
  }).catch((error) => next(error));
});

// add a new person to the phonebook if they have a name and a phone number
app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((result) => {
    response.json(result.toJSON());
  }).catch((error) => {
    next(error);
  });
});

// edit the info of a phonebook entry
app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  const updatedPerson = {
    name: body.name,
    number: body.number,
  };
  // 3.17 COMPLETED ALREADY
  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

// error handling - unknown endpoint and handling cast and validation errors
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint!' });
};
app.use(unknownEndpoint);
// errors are handled here
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  switch (error.name) {
    case 'CastError':
      // this.state.errorMessage = error.message;
      return response.status(400).send({ error: 'Malformed ID!' });
    case 'ValidationError':
      // this.state.errorMessage = error.message;
      return response.status(400).send({ error: error.message });
  }
  // this.state.errorMessage = error.message;
  next(error);
};
app.use(errorHandler);

// listens on a port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
