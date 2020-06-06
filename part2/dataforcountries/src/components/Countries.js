import React from 'react'

const Countries = ({countries, setCountries, filterCountry, setFilterCountry}) => {
        const results = countries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))
          if (results.length > 10){
            return (<div>Too many matches, specify another filter</div>)
          } else if (results.length === 1) {
              return(
              <div>
                <h1>{results[0].name}</h1>
                <div>capital: {results[0].capital}</div>
                <div>population: {results[0].population}</div>
                <h2>languages</h2>
                <ul>{results[0].languages.map(language => <li>{language.name}</li>)}</ul>
                <img src={results[0].flag} alt='flag' width="200" height="100" />
            </div>
            )
          } else {
              return(
              <div><ul>{results.map(country => <li key={country.name}>{country.name} <button key={country.name} onClick={() => setFilterCountry(country.name)}>show</button></li>)}</ul></div>
              )
          }
}

export default Countries;