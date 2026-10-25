import { useEffect, useState } from 'react';

// Laikmačio komponentas.
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Paleidžiamas laikmatis ir išvalomas intervalas.
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Laikmatis sustabdomas ir grąžinamas į nulį.
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <section className="timer">
      <span className="exercise-number">Exercise 12</span>

      <h2>Timer</h2>

      <p>{seconds} s</p>

      <div className="timer-buttons">
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Start
        </button>

        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
          Stop
        </button>

        <button onClick={resetTimer}>Reset</button>
      </div>
    </section>
  );
};

export default Timer;
