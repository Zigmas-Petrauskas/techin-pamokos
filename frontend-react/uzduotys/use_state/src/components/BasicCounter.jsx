import { useState } from 'react';

// Paprasto skaitiklio komponentas.
const BasicCounter = () => {
  const [count, setCount] = useState(0);

  // Skaitiklio reikšmės didinimas.
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Skaitiklio reikšmės mažinimas.
  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <section className="counter">
      <span className="exercise-number">Exercise 1</span>

      <h2>Basic Counter</h2>

      <p>{count}</p>

      <div className="counter-buttons">
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
      </div>
    </section>
  );
};

export default BasicCounter;
