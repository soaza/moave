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

export interface IEventData {
  event_id: number;
  event_date: Date;
  movie_id: number;
  event_type: string;
  activity_type: string;
  user_id: string;
  username: string;
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

export interface IEventsDataEndpoint {
  success: boolean;
  data: IEventData[];
}

export interface IActivityListData {
  value: string;
  label: string;
  color: string;
}

// Enums
export const defaultActivities: IActivityListData[] = [
  { value: "COMPLETED", label: "Completed", color: "#69e58e" },
  { value: "CURRENT", label: "Currently Watching", color: "#e57787" },
  { value: "WATCHLIST", label: "Plan to Watch", color: "#a5a8e5" },
];
