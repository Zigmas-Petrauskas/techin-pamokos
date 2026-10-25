import { useState } from 'react';

// Funkcijų matomumo valdymo komponentas.
const FeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState({
    newFeature: true,
    deprecatedFeature: false,
  });

  // Pasirinktos funkcijos būsenos perjungimas.
  const toggleFeature = (feature) => {
    setFeatureFlags((prevFlags) => ({
      ...prevFlags,
      [feature]: !prevFlags[feature],
    }));
  };

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 10</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Feature Flags</h2>

      <div className="flex w-full max-w-80 flex-col gap-4 text-left">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={featureFlags.newFeature}
            onChange={() => toggleFeature('newFeature')}
            className="h-4 w-4 accent-blue-600"
          />
          Enable New Feature
        </label>

        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={featureFlags.deprecatedFeature}
            onChange={() => toggleFeature('deprecatedFeature')}
            className="h-4 w-4 accent-blue-600"
          />
          Hide Deprecated Feature
        </label>
      </div>

      <div className="mt-5 flex w-full flex-col gap-3">
        {featureFlags.newFeature && (
          <p className="rounded-md bg-green-100 p-3 text-green-800">New Feature!</p>
        )}

        {!featureFlags.deprecatedFeature && (
          <p className="rounded-md bg-yellow-100 p-3 text-yellow-800">Deprecated Feature</p>
        )}
      </div>
    </section>
  );
};

export default FeatureFlags;
