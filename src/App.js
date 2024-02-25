import { useState } from "react";

function Square({value, handleClick}) {
  return <button className="square" onClick={handleClick}>{value}</button>
}

export default function Board() {
  const[squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner();
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext? "X" : "O");
  }
  function handleClick(index) {
    if (squares[index] || calculateWinner()) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O"
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner() {
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
      if (squares[winningNums[i][0]] === squares[winningNums[i][1]] && squares[winningNums[i][0]] === squares[winningNums[i][2]]){
        return squares[winningNums[i][0]];
      }
    }
    return null;
  }
  return (
  <>
  <div>{status}</div>
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