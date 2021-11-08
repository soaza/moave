import { message } from "antd";
import {
  ICheckFollowingEndpoint,
  IEventsDataEndpoint,
  IGroupsDataEndpoint,
  IMovieActivityDataEndpoint,
  IMovieDataEndpoint,
  IMoviesDataEndpoint,
  IRecommendedMoviesDataEndpoint,
  IThreadDataEndpoint,
  IThreadRepliesDataEndpoint,
  IUserDataEndpoint,
  IUsersDataEndpoint,
} from "./interfaces.d";

require("dotenv").config();

interface IRequest {
  endpoint: string;
  headers?: Record<string, unknown>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  URL_params?: Record<string, unknown>;
}

async function makeRequest(request: IRequest, method: string) {
  let url = `${request.endpoint}`;

  if (request.params) {
    Object.keys(request.params).forEach((param, ind) => {
      const paramsObj = request.params ? request.params : {};
      url += `${ind === 0 ? "?" : "&"}${param}=${paramsObj[param]}`;
    });
  }

  // When endpoint is url_path/:param
  if (request.URL_params) {
    Object.keys(request.URL_params).forEach((param, ind) => {
      const paramsObj = request.URL_params ? request.URL_params : {};
      url += `/${paramsObj[param]}`;
    });
  }

  const authToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (request.data) {
    request.data.username = username;
  }

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": authToken,
    ...request.headers,
  } as unknown as Headers;

  try {
    return fetch(url, {
      method: method,
      headers: headers,
      body: request.data ? JSON.stringify(request.data) : null,
    }).then((res) => {
      console.log(res.status, res.ok);
      if (res.status === 403) {
        message.error("Not authorised");
      }
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

async function patch<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "PUT");
}

async function post<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "POST");
}

// API Calls

const BASE_URL = "http://localhost:3001";

// Account
export const registerUser = async (username: string, password: string) => {
  return post<{ user_id: string; success: boolean; token: string }>({
    endpoint: `${BASE_URL}/register`,
    data: {
      username: username,
      password: password,
    },
  });
};

export const loginUser = async (username: string, password: string) => {
  return post<{ user_id: string; success: boolean; token: string }>({
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

export const getRecommendedMovies = async (keyword: string) => {
  return get<IRecommendedMoviesDataEndpoint>({
    endpoint: `${BASE_URL}/get_recommended_movies`,
    params: { query: keyword },
  });
};

// Users
export const getUserByUserId = async (user_id: string) => {
  return get<IUserDataEndpoint>({
    endpoint: `${BASE_URL}/searchUserById`,
    URL_params: { user_id: user_id },
  });
};

export const getUsersByUsername = async (username: string) => {
  return get<IUsersDataEndpoint>({
    endpoint: `${BASE_URL}/getUsersByUsername`,
    params: { username: username },
  });
};

// Social
export const checkFollowing = async (
  follower_id: string,
  following_id: string
) => {
  return get<ICheckFollowingEndpoint>({
    endpoint: `${BASE_URL}/checkFollowing`,
    params: { follower_id: follower_id, following_id: following_id },
  });
};

export const follow = async (follower_id: string, following_id: string) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/follow`,
    data: { followerId: follower_id, followingId: following_id },
  });
};

export const unfollow = async (follower_id: string, following_id: string) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/unfollow`,
    data: { followerId: follower_id, followingId: following_id },
  });
};

export const getFollowings = async (user_id: string) => {
  return get<IUsersDataEndpoint>({
    endpoint: `${BASE_URL}/following`,
    URL_params: { user_id: user_id },
  });
};

export const getFollowers = async (user_id: string) => {
  return get<IUsersDataEndpoint>({
    endpoint: `${BASE_URL}/followers`,
    URL_params: { user_id: user_id },
  });
};

// Movie Activities
export const getMovieList = async (user_id: string, activityType: string) => {
  let mappedURL;

  switch (activityType) {
    case "COMPLETED": {
      mappedURL = "getCompleted";
      break;
    }
    case "CURRENT": {
      mappedURL = "getCurrentlyWatching";
      break;
    }
    case "WATCHLIST": {
      mappedURL = "getWatchlist";
      break;
    }
  }

  return get<IMovieActivityDataEndpoint>({
    endpoint: `${BASE_URL}/${mappedURL}`,
    URL_params: { user_id: user_id },
  });
};

