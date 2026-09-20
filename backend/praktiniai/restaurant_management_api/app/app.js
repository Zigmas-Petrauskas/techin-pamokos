// Importuojame Express ir meniu duomenis
import express from "express";
import { menuItems } from "./data.js";

// Sukuriame Express aplikaciją
const app = express();

// Leidžiame Express nuskaityti JSON duomenis iš req.body
app.use(express.json());

// Patikriname, ar serveris veikia
app.get("/health", (req, res) => {
  res.send("OK");
});

// Gauname visus meniu elementus
app.get("/menu", (req, res) => {
  res.json(menuItems);
});

// Gauname visus meniu elementus
app.get("/menu/:id", (req, res) => {
  // ID iš URL gaunamas kaip string, todėl paverčiame jį skaičiumi
  const id = Number(req.params.id);

  // Masyve ieškome elemento su tokiu ID
  const menuItem = menuItems.find((item) => item.id === id);

  // Jei elemento nėra, grąžiname 404 klaidą
  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.json(menuItem);
});

// Sukuriame naują meniu elementą
app.post("/menu", (req, res) => {
  const newItem = {
    // Naujas ID yra vienetu didesnis už paskutinio elemento ID
    id: menuItems[menuItems.length - 1].id + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    available: req.body.available,
  };

  // Pridedame naują elementą į masyvą
  menuItems.push(newItem);

  // 201 reiškia, kad naujas resursas sėkmingai sukurtas
  res.status(201).json(newItem);
});

// Atnaujiname meniu elementą pagal ID
app.put("/menu/:id", (req, res) => {
  const id = Number(req.params.id);

  const menuItem = menuItems.find((item) => item.id === id);

  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  // Pakeičiame esamo elemento duomenis duomenimis iš req.body
  menuItem.name = req.body.name;
  menuItem.category = req.body.category;
  menuItem.price = req.body.price;
  menuItem.available = req.body.available;

  res.json(menuItem);
});

// Pašaliname meniu elementą pagal ID
app.delete("/menu/:id", (req, res) => {
  const id = Number(req.params.id);

  // Randame elemento indeksą masyve
  const menuItemIndex = menuItems.findIndex((item) => item.id === id);

  // findIndex grąžina -1, jei elementas nerastas
  if (menuItemIndex === -1) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  // Pašaliname vieną elementą ir išsaugome pašalintą objektą
  const deletedItem = menuItems.splice(menuItemIndex, 1)[0];

  res.json(deletedItem);
});

// Paleidžiame serverį 3000 prievadu
app.listen(3000, () => {
  console.log("serveris veikia http://localhost:3000");
});
