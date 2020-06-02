import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {
    return (
        <div>{props.name} {props.value}<br/></div>
        )
}

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}   

const Statistics = (props) => {

    const total = props.good + props.neutral + props.bad

    if (total === 0) {
        return(
                <div>No feedback given</div>
            )
    }

    return (
        <div>
            <Statistic name={"good"} value={props.good} />
            <Statistic name={"neutral"} value={props.neutral} />
            <Statistic name={"bad"} value={props.bad} />
            <Statistic name={"all"} value={props.total} />
            <Statistic name={"average"} value={(props.good - props.bad) / total} />
            <Statistic name={"positive"} value={100.0 * props.good / total + ' %'} />
        </div>
        )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

  
    return (
        <div>
            <h1>give feedback</h1>
            <Button text={'good'} handleClick={() => { setGood(good + 1) }} />
            <Button text={'neutral'} handleClick={() => { setNeutral(neutral + 1) }} />
            <Button text={'bad'} handleClick={() => { setBad(bad + 1) }} />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)