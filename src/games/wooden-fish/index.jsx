import React, { useState } from "react";
import "./styles.css";

const WoodenFish = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    const fish = document.querySelector(".wooden-fish");
    fish.classList.add("clicked");
    setTimeout(() => fish.classList.remove("clicked"), 100);
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

export default WoodenFish;
