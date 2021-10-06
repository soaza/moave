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

const port = 3001;
app.listen(port, () => {
  console.log(`app is running on port ${port} `);
});

// Account Management
app.post("/register", (req, res) => {
  accountController.accountSignUp(req, res, pool);
});
app.get("/login", (req, res) => {
  accountController.accountLogin(req, res, pool);
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

module.exports = {
  pool,
};
