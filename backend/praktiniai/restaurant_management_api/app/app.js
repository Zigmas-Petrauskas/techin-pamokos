// Importuojame Express ir routerius
import "dotenv/config";
import express from "express";
import menusRouter from "./routes/menus.js";
import restaurantsRouter from "./routes/restaurants.js";

const port = Number(process.env.PORT);
const host = process.env.HOST;
const nodeEnv = process.env.NODE_ENV;

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
app.use("/menu", menusRouter);
app.use("/restaurant", restaurantsRouter);

// Patikriname, ar serveris veikia
app.get("/health", (req, res) => {
  res.send("OK");
});

// Paleidžiame serverį 3000 prievadu
app.listen(port, () => {
  console.log(` Server running on http:// ${host}:${port}`);
  console.log(`Enviroment: ${nodeEnv}`);
});
