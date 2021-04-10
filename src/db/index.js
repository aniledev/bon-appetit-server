const { Pool } = require("pg");
const { PORT, DATABASE_URL } = require("../config");
// const connectionString = the url of the deployed postres database on heroku

const pool = new Pool();
// Pool({conectionString})
module.exports = {
  query: (text, params) => pool.query(text, params),
};
