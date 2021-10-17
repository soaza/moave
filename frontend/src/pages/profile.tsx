import { Avatar, Col, Row, Tabs } from "antd";
import * as React from "react";
import ProfileTab from "../components/profile/profile-tab";

const { TabPane } = Tabs;

const TABS = [
  { title: "Currently Watching", key: "watching" },
  { title: "Completed", key: "completed" },
  { title: "On Hold", key: "paused" },
  { title: "Dropped", key: "dropped" },
  { title: "Plan to Watch", key: "planned" },
];

const usernameParam = new URL(window.location.href).searchParams.get(
  "username"
) as string;

// usernameParamS exists if we look at other users' profile, else it renders current user's profile from local storage
const user = usernameParam ? usernameParam : localStorage.getItem("username");

const ProfilePage: React.FC = () => {
  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Row justify="center">
            <Col>
              <h1 style={{ textAlign: "center" }}>{user}</h1>
              <Avatar
                size={200}
                src={
                  <img
                    alt="profile-pic"
                    src={`https://avatars.dicebear.com/api/human/${user}.svg`}
                  />
                }
              />
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

export default ProfilePage;
