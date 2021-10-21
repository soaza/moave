import * as React from "react";
import { getRecommendedMovies, getSoloMovie } from "../common/api";
import { IMovieData } from "../common/interfaces.d";
import { Rate, Col, Row, Typography, Button } from "antd";
import Loader from "../components/loader/loader";
import MovieFavourite from "../components/movie/movie-favourite";
import { useViewPort } from "../common/viewport";
import ProfileTabCard from "../components/profile/profile-tab-card";
import RecommendedMovieCard from "../components/movie/recommended-movie-card";
import { Link } from "react-scroll";

const { Title } = Typography;
const { useEffect, useState } = React;

const movieId = parseInt(
  new URL(window.location.href).searchParams.get("id") as string
);

const MoviePage: React.FC = () => {
  const [shownMovie, setShownMovie] = useState<IMovieData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendedMovies, setRecommendedMovies] = useState<IMovieData[]>([]);
  console.log(recommendedMovies);

  const { isMobile } = useViewPort();

  const fetchMovie = async () => {
    setLoading(true);
    const response = await getSoloMovie(movieId as number);
    setShownMovie(response.data);
    setLoading(false);
  };

  const fetchRecommendedMovies = async (title: string) => {
    const response = await getRecommendedMovies(title);
    setRecommendedMovies(response.data);
  };

  useEffect(() => {
    if (movieId) {
      fetchMovie();
    }
  }, []);

  useEffect(() => {
    if (shownMovie) {
      fetchRecommendedMovies(shownMovie.title);
    }
  }, [shownMovie]);

  const posterLink = `https://image.tmdb.org/t/p/w500/${shownMovie?.poster_path}`;

  const formatRating = (rating: number) => {
    return Math.floor((rating / 10) * 5);
  };

  return (
    <>
      {!shownMovie && !loading && (
        <>
          <Title style={{ textAlign: "center", paddingTop: "40vh" }}>
            No movie found.
          </Title>
        </>
      )}

      {loading && (
        <div style={{ height: "100vh", width: "100vw" }}>
          <Loader />
        </div>
      )}

      {shownMovie && !loading && (
        <>
          <Row>
            <Col span={24} lg={12}>
              <img
                alt="Movie Poster"
                style={{
                  height: "100vh",
                  width: "100%",
                  maxWidth: !isMobile ? "40vw" : "100vw",
                }}
                src={posterLink}
              />
            </Col>

            <Col
              style={{
                marginTop: !isMobile ? "5vh" : "10px",
              }}
              span={24}
              lg={10}
            >
              <Title>{shownMovie.title}</Title>
              <Rate
                style={{ marginRight: 10 }}
                disabled
                allowHalf
                value={formatRating(shownMovie.vote_average as number)}
              />
              ({shownMovie.vote_count})
              <Row justify="space-between">
                <p style={{ color: "gray" }}>
                  Release Date: {shownMovie.release_date}
                </p>

                <p style={{ color: "gray" }}>
                  Runtime: {shownMovie.runtime} minutes
                </p>
              </Row>
              <p>{shownMovie.overview}</p>
              <MovieFavourite movie_id={shownMovie.id} />
              {recommendedMovies.length > 0 && (
                <Link to="recommended" spy={true} smooth={true}>
                  <Button type="link">View similar movies</Button>
                </Link>
              )}
            </Col>
          </Row>

          {recommendedMovies.length > 0 && (
            <>
              <Row id="recommended">
                <Title style={{ margin: 0 }}>Similar Movies</Title>
              </Row>
              <Row>
                <Title style={{ color: "gray" }} level={3}>
                  Check out similar movies to {shownMovie.title}
                </Title>
              </Row>

              <Row>
                {recommendedMovies?.map((movie) => {
                  return (
                    <Col span={6}>
                      <RecommendedMovieCard movieId={String(movie.id)} />
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MoviePage;
