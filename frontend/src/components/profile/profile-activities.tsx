import React, { useEffect, useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import { IEventData, IUserData } from "../../common/interfaces.d";
import { getUserEvents } from "../../common/api";
import ProfileSingleActivity from "./profile-single-activity";

interface IProps {
  user: IUserData;
}

const ProfileActivities: React.FC<IProps> = (props) => {
  const { user } = props;

  const [events, setEvents] = useState<IEventData[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getUserEvents(user.user_id);
      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  return (
    <>
      {events.map((event) => {
        return <ProfileSingleActivity user={user} event={event} />;
      })}
    </>
  );
};

export default ProfileActivities;
