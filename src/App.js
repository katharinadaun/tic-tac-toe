import { useState } from "react";

function Square({value, handleClick}) {
  return <button className="square" onClick={handleClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext? "X" : "O");
  }
  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O"
    }
    onPlay(nextSquares);
  }

  return (
  <>
  <div className="status">{status}</div>
  {
    [0,1,2].map(row => <div key={row} className="board-row">
      {
      [0,1,2].map(col => <Square handleClick={() => handleClick(3*row + col)} value={squares[3*row + col]} key={3*row + col} />)
      }
  </div>)
  }
  </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[history.length-1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(index) {
    setHistory(history.slice(0,index+1));
    setXIsNext(index % 2 == 0)
  }
  // variables starting with _ will not be checked if they are being used
  const moves = history.map((_square, index) => {
    let description;
    if (index === history.length-1) {
      return (<li key={index}>You are at move {index}</li>)
    }
    else if (index > 0) {
      description = 'Go to move ' + index;
    } else {
      description = 'Go to game start';
    }
    // fine to use index as key here because array will never be reordered
    return (
    <li key={index}>
      <button onClick={() => jumpTo(index)}>{description}</button>
    </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const winningNums = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]  
  ];
  for (let i = 0; i < winningNums.length; i++) {
    const [a,b,c] = winningNums[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}