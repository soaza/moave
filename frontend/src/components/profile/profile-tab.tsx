import { Col, Row } from "antd";
import * as React from "react";
import { getMovieList } from "../../common/api";
import { IMovieActivityData, TActivityEnum } from "../../common/interfaces.d";
import Loader from "../loader/loader";
import ProfileTabCard from "./profile-tab-card";

const { useState, useEffect } = React;

const ProfileTab: React.FC<any> = ({ tabKey, user_id }) => {
  const [displayedMovieIds, setDisplayedMovieIds] = useState<
    IMovieActivityData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await getMovieList(user_id, tabKey);
        setDisplayedMovieIds(response.data);
      } catch {}
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Row gutter={[30, 30]}>
        {loading && <Loader />}

        {!loading &&
          displayedMovieIds?.length > 0 &&
          displayedMovieIds.map((displayedMovie, index) => {
            return (
              <Col span={24} lg={12} key={index}>
                {/* <Fade bottom> */}
                <ProfileTabCard key={index} movieId={displayedMovie.movie_id} />
                {/* </Fade> */}
              </Col>
            );
          })}

        {!loading && displayedMovieIds?.length == 0 && (
          <div>No movies found.</div>
        )}
      </Row>
    </>
  );
};

export default ProfileTab;
