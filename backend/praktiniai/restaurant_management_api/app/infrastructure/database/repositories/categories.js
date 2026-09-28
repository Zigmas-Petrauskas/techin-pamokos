import pool from "../db.js";

// Gauname visas kategorijas
export const findAll = async () => {
  const result = await pool.query("SELECT * FROM categories");

  return result.rows;
};

// Gauname vieną kategoriją pagal ID
export const findById = async (id) => {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
};

// Gauname kategoriją pagal pavadinimą
export const findByName = async (name) => {
  const result = await pool.query("SELECT id FROM categories WHERE name = $1", [
    name,
  ]);

  return result.rows[0];
};

// Sukuriame naują kategoriją
export const create = async (name) => {
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name],
  );

  return result.rows[0];
};

// Atnaujiname kategoriją pagal ID
export const update = async (id, name) => {
  const result = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id],
  );

  return result.rows[0];
};

// Pašaliname kategoriją pagal ID
export const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};
