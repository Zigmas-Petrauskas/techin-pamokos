import { useState } from 'react';

// Dviejų nepriklausomų skaitiklių komponentas.
const MultipleCounters = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // Abu skaitikliai grąžinami į pradinę būseną.
  const resetAll = () => {
    setCounter1(0);
    setCounter2(0);
  };

  return (
    <section className="multiple-counters">
      <span className="exercise-number">Exercise 6</span>

      <h2>Multiple Counters</h2>

      <div className="counters-container">
        <div className="counter-item">
          <h3>Counter 1</h3>

          <p>{counter1}</p>

          <div className="counter-actions">
            <button onClick={() => setCounter1((prev) => prev - 1)}>Decrement</button>
            <button onClick={() => setCounter1((prev) => prev + 1)}>Increment</button>
          </div>
        </div>

        <div className="counter-item">
          <h3>Counter 2</h3>

          <p>{counter2}</p>

          <div className="counter-actions">
            <button onClick={() => setCounter2((prev) => prev - 1)}>Decrement</button>
            <button onClick={() => setCounter2((prev) => prev + 1)}>Increment</button>
          </div>
        </div>
      </div>

      <button className="reset-button" onClick={resetAll}>
        Reset All
      </button>
    </section>
  );
};

export default MultipleCounters;
