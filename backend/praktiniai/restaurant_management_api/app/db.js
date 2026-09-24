import { Pool } from "pg";
import config from "./config.js";

// Gauname PostgreSQL nustatymus iš bendros konfigūracijos
const { host, port, database, user, password } = config.db;

// Sukuriame bendrą PostgreSQL prisijungimų pool
const pool = new Pool({
  host,
  port,
  database,
  user,
  password,
});

// Apdorojame netikėtas PostgreSQL prisijungimų pool klaidas
pool.on("error", (err) => {
  console.error("Netikėta PostgreSQL pool klaida:", err);
});

// Eksportuojame pool, kad galėtume jį naudoti kituose failuose
export default pool;
