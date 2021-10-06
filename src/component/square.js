import React from 'react';
import '../index.css';


function Square({ value, onClick,isLineWin }) {
  if (isLineWin){
    return (
      <button
        className="square-highlight"
        onClick={() => onClick()}
      >
        {value}
      </button>
    );
  
  }
    return (
      <button
        className="square"
        onClick={() => onClick()}
      >
        {value}
      </button>
    );
  
  }
  
  export default Square