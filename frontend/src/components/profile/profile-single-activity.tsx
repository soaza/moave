import React, { useEffect, useState } from "react";
import { Comment, Avatar, Button } from "antd";

import {
  defaultActivities,
  IActivityListData,
  IEventData,
  IMovieData,
} from "../../common/interfaces.d";
import moment from "moment";
import { getSoloMovie } from "../../common/api";
import { useHistory } from "react-router";

interface IProps {
  event: IEventData;
}

const ProfileSingleActivity: React.FC<IProps> = (props) => {
  const { event } = props;
  const history = useHistory();

  const [movie, setMovie] = useState<IMovieData>();
  const [activityList, setActivityList] = useState<IActivityListData>();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getSoloMovie(event.movie_id);
      setMovie(res.data);
    };
    fetchMovie();
    setActivityList(
      defaultActivities.find((a) => a.value === event.activity_type)
    );
  }, [event.movie_id, event.activity_type]);

  const handleRedirectToMoviePage = () => {
    history.push(`/movie?id=${movie?.id}`);
  };

  const handleRedirectToProfilePage = () => {
    history.push(`/profile?user_id=${event.user_id}`);
  };

  const renderContent = (
    <p>
      Added{" "}
      <Button
        style={{ padding: 0 }}
        type="link"
        onClick={handleRedirectToMoviePage}
      >
        {movie?.title}
      </Button>{" "}
      to his{" "}
      <span style={{ color: activityList?.color }}>{activityList?.label} </span>
      list.
    </p>
  );

  return (
    <Comment
      author={
        <a
          href={""}
          style={{ padding: 0 }}
          onClick={handleRedirectToProfilePage}
          type="link"
        >
          {event.username}
        </a>
      }
      avatar={
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${event.username}.svg`}
        />
      }
      content={renderContent}
      datetime={
        <span>{moment(event.event_date).format("YYYY-MM-DD HH:mm A")}</span>
      }
    />
  );
};

export default ProfileSingleActivity;
