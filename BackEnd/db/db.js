const { Pool } = require("pg");


const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "trust",
  database: "postgres"
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Connection error', err.stack));

module.exports = pool;
