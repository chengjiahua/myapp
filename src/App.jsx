import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentGame, setCurrentGame] = useState('woodenFish');
  const [count, setCount] = useState(0);

  const WoodenFish = () => {
    const handleClick = () => {
      setCount(prev => prev + 1);
      // 添加点击动画
      const fish = document.querySelector('.wooden-fish');
      fish.classList.add('clicked');
      setTimeout(() => fish.classList.remove('clicked'), 100);
    };

    return (
      <div className="game-content">
        <h2>功德 +{count}</h2>
        <div className="wooden-fish" onClick={handleClick}>
          🐠
        </div>
        <p>点击木鱼积攒功德</p>
      </div>
    );
  };

  const Game2048 = () => (
    <div className="game-content">
      <h2>2048 Game</h2>
      {/* 后续补充2048游戏逻辑 */}
      <div className="coming-soon">开发中...</div>
    </div>
  );

  const TicTacToe = () => (
    <div className="game-content">
      <h2>井字棋</h2>
      {/* 后续补充井字棋逻辑 */}
      <div className="coming-soon">开发中...</div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1 className="logo">小游戏中心</h1>
        <div className="menu">
          <button 
            className={`menu-item ${currentGame === 'woodenFish' ? 'active' : ''}`}
            onClick={() => setCurrentGame('woodenFish')}
          >
            电子木鱼
          </button>
          <button
            className={`menu-item ${currentGame === 'game2048' ? 'active' : ''}`}
            onClick={() => setCurrentGame('game2048')}
          >
            2048
          </button>
          <button
            className={`menu-item ${currentGame === 'ticTacToe' ? 'active' : ''}`}
            onClick={() => setCurrentGame('ticTacToe')}
          >
            井字棋
          </button>
        </div>
      </div>

      <div className="main-content">
        {currentGame === 'woodenFish' && <WoodenFish />}
        {currentGame === 'game2048' && <Game2048 />}
        {currentGame === 'ticTacToe' && <TicTacToe />}
      </div>
    </div>
  );
};

export default App;