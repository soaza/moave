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
  const body = request.body;
  const username = body.username;
  const password = body.password;

  const query = `SELECT * FROM Users WHERE username = $1`;

  pool.query(query, [username], async (error, results) => {
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
          user_id: results.rows[0].user_id,
          username: results.rows[0].username,
          email: results.rows[0].email,
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

const changePassword = async (request, response, pool) => {
  const body = request.body;
  const email = body.email;
  const oldPassword = body.oldPassword;
  const newPassword = body.newPassword;
  console.log(email);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  const query = `SELECT * FROM Users WHERE email = $1`;

  pool.query(query, [email], async (error, results) => {
    if (error || !results.rows[0] || oldPassword == newPassword) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      // get stored password
      const hashedPassword = results.rows[0].password;
      const validPassword = await bcrypt.compare(oldPassword, hashedPassword);

      if (validPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        const query = "UPDATE USERS SET PASSWORD = $1 WHERE email = $2";
        pool.query(
          query,
          [hashedNewPassword, email],
          async (error, results) => {
            response.status(200).json({
              success: "Password Successfully Changed.",
            });
          }
        );
      } else {
        response.status(500).json({
          success: false,
        });
      }
    }
  });
};

const getUserInfoById = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT * FROM Users WHERE user_id = $1`;
  pool.query(query, [user_id], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        user_id: results.rows[0].user_id,
        username: results.rows[0].username,
        email: results.rows[0].email,
      });
    }
  });
};

const getUserInfoByUsername = async (request, response, pool) => {
  const { username } = request.params;
  const query = `SELECT * FROM Users WHERE username like '$1%'`;
  pool.query(query, [username], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        user_id: results.rows[0].user_id,
        username: results.rows[0].username,
        email: results.rows[0].email,
      });
    }
  });
};

const getUserInfoByEmail = async (request, response, pool) => {
  const { email } = request.params;
  const query = `SELECT * FROM Users WHERE email = $1`;
  pool.query(query, [email], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        user_id: results.rows[0].user_id,
        username: results.rows[0].username,
        email: results.rows[0].email,
      });
    }
  });
};

const followAccount = async (request, response, pool) => {
  // info is for the person u are tryna follow
  const body = request.body;
  const followerId = body.followerId;
  const followingId = body.followingId;

  const query = `INSERT INTO Follows VALUES ($1,$2)`;
  pool.query(query, [followerId, followingId], (error, results) => {
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

const getFollowers = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT user_id, email, username
  FROM Users
  WHERE EXISTS (
      SELECT 1
      FROM Follows
      WHERE following_id = $1
      AND Users.user_id = Follows.follower_id
  )`;
  pool.query(query, [user_id], async (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        Followers: results.rows,
      });
    }
  });
};

const getFollowing = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT user_id, email, username
  FROM Users
  WHERE EXISTS (
      SELECT 1
      FROM Follows
      WHERE follower_id = $1
      AND Users.user_id = Follows.following_id
  )`;
  pool.query(query, [user_id], async (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        Following: results.rows,
      });
    }
  });
};

module.exports = {
  accountSignUp,
  accountLogin,
  changePassword,
  getUserInfoById,
  getUserInfoByUsername,
  getUserInfoByEmail,
  followAccount,
  getFollowers,
  getFollowing,
};
