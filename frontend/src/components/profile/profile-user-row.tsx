import { RightOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Row } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { IUserData } from "../../common/interfaces.d";

interface IProps {
  user: IUserData;
}

const ProfileUserRow: React.FC<IProps> = ({ user }) => {
  const history = useHistory();
  return (
    <>
      <Row
        style={{ cursor: "pointer" }}
        onClick={() => {
          console.log(user);
          history.push(`profile?user_id=${user.user_id}`);
        }}
        justify="space-between"
      >
        <Avatar
          size={35}
          src={
            <img
              alt="profile-pic"
              src={`https://avatars.dicebear.com/api/human/${user?.username}.svg`}
            />
          }
        />
        <Col>
          <span style={{ fontSize: 15 }}>{user.username}</span>
          <div style={{ fontSize: 12 }}>{user.email}</div>
        </Col>
        <RightOutlined style={{ fontSize: 10, alignSelf: "center" }} />
      </Row>

      <Divider style={{ margin: 5 }} />
    </>
  );
};

export default ProfileUserRow;
