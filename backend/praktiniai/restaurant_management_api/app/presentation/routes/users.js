import express from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.js";

// Pakeista: authenticate middleware gauname per DI,
// kad routeris pats nekurtų ir neimportuotų autentifikavimo priklausomybės.
export const createUsersRouter = (authenticate) => {
  const router = express.Router();

  // Vartotojų peržiūros endpointai lieka be authenticate middleware.
  router.get("/", getUsers);
  router.get("/:id", getUserById);

  // Pakeista: vartotojų duomenis keičiančios operacijos
  // apsaugomos authenticate middleware pagal užduoties reikalavimą.
  router.post("/", authenticate, createUser);
  router.put("/:id", authenticate, updateUser);
  router.delete("/:id", authenticate, deleteUser);

  return router;
};
