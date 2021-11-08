const Pool = require("pg").Pool;

const pool = new Pool({
  database: "jaychen",
  port: 5432,
});

module.exports = {
  pool,
};
