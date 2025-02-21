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
    addNewTile();
    addNewTile();
  }, []);

  // 添加新数字块
  const addNewTile = () => {
    const newBoard = [...board];
    const emptyCells = [];
    newBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j]);
      });
    });
    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
      setBoard(newBoard);
    }
  };

  // 移动处理逻辑
  const move = (direction) => {
    let newBoard = [...board];
    let moved = false;
    let newScore = score;

    const rotate = (b) => b[0].map((_, i) => b.map((row) => row[i]).reverse());

    // 统一转换为左移处理
    if (direction === "right") newBoard = rotate(rotate(newBoard));
    if (direction === "up") newBoard = rotate(rotate(rotate(newBoard)));
    if (direction === "down") newBoard = rotate(newBoard);

    // 处理合并
    newBoard = newBoard.map((row) => {
      let newRow = row.filter((cell) => cell !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newScore += newRow[i];
          newRow.splice(i + 1, 1);
          moved = true;
        }
      }
      return [...newRow, ...Array(4 - newRow.length).fill(0)];
    });

    // 旋转回原方向
    if (direction === "right") newBoard = rotate(rotate(newBoard));
    if (direction === "up") newBoard = rotate(newBoard);
    if (direction === "down") newBoard = rotate(rotate(rotate(newBoard)));

    if (moved) {
      setBoard(newBoard);
      setScore(newScore);
      setTimeout(addNewTile, 100);
      checkGameOver(newBoard);
    }
  };

  // 检查游戏结束
  const checkGameOver = (currentBoard) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return false;
        if (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j])
          return false;
        if (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1])
          return false;
      }
    }
    setGameOver(true);
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;
      switch (e.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
        default:
          break;
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
