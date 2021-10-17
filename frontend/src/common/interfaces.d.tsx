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

// Endpoints
export interface IMovieDataEndpoint {
  data: IMovieData;
}

export interface IMoviesDataEndpoint {
  data: IMoviesData;
}

export interface IUserDataEndpoint {
  data: { username: string }[];
}
