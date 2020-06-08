import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }, [])
  // console.log('render', notes.length, 'notes')
  useEffect(() => {
    console.log('effect')
    
    noteService.getAll().then(initialNotes  => setNotes(initialNotes))

    //const eventHandler = response => {
    //  console.log('promise fulfilled')
    //  setNotes(response.data)
    //}
  
    //const promise = axios.get('http://localhost:3001/notes')
    //promise.then(eventHandler)
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      // id is removed in part2d examplesls
      //id: notes.length + 1,
    }
  
    noteService.create(noteObject).then(
      returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        }
    )

    // axios
    // .post('http://localhost:3001/notes', noteObject)
    // .then(response => {
    //   console.log(response)
    //   setNotes(notes.concat(noteObject))
    //   setNewNote('')
    // })
    
    
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id =>{
    //console.log('importance of ${id} needs to be toggled')
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    //axios.put(url, changedNote).then(response => {
    //  setNotes(notes.map(note => note.id !== id ? note : response.data))
    //})
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note key={i} note={note} importance={note.important} toggleImportance={()=> toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 