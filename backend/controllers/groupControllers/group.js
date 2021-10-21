
const createGroup = async (request, response, pool) => {
    const body = request.body;
    const admin_id = body.admin_id;
    const groupName = body.groupName;
   
    const check = `SELECT * FROM Users where user_id = $1`;
    pool.query(check, [admin_id], (error, results) => {
      if (!results.rows[0] || error) {
        console.log(error);
        response.status(500).json({
          Error: "admin_id does not exist",
        });
      } else {
        const query = `INSERT INTO Groups VALUES (DEFAULT, $1,$2)`;
        pool.query(query, [groupName, admin_id], (error, results) => {
          if (error) {
            console.log(error);
            response.status(500).json({
              Error: "Group with the same name already exists",
            });
          } else {
            response.status(200).json({
              Success: `Group ${groupName} successfully created!`,
            });
          }
        });
      }
    });
  };


  const deleteGroup = async (request, response, pool) => {
    const body = request.body;
    const user_id = body.user_id;    // the person attempting to delete the group
    const group_id = body.group_id;  // the group that is about to get deleted
  
    const check = `SELECT * FROM Groups WHERE admin_id = $1 AND group_id = $2`;
    pool.query(check, [user_id, group_id], (error, results) => {
      if (!results.rows[0] || error) {
        console.log(error);
        response.status(500).json({
          Error: "Either group does not exist or you are not the admin!",
        });
      } else {
        const query = `DELETE FROM Groups WHERE group_id = $1`;
        pool.query(query, [group_id], (error, results) => {
          if (error) {
            console.log(error);
            response.status(500).json({
              Error: "Group cannot be deleted idk why LOL",
            });
          } else {
            response.status(200).json({
              Success: `Group successfully deleted!`,
            });
          }
        });
      }
    });
  };

  const joinGroup = async (request, response, pool) => {
    const body = request.body;
    const user_id = body.user_id;
    const group_id = body.group_id;
  
    const query = `INSERT INTO UserGroups VALUES ($1,$2)`;
    pool.query(query, [user_id, group_id], (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).json({
          success: false,
        });
      } else {
        response.status(200).json({
          Success: `Successfully joined group ${group_id}`,
        });
      }
    });
  };


  const getGroupById = async (request, response, pool) => {
    const { group_id } = request.params;
    const query = `SELECT * FROM Groups WHERE group_id = $1`;
    pool.query(query, [group_id], async (error, results) => {
      if (error || !results.rows[0]) {
        console.log(error);
        response.status(500).json({
          success: false,
        });
      } else {
        response.status(200).json({
          data: {
            group_id: results.rows[0].group_id,
            group_name: results.rows[0].group_name,
            admin_id: results.rows[0].admin_id,
          },
        });
      }
    });
  };


  const leaveGroup = async (request, response, pool) => {
    const body = request.body;
    const user_id = body.user_id;    // the person attempting to leave the group
    const group_id = body.group_id;  // the group that he is leaving
    
    // check if leaver is the admin of the group
    const check = `SELECT * FROM Groups WHERE admin_id = $1 AND group_id = $2`;
    pool.query(check, [user_id, group_id], (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).json({
          Error: "Error!",
        });
      }
      if (results.rows[0]) {
        response.status(500).json({
          Error: "You are the admin of the group, select a new admin before leaving!",
        });
      } else {
        // check if leaver is in the group he is leaving
        const groupMemberCheck = `SELECT * FROM UserGroups WHERE user_id = $1 AND group_id = $2`;
        pool.query(groupMemberCheck, [user_id, group_id], (error, results) => {
          if (!results.rows[0] || error) {
            console.log(error);
            response.status(500).json({
              Error: "Either group does not exist or you are not in the group!",
            });
          } else {
            const query = `DELETE FROM UserGroups WHERE user_id = $1 AND group_id = $2`;
            pool.query(query, [user_id, group_id], (error, results) => {
              if (error) {
                console.log(error);
                response.status(500).json({
                  Error: "You cant leave the group idk why LOL",
                });
              } else {
                response.status(200).json({
                  Success: `You have left group ${group_id}`,
                });
              }
            });
          }
        });
      }
    });
  };



module.exports = {
    createGroup,
    deleteGroup,
    joinGroup,
    leaveGroup,
    getGroupById
  };