import * as React from "react";
import { Carousel, Col, Row } from "antd";
import { getLatestMovies } from "../common/api";
import { IMovieData } from "../common/interfaces.d";
import { Link } from "react-router-dom";

const { useEffect, useState } = React;

const LandingPage: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<IMovieData[]>();
  const [currentMovie, setCurrentMovie] = useState<IMovieData>();

  useEffect(() => {
    const fetchLatestMovies = async () => {
      const res = await getLatestMovies();
      setLatestMovies(
        res.data.results.filter((movie) => movie.backdrop_path !== null)
      );
    };
    fetchLatestMovies();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "black", color: "white" }}>
        <Row>
          <Col span={16}>
            <Carousel
              beforeChange={(curr, next) => {
                if (latestMovies) setCurrentMovie(latestMovies[next]);
              }}
              autoplay
              dotPosition="top"
              effect="fade"
            >
              {latestMovies?.map((movie) => {
                return movie.backdrop_path ? (
                  <img
                    alt="Movie Poster"
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                  ></img>
                ) : null;
              })}
            </Carousel>
          </Col>

          <Col style={{ padding: 30 }} span={8}>
            {currentMovie && (
              <div>
                <p style={{ fontSize: 40 }}>{currentMovie.title}</p>

                <p style={{ fontSize: 16 }}>{currentMovie.overview}</p>

                <Link to={`/movie?id=${currentMovie.id}`}>See more</Link>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LandingPage;
