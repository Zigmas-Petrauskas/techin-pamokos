import { useState } from 'react';

// Skaitiklio su nustatytomis ribomis komponentas.
const CounterWithLimits = () => {
  const [count, setCount] = useState(0);

  return (
    <section className="counter-limits">
      <span className="exercise-number">Exercise 11</span>

      <h2>Counter with Limits</h2>

      <p>{count}</p>

      <div className="limits-buttons">
        <button disabled={count === 0} onClick={() => setCount((prevCount) => prevCount - 1)}>
          Decrement
        </button>

        <button disabled={count === 10} onClick={() => setCount((prevCount) => prevCount + 1)}>
          Increment
        </button>
      </div>
    </section>
  );
};

export default CounterWithLimits;
