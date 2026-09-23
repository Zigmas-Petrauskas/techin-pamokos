import express from "express";
import pool from "../db.js";

// Sukuriame kategorijų routerį
const router = express.Router();

// Gauname visas kategorijas iš duomenų bazės
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM categories");

  res.json(result.rows);
});

// Gauname vieną kategoriją pagal ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Ieškome kategorijos pagal jos ID
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);

  // Jei kategorija nerasta, grąžiname 404
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Grąžiname rastą kategoriją
  res.json(result.rows[0]);
});

// Sukuriame naują kategoriją į duomenų bazę
router.post("/", async (req, res) => {
  const { name } = req.body;

  // Įrašome naują kategoriją į duomenų bazę
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name],
  );

  // Grąžiname sukurtą kategoriją
  res.status(201).json(result.rows[0]);
});

// Atnaujiname kategoriją pagal ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Atnaujiname kategorijos pavadinimą duomenų bazėje
  const result = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id],
  );

  // Jei kategorija nerasta, grąžiname 404
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Grąžiname atnaujintą kategoriją
  res.json(result.rows[0]);
});

// Pašaliname kategoriją pagal ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Pašaliname kategoriją iš duomenų bazės
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id],
  );

  // Jei kategorija nerasta, grąžiname 404
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Grąžiname pašalintą kategoriją
  res.json(result.rows[0]);
});

export default router;
