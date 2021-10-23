import { Row, Col, Typography } from "antd";
import React from "react";
import { getRecommendedMovies } from "../common/api";
import { IMovieData } from "../common/interfaces.d";
import Loader from "../components/loader/loader";
import RecommendedMovieCard from "../components/movie/recommended-movie-card";

interface IProps {
  movie_title: string;
}

const { Title } = Typography;
const { useEffect, useState } = React;

const SimilarMoviesPage: React.FC<IProps> = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<IMovieData[]>([]);
  const [loading, setLoading] = useState(false);

  const movie_title = new URL(window.location.href).searchParams.get(
    "movie_title"
  ) as string;

  const fetchRecommendedMovies = async (title: string) => {
    setLoading(true);
    const response = await getRecommendedMovies(title);
    setRecommendedMovies(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendedMovies(movie_title);
  }, [movie_title]);

  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Row id="recommended">
            <Title style={{ marginTop: "5vh", marginBottom: 0 }}>
              Similar Movies
            </Title>
          </Row>
          <Row>
            <Title style={{ color: "gray" }} level={3}>
              Check out similar movies to "{movie_title}"
            </Title>
          </Row>

          <Row>
            {loading && <Loader />}
            {!loading &&
              recommendedMovies?.map((movie) => {
                return (
                  <Col span={6}>
                    <RecommendedMovieCard movieId={String(movie.id)} />
                  </Col>
                );
              })}
            {!loading && recommendedMovies.length === 0 && (
              <div>No movies found.</div>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SimilarMoviesPage;
