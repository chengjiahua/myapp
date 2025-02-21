import React, { useState, useEffect } from "react";
import "./styles.css";

const Game2048 = () => {
  const [board, setBoard] = useState(
    Array(4)
      .fill()
      .map(() => Array(4).fill(0))
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 初始化游戏
  useEffect(() => {
    const newBoard = addNewTile(board);
    setBoard(addNewTile(newBoard));
  }, []);

  // 添加新数字块
  const addNewTile = (currentBoard) => {
    const newBoard = currentBoard.map(row => [...row]);
    const emptyCells = [];
    newBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j]);
      });
    });
    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
    return newBoard;
  };

  // 移动处理逻辑
  const move = (direction) => {
    if (gameOver) return;
    
    let newBoard = board.map(row => [...row]);
    let moved = false;
    let newScore = score;

    const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));
    const reverseRows = (matrix) => matrix.map(row => [...row].reverse());

    const processLeft = (matrix) => {
      matrix.forEach((row, rowIndex) => {
        let newRow = row.filter(cell => cell !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
          if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newScore += newRow[i];
            newRow.splice(i + 1, 1);
            moved = true;
          }
        }
        const filledRow = [...newRow, ...Array(4 - newRow.length).fill(0)];
        // 检测行是否变化
        if (!row.every((val, idx) => val === filledRow[idx])) {
          moved = true;
        }
        matrix[rowIndex] = filledRow;
      });
    };

    switch (direction) {
      case "left":
        processLeft(newBoard);
        break;
      case "right":
        newBoard = reverseRows(newBoard);
        processLeft(newBoard);
        newBoard = reverseRows(newBoard);
        break;
      case "up":
        newBoard = transpose(newBoard);
        processLeft(newBoard);
        newBoard = transpose(newBoard);
        break;
      case "down":
        newBoard = transpose(newBoard);
        newBoard = reverseRows(newBoard);
        processLeft(newBoard);
        newBoard = reverseRows(newBoard);
        newBoard = transpose(newBoard);
        break;
      default:
        break;
    }

    if (moved) {
      newBoard = addNewTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
      checkGameOver(newBoard);
    }
  };

  // 检查游戏结束
  const checkGameOver = (currentBoard) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return false;
        if (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) return false;
        if (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1]) return false;
      }
    }
    setGameOver(true);
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
        case "ArrowRight": move("right"); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [board, gameOver]);

  return (
    <div className="game-content game-2048">
      <div className="header">
        <h2>2048</h2>
        <div className="score">得分: {score}</div>
      </div>
      <div className="grid">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`tile value-${cell} ${cell ? "active" : ""}`}
            >
              {cell || ""}
            </div>
          ))
        )}
      </div>
      {gameOver && <div className="game-over">游戏结束！</div>}
    </div>
  );
};

export default Game2048;