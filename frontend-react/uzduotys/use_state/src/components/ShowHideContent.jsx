import { useState } from 'react';

// Turinio rodymo ir slėpimo komponentas.
const ShowHideContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Pakeičiama turinio matomumo būsena.
  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <section className="show-hide">
      <span className="exercise-number">Exercise 4</span>

      <h2>Show/Hide Content</h2>

      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>

      {isVisible ? (
        <p>This is the content that can be shown or hidden.</p>
      ) : (
        <p>Content is hidden</p>
      )}
    </section>
  );
};

export default ShowHideContent;
