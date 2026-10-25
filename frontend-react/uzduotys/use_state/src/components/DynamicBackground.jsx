import { useState } from 'react';

// Pasirenkamos fono spalvos komponentas.
const DynamicBackground = () => {
  const [color, setColor] = useState('red');

  const colors = {
    red: '#fecaca',
    blue: '#bfdbfe',
    green: '#bbf7d0',
  };

  return (
    <section className="dynamic-background">
      <span className="exercise-number">Exercise 10</span>

      <h2>Dynamic Background Color</h2>

      <label htmlFor="background-color">Select a color:</label>

      <select
        id="background-color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      >
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>

      <div className="color-preview" style={{ backgroundColor: colors[color] }}>
        <p>{color.charAt(0).toUpperCase() + color.slice(1)} background</p>
      </div>
    </section>
  );
};

export default DynamicBackground;
