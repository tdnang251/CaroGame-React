import React, { useState } from 'react'
import '../index.css'
import Board from './board'

function Game() {
  const sizeCol = 5
  const sizeRow = 5

  const [hisSquare, setHisSquare] = useState([{
    squares: Array(sizeCol * sizeRow).fill(null),
    local: [],
    click: -1,
  },
  ])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [isReverse, setIsReverse] = useState(false)

  function handleClick(i) {
    const history = hisSquare.slice(0, stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    const click = current.click;
    if (calculateWinner(squares, sizeCol, sizeRow) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    const col = parseInt(i / sizeRow) + 1;
    const row = i % sizeCol + 1;

    const lastlocal = xIsNext ? " Player X: (Col: " + col + ";Row: " + row + ")" : " Player O: (Col: " + col + ";Row: " + row + ")"

    setHisSquare(history.concat([{
      squares: squares,
      local: lastlocal,
      click: click,
    }]))
    setStepNumber(history.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(step) {
    const history = hisSquare;
    for (let i = 0; i <= history.length - 1; i++) {
      history[i].click = step;
    }

    setStepNumber(step)
    setXIsNext((step % 2) === 0)
    setHisSquare(history)

  }

  //Update attribute isReverse when button "Reverse list" is clicked
  function handleReverse() {
    setIsReverse(!isReverse)
  }


  const history = hisSquare;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, sizeCol, sizeRow);
  const emptySquare = current.squares.includes(null)

  const moves = history.slice(0).map((step, move, element) => {
    const desc = move ?
      'Go to move #' + move + element[move].local :
      'Go to game start';
    if (element[move].click === move) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}><b>{desc}</b></button>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }

  });


  let status;
  if (winner) {
    status = 'Winner' + winner;
  } else {
    if (!emptySquare) {
      status = "Draw"
    } else {
      status = 'Next player' + (xIsNext ? "X" : "O");
    }

  }

  const lineWin = localWinner(current.squares, sizeCol, sizeCol)


  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick((i))}
          lineWin={lineWin}
          sizeCol={5}
          sizeRow={5}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{isReverse ? moves.reverse() : moves}</ol>
        <button onClick={() => { handleReverse() }}>Reverse history</button>
      </div>
    </div>
  );
}

// ========================================

function calculateWinner(squares, sizeCol, sizeRow) {
  for (let i = 0; i < sizeRow; i++) {
    for (let j = 0; j < sizeCol; j++) {
      if (squares[i * sizeRow + j] === squares[(i + 1) * sizeRow + j] && squares[i * sizeRow + j] === squares[(i + 2) * sizeRow + j]
        && squares[i * sizeRow + j] === squares[(i + 3) * sizeRow + j] && squares[i * sizeRow + j] === squares[(i + 4) * sizeRow + j]
        && squares[i * sizeRow + j]) return squares[i * sizeRow + j];

      if (squares[i * sizeRow + j] === squares[(i + 1) * sizeRow + j + 1] && squares[i * sizeRow + j] === squares[(i + 2) * sizeRow + j + 2]
        && squares[i * sizeRow + j] === squares[(i + 3) * sizeRow + j + 3] && squares[i * sizeRow + j] === squares[(i + 4) * sizeRow + j + 4]
        && squares[i * sizeRow + j]) return squares[i * sizeRow + j];

      if (squares[i * sizeRow + j] === squares[(i + 1) * sizeRow + j - 1] && squares[i * sizeRow + j] === squares[(i + 2) * sizeRow + j - 2]
        && squares[i * sizeRow + j] === squares[(i + 3) * sizeRow + j - 3] && squares[i * sizeRow + j] === squares[(i + 4) * sizeRow + j - 4]
        && squares[i * sizeRow + j]) return squares[i * sizeRow + j];

      if (squares[i * sizeRow + j] === squares[i * sizeRow + j + 1] && squares[i * sizeRow + j] === squares[i * sizeRow + j + 2]
        && squares[i * sizeRow + j] === squares[i * sizeRow + j + 3] && squares[i * sizeRow + j] === squares[i * sizeRow + j + 4]
        && squares[i * sizeRow + j]) return squares[i * sizeRow + j];
    }
  }
  return null;
}

function localWinner(squares, sizeCol, sizeRow) {
  for (let i = 0; i < sizeRow; i++) {
    for (let j = 0; j < sizeCol; j++) {
      if (squares[i * sizeRow + j] === squares[(i + 1) * sizeRow + j] && squares[i * sizeRow + j] === squares[(i + 2) * sizeRow + j]
        && squares[i * sizeRow + j] === squares[(i + 3) * sizeRow + j] && squares[i * sizeRow + j] === squares[(i + 4) * sizeRow + j]
        && squares[i * sizeRow + j]) return [i * sizeRow + j, (i + 1) * sizeRow + j, (i + 2) * sizeRow + j, (i + 3) * sizeRow + j, (i + 4) * sizeRow + j];

      if (squares[i * sizeRow + j] === squares[(i + 1) * sizeRow + j + 1] && squares[i * sizeRow + j] === squares[(i + 2) * sizeRow + j + 2]
        && squares[i * sizeRow + j] === squares[(i + 3) * sizeRow + j + 3] && squares[i * sizeRow + j] === squares[(i + 4) * sizeRow + j + 4]
        && squares[i * sizeRow + j]) return [i * sizeRow + j, (i + 1) * sizeRow + j + 1, (i + 2) * sizeRow + j + 2, (i + 3) * sizeRow + j + 3, (i + 4) * sizeRow + j + 4];

      if (squares[i * sizeRow + j] === squares[(i + 1) * sizeRow + j - 1] && squares[i * sizeRow + j] === squares[(i + 2) * sizeRow + j - 2]
        && squares[i * sizeRow + j] === squares[(i + 3) * sizeRow + j - 3] && squares[i * sizeRow + j] === squares[(i + 4) * sizeRow + j - 4]
        && squares[i * sizeRow + j]) return [i * sizeRow + j, (i + 1) * sizeRow + j - 1, (i + 2) * sizeRow + j - 2, (i + 3) * sizeRow + j - 3, (i + 4) * sizeRow + j - 4];

      if (squares[i * sizeRow + j] === squares[i * sizeRow + j + 1] && squares[i * sizeRow + j] === squares[i * sizeRow + j + 2]
        && squares[i * sizeRow + j] === squares[i * sizeRow + j + 3] && squares[i * sizeRow + j] === squares[i * sizeRow + j + 4]
        && squares[i * sizeRow + j]) return [i * sizeRow + j, i * sizeRow + j + 1, i * sizeRow + j + 2, i * sizeRow + j + 3, i * sizeRow + j + 4];
    }
  }
  return null;
}

export default Game;