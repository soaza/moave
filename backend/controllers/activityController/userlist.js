const { getUserInfoById } = require("../userController/account");

const addUserList = async (request, response, pool) => {
    const body = request.body;
    const list_name = body.list_name;
    const user_id = body.user_id;
    
  
    const query = `INSERT INTO UserLists VALUES (DEFAULT, $1,$2)`;
    pool.query(query, [user_id, list_name], (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).json({
          success: false,
        });
      } else {
        response.status(200).json({
          success: `User:${user_id} created a new List: ${list_name}.`,
        });
      }
    });
};

const deleteUserList = async (request, response, pool) => {
    const { list_id } = request.params;
  
    const query = `DELETE FROM UserLists WHERE list_id = $1`;
    pool.query(query, [list_id], async (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).json({
            success: false,
          });
        } else {
          response.status(200).json({
            success: `List:${list_id} deleted.`,
          });
        }
    });
};

const addMovieToUserList = async (request, response, pool) => {
    const body = request.body;
    const list_id = body.list_id;
    const movie_id = body.movie_id;
    const user_id = body.user_id;

    const check = 'SELECT * FROM UserLists WHERE list_id = $1 AND user_id = $2'
    pool.query(check, [list_id, user_id], (error, results) => {
        if (error || !results.rows[0]) {
          console.log(error);
          response.status(500).json({
            Error: `User: ${user_id} does not own List: ${list_id}`,
          });
        } else {
            const query = `INSERT INTO UserListEntries VALUES ($1,$2)`;
            pool.query(query, [list_id, movie_id], (error, results) => {
            if (error) {
                console.log(error);
                response.status(500).json({
                success: false,
                });
            } else {
                response.status(200).json({
                success: `Movie:${movie_id} added to List: ${list_id}.`,
                });
            }
            });
        }
    });
};

const getMoviesFromUserList = async (request, response, pool) => {
    const { list_id } = request.params;
  
    const query = `SELECT movie_id FROM UserListEntries WHERE list_id = $1`;
    pool.query(query, [list_id], async (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).json({
            success: false,
          });
        } else {
          response.status(200).json({
            data: results.rows,
          });
        }
    });
};

const deleteMovieFromUserList = async (request, response, pool) => {
    const body = request.body;
    const list_id = body.list_id;
    const movie_id = body.movie_id;
    const user_id = body.user_id;

    const check = 'SELECT * FROM UserLists WHERE list_id = $1 AND user_id = $2'
    pool.query(check, [list_id, user_id], (error, results) => {
        if (error || !results.rows[0]) {
          console.log(error);
          response.status(500).json({
            Error: `User: ${user_id} does not own List: ${list_id}`,
          });
        } else {
            const query = `DELETE FROM UserListEntries WHERE list_id = $1 AND movie_id = $2`;
            pool.query(query, [list_id, movie_id], (error, results) => {
            if (error) {
                console.log(error);
                response.status(500).json({
                success: false,
                });
            } else {
                response.status(200).json({
                success: `Movie:${movie_id} removed from List: ${list_id}.`,
                });
            }
            });
        }
    });
};

const getUserLists = async (request, response, pool) => {
    const { user_id } = request.params;
  
    const query = `SELECT * FROM UserLists WHERE user_id = $1`;
    pool.query(query, [user_id], async (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).json({
            success: false,
          });
        } else {
          response.status(200).json({
            data: results.rows,
          });
        }
    });
};


module.exports = {
    addUserList,
    deleteUserList,
    addMovieToUserList,
    getMoviesFromUserList,
    deleteMovieFromUserList,
    getUserLists
};