const bcrypt = require("bcrypt");

const accountSignUp = async (request, response, pool) => {
  const body = request.body;
  const username = body.username;
  const password = body.password;
  const email = body.email;

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO Users VALUES (DEFAULT,$1,$2,$3)`;

  pool.query(query, [email, hashedPassword, username], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: true,
      });
    }
  });
};

const accountLogin = async (request, response, pool) => {
  const params = request.query;
  const email = params.email;
  const password = params.password;

  const query = `SELECT password FROM Users WHERE email = $1`;

  pool.query(query, [email], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      const hashedPassword = results.rows[0].password;
      const validPassword = await bcrypt.compare(password, hashedPassword);

      if (validPassword) {
        response.status(200).json({
          success: true,
        });
      } else {
        response.status(500).json({
          success: false,
        });
      }
    }
  });
};

module.exports = {
  accountSignUp,
  accountLogin,
};
