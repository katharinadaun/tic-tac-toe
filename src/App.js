import { useState } from "react";

function Square({value, handleClick}) {
  return <button className="square" onClick={handleClick}>{value}</button>
}

export default function Board() {
  const[squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(index) {
    if (squares[index]) {
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
  return (
  <>
  {
    [0,1,2].map(row => <div className="board-row">
      {
      [0,1,2].map(col => <Square handleClick={() => handleClick(3*row + col)} value={squares[3*row + col]} key={3*row + col} />)
      }
  </div>)
  }
  </>
  );
}