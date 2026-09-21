import express from "express";
import { menuItems } from "../data.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(menuItems);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const menuItem = menuItems.find((item) => item.id === id);

  if (!menuItem) {
    res.status(400).json({ message: "Menu item not find" });
  }

  res.json(menuItem);
});

router.post("/", (req, res) => {
  const newItem = {
    id: menuItems[menuItems.length - 1].id + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    available: req.body.available,
  };

  menuItems.push(newItem);

  res.status(201).json(newItem);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const menuItem = menuItems.find((item) => item.id === id);

  if (!menuItem) {
    res.status(404).json({ message: "Menu item not found" });
  }

  menuItem.name = req.body.name;
  menuItem.category = req.body.category;
  menuItem.price = req.body.price;
  menuItem.available = req.body.available;

  res.json(menuItem);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const menuItemIndex = menuItems.findIndex((item) => item.id === id);

  if (menuItemIndex === -1) {
    res.status(404).json({ message: "Menu item not found" });
  }

  const deletedItem = menuItems.splice(menuItemIndex, 1)[0];

  res.json(deletedItem);
});

export default router;
