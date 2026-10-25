import { useState } from 'react';

// Užduočių sąrašo komponentas.
const TodoList = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  // Naujos užduoties pridėjimas.
  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: task.trim(),
    };

    setTodos((prevTodos) => [...prevTodos, newTask]);
    setTask('');
  };

  // Pasirinktos užduoties pašalinimas.
  const removeTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <section className="todo-list">
      <span className="exercise-number">Exercise 7</span>

      <h2>Todo List</h2>

      <form
        className="todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul className="todo-items">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>

            <button onClick={() => removeTask(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
