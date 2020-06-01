import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import App from './App';*/
import * as serviceWorker from './serviceWorker';

// const App = () => {
//     const now = new Date()
//     const a = 10
//     const b = 20
//     console.log('Hello from component', a, b, now)
//       return(<div>
//         <p>Hello world</p>
//       </div>
//     )
// }

// a components in react, HTML inside js function, assigned to const
const Hello = (props) => {
    return(
            <div>
                <p>Hi {props.name} ({props.age} years old), welcome to Hello World!</p>
            </div>
        )
}

const App = () => {
    return(
            <div>
                <Hello name="M" age="25"/>
                <Hello name="P" age="26"/>
            </div>
        )
}

ReactDOM.render(<App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
