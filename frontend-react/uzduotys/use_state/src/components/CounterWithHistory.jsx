import { useState } from 'react';

// Skaitiklio su ankstesnių reikšmių istorija komponentas.
const CounterWithHistory = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  // Pakeičiama skaitiklio reikšmė ir išsaugoma ankstesnė.
  const updateCount = (change) => {
    setHistory((prevHistory) => [...prevHistory, count]);
    setCount((prevCount) => prevCount + change);
  };

  return (
    <section className="counter-history">
      <span className="exercise-number">Exercise 15</span>

      <h2>Counter with History</h2>

      <p className="history-count">{count}</p>

      <div className="history-buttons">
        <button onClick={() => updateCount(-1)}>Decrement</button>
        <button onClick={() => updateCount(1)}>Increment</button>
      </div>

      <div className="history-container">
        <h3>Previous Counts</h3>

        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul className="history-list">
            {history.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CounterWithHistory;
