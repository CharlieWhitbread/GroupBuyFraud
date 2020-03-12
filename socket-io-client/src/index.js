import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import alertify from 'alertifyjs'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const TopMostParent = ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );

//   window.changeMultiply = (value) => {
//     // Update state of topmost parent when this method is called 
//     TopMostParent.setState({multiply: value})
// };

serviceWorker.unregister();
