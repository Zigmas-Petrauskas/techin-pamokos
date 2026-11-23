import express from "express";

// Sukuriame autentifikavimo routerį ir controller gauname per DI
export const createAuthenticationRouter = (authenticationController) => {
  const router = express.Router();

  // Prisijungimo duomenis validuoja authentication controller
  router.post("/login", authenticationController.login);

  return router;
};
