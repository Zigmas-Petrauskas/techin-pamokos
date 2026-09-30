import pool from "../db.js";

// Gauname meniu elementus pagal filtrus, paiešką ir puslapiavimą
export const findAll = async (filters = {}) => {
  const {
    category,
    available,
    search,
    sort,
    order,
    limit = 10,
    offset = 0,
  } = filters;

  const conditions = [];
  const values = [];

  // Filtruojame pagal kategorijos pavadinimą
  if (category) {
    values.push(category);
    conditions.push(`categories.name = $${values.length}`);
  }

  // Filtruojame pagal prieinamumą
  if (available !== undefined) {
    values.push(available === "true");
    conditions.push(`menu_items.available = $${values.length}`);
  }

  // Atliekame dalinę, raidžių dydžiui nejautrią paiešką
  if (search) {
    values.push(`%${search}%`);
    conditions.push(`menu_items.name ILIKE $${values.length}`);
  }

  // Leidžiame rikiuoti tik pagal numatytus laukus
  const sortColumns = {
    name: "menu_items.name",
    price: "menu_items.price",
  };

  const sortColumn = sortColumns[sort] || "menu_items.id";
  const sortOrder = order?.toLowerCase() === "desc" ? "DESC" : "ASC";

  // Puslapiavimo reikšmes perduodame kaip SQL parametrus
  values.push(Number(limit));
  const limitParameter = `$${values.length}`;

  values.push(Number(offset));
  const offsetParameter = `$${values.length}`;

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

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
    ${whereClause}
    ORDER BY ${sortColumn} ${sortOrder}
    LIMIT ${limitParameter}
    OFFSET ${offsetParameter}`,
    values,
  );

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

  // Jei PostgreSQL nerado įrašo, grąžiname null
  if (result.rows.length === 0) {
    return null;
  }

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

  // Jei PostgreSQL neatnaujino nė vieno įrašo, grąžiname null
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Pašaliname meniu elementą pagal ID
export const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM menu_items WHERE id = $1 RETURNING *",
    [id],
  );

  // Jei PostgreSQL nepašalino nė vieno įrašo, grąžiname null
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};
