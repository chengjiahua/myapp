import { useState } from "react";
import "./styles.css";

const Minesweeper = () => {
  const [gameConfig, setGameConfig] = useState({
    difficulty: "beginner",
    width: 9,
    height: 9,
    mines: 10,
    customOpen: false,
  });

  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [flags, setFlags] = useState(0);
  const [firstClick, setFirstClick] = useState(true);

  const initGame = (safeX = -1, safeY = -1) => {
    const { width, height, mines } = gameConfig;
    const newBoard = Array(height)
      .fill()
      .map(() =>
        Array(width)
          .fill()
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          }))
      );

    // 生成安全区域
    const safeZone = new Set();
    if (safeX >= 0 && safeY >= 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const x = safeX + dx;
          const y = safeY + dy;
          if (x >= 0 && x < height && y >= 0 && y < width) {
            safeZone.add(`${x},${y}`);
          }
        }
      }
    }

    // 布置地雷
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const x = Math.floor(Math.random() * height);
      const y = Math.floor(Math.random() * width);

      if (safeZone.has(`${x},${y}`)) continue;
      if (newBoard[x][y].isMine) continue;

      newBoard[x][y].isMine = true;
      minesPlaced++;

      // 更新周围格子的计数
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < height && ny >= 0 && ny < width) {
            newBoard[nx][ny].neighborMines++;
          }
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setWin(false);
    setFlags(mines);
    setFirstClick(false);
  };

  const revealCells = (board, x, y) => {
    if (
      x < 0 ||
      x >= board.length ||
      y < 0 ||
      y >= board[0].length ||
      board[x][y].isRevealed ||
      board[x][y].isFlagged
    )
      return;

    board[x][y].isRevealed = true;

    if (board[x][y].neighborMines === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          revealCells(board, x + dx, y + dy);
        }
      }
    }
  };

  const handleClick = (x, y, isRightClick) => {
    if (gameOver || win) return;

    // 首次点击初始化游戏
    if (firstClick) {
      initGame(x, y);
      return;
    }

    const newBoard = [...board];

    if (isRightClick) {
      if (!newBoard[x][y].isRevealed) {
        newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
        setFlags((prev) => prev + (newBoard[x][y].isFlagged ? -1 : 1));
      }
    } else {
      if (newBoard[x][y].isFlagged) return;

      if (newBoard[x][y].isMine) {
        setGameOver(true);
        newBoard.forEach((row) =>
          row.forEach((cell) => (cell.isRevealed = true))
        );
      } else {
        revealCells(newBoard, x, y);
      }
    }

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const checkWinCondition = (currentBoard) => {
    const allRevealed = currentBoard.every((row) =>
      row.every((cell) => cell.isRevealed || cell.isMine)
    );
    if (allRevealed) setWin(true);
  };

  const handleDifficultyChange = (difficulty) => {
    const presets = {
      beginner: { width: 9, height: 9, mines: 10 },
      intermediate: { width: 16, height: 16, mines: 40 },
      expert: { width: 30, height: 16, mines: 99 },
    };
    setGameConfig({ ...presets[difficulty], difficulty, customOpen: false });
    setFirstClick(true);
  };

  return (
    <div className="minesweeper-game">
      <div className="config-panel">
        <select
          value={gameConfig.difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
        >
          <option value="beginner">初级（9×9，10雷）</option>
          <option value="intermediate">中级（16×16，40雷）</option>
          <option value="expert">高级（16×30，99雷）</option>
        </select>

        <button className="new-game-btn" onClick={() => initGame()}>
          新游戏
        </button>
      </div>

      <div className="game-status">
        <div>剩余旗帜: {flags}</div>
        <div className="game-state">
          {gameOver ? "💥 游戏结束！" : win ? "🎉 胜利！" : "▶ 进行中"}
        </div>
      </div>

      <div
        className="mine-grid"
        style={{
          gridTemplateColumns: `repeat(${gameConfig.width}, 30px)`,
        }}
      >
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`cell ${cell.isRevealed ? "revealed" : ""} ${
                cell.isFlagged ? "flagged" : ""
              }`}
              onClick={() => handleClick(x, y, false)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleClick(x, y, true);
              }}
            >
              {cell.isRevealed &&
                (cell.isMine ? (
                  <div className="mine">💣</div>
                ) : cell.neighborMines > 0 ? (
                  <div className={`number num-${cell.neighborMines}`}>
                    {cell.neighborMines}
                  </div>
                ) : null)}
              {cell.isFlagged && <div className="flag">🚩</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Minesweeper;
