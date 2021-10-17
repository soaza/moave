import { Avatar, Col, Row, Tabs } from "antd";
import { load } from "dotenv";
import * as React from "react";
import { getUserByUserId } from "../common/api";
import { IUserData } from "../common/interfaces.d";
import ProfileTab from "../components/profile/profile-tab";

const { TabPane } = Tabs;

const TABS = [
  { title: "Currently Watching", key: "watching" },
  { title: "Completed", key: "completed" },
  { title: "On Hold", key: "paused" },
  { title: "Dropped", key: "dropped" },
  { title: "Plan to Watch", key: "planned" },
];

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
  }, []);

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

export default MyProfilePage;
