import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

ReactDOM.render(
  <React.StrictMode>
    <Grid />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('abcd')

