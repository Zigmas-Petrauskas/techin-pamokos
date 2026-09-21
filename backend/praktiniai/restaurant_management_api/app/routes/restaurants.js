// Importuojame Express ir restorano duomenis
import express from "express";
import { restaurantName, city, isOpen } from "../restaurant.js";

// Sukuriame restorano maršrutų routerį
const router = express.Router();

// Gauname restorano informaciją
router.get("/", (req, res) => {
  res.json({
    restaurantName,
    city,
    isOpen,
  });
});

// Eksportuojame routerį
export default router;
