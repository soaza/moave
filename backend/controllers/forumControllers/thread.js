const createThread = async (request, response, pool) => {
  const body = request.body;
  const title = body.title;
  const created_date = new Date();
  const author_id = body.author_id;
  const group_id = body.group_id;
  const description = body.description;

  const query = `INSERT INTO Threads VALUES (DEFAULT, $1,$2,$3,$4,$5)`;
  pool.query(
    query,
    [title, created_date, author_id, group_id, description],
    (error, results) => {
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
    }
  );
};

const deleteThread = async (request, response, pool) => {
  const body = request.body;
  const thread_id = body.thread_id;
  const author_id = body.author_id;

  const checker = `SELECT * FROM Threads WHERE thread_id = $1 and author_id = $2`;
  pool.query(checker, [thread_id, author_id], (error, results) => {
    if (error || !results.rows[0]) {
      console.log(error);
      response.status(500).json({
        Error: "Either you are not the owner, or thread does not exist.",
      });
    } else {
      const query = `DELETE FROM Threads WHERE thread_id = $1`;
      pool.query(query, [thread_id], (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).json({
            Error: "Unable to delete Thread",
          });
        } else {
          response.status(200).json({
            Success: `Thread successfully deleted!`,
          });
        }
      });
    }
  });
};

const getThreadsInGroup = async (request, response, pool) => {
  const { group_id, user_id } = request.params;
  // Check if the user is in the group
  const checker = `Select * FROM UserGroups WHERE group_id = $1 AND user_id = $2`;
  pool.query(checker, [group_id, user_id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        Error: "Either you are not in the group, or there isnt such a group!",
      });
    } else {
      const query = `SELECT * FROM Threads NATURAL JOIN users WHERE group_id = $1 AND user_id = $2`;
      pool.query(query, [group_id, user_id], (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).json({
            success: false,
          });
        } else {
          response.status(200).json({
            data: results.rows,
            success: true,
          });
        }
      });
    }
  });
};

module.exports = {
  createThread,
  deleteThread,
  getThreadsInGroup,
};
