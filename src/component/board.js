import React from 'react';
import '../index.css'
import Square from './square';

function Board({ squares, onClick,sizeCol,sizeRow,lineWin }) {
    
    
    const rows = Array(sizeRow).fill(null)
    const cols = Array(sizeCol).fill(null)
  
    const board = rows.map((row, numRow) => {
      const boardRow = cols.map((col, numCol) => {
        const numSquare = numRow * sizeCol + numCol;
        let isLineWin=false
        if (lineWin) {
          isLineWin=lineWin.includes(numSquare)
        }
        return <span key={numSquare}>{renderSquare(squares,numSquare,onClick,isLineWin)}</span>
      })
      return <div className="board-row" key={numRow}>{boardRow}</div>
    })
    return (
      <div>
        {board}
      </div>
    )
  }

  function renderSquare(squares,i,onClick,isLineWin) {
    return <Square
      value={squares[i]}
      onClick={() => onClick(i)}
      isLineWin={isLineWin}
    />;
  }

  export default Board;