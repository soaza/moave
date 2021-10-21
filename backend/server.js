const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  var datetime = String(new Date()).slice(15, 24);
  console.log(
    datetime + " " + req.method + " " + req.url + " HTTP/" + req.httpVersion
  );
  console.log("-----------");
  next();
});

// Database
const database = require("./model/pool");

let pool = database.pool;

// Controllers
const accountController = require("./controllers/user/account");
const movieController = require("./controllers/movies");
const groupController = require("./controllers/groupControllers/group");
const activityController = require("./controllers/activityControllers/activity");

const port = 3001;
app.listen(port, () => {
  console.log(`app is running on port ${port} `);
});

// Account Management
app.post("/register", (req, res) => {
  accountController.accountSignUp(req, res, pool);
});
app.post("/login", (req, res) => {
  accountController.accountLogin(req, res, pool);
});
app.put("/changePassword", (req, res) => {
  accountController.changePassword(req, res, pool);
});

// Socials
app.post("/follow", (req, res) => {
  accountController.followAccount(req, res, pool);
});

app.post("/unfollow", (req, res) => {
  accountController.unfollowAccount(req, res, pool);
});

app.get("/followers/:user_id", (req, res) => {
  accountController.getFollowers(req, res, pool);
});

app.get("/following/:user_id", (req, res) => {
  accountController.getFollowing(req, res, pool);
});

app.get("/checkFollowing", (req, res) => {
  accountController.checkFollowing(req, res, pool);
});

// Search Users
app.get("/searchUserById/:user_id", (req, res) => {
  accountController.getUserInfoById(req, res, pool);
});

app.get("/searchUserByUsername/:username", (req, res) => {
  accountController.getUserInfoByUsername(req, res, pool);
});

app.get("/searchUserByEmail/:email", (req, res) => {
  accountController.getUserInfoByEmail(req, res, pool);
});

app.get("/getUsersByUsername", (req, res) => {
  accountController.matchUserInfoByUsername(req, res, pool);
});

// Movie Management
app.get("/get_movie", (req, res) => {
  movieController.getMovieDetails(req, res, pool);
});

app.get("/get_movies", (req, res) => {
  movieController.getMovies(req, res, pool);
});

app.get("/get_latest_movies", (req, res) => {
  movieController.getLatestMovies(req, res, pool);
});

// Group Management
app.post("/createGroup", (req, res) => {
  groupController.createGroup(req, res, pool);
});

app.delete("/deleteGroup", (req, res) => {
  groupController.deleteGroup(req, res, pool);
});

app.post("/joinGroup", (req, res) => {
  groupController.joinGroup(req, res, pool);
});

app.get("/searchGroupById/:group_id", (req, res) => {
  groupController.getGroupById(req, res, pool);
});

app.delete("/leaveGroup", (req, res) => {
  groupController.leaveGroup(req, res, pool);
});


// Updating Activities
app.post("/addMovieToWatchlist", (req, res) => {
  activityController.addMovieToWatchlist(req, res, pool);
});

app.post("/addMovieToCompleted", (req, res) => {
  activityController.addMovieToCompleted(req, res, pool);
});

app.post("/addMovieToCurrentlyWatching", (req, res) => {
  activityController.addMovieToCurrentlyWatching(req, res, pool);
});

app.put("/updateMovieToCompleted", (req, res) => {
  activityController.updateMovieToCompleted(req, res, pool);
});

app.put("/updateMovieToWatchlist", (req, res) => {
  activityController.updateMovieToWatchlist(req, res, pool);
});

app.put("/updateMovieToCurrentlyWatching", (req, res) => {
  activityController.updateMovieToCurrentlyWatching(req, res, pool);
});

app.delete("/dropMovie", (req, res) => {
  activityController.dropMovie(req, res, pool);
});

app.get("/getCompleted/:user_id", (req, res) => {
  activityController.getCompleted(req, res, pool);
});

app.get("/getWatchlist/:user_id", (req, res) => {
  activityController.getWatchlist(req, res, pool);
});

app.get("/getCurrentlyWatching/:user_id", (req, res) => {
  activityController.getCurrentlyWatching(req, res, pool);
});




module.exports = {
  pool,
};
