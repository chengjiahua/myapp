import React, { useState } from "react";
import "./styles.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // 行
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // 列
      [0, 4, 8],
      [2, 4, 6], // 对角线
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const status = winner
    ? `胜利者: ${winner}`
    : board.every((square) => square)
    ? "平局！"
    : `下一位玩家: ${isXNext ? "X" : "O"}`;

  return (
    <div className="game-content tic-tac-toe">
      <h2>{status}</h2>
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell} ${winner ? "game-ended" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        重新开始
      </button>
    </div>
  );
};

export default TicTacToe;
