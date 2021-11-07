const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const accountSignUp = async (request, response, pool) => {
  const body = request.body;
  const username = body.username;
  const password = body.password;

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create token
  const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });

  const query = `INSERT INTO Users VALUES (DEFAULT,$1,$2,$3)`;

  pool.query(query, [hashedPassword, username, token], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      const queryUserId = `SELECT user_id,token FROM Users WHERE username = $1`;

      pool.query(queryUserId, [username], (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).json({
            success: false,
          });
        } else {
          response.status(200).json({
            success: true,
            user_id: results.rows[0].user_id,
            token: results.rows[0].token,
          });
        }
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
        // Create token
        const token = await jwt.sign(
          { username: username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        const updateTokenQuery = `UPDATE Users SET TOKEN = $1 WHERE username = $2`;
        pool.query(updateTokenQuery, [token, username], (error, results) => {
          if (error) {
            console.log(error);
            response.status(500).json({
              Error: "Unable to set TOKEN",
            });
          }
        });
        response.status(200).json({
          user_id: results.rows[0].user_id,
          username: results.rows[0].username,
          token: results.rows[0].token,
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
  const username = body.username;
  const oldPassword = body.oldPassword;
  const newPassword = body.newPassword;

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  const query = `SELECT * FROM Users WHERE username = $1`;

  pool.query(query, [username], async (error, results) => {
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
        const query = "UPDATE USERS SET PASSWORD = $1 WHERE username = $2";
        pool.query(
          query,
          [hashedNewPassword, username],
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
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        data: {
          user_id: results.rows[0].user_id,
          username: results.rows[0].username,
        },
      });
    }
  });
};

const getUserInfoByUsername = async (request, response, pool) => {
  const { username } = request.params;
  console.log(username);
  const query = `SELECT * FROM Users WHERE username = $1`;
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
      });
    }
  });
};

const matchUserInfoByUsername = async (request, response, pool) => {
  const params = request.query;
  const { username } = params;
  const query = `SELECT user_id,username FROM Users WHERE username LIKE '${username}%'`;
  pool.query(query, async (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({ data: results.rows });
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

const unfollowAccount = async (request, response, pool) => {
  // info is for the person u are tryna follow
  const body = request.body;
  const followerId = body.followerId;
  const followingId = body.followingId;

  const query = `DELETE FROM follows WHERE follower_id = $1 and following_id = $2`;
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
  const query = `SELECT user_id, username
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
        data: results.rows,
        success: true,
        size: results.rows.length,
      });
    }
  });
};

const getFollowing = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT user_id, username
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
        data: results.rows,
        success: true,
        size: results.rows.length,
      });
    }
  });
};

const checkFollowing = async (request, response, pool) => {
  const { follower_id, following_id } = request.query;

  const query = `
      SELECT *
      FROM Follows 
      WHERE follower_id = $1
      AND following_id = $2
  `;
  pool.query(query, [follower_id, following_id], async (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        following: results.rows[0] ? true : false,
        success: true,
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
  followAccount,
  unfollowAccount,
  getFollowers,
  getFollowing,
  matchUserInfoByUsername,
  checkFollowing,
};
