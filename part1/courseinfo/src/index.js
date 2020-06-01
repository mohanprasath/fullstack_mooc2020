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
                {props.part} {props.exercises}
            </p>
        )
}

const Content = (props) => {
    return(
        <div>
            <Part part={props.parts[0]} exercises={props.exercises[0]} />
            <Part part={props.parts[1]} exercises={props.exercises[1]} />
            <Part part={props.parts[2]} exercises={props.exercises[2]} />
        </div>
        )
}

const Total = (total) => {
    return (
            <div>
                <p>Number of exercises {total.count}</p>
            </div>
        )
}

const App = () => {
    const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1.name, part2.name, part3.name]} exercises={[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total count={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))