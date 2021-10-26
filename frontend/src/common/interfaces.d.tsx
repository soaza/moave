export interface IMovieData {
  backdrop_path: string;
  genres: string[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
}
export interface IMoviesData {
  page: number;
  results: IMovieData[];
  total_pages: number;
  total_results: number;
}

export interface IUserData {
  user_id: string;
  username: string;
  email: string;
}

export interface IMovieActivityData {
  movie_id: string;
}

// Endpoints
export interface IMovieDataEndpoint {
  data: IMovieData;
}

export interface IMoviesDataEndpoint {
  data: IMoviesData;
}

export interface IRecommendedMoviesDataEndpoint {
  data: IMovieData[];
  count: number;
}

export interface IUserDataEndpoint {
  data: IUserData;
}

export interface IUsersDataEndpoint {
  data: IUserData[];
  size: number;
}

export interface ICheckFollowingEndpoint {
  following: boolean;
  success: boolean;
}

export interface IMovieActivityDataEndpoint {
  data: IMovieActivityData[];
}

// Enums
export const defaultActivities = [
  { value: "COMPLETED", label: "Completed" },
  { value: "CURRENT", label: "Currently Watching" },
  { value: "WATCHLIST", label: "Plan to Watch" },
];
