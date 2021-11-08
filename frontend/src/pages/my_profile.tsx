import * as React from "react";
import { getUserByUserId } from "../common/api";
import { IUserData } from "../common/interfaces.d";
import ProfileLanding from "../components/profile/profile-landing";

const { useEffect, useState } = React;

const MyProfilePage: React.FC = () => {
  const [user, setUser] = useState<IUserData>();

  const user_id = localStorage.getItem("user_id") as string;

  useEffect(() => {
    const loadUser = async () => {
      const res = await getUserByUserId(user_id);
      setUser(res.data);
    };
    loadUser();
  }, [user_id]);

  if (user) {
    return <ProfileLanding user={user} isOwnProfile={true} />;
  }

  return null;
};

export default MyProfilePage;
