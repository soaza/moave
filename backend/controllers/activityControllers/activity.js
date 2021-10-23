const addMovieToWatchlist = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;

  const query = `INSERT INTO ActivityList VALUES ($1,$2,$3)`;
  pool.query(query, [user_id, movie_id, "WATCHLIST"], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: `Added Movie:${movie_id} to Watchlist.`,
      });
    }
  });
};

const addMovieToCompleted = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;

  const query = `INSERT INTO ActivityList VALUES ($1,$2,$3)`;
  pool.query(query, [user_id, movie_id, "COMPLETED"], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: `Added Movie:${movie_id} to Completed.`,
      });
    }
  });
};

const addMovieToCurrentlyWatching = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;

  const query = `INSERT INTO ActivityList VALUES ($1,$2,$3)`;
  pool.query(query, [user_id, movie_id, "CURRENT"], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: `Added Movie:${movie_id} to Currently Watching.`,
      });
    }
  });
};

const updateMovieToCompleted = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;

  const query = `UPDATE ActivityList SET activity_type = $3 WHERE user_id = $1 AND movie_id = $2`;
  pool.query(query, [user_id, movie_id, "COMPLETED"], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: `Movie:${movie_id} updated to Completed for User:${user_id}.`,
      });
    }
  });
};

const updateMovieToWatchlist = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;

  const query = `UPDATE ActivityList SET activity_type = $3 WHERE user_id = $1 AND movie_id = $2`;
  pool.query(query, [user_id, movie_id, "WATCHLIST"], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: `Movie:${movie_id} updated to Completed for User:${user_id}.`,
      });
    }
  });
};

const updateMovieToCurrentlyWatching = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;

  const query = `UPDATE ActivityList SET activity_type = $3 WHERE user_id = $1 AND movie_id = $2`;
  pool.query(query, [user_id, movie_id, "CURRENT"], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        success: `Movie:${movie_id} updated to Completed for User:${user_id}.`,
      });
    }
  });
};

const dropMovie = async (request, response, pool) => {
  const body = request.body;
  const user_id = body.user_id;
  const movie_id = body.movie_id;

  const query = `DELETE FROM ActivityList WHERE user_id = $1 AND movie_id = $2`;
  pool.query(query, [user_id, movie_id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        Error: "Cannot drop movie idk why LOL",
      });
    } else {
      response.status(200).json({
        Success: `Movie:${movie_id} dropped for User:${user_id}`,
      });
    }
  });
};

const getCompleted = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT * FROM ActivityList WHERE user_id = $1 AND activity_type = $2`;
  pool.query(query, [user_id, "COMPLETED"], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        data: results.rows,
        size: results.rows.length,
      });
    }
  });
};

const getWatchlist = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT * FROM ActivityList WHERE user_id = $1 AND activity_type = $2`;
  pool.query(query, [user_id, "WATCHLIST"], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        data: results.rows,
        size: results.rows.length,
      });
    }
  });
};

const getCurrentlyWatching = async (request, response, pool) => {
  const { user_id } = request.params;
  const query = `SELECT * FROM ActivityList WHERE user_id = $1 AND activity_type = $2`;
  pool.query(query, [user_id, "CURRENT"], async (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      console.log(results.rows[0]);
      response.status(500).json({
        success: false,
      });
    } else {
      response.status(200).json({
        data: results.rows,
        size: results.rows.length,
      });
    }
  });
};

module.exports = {
  addMovieToWatchlist,
  addMovieToCompleted,
  addMovieToCurrentlyWatching,
  updateMovieToCompleted,
  updateMovieToWatchlist,
  updateMovieToCurrentlyWatching,
  dropMovie,
  getCompleted,
  getWatchlist,
  getCurrentlyWatching,
};
