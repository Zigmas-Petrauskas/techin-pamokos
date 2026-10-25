// Roboto kortelės komponentas.
const RobotCard = ({ robot, onReserve }) => {
  return (
    <article className={`robot-card ${robot.reserved ? 'robot-card-reserved' : ''}`}>
      <img src={robot.avatar} alt={`${robot.name} robot`} />

      <div className="robot-info">
        <h2>{robot.name}</h2>
        <p>{robot.email}</p>

        {robot.reserved ? (
          <span className="reserved-label">Reserved</span>
        ) : (
          <button onClick={() => onReserve(robot.id)}>Reserve</button>
        )}
      </div>
    </article>
  );
};

export default RobotCard;
