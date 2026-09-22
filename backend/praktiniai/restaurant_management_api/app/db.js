import { Pool } from "pg";

// Sukuriame bendrą PostgreSQL prisijungimų pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

// Apdorojame netikėtas PostgreSQL prisijungimų pool klaidas
pool.on("error", (err) => {
  console.error("Netikėta PostgreSQL pool klaida:", err);
});

// Eksportuojame pool, kad galėtume jį naudoti kituose failuose
export default pool;
