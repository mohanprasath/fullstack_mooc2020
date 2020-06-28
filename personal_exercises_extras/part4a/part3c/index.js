require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const mongoose = require('mongoose')
const Note = require('./models/note')
// npm install dotenv --save
// npm install --save-dev nodemon
// npm install express --save
// npm install morgan
// npm install cors --save
// npm install mongoose --save
// npm install --save mongoose-unique-validator
// phonebook backend step10
const app = express()
morgan.token('data', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// let persons =
//   [
//       { 
//         "name": "Arto Hellas", 
//         "number": "040-123456",
//         "id": 1
//       },
//       { 
//         "name": "Ada Lovelace", 
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       { 
//         "name": "Dan Abramov", 
//         "number": "12-43-234345",
//         "id": 3
//       },
//       { 
//         "name": "Mary Poppendieck", 
//         "number": "39-23-6423122",
//         "id": 4
//       }
//     ]

app.get('/api/notes', (request, response) => {
  // Note.find({}).then(notes => {
  //   response.json(notes)
  // })
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  // checking if the data being sent is not empty or null
  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),

  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
})

  app.get('/', (req, res) => {
    res.sendFile("./build/static/index.html")
    // send html automatically
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
    // send json automatically
  })

  app.get('/info', (req, res) => {
    let info = `<div><p>Phonebook has info for ${persons.length} people </p><p>${new Date()}</p></div>`
    res.send(info)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
  }

  app.post('/api/persons', (request, response) => {
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
  
    if(persons.find(person => person.name === body.name)){
      return response.status(400).json({ 
        error: 'Name must be unique' 
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    notes = persons.concat(person)
  
    response.json(person)
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  //console.log(PORT)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })