import * as React from "react";
import { getSoloMovie } from "../common/api";
import { IMovieData } from "../common/interfaces.d";
import { Rate, Col, Row, Typography, Button } from "antd";
import Loader from "../components/loader/loader";
import AddToListButton from "../components/movie/add-to-list-button";
import { useViewPort } from "../common/viewport";
import { useHistory } from "react-router";

const { Title } = Typography;
const { useEffect, useState } = React;

const movieId = parseInt(
  new URL(window.location.href).searchParams.get("id") as string
);

const MoviePage: React.FC = () => {
  const [shownMovie, setShownMovie] = useState<IMovieData>();
  const [loading, setLoading] = useState<boolean>(false);

  const { isMobile } = useViewPort();
  const history = useHistory();

  const fetchMovie = async () => {
    setLoading(true);
    const response = await getSoloMovie(movieId as number);
    setShownMovie(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (movieId) {
      fetchMovie();
    }
  }, []);

  const posterLink = `https://image.tmdb.org/t/p/w500/${shownMovie?.poster_path}`;

  const formatRating = (rating: number) => {
    return Math.floor((rating / 10) * 5);
  };
  const handleRedirectSimilarMovies = () => {
    history.push(`/similar_movies?movie_title=${shownMovie?.title}`);
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
              <AddToListButton movie_id={shownMovie.id} />
              <Button onClick={handleRedirectSimilarMovies} type="link">
                View similar movies
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MoviePage;
