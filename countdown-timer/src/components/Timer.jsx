import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const unlockAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => audioRef.current.pause());
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    unlockAudio();
    const sec = parseInt(seconds);
    if (isNaN(sec) || sec <= 0) {
      alert("Please enter a valid positive number");
      return;
    }
    setTimeLeft(sec);
    setIsRunning(true);
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev); 
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setSeconds("");
  };

  const formatTime = (totalSec) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <input
        type="number"
        placeholder="Enter seconds"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        disabled={isRunning}
        style={{ padding: "10px", fontSize: "16px", width: "200px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleStart} disabled={isRunning && timeLeft === 0} style={{ marginRight: "10px" }}>
          Start
        </button>
        {timeLeft > 0 && (
          <button onClick={handlePauseResume} style={{ marginRight: "10px" }}>
            {isRunning ? "Pause" : "Resume"}
          </button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
      <h2 style={{ marginTop: "20px" }}>
        {timeLeft > 0 ? formatTime(timeLeft) : isRunning ? "" : "Time’s up!"}
      </h2>

      {/* Progress bar */}
      {timeLeft > 0 && (
        <div
          style={{
            width: "80%",
            height: "20px",
            backgroundColor: "#ddd",
            margin: "20px auto",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${(timeLeft / seconds) * 100}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              borderRadius: "10px",
              transition: "width 1s linear",
            }}
          ></div>
        </div>
      )}

      {/* Alarm audio from public folder */}
      <audio ref={audioRef} src="/alarm-buzzer.wav" preload="auto" />
    </div>
  );
};

export default Timer;
