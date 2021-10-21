import { Col, Row } from "antd";
import * as React from "react";
import ProfileTabCard from "./profile-tab-card";

const { useState, useEffect } = React;

const ProfileTab: React.FC<any> = ({ title }) => {
  const [favouritedMovieIds, setFavouritedMovieIds] = useState<string[]>([]);
  useEffect(() => {
    const movieIds = JSON.parse(
      localStorage.getItem("favourites") as string
    ) as string[];
    setFavouritedMovieIds(movieIds);
  }, []);

  return (
    <>
      <Row gutter={[30, 30]}>
        {favouritedMovieIds?.length > 0 &&
          favouritedMovieIds.map((movieId, index) => {
            return (
              <Col span={24} lg={12} key={index}>
                {/* <Fade bottom> */}
                <ProfileTabCard key={index} movieId={movieId} />
                {/* </Fade> */}
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default ProfileTab;
