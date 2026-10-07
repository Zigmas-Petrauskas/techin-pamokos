import express from "express";

import { validateUserBody } from "../schemas/users.js";

// Sukuriame autentifikavimo routerį ir controller gauname per DI
export const createAuthenticationRouter = (authenticationController) => {
  const router = express.Router();

  // Prisijungimo request duomenis validuojame pagal esamą AJV schemą
  router.post("/login", (req, res, next) => {
    if (!validateUserBody(req.body)) {
      const error = new Error(validateUserBody.errors[0].message);
      error.status = 400;

      return next(error);
    }

    return authenticationController.login(req, res, next);
  });

  return router;
};
