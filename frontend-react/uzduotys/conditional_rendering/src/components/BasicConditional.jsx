import { useState } from 'react';

// Prisijungimo būsenos atvaizdavimo komponentas.
const BasicConditional = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Prisijungimo būsenos perjungimas.
  const toggleLogin = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 1</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Basic Conditional Rendering</h2>

      <p className="mb-6 text-lg">{isLoggedIn ? 'Welcome, User!' : 'Please log in'}</p>

      <button
        onClick={toggleLogin}
        className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
      >
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>
    </section>
  );
};

export default BasicConditional;
