const addEvent = async (request, response, pool) => {
  const body = request.body;
  const movie_id = body.movie_id;
  const user_id = body.user_id;
  const event_date = new Date();
  const event_type = body.event_type;
  const activity_type = body.activity_type;

  const query = `INSERT INTO EventLog VALUES (DEFAULT, $1,$2,$3,$4,$5)`;
  pool.query(
    query,
    [event_date, user_id, movie_id, event_type, activity_type],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).json({
          success: false,
        });
      } else {
        response.status(200).json({
          success: `Added new Event to EventLog.`,
        });
      }
    }
  );
};

const getEventsByUserId = async (request, response, pool) => {
  const { user_id } = request.params;

  const query = `SELECT * FROM EventLog WHERE user_id = $1 ORDER BY event_date DESC`;
  pool.query(query, [user_id], async (error, results) => {
    if (error || !results.rows[0]) {
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
};

const getFriendEventsByUserId = async (request, response, pool) => {
  const { user_id } = request.params;

  const query = `SELECT * FROM EventLog WHERE EXISTS (
                        SELECT follower_id 
                        FROM Follows
                        WHERE Follows.follower_id = $1
                        AND EventLog.user_id = Follows.following_id 
                    ) LIMIT 50`;
  pool.query(query, [user_id], async (error, results) => {
    if (error || !results.rows[0]) {
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
  addEvent,
  getEventsByUserId,
  getFriendEventsByUserId,
};
