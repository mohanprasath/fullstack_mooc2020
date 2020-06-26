import React, { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';
import PhoneBookFilter from './components/PhoneBookFilter';
import PhoneBookAddEntry from './components/PhoneBookAddEntry';
import PhoneBookMatched from './components/PhoneBookMatched';
import './index.css';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // getting the persons info from the db.json using axios
  // method 1 using just axios
  // axios.get('http://localhost:3001/persons').then(response =>
  // {
  // console.log(response.data)
  // setPersons(response.data)
  // })
  // method 2 using the effect hook
  useEffect(() => {
    phonebookService.getAll().then((allPersons) => setPersons(allPersons));
  });

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const addNewName = (event) => {
    event.preventDefault();
    const newNameObj = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      // Editing an existing person in JSON
      const matchedPerson = persons.find((person) => person.name === newName);
      console.log(matchedPerson.id);
      newNameObj.id = matchedPerson.id;
      if (window.confirm(`${newName} is already added to phonebook. Do you like to replace the old number with a newer number?`)) {
        phonebookService.update(matchedPerson.id, newNameObj).then((newPerson) => {
          setSuccessMessage(`${newNameObj.name}'s phone number is successfully edited in the Phone Book.`);
          setTimeout(() => {
            persons.map((person) => (person.id === newNameObj.id ? newPerson : person));
            setSuccessMessage(null);
          }, 5000);
        }).catch(() => {
          setErrorMessage(`${newNameObj.name}'s phone number is not edited in the Phone Book.` + `${errorMessage !== null ? errorMessage : ''}`);
          setTimeout(() => { setErrorMessage(null); }, 5000);
        });
      }
    } else {
      // Adding a new person to JSON
      newNameObj.id = persons.length + 1;
      phonebookService.create(newNameObj).then((newPersons) => {
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`${newNameObj.name} is successfully added to the Phone Book.`);
        setTimeout(() => {
          setSuccessMessage(null);
          persons.concat(newPersons);
        }, 5000);
      }).catch(() => {
        // console.log("Error in string the phone number in the database")
        setErrorMessage(`${newNameObj.name}'s phone number is not added to the Phone Book. ` + `${errorMessage !== null ? errorMessage : ''}`);
        setTimeout(() => { setErrorMessage(null); }, 5000);
      });
    }
  };

  // Removing a person
  const removePerson = (event) => {
    const result = window.confirm(`Delete ${event.target.name}?`);
    const { id } = event.target;
    const deletedPersonName = event.target.name;
    const remainingPersons = persons.filter((person) => person.id !== id);
    // console.log(result, event.target.id)
    if (result) {
      phonebookService.remove(event.target.id).then(() => {
        setSuccessMessage(`${deletedPersonName} is successfully removed to the Phone Book.`);
        setTimeout(() => {
          setSuccessMessage(null);
          setPersons(remainingPersons);
        }, 5000);
      }).catch(() => {
        setErrorMessage(`${deletedPersonName} is already removed from the Phone Book.`);
        setTimeout(() => { setErrorMessage(null); }, 5000);
      });
    }
  };

  const personsFiltered = persons.filter((p) => p.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
  const matched = personsFiltered.map((p) => (
    <div key={p.id}>
      {p.name}
      {' '}
      {p.number}
      {' '}
      <button id={p.id} name={p.name} onClick={removePerson}>Delete</button>
    </div>
  ));

  // Page rendering
  return (
    <div>
      <Notification message={errorMessage === null ? successMessage : errorMessage} classname={errorMessage === null ? 'success' : 'error'} />
      <h2>Phonebook</h2>
      <PhoneBookFilter value={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PhoneBookAddEntry addNewName={addNewName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneBookMatched matched={matched} />
    </div>
  );
};

export default App;
