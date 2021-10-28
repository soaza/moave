import React, { useEffect, useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";

import {
  defaultActivities,
  IActivityListData,
  IEventData,
  IMovieData,
  IUserData,
} from "../../common/interfaces.d";
import moment from "moment";
import { getSoloMovie } from "../../common/api";
import { useHistory } from "react-router";

interface IProps {
  event: IEventData;
  user: IUserData;
}

const ProfileSingleActivity: React.FC<IProps> = (props) => {
  const { event, user } = props;
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
      defaultActivities.find((a) => a.value == event.activity_type)
    );
  }, []);

  const handleRedirectToMoviePage = () => {
    history.push(`/movie?id=${movie?.id}`);
  };

  const renderContent = (
    <p>
      Added <a onClick={handleRedirectToMoviePage}>{movie?.title}</a> to his{" "}
      <span style={{ color: activityList?.color }}>{activityList?.label} </span>
      list.
    </p>
  );

  return (
    <Comment
      author={<a>{user.username}</a>}
      avatar={
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${user?.username}.svg`}
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
