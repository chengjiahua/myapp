import React, { useState, useEffect } from 'react';
import './gobang.css';

const Gobang = () => {
  const [board, setBoard] = useState(Array(15).fill().map(() => Array(15).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('black');
  const [winner, setWinner] = useState(null);

  // 检查胜负
  const checkWin = (row, col) => {
    const directions = [
      [ [0,1], [0,-1] ], // 水平
      [ [1,0], [-1,0] ], // 垂直
      [ [1,1], [-1,-1] ], // 主对角线
      [ [1,-1], [-1,1] ] // 副对角线
    ];

    for (let [dir1, dir2] of directions) {
      let count = 1;
      count += countStones(row, col, dir1);
      count += countStones(row, col, dir2);
      if (count >= 5) return true;
    }
    return false;
  };

  const countStones = (row, col, [dx, dy]) => {
    let count = 0;
    let r = row + dx;
    let c = col + dy;
    while (r >= 0 && r < 15 && c >= 0 && c < 15 && board[r][c] === currentPlayer) {
      count++;
      r += dx;
      c += dy;
    }
    return count;
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    
    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(row, col)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  const resetGame = () => {
    setBoard(Array(15).fill().map(() => Array(15).fill(null)));
    setCurrentPlayer('black');
    setWinner(null);
  };

  return (
    <div className="gobang-game">
      <div className="game-info">
        <h2>{winner ? `胜利者: ${winner === 'black' ? '黑子' : '白子'}` : `当前玩家: ${currentPlayer === 'black' ? '黑子' : '白子'}`}</h2>
        <button className="reset-button" onClick={resetGame}>新游戏</button>
      </div>

      <div className="gobang-board">
        {board.map((row, i) => (
          <div key={i} className="gobang-row">
            {row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`gobang-cell ${cell}`}
                onClick={() => handleClick(i, j)}
              >
                {cell && <div className={`stone ${cell}`} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gobang;