const { Pool } = require("pg");
const { DATABASE_URL } = require("../config");

const pool = new Pool({ DATABASE_URL });
module.exports = {
  query: (text, params) => pool.query(text, params),
};
