import { useState, useEffect } from "react";
import "./leaderboard.css";

const Leaderboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("minesweeper-leaderboard")) || [];
    setRecords(saved.slice(0, 3));
  }, []);

  return (
    <div className="leaderboard-container">
      {records.map((record, index) => (
        <div
          key={record.timestamp}
          className={`leaderboard-item rank-${index + 1}`}
        >
          <div className="medal">
            {index === 0 && "🥇"}
            {index === 1 && "🥈"}
            {index === 2 && "🥉"}
          </div>
          <div className="name">✧{record.name}✧</div>
          <div className="time">{record.time}s</div>
        </div>
      ))}
      {records.length === 0 && (
        <div className="empty">暂无记录，快来挑战！</div>
      )}
    </div>
  );
};

export default Leaderboard;
