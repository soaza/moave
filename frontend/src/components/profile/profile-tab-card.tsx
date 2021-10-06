import { Card, Col, Row, Typography } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { getSoloMovie } from "../../common/api";
import { IMovieData } from "../../common/interfaces.d";

const { useEffect, useState } = React;

const { Paragraph } = Typography;

interface IProps {
  movieId: string;
}
const ProfileTabCard: React.FC<IProps> = (props) => {
  const { movieId } = props;
  const [movie, setMovie] = useState<IMovieData>();

  const posterLink = `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`;

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await getSoloMovie(parseInt(movieId));
      setMovie(response.data);
    };
    fetchMovie();
  }, [movieId]);
  return (
    <>
      <Card
        style={{
          minHeight: 300,
          borderColor: "#a5dff2",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
        }}
      >
        <Row>
          <Col span={24} lg={12}>
            <img
              loading={"lazy"}
              alt="Movie Poster"
              style={{ width: "100%", height: "100%" }}
              src={posterLink}
            />
          </Col>

          <Col style={{ padding: 10 }} span={24} lg={12}>
            <h2>{movie?.title}</h2>

            <Paragraph ellipsis={{ rows: 8 }}>{movie?.overview}</Paragraph>

            <Link to={`/movie?id=${movie?.id}`}>See more</Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProfileTabCard;
