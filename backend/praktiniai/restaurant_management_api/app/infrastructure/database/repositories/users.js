import pool from "../db.js";

// Gauname visus vartotojus
export const findAll = async () => {
  const result = await pool.query("SELECT id, email FROM users ORDER BY id");

  return result.rows;
};

// Gauname vartotoją pagal ID
export const findById = async (id) => {
  const result = await pool.query("SELECT id, email FROM users WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
};

// Gauname vartotoją pagal el. pašto adresą
export const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id, email, password FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0];
};

// Sukuriame naują vartotoją
export const create = async (user) => {
  const { email, password } = user;

  const result = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email`,
    [email, password],
  );

  return result.rows[0];
};

// Atnaujiname vartotoją
export const update = async (id, user) => {
  const { email, password } = user;

  const result = await pool.query(
    `UPDATE users
     SET email = $1,
         password = $2
     WHERE id = $3
     RETURNING id, email`,
    [email, password, id],
  );

  return result.rows[0];
};

// Pašaliname vartotoją
export const remove = async (id) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id, email`,
    [id],
  );

  return result.rows[0];
};
