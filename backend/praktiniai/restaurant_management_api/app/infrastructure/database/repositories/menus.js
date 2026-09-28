import pool from "../db.js";

// Gauname visus meniu elementus
export const findAll = async () => {
  const result = await pool.query(`
    SELECT
      menu_items.id,
      menu_items.name,
      menu_items.price,
      menu_items.available,
      menu_items.category_id,
      categories.name AS category_name
    FROM menu_items
    JOIN categories
      ON menu_items.category_id = categories.id
    ORDER BY menu_items.id
  `);

  return result.rows;
};

// Gauname vieną meniu elementą pagal ID
export const findById = async (id) => {
  const result = await pool.query(
    `SELECT
      menu_items.id,
      menu_items.name,
      menu_items.price,
      menu_items.available,
      menu_items.category_id,
      categories.name AS category_name
    FROM menu_items
    JOIN categories
      ON menu_items.category_id = categories.id
    WHERE menu_items.id = $1`,
    [id],
  );

  return result.rows[0];
};

// Sukuriame naują meniu elementą
export const create = async (menuItem) => {
  const { name, categoryId, price, available } = menuItem;

  const result = await pool.query(
    `INSERT INTO menu_items (name, category_id, price, available)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, categoryId, price, available],
  );

  return result.rows[0];
};

// Atnaujiname meniu elementą pagal ID
export const update = async (id, menuItem) => {
  const { name, categoryId, price, available } = menuItem;

  const result = await pool.query(
    `UPDATE menu_items
     SET name = $1,
         category_id = $2,
         price = $3,
         available = $4
     WHERE id = $5
     RETURNING *`,
    [name, categoryId, price, available, id],
  );

  return result.rows[0];
};

// Pašaliname meniu elementą pagal ID
export const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM menu_items WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};
