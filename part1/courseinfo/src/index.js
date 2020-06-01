import React from 'react'
import ReactDOM from 'react-dom'

const Header = (header) => {
    return(
            <div>
                <h1>{header.course}</h1>
            </div>
        )
}

const Part = (props) => {
    return (
            <p>
                {props.parts.name} {props.parts.exercises}
            </p>
        )
}

const Content = (props) => {
    return(
        <div>
            <Part parts={props.parts[0]} />
            <Part parts={props.parts[1]} />
            <Part parts={props.parts[2]} />
        </div>
        )
}

const Total = (props) => {
    let finalTotal = 0;
    props.parts.forEach(part => finalTotal += part.exercises)
    return (
            <div>
                <p>Number of exercises {finalTotal}</p>
            </div>
        )
}

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))