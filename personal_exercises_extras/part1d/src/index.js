import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = (props) => {
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([])

    const increaseLeftByOne = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }
    const increaseRightByOne = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }    

  // const handleLeftClick = () => {
  //   const newClicks = { 
  //     ...clicks,
  //     left: clicks.left + 1, 
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = { 
  //     ...clicks,
  //     right: clicks.right + 1 
  //   }
  //   setClicks(newClicks)
  // }

  return (
    
    <div>
      <div>
        {left}
        <Button onClick={increaseLeftByOne} text='left' />
        <Button onClick={increaseRightByOne} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
