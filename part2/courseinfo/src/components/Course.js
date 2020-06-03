import React from 'react'

const Header = ({course}) => {
    return (
    <h3>{course}</h3>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce( (tempSum, part) => { 
        return tempSum + part.exercises;
      }, 0);
    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

const Data = ({parts}) => {
    return (
      <div>
        {parts.map( part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    );
  }

const Part = ({part}) => {
    return (
    <p>{part.name} {part.exercises}</p>
    )
}

const Course = ({course}) => {
    return(
        <div>
            <Header course={course.name} />
            <Data parts={course.parts}/>                 
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;
