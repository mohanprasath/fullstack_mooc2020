import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () =>{

  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
        setCountries(countries.concat(response.data))
    })
  }, [])

  const handleFilter = (event) => {
    setFilterCountry(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input name={filterCountry} onChange={handleFilter}/>
      </div>
      <div>
        <Countries countries={countries} setCountries={setCountries} filterCountry={filterCountry} setFilterCountry={setFilterCountry} />
      </div>
    </div>
  )
}

export default App;
