const Pool = require("pg").Pool;

// Local
// const pool = new Pool({
//   database: "moave",
//   port: 5432,
// });

// Production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  pool,
};
