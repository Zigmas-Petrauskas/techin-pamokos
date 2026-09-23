import express from "express";
import pool from "../db.js";

const router = express.Router();

// Gauname visus meniu elementus kartu su jų kategorijomis
router.get("/", async (req, res) => {
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

  res.json(result.rows);
});

// Gauname vieną meniu elementą pagal ID kartu su jo kategorija
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Ieškome meniu elemento ir gauname jo kategorijos pavadinimą
  const result = await pool.query(
    `SELECT
      menu_items.id,
      menu_items.name,
      menu_items.price,
      menu_items.available,
      menu_items.category_id,
      categories.name AS category_name
    FROM menu_items
    JOIN categories ON menu_items.category_id = categories.id
    WHERE menu_items.id = $1`,
    [id],
  );

  // Jei meniu elementas nerastas, grąžiname 404
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  // Grąžiname rastą meniu elementą
  res.json(result.rows[0]);
});

// Sukuriame naują meniu elementą
router.post("/", async (req, res) => {
  const { name, categoryId, price, available } = req.body;

  // Įrašome naują meniu elementą į duomenų bazę
  const result = await pool.query(
    `INSERT INTO menu_items (name, category_id, price, available)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, categoryId, price, available],
  );

  // Grąžiname sukurtą meniu elementą
  res.status(201).json(result.rows[0]);
});

// Atnaujiname meniu elementą pagal ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, price, available } = req.body;

  // Atnaujiname meniu elemento duomenis ir jo kategoriją
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

  // Jei meniu elementas nerastas, grąžiname 404
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  // Grąžiname atnaujintą meniu elementą
  res.json(result.rows[0]);
});

// Pašaliname meniu elementą pagal ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Pašaliname meniu elementą iš duomenų bazės
  const result = await pool.query(
    "DELETE FROM menu_items WHERE id = $1 RETURNING *",
    [id],
  );

  // Jei meniu elementas nerastas, grąžiname 404
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  // Grąžiname pašalintą meniu elementą
  res.json(result.rows[0]);
});

export default router;
