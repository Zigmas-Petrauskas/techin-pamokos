import { useState } from 'react';

// Mygtuko būsenos perjungimo komponentas.
const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  // Mygtuko būsenos pakeitimas.
  const toggleState = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <section className="toggle">
      <span className="exercise-number">Exercise 2</span>

      <h2>Toggle Button</h2>

      <button
        className={`toggle-button ${isOn ? 'toggle-button-on' : 'toggle-button-off'}`}
        onClick={toggleState}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </section>
  );
};

export default Toggle;
