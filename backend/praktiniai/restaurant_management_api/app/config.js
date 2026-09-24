import dotenv from "dotenv";

// Nustatome dabartinę aplikacijos aplinką
const environment = process.env.NODE_ENV || "development";

// Užkrauname pasirinktos aplinkos .env failą
dotenv.config({
  path: `.env.${environment}`,
});

// Sukuriame bendrą aplikacijos konfigūraciją
const config = {
  environment,
  app: {
    port: Number(process.env.PORT),
    host: process.env.HOST,
  },
  db: {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
};

export default config;
