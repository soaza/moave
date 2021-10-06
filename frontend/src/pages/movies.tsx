import { Col, Pagination, Row } from "antd";
import * as React from "react";
import { getMoviesOnSearch } from "../common/api";
import { IMovieData } from "../common/interfaces.d";
import Loader from "../components/loader/loader";
import MovieCard from "../components/movie/movie-card";

const Fade = require("react-reveal/Fade");

const { useEffect, useState } = React;
const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<IMovieData[]>([]);
  const [numMovies, setNumMovies] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const urlKeyword = new URL(window.location.href).searchParams.get(
    "keyword"
  ) as string;

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const res = await getMoviesOnSearch(urlKeyword, pageNumber);
      const data = res.data;
      const { results, total_results } = data;
      setMovies(results);
      setNumMovies(total_results);
      setLoading(false);
    };
    loadMovies();
  }, [pageNumber, urlKeyword]);

  if (!urlKeyword) {
    return (
      <Row style={{ marginTop: 20 }} justify="center">
        <p style={{ fontSize: 30 }}>No movies found.</p>
      </Row>
    );
  }

  return (
    <>
      <Row style={{ marginTop: 20 }} justify="center">
        <Col span={18}>
          <Row justify="space-between">
            <h1>Search results for: "{urlKeyword}" </h1>

            <Pagination
              onChange={(pageNum) => setPageNumber(pageNum)}
              defaultPageSize={20}
              total={numMovies}
              current={pageNumber}
              showSizeChanger={false}
            />
          </Row>

          {loading && <Loader />}

          {!loading &&
            movies.map((movie) => {
              return (
                <Fade bottom>
                  <MovieCard movie={movie} />
                </Fade>
              );
            })}

          {!loading && movies.length === 0 && <p>No results found.</p>}

          <Pagination
            onChange={(pageNum) => setPageNumber(pageNum)}
            defaultPageSize={20}
            total={numMovies}
            current={pageNumber}
            showSizeChanger={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default MoviesPage;
