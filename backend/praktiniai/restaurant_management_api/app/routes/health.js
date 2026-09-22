import express from "express";
import pool from "../db.js";

const router = express.Router();

// Patikriname, ar Express aplikacija veikia
router.get("/live", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Patikriname, ar aplikacija gali prisijungti prie PostgreSQL
router.get("/ready", async (req, res) => {
  try {
    // Atliekame paprastą užklausą PostgreSQL ryšiui patikrinti
    await pool.query("SELECT 1");

    res.status(200).json({ status: "ready" });
  } catch {
    // Jei prisijungti prie PostgreSQL nepavyksta
    res.status(503).json({ status: "not_ready" });
  }
});

export default router;
