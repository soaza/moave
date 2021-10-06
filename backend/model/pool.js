const Pool = require("pg").Pool;

const pool = new Pool({
  database: "moave",
  port: 5432,
});

module.exports = {
  pool,
};
