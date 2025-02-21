import React, { useState } from "react";
import "./styles.css";
// 假设图片存放在 src/images 目录
import fishStatic from "./images/wooden-fish.png";
import fishHit from "./images/wooden-fish-hit.png";

const WoodenFish = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    const fish = document.querySelector(".wooden-fish-img");
    fish.style.transform = "scale(0.95)";
    setTimeout(() => (fish.style.transform = "scale(1)"), 100);
  };

  return (
    <div className="game-content">
      <h2>功德 +{count}</h2>
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
