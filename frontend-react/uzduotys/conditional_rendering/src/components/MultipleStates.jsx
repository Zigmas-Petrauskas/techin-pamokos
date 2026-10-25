import { useState } from 'react';

// Kelių prisijungimo ir įkėlimo būsenų komponentas.
const MultipleStates = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagal dabartines būsenas parenkamas pranešimas.
  const getMessage = () => {
    if (isLoading) {
      return 'Loading...';
    }

    if (isLoggedIn) {
      return 'Welcome, User!';
    }

    return 'Please log in';
  };

  // Įkėlimo būsenos perjungimas.
  const toggleLoading = () => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  // Prisijungimo būsenos perjungimas.
  const toggleLogin = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 2</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">
        Conditional Rendering with Multiple States
      </h2>

      <p className="mb-6 text-lg">{getMessage()}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={toggleLoading}
          className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
          {isLoading ? 'Stop Loading' : 'Start Loading'}
        </button>

        <button
          onClick={toggleLogin}
          className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </section>
  );
};

export default MultipleStates;
