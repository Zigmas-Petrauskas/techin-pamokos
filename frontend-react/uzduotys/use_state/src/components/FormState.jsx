import { useState } from 'react';

// Registracijos formos būsenos valdymo komponentas.
const FormState = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Atnaujinamas pasirinktas formos laukas.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <section className="form-state">
      <span className="exercise-number">Exercise 5</span>

      <h2>Form State Management</h2>

      <form className="registration-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="form-name">Name</label>
        <input
          id="form-name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />
      </form>

      <div className="form-preview">
        <h3>Form Data</h3>

        <p>Name: {form.name}</p>
        <p>Email: {form.email}</p>
        <p>Password: {form.password}</p>
      </div>
    </section>
  );
};

export default FormState;
