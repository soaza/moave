import { Card, Col, Empty, Row } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { IMovieData } from "../../common/interfaces.d";

interface IProps {
  movie: IMovieData;
}
const MovieCard: React.FC<IProps> = (props) => {
  const { movie } = props;

  const posterLink = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <Card style={{ borderRadius: 20, marginBottom: 20 }}>
      <Row>
        <Col span={4}>
          {movie.poster_path && (
            <img
              alt="Movie Poster"
              style={{
                height: "200px",
              }}
              src={posterLink}
            />
          )}
          {!movie.poster_path && <Empty style={{ width: "100%" }} />}
        </Col>

        <Col span={10}>
          <p style={{ fontSize: 40, marginBottom: 10 }}>{movie.title}</p>
          <p style={{ color: "gray" }}>Release Date: {movie.release_date}</p>
          <p>{movie.overview}</p>

          <Link to={`/movie?id=${movie.id}`}>See more</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieCard;
