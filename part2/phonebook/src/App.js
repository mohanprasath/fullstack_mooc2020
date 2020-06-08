import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    axios.get('http://localhost:3001/persons').then(response =>
    {     
      setPersons(response.data)
    })
  })
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = e => setFilter(e.target.value)
  
  const addNewName = (event) => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }
    if (persons.find(person => person.name === newName)){
      alert(newName +' is already added to phonebook')
    } else {
      axios.post(`http://localhost:3001/persons/`, newNameObj).then(response => {
        persons.concat(response.data)
        setNewName('')
        setNewNumber('')
      }
        ).catch(
        console.log("Error in string the phone number in the database")
      )
      
    }    
  }
  
  let personsFiltered = persons.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
  let matched = personsFiltered.map(p => <div id={p.id}>{p.name} {p.number}</div>);

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