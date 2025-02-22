import React, { useState } from "react";
import "./App.css";
import WoodenFish from "./games/wooden-fish";
import Game2048 from "./games/game-2048";
import TicTacToe from "./games/tic-tac-toe";
import Minesweeper from "./games/minesweeper";

const App = () => {
  const [currentGame, setCurrentGame] = useState("woodenFish");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="app-container">
      {/* 新增始终可见的触发按钮 */}
      {!sidebarVisible && (
        <button
          className="show-sidebar"
          onClick={() => setSidebarVisible(true)}
        >
          →
        </button>
      )}
      <div className={`sidebar ${!sidebarVisible ? "hidden" : ""}`}>
        {/* 新增logo 小游戏中心*/}
        <h1 className="logo">小游戏中心</h1>
        <div className="menu">
          <button
            className={`menu-item ${
              currentGame === "WoodenFish" ? "active" : ""
            }`}
            onClick={() => setCurrentGame("woodenFish")}
          >
            电子木鱼
          </button>
          <button
            className={`menu-item ${
              currentGame === "Game2048" ? "active" : ""
            }`}
            onClick={() => setCurrentGame("game2048")}
          >
            2048
          </button>
          <button
            className={`menu-item ${
              currentGame === "TicTacToe" ? "active" : ""
            }`}
            onClick={() => setCurrentGame("ticTacToe")}
          >
            井字棋
          </button>
          <button
            className={`menu-item ${
              currentGame === "Minesweeper" ? "active" : ""
            }`}
            onClick={() => setCurrentGame("minesweeper")}
          >
            扫雷
          </button>
        </div>
        <button
          className="hide-sidebar"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          ←
        </button>
      </div>
      <div className={`main-content ${!sidebarVisible ? "expanded" : ""}`}>
        {currentGame === "woodenFish" && <WoodenFish />}
        {currentGame === "game2048" && <Game2048 />}
        {currentGame === "ticTacToe" && <TicTacToe />}
        {currentGame === "minesweeper" && <Minesweeper />}
      </div>
    </div>
  );
};

export default App;
