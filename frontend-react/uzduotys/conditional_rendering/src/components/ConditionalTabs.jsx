import { useState } from 'react';

// Skirtukų pavadinimai ir jų turinys.
const tabs = {
  Home: 'Welcome to the Home page.',
  Profile: 'This is your profile.',
  Settings: 'Manage your settings here.',
};

// Skirtukų sąlyginio atvaizdavimo komponentas.
const ConditionalTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 9</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Tabs with Conditional Rendering</h2>

      <div className="flex flex-wrap justify-center gap-3">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer rounded-md px-5 py-2.5 ${
              activeTab === tab
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 w-full rounded-md bg-gray-100 p-4">
        <p>{tabs[activeTab]}</p>
      </div>
    </section>
  );
};

export default ConditionalTabs;
