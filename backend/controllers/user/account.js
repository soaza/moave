const bcrypt = require("bcrypt");

const accountSignUp = async (request, response, pool) => {
  const body = request.body;
  const username = body.username;
  const password = body.password;

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO database_user VALUES (DEFAULT,$1,$2)`;

  pool.query(query, [username, hashedPassword], (error, results) => {
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
  const username = params.username;
  const password = params.password;

  const query = `SELECT password FROM database_user WHERE username = $1`;

  pool.query(query, [username], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
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
