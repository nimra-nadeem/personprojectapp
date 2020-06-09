import React from 'react';
import './App.css';

function Item(props) {
  return (
    <div className="App-item">
      <input 
        type="checkbox"
        className="myinput"
        checked={props.item.completed} 
        onChange={() => props.handleChange(props.item.id)}
      /> 
      <p>{props.item.text}</p>
    </div>
  );
}

export default Item;
