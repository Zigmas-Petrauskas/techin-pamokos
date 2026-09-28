// Importuojame Express ir routerius
import config from "./core/config.js";
import express from "express";
import categoriesRouter from "./presentation/routes/categories.js";
import healthRouter from "./presentation/routes/health.js";
import menusRouter from "./presentation/routes/menus.js";
import restaurantsRouter from "./presentation/routes/restaurants.js";

// Gauname aplikacijos nustatymus iš bendros konfigūracijos
const { port, host } = config.app;
const { environment } = config;

// Sukuriame Express aplikaciją
const app = express();

// Leidžiame Express nuskaityti JSON duomenis iš req.body
app.use(express.json());

// Registruojame gaunamos užklausos HTTP metodą ir kelią
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

// Middleware taikome visai aplikacijai
app.use(requestLogger);

// Prijungiame routerius
app.use("/health", healthRouter);
app.use("/menu", menusRouter);
app.use("/restaurant", restaurantsRouter);
app.use("/categories", categoriesRouter);

// Paleidžiame serverį
app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
  console.log(`Environment: ${environment}`);
});
