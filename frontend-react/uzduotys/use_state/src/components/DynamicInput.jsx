import { useState } from 'react';

// Dinaminio teksto įvedimo komponentas.
const DynamicInput = () => {
  const [name, setName] = useState('');

  // Atnaujinama įvesto vardo reikšmė.
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <section className="dynamic-input">
      <span className="exercise-number">Exercise 3</span>

      <h2>Dynamic Input Field</h2>

      <label htmlFor="name">Enter your name:</label>

      <input id="name" type="text" placeholder="Your name" value={name} onChange={handleChange} />

      <p>Hello, {name || 'stranger'}!</p>
    </section>
  );
};

export default DynamicInput;
