const { Pool } = require("pg");

const pool = new Pool({
  user: "elinamcgill",
  host: "localhost",
  database: "bon-appetit",
  //   password: "secretpassword",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
