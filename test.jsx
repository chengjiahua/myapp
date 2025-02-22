// 添加状态
const [showNameInput, setShowNameInput] = useState(false);
const [finalTime, setFinalTime] = useState(0);

// 修改胜利检查逻辑
useEffect(() => {
  if (win) {
    const currentTime = Date.now() - startTime;
    const seconds = Math.floor(currentTime / 1000);
    setFinalTime(seconds);
    
    const records = JSON.parse(localStorage.getItem('minesweeper-leaderboard')) || [];
    const isTop3 = records.length < 3 || seconds < records[2].time;
    
    if (isTop3) {
      setTimeout(() => {
        const name = prompt('🎉 进入排行榜前三！请输入你的名字：');
        if (name && name.trim()) {
          const newRecords = [...records, { 
            name: name.trim().slice(0, 12),
            time: seconds,
            timestamp: Date.now()
          }]
            .sort((a, b) => a.time - b.time)
            .slice(0, 3);
          
          localStorage.setItem('minesweeper-leaderboard', JSON.stringify(newRecords));
        }
      }, 500);
    }
  }
}, [win]);

// 添加计时状态
const [startTime, setStartTime] = useState(0);

// 在initGame开始时记录时间
const initGame = (safeX, safeY) => {
  setStartTime(Date.now());
  // ...原有初始化逻辑
};