import { useState } from 'react';

// Mygtukų atvaizdavimo pagal prisijungimo būseną komponentas.
const ConditionalElements = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Prisijungimo būsenos pakeitimas.
  const toggleLogin = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 3</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Conditional Rendering with Elements</h2>

      <div className="flex flex-wrap justify-center gap-3">
        {isLoggedIn ? (
          <>
            <button
              onClick={toggleLogin}
              className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Profile
            </button>

            <button
              onClick={toggleLogin}
              className="cursor-pointer rounded-md bg-gray-600 px-5 py-2.5 text-white hover:bg-gray-700"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleLogin}
              className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Log In
            </button>

            <button
              onClick={toggleLogin}
              className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default ConditionalElements;
