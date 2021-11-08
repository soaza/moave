import React, { useEffect, useState } from "react";

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
  }, [user.user_id]);

  return (
    <>
      {events.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "5vh" }}>
          No activities found.
        </div>
      )}
      {events.map((event, index) => {
        return <ProfileSingleActivity key={index} event={event} />;
      })}
    </>
  );
};

export default ProfileActivities;
