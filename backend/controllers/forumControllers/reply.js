

const createReply = async (request, response, pool) => {
    const body = request.body;
    const thread_id = body.thread_id;
    const created_date = new Date;
    const author_id = body.author_id;
    const description = body.description;
   
    const query = `INSERT INTO Replies VALUES (DEFAULT, $1,$2,$3,$4)`;
    pool.query(query, [thread_id, created_date, author_id, description], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({
            Error: "Unable to reply",
            });
        } else {
            response.status(200).json({
            Success: `Reply successfully posted.`,
            });
        }
    });
};

const deleteReply = async (request, response, pool) => {
    const body = request.body;
    const thread_id = body.thread_id;
    const reply_id = body.reply_id;
    const deleter_id = body.deleter_id;

    // check if you are reply poster or thread poster
    const checker = `SELECT * FROM Threads WHERE thread_id = $1 and author_id = $2`;
    pool.query(checker, [thread_id, deleter_id], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({
                Error: "Unable to delete reply.",
            });
        } else { // THERE IS NO ERROR
            // Deleter is not author of thread
            if (!results.rows[0]) {
                // Check if deleter is author of reply
                const query = `SELECT * FROM Replies WHERE reply_id = $1 AND author_id = $2`;
                pool.query(query, [reply_id, deleter_id], (error, results) => {
                    if (error) {
                        console.log(error);
                        response.status(500).json({
                            Error: "Unable to delete reply.",
                        });
                    } else {
                        if (!results.rows[0]) {
                            //Deleter is not author of reply
                            response.status(500).json({
                                Error: "You are neither the Thread Owner or Reply Owner.",
                            });
                        } else {
                            const query = `DELETE FROM Replies WHERE reply_id = $1`;
                            pool.query(query, [reply_id], (error, results) => {
                                if (error) {
                                    console.log(error);
                                    response.status(500).json({
                                        Error: "Unable to delete Reply",
                                    });
                                } else {
                                    response.status(200).json({
                                    Success: `Reply successfully deleted!`,
                                    });
                                }
                            });
                        } 
                    }
                });
            } else {
                // Delete Reply
                const query = `DELETE FROM Replies WHERE reply_id = $1`;
                pool.query(query, [reply_id], (error, results) => {
                    if (error) {
                        console.log(error);
                        response.status(500).json({
                            Error: "Unable to delete Reply",
                        });
                    } else {
                        response.status(200).json({
                        Success: `Reply successfully deleted!`,
                        });
                    }
                });
            }
        }
    });
};

const getRepliesInThread = async (request, response, pool) => {
    const {thread_id} = request.params;
    // Check if the user is in the group
    const query = `SELECT * FROM Replies WHERE thread_id = $1`;
    pool.query(query, [thread_id], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({
                Error: "Unable to retrieve Replies",
            });
        } else {
            response.status(200).json({
                data: results.rows,
            });
        }
    });
};





module.exports = {
    createReply,
    deleteReply,
    getRepliesInThread
};