require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_ENDPOINT = "https://api.themoviedb.org/3";
const RECOMMENDER_ENDPOINT = "https://fierce-hamlet-39238.herokuapp.com/";
const axios = require("axios");

/**
 * This is for fetching data of a single movie using movie_id
 */
const getMovieDetails = async (request, response, pool) => {
  const params = request.query;
  const { movie_id } = params;

  const reqParams = { api_key: TMDB_API_KEY };

  const res = await axios.get(`${BASE_ENDPOINT}/movie/${movie_id}`, {
    params: reqParams,
  });

  const { data } = res;

  response.status(200).json({
    data,
  });
};

/**
 * This is for fetching data of movies matching keyword
 */
const getMovies = async (request, response, pool) => {
  const params = request.query;

  // query is keyword
  const { query, page } = params;

  const reqParams = { ...params, api_key: TMDB_API_KEY };

  const res = await axios.get(`${BASE_ENDPOINT}/search/movie`, {
    params: reqParams,
  });

  const { data } = res;

  response.status(200).json({
    data,
  });
};

/**
 * This is for fetching data of latest movies
 */
const getLatestMovies = async (request, response, pool) => {
  const reqParams = { api_key: TMDB_API_KEY };

  const res = await axios.get(`${BASE_ENDPOINT}/discover/movie`, {
    params: reqParams,
  });

  const { data } = res;

  response.status(200).json({
    data,
  });
};

const getRecommendedMovies = async (request, response, pool) => {
  const params = request.query;

  // query is keyword
  const { query, page } = params;

  // We are calling the recommender backend to get recommended movies
  const res = await axios.get(
    `${RECOMMENDER_ENDPOINT}/get_movie_recommendation`,
    {
      params: { movie_title: query },
    }
  );

  let outputData = [];

  // For each recommended movie we query the movie title using TMDB api to get individual movie data
  Promise.all(
    res.data.movies.map(async (movie_title) => {
      const reqParams = { query: movie_title, api_key: TMDB_API_KEY };

      const res = await axios.get(`${BASE_ENDPOINT}/search/movie`, {
        params: reqParams,
      });

      outputData.push(res.data.results[0]);
    })
  ).then(() => {
    response.status(200).json({
      data: outputData,
      size: outputData.length,
    });
  });
};

module.exports = {
  getMovieDetails,
  getMovies,
  getLatestMovies,
  getRecommendedMovies,
};
