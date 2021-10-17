import { IMovieDataEndpoint, IMoviesDataEndpoint } from "./interfaces.d";

require("dotenv").config();

interface IRequest {
  endpoint: string;
  headers?: Record<string, unknown>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

async function makeRequest(request: IRequest, method: string) {
  let url = `${request.endpoint}`;

  if (request.params) {
    Object.keys(request.params).forEach((param, ind) => {
      const paramsObj = request.params ? request.params : {};
      url += `${ind === 0 ? "?" : "&"}${param}=${paramsObj[param]}`;
    });
  }

  const headers = {
    "Content-Type": "application/json",
    ...request.headers,
  } as unknown as Headers;

  try {
    return fetch(url, {
      method: method,
      headers: headers,
      body: request.data ? JSON.stringify(request.data) : null,
    }).then((res) => {
      if (res.ok) return res.json();
      else throw Error;
    });
  } catch (e) {
    console.log(e);
  }
}

async function get<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "GET");
}

// async function patch<T>(request: IRequest): Promise<T> {
//   return await makeRequest(request, "PATCH");
// }

async function post<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "POST");
}

// API Calls

const BASE_URL = "http://localhost:3001";

// Account
export const registerUser = async (username: string, password: string) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/register`,
    data: {
      username: username,
      password: password,
    },
  });
};

export const loginUser = async (username: string, password: string) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/login`,
    data: {
      username: username,
      password: password,
    },
  });
};

// Movies
export const getSoloMovie = async (movie_id: number) => {
  return get<IMovieDataEndpoint>({
    endpoint: `${BASE_URL}/get_movie`,
    params: { movie_id: movie_id },
  });
};

export const getMoviesOnSearch = async (
  keyword: string,
  pageNumber: number = 1
) => {
  return get<IMoviesDataEndpoint>({
    endpoint: `${BASE_URL}/get_movies`,
    params: { query: keyword, page: pageNumber },
  });
};

export const getLatestMovies = async () => {
  return get<IMoviesDataEndpoint>({
    endpoint: `${BASE_URL}/get_latest_movies`,
  });
};
