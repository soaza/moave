require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_ENDPOINT = "https://api.themoviedb.org/3";
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

module.exports = { getMovieDetails, getMovies, getLatestMovies };
