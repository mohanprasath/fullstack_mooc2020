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

app.get("/api/persons", (request, response, next) => {
  Person.find({})
      .then(result => {
          response.json(result)
      })
      .catch(error => next(error))
})

   app.get('/', (req, res) => {
     res.sendFile("./build/static/index.html")
     // send html automatically
  })
  
  app.get('/info', (request, response, next) => {
    Person.find({}).then(result => {
      let info = `<div><p>Phonebook has info for ${result.length} people </p><p>${new Date()}</p></div>`
      response.send(info)
    }      
    ).catch(error => next(error))   
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById((id)).then(
      result => {
        if(!result){
          return response.status(404).end()
        }
        return response.json(result)
      }).catch(error => console.log(error))
  })

   app.delete('/api/persons/:id', (request, response) => {
     const id = request.params.id
  //   persons = persons.filter(person => person.id !== id)
        Person.findByIdAndDelete(id).then(() => {
          response.status(204).end()
        }).catch(error => console.log(error))
  //   response.status(204).end()
  })

  // const generateId = () => {
  //   return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
  // }

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
  
    // if(persons.find(person => person.name === body.name)){
    //   return response.status(400).json({ 
    //     error: 'Name must be unique' 
    //   })
    // }

    const person = new Person({
      name: body.name,
      number: body.number
    })
  
    // notes = persons.concat(person)
    // response.json(person)

    person.save().then(result =>{
      response.status(204).end()
    }).catch(error => next(error))
  })

  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })