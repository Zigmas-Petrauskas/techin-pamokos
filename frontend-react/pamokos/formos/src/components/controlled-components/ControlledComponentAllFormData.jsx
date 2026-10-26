import { useState } from "react";

// Formos duomenys saugomi React state.
function ControlledComponentAllFormData() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Atnaujinamas pakeistas formos laukas.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Apdorojamas formos pateikimas.
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    // Formos duomenys išsaugomi localStorage.
    localStorage.setItem("User", JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledComponentAllFormData;
