import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const MostVoted = ({votes, anecdotes}) => {
  let maxIndex = votes.indexOf(Math.max(...votes));
  if (maxIndex != -1){
    return(
      <div>
        <h3>Anecdote with most votes</h3>
        {anecdotes[maxIndex]}<br />
        has {votes[maxIndex]} votes!<br />
      </div>
      )    
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  //https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array

  const handleVotes = () => {
    let newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  return (
    <div>
      <h3> Anecdote of the day </h3>
      {props.anecdotes[selected]}<br />
      has {votes[selected]} votes!<br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={() => {setSelected( Math.floor(Math.random() * anecdotes.length) )}}>next anectode</button>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)