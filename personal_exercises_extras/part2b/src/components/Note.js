import React from 'react'

const Note = ({ key, note, importance, toggleImportance }) => {

  const label = importance?'make not important':'make it important';

  return (
    <li>
      {note.content}
      <button id={key} onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note