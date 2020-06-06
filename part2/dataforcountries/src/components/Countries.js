import React, { useState } from 'react'
import axios from 'axios'

const Countries = ({countries, setCountries, filterCountry, setFilterCountry}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [ weatherData, setWeatherData ] = useState(null)
    const results = countries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))
        if (results.length > 10){
        return (<div>Too many matches, specify another filter</div>)
        } else if (results.length === 1) {
            axios.get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + results[0].name).then(response => setWeatherData(response.data.current))
            return(
                <div>
                    <h1>{results[0].name}</h1>
                    <div>Capital: {results[0].capital}</div>
                    <div>Population: {results[0].population}</div>
                    <h2>Spoken Languages</h2>
                    <ul>{results[0].languages.map(language => <li>{language.name}</li>)}</ul>
                    <img src={results[0].flag} alt='flag' width="200" height="100" />
                    <h2>Weather in {results[0].capital}</h2>
                    {weatherData ? (<>
                    <p>
                        <strong>Temperature:</strong> {weatherData.temperature} celcius
                    </p>
                        <img src={weatherData.weather_icons[0]} alt="Weather icon" />
                    <p>
                        <strong>Wind:</strong> {weatherData.wind_speed} mph, direction{' '}
                        {weatherData.wind_dir}
                    </p>
                    </>
                    ) : (<p>Weather data load error!</p>
                    )}
                </div>
        )
        } else {
            return(
            <div><ul>{results.map(country => <li key={country.name}>{country.name} <button key={country.name} onClick={() => setFilterCountry(country.name)}>show</button></li>)}</ul></div>
            )
        }
}

export default Countries;