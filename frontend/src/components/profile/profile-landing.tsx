import { Avatar, Button, Col, message, Popover, Row, Tabs } from "antd";

import * as React from "react";
import {
  checkFollowing,
  follow,
  getFollowers,
  getFollowings,
  unfollow,
} from "../../common/api";
import { IUserData } from "../../common/interfaces.d";
import ProfileTab from "./profile-tab";
import ProfileUserRow from "./profile-user-row";

const { TabPane } = Tabs;

const TABS = [
  { title: "Currently Watching", key: "CURRENT" },
  { title: "Completed", key: "COMPLETED" },
  { title: "Plan to Watch", key: "WATCHLIST" },
];

interface IProps {
  user: IUserData;
  isOwnProfile?: boolean;
}

const { useState, useEffect } = React;

const ProfileLanding: React.FC<IProps> = (props) => {
  const { user, isOwnProfile } = props;
  const loggedUserId = localStorage.getItem("user_id") as string;

  const [following, setFollowing] = useState<boolean>();
  const [usersFollowing, setUsersFollowing] = useState<IUserData[]>([]);
  const [numFollowing, setNumFollowing] = useState<number>(0);
  const [usersFollower, setUsersFollower] = useState<IUserData[]>([]);
  const [numFollower, setNumFollowers] = useState<number>(0);

  const profileUserId = isOwnProfile ? loggedUserId : user.user_id;

  const checkFollowingUser = async () => {
    const res = await checkFollowing(loggedUserId, user.user_id);
    setFollowing(res.following);
  };

  const getFollowingUsers = async () => {
    const res = await getFollowings(profileUserId);
    setUsersFollowing(res.data);
    setNumFollowing(res.size);
  };

  const getFollowerUsers = async () => {
    const res = await getFollowers(profileUserId);
    setUsersFollower(res.data);
    setNumFollowers(res.size);
  };

  useEffect(() => {
    checkFollowingUser();
    getFollowingUsers();
    getFollowerUsers();
  }, []);

  const followUser = async () => {
    const res = await follow(loggedUserId, user.user_id);
    if (res.success) {
      message.success("Followed user!");
      checkFollowingUser();
      getFollowingUsers();
      getFollowerUsers();
    }
  };

  const unfollowUser = async () => {
    const res = await unfollow(loggedUserId, user.user_id);
    if (res.success) {
      message.success("Unfollowed user!");
      checkFollowingUser();
      getFollowingUsers();
      getFollowerUsers();
    }
  };

  const renderFollowingContent = () => {
    return (
      <>
        {usersFollowing.map((user, index) => {
          return (
            <div key={index}>
              <ProfileUserRow user={user} />
            </div>
          );
        })}
      </>
    );
  };

  const renderFollowerContent = () => {
    return (
      <>
        {usersFollower.map((user, index) => {
          return (
            <div key={index}>
              <ProfileUserRow user={user} />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Row justify="center">
            <Col>
              <h1 style={{ textAlign: "center" }}>{user?.username}</h1>
              <Avatar
                style={{ marginBottom: 20 }}
                size={200}
                src={
                  <img
                    alt="profile-pic"
                    src={`https://avatars.dicebear.com/api/human/${user?.username}.svg`}
                  />
                }
              />

              <Row>
                <Popover
                  style={{ padding: 5 }}
                  content={() => {
                    return numFollower > 0 ? (
                      renderFollowerContent()
                    ) : (
                      <div>No followers found.</div>
                    );
                  }}
                  title="Followers"
                >
                  <Button type="link">{numFollower} Followers</Button>
                </Popover>
                <Popover
                  content={() => {
                    return numFollowing > 0 ? (
                      renderFollowingContent()
                    ) : (
                      <div>No followings found.</div>
                    );
                  }}
                  title="Following"
                >
                  <Button type="link">{numFollowing} Following</Button>
                </Popover>
              </Row>

              {!isOwnProfile && (
                <Row style={{ marginTop: 20 }} justify="center">
                  {following ? (
                    <Button onClick={() => unfollowUser()} block type="ghost">
                      Following
                    </Button>
                  ) : (
                    <Button onClick={() => followUser()} block type="primary">
                      Follow
                    </Button>
                  )}
                </Row>
              )}
            </Col>
          </Row>

          <Tabs
            style={{ marginTop: 10 }}
            tabPosition="left"
            defaultActiveKey="1"
          >
            {TABS.map((tab, index) => {
              return (
                <TabPane tab={tab.title} key={index}>
                  <ProfileTab
                    user_id={isOwnProfile ? loggedUserId : user.user_id}
                    tabKey={tab.key}
                  />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default ProfileLanding;
