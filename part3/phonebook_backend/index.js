require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

  morgan.token('data', function (req) { 
  if(req.method == "POST"){
    return JSON.stringify(req.body);
  }
  return null;
 })
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

  // get all the persons in the phonebook
  app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
  })

  // display the phonebook when the user opens the url
   app.get('/', (req, res) => {
     res.sendFile("./build/static/index.html")
     // send html automatically
  })
  
  // Lists the count of all the persons in the phonebook
  app.get('/info', (request, response, next) => {
    Person.find({}).then(result => {
      let info = `<div><p>Phonebook has info for ${result.length} people </p><p>${new Date()}</p></div>`
      response.send(info)
    }      
    ).catch(error => next(error))   
    
  })

  // Lists a person when an id is provided in the url
  app.get('/api/persons/:id', (request, response) => {
    // error was here, previously converted the it to Number resulting in sending a NAN to the mongo DB page
    const id = request.params.id
    Person.findById(id).then(
      result => {
        if(!result){
          return response.status(404).end()
        }
        return response.json(result)
      }).catch(error => {
        console.log(error);
        return response.status(404).end()
      })
  })

  // remove a person from the phonebook when the user chooses the id button
  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(() => {
      response.status(204).end();
    }).catch(error => console.log(error));
  })

  // add a new person to the phonebook if they have a name and a phone number
  app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.number) {
      return response.status(400).json({ 
        error: 'Number is missing' 
      })
    }

    if (!body.name) {
      return response.status(400).json({ 
        error: 'Name is missing' 
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(result =>{
      response.status(204).end()
    }).catch(error => next(error))
  })

  // edit the info of a phonebook entry
  app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    const body = request.body
    const updatedPerson = {
        name: body.name,
        number: body.number
    }
    // 3.17 COMPLETED ALREADY
    Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: "query" })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
  })

  // error handling - unknown endpoint and handling cast and validation errors
  const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown Endpoint!"})
  }
  app.use(unknownEndpoint)
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if(error.name === "CastError"){
      return response.status(400).send({error: "Malformed ID!"})
    } else if(error.name === "ValidationError") {
      return response.status(400).send({error: error.message})
    } else if(error.name === "Error") {
      return response.status(400).send({error: "Validation Error"})
    }
    next(error)
  }
  app.use(errorHandler)

  // listens on a port 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })