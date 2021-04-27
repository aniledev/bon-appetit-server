const { Pool } = require("pg");
const connectionString =
  "postgres://ljqigomdponytb:28ab70fda30ef7c7ab1f41492aedd1f88f7ab4f21b008b13acbd6122ca74923f@ec2-52-1-115-6.compute-1.amazonaws.com:5432/dcpl4todj3b45f";

const pool = new Pool({ connectionString });
module.exports = {
  query: (text, params) => pool.query(text, params),
};
