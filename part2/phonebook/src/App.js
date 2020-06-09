import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import PhoneBookFilter from './components/PhoneBookFilter'
import PhoneBookAddEntry from './components/PhoneBookAddEntry'
import PhoneBookMatched from './components/PhoneBookMatched'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('');  

  // getting the persons info from the db.json using axios
  // method 1 using just axios
  //axios.get('http://localhost:3001/persons').then(response =>
  //{
    // console.log(response.data)
    //setPersons(response.data)
  //})
  // method 2 using the effect hook
  useEffect(() => {
    phonebookService.getAll().then(allPersons => setPersons(allPersons))
  })
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = e => setFilter(e.target.value)
  
  const addNewName = (event) => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(person => person.name === newName)){
      let matchedPerson = persons.find(person => person.name === newName)
      console.log(matchedPerson.id);
      newNameObj.id = matchedPerson.id
      if (window.confirm(newName+' is already added to phonebook. Do you like to replace the old number with a newer number?')){
        phonebookService.update(matchedPerson.id, newNameObj).then(newPerson => {
          persons.map(person => person.id === newNameObj.id?newPerson:person)
        })
      }
    } else {
      newNameObj.id = persons.length +1
      phonebookService.create(newNameObj).then(newPersons => {
        persons.concat(newPersons)
        setNewName('')
        setNewNumber('')
      }).catch(
        console.log("Error in string the phone number in the database")
      )     
    }    
  }

  const removePerson = (event) => {
    let result = window.confirm(`Delete ${event.target.name}?`);
    let id = event.target.id;
    let remainingPersons = persons.filter(person => person.id !== id);
    //console.log(result, event.target.id)
    if (result) {
      phonebookService.remove(event.target.id).then(() => setPersons(remainingPersons))
    }
  }
  
  let personsFiltered = persons.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
  let matched = personsFiltered.map(p => <div key={p.id}>{p.name} {p.number} <button id={p.id} name={p.name} onClick={removePerson}>Delete</button></div>);

  return (
    <div>
      <h2>Phonebook</h2>
        <PhoneBookFilter value={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PhoneBookAddEntry addNewName={addNewName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <PhoneBookMatched matched={matched} />
    </div>
  )
}

export default App