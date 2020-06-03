import React from 'react';

const Total = ({parts}) => {
    const total = parts.reduce( (tempSum, part) => { 
        return tempSum + part.exercises;
      }, 0);
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

export default Total;