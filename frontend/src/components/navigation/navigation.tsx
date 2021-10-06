import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieSearchBar from "../search-bar/movie-search-bar";

const Navigation: React.FC = () => {
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    history.push("/login");
    message.success("Successfully logged out!");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        padding: 10,
      }}
    >
      <Row justify="space-between">
        <Col style={{ marginLeft: 20 }} span={24} lg={4}>
          <Link style={{ color: "white", fontSize: 20 }} to="/">
            <b>Moave</b>
          </Link>
        </Col>

        <Col span={24} lg={10}>
          <MovieSearchBar />
        </Col>

        <Col style={{ color: "white", fontSize: 20 }} span={24} lg={8}>
          <Row style={{ marginRight: 20 }} justify="end">
            <Link style={{ color: "white" }} to="profile">
              <UserOutlined style={{ color: "white", fontSize: 20 }} /> Profile
            </Link>
            <div
              onClick={() => handleSignOut()}
              style={{ marginLeft: 20, cursor: "pointer" }}
            >
              <PoweroffOutlined /> Sign Out
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Navigation;
