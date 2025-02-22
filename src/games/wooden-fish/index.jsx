import React, { useState, useEffect } from "react";
import "./styles.css";
import fishStatic from "./images/wooden-fish.png";
import fishHit from "./images/wooden-fish-hit.png";

const WoodenFish = () => {
  const [count, setCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // 初始化读取排行榜
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("wooden-fish-leaderboard")) || [];
    setLeaderboard(saved.slice(0, 3));
  }, []);

  const handleSubmit = () => {
    const currentRecords =
      JSON.parse(localStorage.getItem("wooden-fish-leaderboard")) || [];
    const isEligible =
      currentRecords.length < 3 || count > currentRecords[2].score;

    if (isEligible) {
      const name = prompt("🎉 功德无量！请输入你的名字：");
      if (name && name.trim()) {
        const newRecord = {
          name: name.trim().substring(0, 12),
          score: count,
          timestamp: Date.now(),
        };

        const updated = [...currentRecords, newRecord]
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        localStorage.setItem(
          "wooden-fish-leaderboard",
          JSON.stringify(updated)
        );
        setLeaderboard(updated);
        setCount(0);
      }
    } else {
      alert("当前功德不足以上榜，继续努力！");
    }
  };

  const handleClick = () => {
    setCount((prev) => prev + 1);

    // 触发动画
    const fish = document.querySelector(".wooden-fish-img");
    fish.style.transform = "scale(0.95)";
    setTimeout(() => (fish.style.transform = "scale(1)"), 100);
  };

  return (
    <div className="game-content">
      <div className="fish-leaderboard">
        <h3>功德榜</h3>
        {leaderboard.map((record, index) => (
          <div key={record.timestamp} className={`rank-item rank-${index + 1}`}>
            <span className="medal">
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
            </span>
            <span className="name">✦{record.name}✦</span>
            <span className="score">{record.score} 功德</span>
          </div>
        ))}
      </div>

      <h2>功德 +{count}</h2>
      <button className="submit-btn" onClick={handleSubmit}>
        提交功德
      </button>

      <div className="wooden-fish" onClick={handleClick}>
        <img
          className="wooden-fish-img"
          src={fishStatic}
          alt="木鱼"
          onMouseDown={(e) => (e.target.src = fishHit)}
          onMouseUp={(e) => (e.target.src = fishStatic)}
          onTouchStart={(e) => (e.target.src = fishHit)}
          onTouchEnd={(e) => (e.target.src = fishStatic)}
        />
      </div>
      <p>点击木鱼积攒功德</p>
    </div>
  );
};

export default WoodenFish;
