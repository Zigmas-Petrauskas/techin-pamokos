import express from "express";

import {
  createMenuItem,
  deleteMenuItem,
  getMenuItemById,
  getMenuItems,
  updateMenuItem,
} from "../controllers/menus.js";

// Pakeista: authenticate middleware gauname per DI,
// nes routeris pats neturi kurti autentifikavimo priklausomybės.
export const createMenusRouter = (authenticate) => {
  const router = express.Router();

  // GET endpointai lieka vieši pagal užduoties reikalavimą.
  router.get("/", getMenuItems);
  router.get("/:id", getMenuItemById);

  // Pakeista: meniu duomenis keičiančios operacijos apsaugomos
  // authenticate middleware ir pasiekiamos tik prisijungusiam vartotojui.
  router.post("/", authenticate, createMenuItem);
  router.put("/:id", authenticate, updateMenuItem);
  router.delete("/:id", authenticate, deleteMenuItem);

  return router;
};
