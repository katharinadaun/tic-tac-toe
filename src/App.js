import { useState } from "react";

function Square({key, xIsNext, setXIsNext}) {
  const [value, setValue] = useState("");
  function handleClick() {
    if (value !== "X" && value !== "O") {
      if (xIsNext) {
        setValue("X");
      } else {
        setValue("O");
      }
      setXIsNext(!xIsNext);
    }
  }
  return <button key={key} className="square" onClick={handleClick}>{value}</button>
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  return (
  <>
  {
    [1,2,3].map(row => <div className="board-row">
      {
      [1,2,3].map(col => <Square xIsNext={xIsNext} setXIsNext={setXIsNext} key={3*(row-1) + col}/>)
      }
  </div>)
  }
  </>
  );
}