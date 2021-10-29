import * as React from "react";
import { Carousel, Col, Row } from "antd";
import { getFriendsEvents, getLatestMovies } from "../common/api";
import { IEventData, IMovieData } from "../common/interfaces.d";
import { Link } from "react-router-dom";
import ProfileSingleActivity from "../components/profile/profile-single-activity";

const { useEffect, useState } = React;

const LandingPage: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<IMovieData[]>();
  const [currentMovie, setCurrentMovie] = useState<IMovieData>();
  const [newsfeedEvents, setNewsfeedEvents] = useState<IEventData[]>([]);

  const loggedUserId = localStorage.getItem("user_id") as string;

  useEffect(() => {
    const fetchLatestMovies = async () => {
      const res = await getLatestMovies();
      setLatestMovies(
        res.data.results.filter((movie) => movie.backdrop_path !== null)
      );
    };
    fetchLatestMovies();

    const fetchFriendsActivity = async () => {
      const activityRes = await getFriendsEvents(loggedUserId);

      console.log(activityRes);
      setNewsfeedEvents(activityRes.data);
    };

    fetchFriendsActivity();
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
              {latestMovies?.map((movie, index) => {
                return movie.backdrop_path ? (
                  <img
                    key={index}
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

      <Row justify="center">
        <Col span={18}>
          {newsfeedEvents.map((event, index) => {
            return <ProfileSingleActivity key={index} event={event} />;
          })}
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
