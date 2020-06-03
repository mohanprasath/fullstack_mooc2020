import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'39-4423875643' }, { name: 'Mr Moomin', number:'+358-784378389'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

  const addNewName = (event) => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name == newName)){
      alert(newName +' is already added to phonebook')
    } else {
      setPersons(persons.concat(newNameObj))
      setNewName('')
      setNewNumber('')
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  {persons.map((person) => <div>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App