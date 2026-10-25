import { useState } from 'react';

// Trijų skirtukų navigacijos komponentas.
const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabContent = {
    Home: 'Welcome to the Home page.',
    About: 'Learn more about us.',
    Contact: 'Get in touch with us.',
  };

  return (
    <section className="tab-navigation">
      <span className="exercise-number">Exercise 9</span>

      <h2>Tab Navigation</h2>

      <div className="tabs">
        {['Home', 'About', 'Contact'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <p>{tabContent[activeTab]}</p>
      </div>
    </section>
  );
};

export default TabNavigation;
