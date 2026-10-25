import { useState } from 'react';
import RobotCard from './components/RobotCard';
import { robots } from './data/robots';
import './App.css';

// Pagrindinis robotų rezervavimo komponentas.
const App = () => {
  const [search, setSearch] = useState('');
  const [robotList, setRobotList] = useState(robots);

  // Robotų filtravimas pagal įvestą paieškos tekstą.
  const filteredRobots = robotList.filter((robot) =>
    robot.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Pasirinkto roboto rezervavimas.
  const handleReserve = (id) => {
    setRobotList((prevRobots) =>
      prevRobots.map((robot) => (robot.id === id ? { ...robot, reserved: true } : robot)),
    );
  };

  return (
    <main className="robots">
      <header className="robots-header">
        <h1>ROBOFRIENDS</h1>

        <input
          type="text"
          placeholder="Search for robots"
          aria-label="Search for robots"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>

      <section className="robots-list">
        {filteredRobots.map((robot) => (
          <RobotCard key={robot.id} robot={robot} onReserve={handleReserve} />
        ))}
      </section>
    </main>
  );
};

export default App;
