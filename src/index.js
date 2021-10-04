import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>    
    <div className="container"> 
      <Register />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
