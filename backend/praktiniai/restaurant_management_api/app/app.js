// Importuojame Express, cookie parser ir aplikacijos konfigūraciją
import express from "express";
import cookieParser from "cookie-parser";

import config from "./core/config.js";

// Importuojame vartotojų repository autentifikavimo DI
import * as usersRepository from "./infrastructure/database/repositories/users.js";

// Importuojame autentifikavimo komponentų factory funkcijas
import { createAuthenticationService } from "./application/services/authentication.js";
import { createAuthenticationController } from "./presentation/controllers/authentication.js";
import { createAuthenticate } from "./presentation/middleware/authenticate.js";
import { createAuthenticationRouter } from "./presentation/routes/authentication.js";

// Importuojame esamus routerius
import categoriesRouter from "./presentation/routes/categories.js";
import healthRouter from "./presentation/routes/health.js";
import restaurantsRouter from "./presentation/routes/restaurants.js";

// Pakeista: menu ir users routeriai kuriami per factory funkcijas,
// nes jiems perduodame authenticate middleware per DI.
import { createMenusRouter } from "./presentation/routes/menus.js";
import { createUsersRouter } from "./presentation/routes/users.js";

// Gauname aplikacijos nustatymus iš bendros konfigūracijos
const { port, host } = config.app;
const { environment } = config;

// Sukuriame Express aplikaciją
const app = express();

// Leidžiame Express nuskaityti JSON duomenis iš req.body
app.use(express.json());

// Pridėta: leidžiame Express nuskaityti cookie,
// nes authenticate middleware tokeną gauna iš req.cookies.token.
app.use(cookieParser());

// Registruojame gaunamos užklausos HTTP metodą ir kelią
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

// Middleware taikome visai aplikacijai
app.use(requestLogger);

// Pridėta: sujungiame autentifikavimo priklausomybes per DI.
// Repository perduodame authentication service.
const authenticationService = createAuthenticationService(usersRepository);

// Authentication service perduodame controller.
const authenticationController = createAuthenticationController(
  authenticationService,
);

// Authentication service perduodame authenticate middleware.
const authenticate = createAuthenticate(authenticationService);

// Authentication controller perduodame autentifikavimo routeriui.
const authenticationRouter = createAuthenticationRouter(
  authenticationController,
);

// Pakeista: authenticate middleware perduodame vartotojų routeriui,
// nes vartotojų duomenis keičiančios operacijos turi būti apsaugotos.
const usersRouter = createUsersRouter(authenticate);

// Pakeista: authenticate middleware perduodame meniu routeriui,
// nes POST, PUT ir DELETE meniu operacijos turi būti apsaugotos.
const menusRouter = createMenusRouter(authenticate);

// Prijungiame viešus routerius
app.use("/health", healthRouter);
app.use("/restaurant", restaurantsRouter);

// Pridėta: prisijungimo endpointas lieka viešas.
app.use("/api/v1/auth", authenticationRouter);

// Prijungiame API routerius
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/menu", menusRouter);
app.use("/api/v1/categories", categoriesRouter);

// Centralizuotai apdorojame aplikacijos klaidas
app.use((err, req, res, next) => {
  void next;

  return res.status(err.status || 500).json({
    error: err.message,
  });
});

// Paleidžiame serverį
app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
  console.log(`Environment: ${environment}`);
});
