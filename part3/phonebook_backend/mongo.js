const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const dbName = "Phonebook"
const url = `mongodb+srv://fullstack:${password}@cluster0-bbmcj.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    // print all the persons from the db
    
    console.log("phonebook")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        });
        mongoose.connection.close();
    });
} else if(process.argv.length === 5) {
    const personName = process.argv[3]
    const personNumber = process.argv[4]
    if (personName !== undefined && personNumber !== undefined){
        const person = new Person({
            name: personName,
            number: personNumber,
          })
          person.save().then(result => {
            console.log('person saved!')
            mongoose.connection.close()
          })
    }    
}else{
    mongoose.connection.close();
}





