const dotenv = require('dotenv');
dotenv.config();

const Pool = require("pg").Pool;
const db = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});

module.exports = db;