export const addToMovieList = async (user_id: string, movie_id: number) => {
  return post<IMovieActivityDataEndpoint>({
    endpoint: `${BASE_URL}/addMovieToCurrentlyWatching`,
    data: { user_id: user_id, movie_id: movie_id },
  });
};

export const updateMovieList = async (
  user_id: string,
  movie_id: number,
  activityType: string
) => {
  let mappedURL;

  switch (activityType) {
    case "COMPLETED": {
      mappedURL = "updateMovieToCompleted";
      break;
    }
    case "WATCHLIST": {
      mappedURL = "updateMovieToWatchlist";
      break;
    }
    case "CURRENT": {
      mappedURL = "updateMovieToCurrentlyWatching";
      break;
    }
  }

  return patch<IMovieActivityDataEndpoint>({
    endpoint: `${BASE_URL}/${mappedURL}`,
    data: { user_id: user_id, movie_id: movie_id },
  });
};

export const checkMovieAdded = async (user_id: string, movie_id: number) => {
  return get<{ added: boolean; success: boolean; status: string }>({
    endpoint: `${BASE_URL}/checkMovieAdded`,
    params: { user_id: user_id, movie_id: movie_id },
  });
};

// Events
export const addEvent = async (
  user_id: string,
  movie_id: number,
  event_type: string,
  activityType: string
) => {
  return post<{ success: any }>({
    endpoint: `${BASE_URL}/addEvent`,
    data: {
      user_id: user_id,
      movie_id: movie_id,
      event_type: event_type,
      activity_type: activityType,
    },
  });
};

export const getUserEvents = async (user_id: string) => {
  return get<IEventsDataEndpoint>({
    endpoint: `${BASE_URL}/getEvents`,
    URL_params: { user_id: user_id },
  });
};

export const getFriendsEvents = async (user_id: string) => {
  return get<IEventsDataEndpoint>({
    endpoint: `${BASE_URL}/getFriendEvents`,
    URL_params: { user_id: user_id },
  });
};

// Groups
export const getGroupsUserJoined = async (user_id: string) => {
  return get<IGroupsDataEndpoint>({
    endpoint: `${BASE_URL}/getGroupsUserJoined`,
    URL_params: { user_id: user_id },
  });
};

export const getGroupsByKeyword = async (keyword: string) => {
  return get<IGroupsDataEndpoint>({
    endpoint: `${BASE_URL}/getGroupsByKeyword`,
    URL_params: { keyword: keyword },
  });
};

export const joinGroup = async (user_id: string, group_id: string) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/joinGroup`,
    data: { user_id: user_id, group_id: group_id },
  });
};

export const createGroup = async (
  admin_id: string,
  group_name: string,
  group_description: string
) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/createGroup`,
    data: {
      admin_id: admin_id,
      group_name: group_name,
      group_description: group_description,
    },
  });
};

// Threads

export const getThreadsInGroup = async (group_id: string, user_id: string) => {
  return get<IThreadDataEndpoint>({
    endpoint: `${BASE_URL}/getThreadsInGroup`,
    URL_params: { group_id: group_id, user_id: user_id },
  });
};

export const createThread = async (
  title: string,
  description: string,
  author_id: string,
  group_id: string
) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/createThread`,
    data: {
      title: title,
      description: description,
      author_id: author_id,
      group_id: group_id,
    },
  });
};

export const createReply = async (
  thread_id: number,
  author_id: string,
  description: string
) => {
  return post<{ success: boolean }>({
    endpoint: `${BASE_URL}/createReply`,
    data: {
      thread_id: thread_id,
      author_id: author_id,
      description: description,
    },
  });
};

export const getRepliesInThread = async (thread_id: number) => {
  return get<IThreadRepliesDataEndpoint>({
    endpoint: `${BASE_URL}/getRepliesInThread`,
    URL_params: {
      thread_id: thread_id,
    },
  });
};
