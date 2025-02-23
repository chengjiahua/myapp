import React, { useState, useEffect } from "react";
import WoodenFish from "./wooden-fish";
import Game2048 from "./game-2048";
import TicTacToe from "./tic-tac-toe";
import Minesweeper from "./minesweeper";
import Gobang from "./gobang/gobang.jsx";
import "./gameCenter.css";

function GameCenter() {
  const [currentGame, setCurrentGame] = useState("woodenFish");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [username] = useState(localStorage.getItem("username") || "游客");

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
          <button
            className={`menu-item ${currentGame === "Gobang" ? "active" : ""}`}
            onClick={() => setCurrentGame("gobang")}
          >
            五子棋
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
        {/* 新增欢迎语 */}
        <div className="welcome-banner">欢迎您，{username}</div>

        {currentGame === "woodenFish" && <WoodenFish />}
        {currentGame === "game2048" && <Game2048 />}
        {currentGame === "ticTacToe" && <TicTacToe />}
        {currentGame === "minesweeper" && <Minesweeper />}
        {currentGame === "gobang" && <Gobang />}
      </div>
    </div>
  );
}

export default GameCenter;
