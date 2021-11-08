import * as React from "react";
import { getUserByUserId } from "../common/api";
import { IUserData } from "../common/interfaces.d";
import ProfileLanding from "../components/profile/profile-landing";

const { useEffect, useState } = React;

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<IUserData>();

  const userIdFromParams = new URL(window.location.href).searchParams.get(
    "user_id"
  ) as string;

  useEffect(() => {
    const loadUser = async () => {
      const res = await getUserByUserId(userIdFromParams);
      setUser(res.data);
    };
    loadUser();
  }, [userIdFromParams]);

  if (user) return <ProfileLanding user={user} />;

  return null;
};
export default ProfilePage;
