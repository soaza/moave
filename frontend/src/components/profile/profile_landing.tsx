import { Avatar, Button, Col, message, Row, Tabs } from "antd";
import * as React from "react";
import { checkFollowing, follow } from "../../common/api";
import { IUserData } from "../../common/interfaces.d";
import ProfileTab from "./profile-tab";

const { TabPane } = Tabs;

const TABS = [
  { title: "Currently Watching", key: "watching" },
  { title: "Completed", key: "completed" },
  { title: "On Hold", key: "paused" },
  { title: "Dropped", key: "dropped" },
  { title: "Plan to Watch", key: "planned" },
];

interface IProps {
  user: IUserData;
}

const { useState, useEffect } = React;

const ProfileLanding: React.FC<IProps> = (props) => {
  const { user } = props;
  const [following, setFollowing] = useState<boolean>();
  const loggedUserId = localStorage.getItem("user_id") as string;

  const checkFollowingUser = async () => {
    const res = await checkFollowing(loggedUserId, user.user_id);
    setFollowing(res.following);
  };

  useEffect(() => {
    checkFollowingUser();
  }, []);

  const followUser = async () => {
    const res = await follow(loggedUserId, user.user_id);
    if (res.success) {
      message.success("Followed user!");
      checkFollowingUser();
    }
  };
  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Row justify="center">
            <Col>
              <h1 style={{ textAlign: "center" }}>{user?.username}</h1>

              <Avatar
                size={200}
                src={
                  <img
                    alt="profile-pic"
                    src={`https://avatars.dicebear.com/api/human/${user?.username}.svg`}
                  />
                }
              />

              <Row style={{ marginTop: 20 }} justify="center">
                {following ? (
                  <Button disabled block type="ghost">
                    Following
                  </Button>
                ) : (
                  <Button onClick={() => followUser()} block type="primary">
                    Follow
                  </Button>
                )}
              </Row>
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
                  <ProfileTab title={tab.title} />
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
