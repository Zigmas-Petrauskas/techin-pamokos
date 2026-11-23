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
    `SELECT u.id, u.email, c.password_hash 
     FROM users AS u 
     JOIN user_credentials AS c ON c.user_id = u.id 
     WHERE u.email = $1`,
    [email],
  );

  return result.rows[0];
};

// Sukuriame naują vartotoją
export const create = async (user) => {
  const { email, password_hash } = user;

  // Gauname klientą visai transakcijai
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Sukuriame vartotoją
    const result = await client.query(
      `INSERT INTO users (email)
      VALUES ($1)
      RETURNING id, email`,
      [email],
    );

    const newUser = result.rows[0];

    // Išsaugome slaptažodžio hashą
    await client.query(
      `INSERT INTO user_credentials (user_id, password_hash)
      VALUES ($1, $2)`,
      [newUser.id, password_hash],
    );

    // Surandame numatytąją rolę
    const roleResult = await client.query(
      "SELECT id FROM roles WHERE name = $1",
      ["user"],
    );

    if (!roleResult.rows[0]) {
      throw new Error('Default role "user" not found');
    }

    // Priskiriame vartotojui rolę
    await client.query(
      `INSERT INTO user_roles (user_id, role_id)
        VALUES ($1, $2)`,
      [newUser.id, roleResult.rows[0].id],
    );

    await client.query("COMMIT");

    return newUser;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// Atnaujiname vartotoją
export const update = async (id, user) => {
  const { email, password_hash } = user;

  // Jei slaptažodis nekeičiamas, atnaujiname tik el. paštą
  if (password_hash === undefined) {
    const result = await pool.query(
      `UPDATE users
       SET email = $1
       WHERE id = $2
       RETURNING id, email`,
      [email, id],
    );

    return result.rows[0];
  }

  // Jei keičiamas slaptažodis, atnaujiname abi lenteles
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `UPDATE users
      SET email = $1
      WHERE id = $2
      RETURNING id, email`,
      [email, id],
    );

    const updateUser = result.rows[0];

    if (!updateUser) {
      await client.query("ROLLBACK");
      return null;
    }

    await client.query(
      `UPDATE user_credentials
      SET password_hash = $1
      WHERE user_id = $2`,
      [password_hash, id],
    );

    await client.query("COMMIT");
    return updateUser;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
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
