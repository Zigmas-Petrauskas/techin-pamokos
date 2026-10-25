import { useState } from 'react';

// Užduočių sąrašo sąlyginio atvaizdavimo komponentas.
const DynamicTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Naujos užduoties pridėjimas.
  const addTask = (event) => {
    event.preventDefault();

    if (!task.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: task.trim(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask('');
  };

  // Pasirinktos užduoties pašalinimas.
  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 5</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Dynamic Lists with Conditional Rendering</h2>

      <form onSubmit={addTask} className="flex w-full gap-2">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-sm"
        />

        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="mt-5 text-gray-500">No tasks available</p>
      ) : (
        <ul className="mt-4 flex w-full flex-col gap-2">
          {tasks.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-2 rounded-md bg-gray-100 px-3 py-2"
            >
              <span className="min-w-0 text-left break-words">{item.text}</span>

              <button
                onClick={() => removeTask(item.id)}
                className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default DynamicTasks;
