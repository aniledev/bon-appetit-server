require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl =
  process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

const db = require("./db");

const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Bon Appetit Server listening at http://localhost:${PORT}`);
});
