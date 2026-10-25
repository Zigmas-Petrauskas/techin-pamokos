import { useState } from 'react';

// Patiktukų ir nepatiktukų skaičiavimo komponentas.
const LikeDislike = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <section className="like-dislike">
      <span className="exercise-number">Exercise 8</span>

      <h2>Like/Dislike Buttons</h2>

      <div className="reactions">
        <div className="reaction-item">
          <p>{likes}</p>

          <button className="like-button" onClick={() => setLikes((prevLikes) => prevLikes + 1)}>
            Like
          </button>
        </div>

        <div className="reaction-item">
          <p>{dislikes}</p>

          <button
            className="dislike-button"
            onClick={() => setDislikes((prevDislikes) => prevDislikes + 1)}
          >
            Dislike
          </button>
        </div>
      </div>
    </section>
  );
};

export default LikeDislike;
