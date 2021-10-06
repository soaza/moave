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
      {/* <h1>{title}</h1> */}

      <Row gutter={[30, 30]}>
        {favouritedMovieIds?.length > 0 &&
          favouritedMovieIds.map((movieId) => {
            return (
              <Col span={24} lg={12}>
                {/* <Fade bottom> */}
                <ProfileTabCard movieId={movieId} />
                {/* </Fade> */}
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default ProfileTab;
