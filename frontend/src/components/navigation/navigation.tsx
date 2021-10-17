import {
  PoweroffOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Row } from "antd";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieSearchBar from "../search-bar/movie-search-bar";
import UserSearchBar from "../search-bar/user-search-bar";

const { useState } = React;

enum TSearchType {
  "user",
  "movies",
}

const Navigation: React.FC = () => {
  const history = useHistory();
  const [searchType, setSearchType] = useState<TSearchType>(TSearchType.user);

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

        <Col span={24} lg={8}>
          {searchType == TSearchType.movies ? (
            <MovieSearchBar />
          ) : (
            <UserSearchBar />
          )}
        </Col>

        <Col span={24} lg={4}>
          <Button
            onClick={() => {
              searchType === TSearchType.movies
                ? setSearchType(TSearchType.user)
                : setSearchType(TSearchType.movies);
            }}
            style={{
              backgroundColor: "white",
              color: "black",
              borderColor: "black",
            }}
            type="primary"
          >
            {searchType == TSearchType.movies ? (
              <span>
                Search Users <UserOutlined />
              </span>
            ) : (
              <span>
                Search Movies <VideoCameraOutlined />
              </span>
            )}
          </Button>
        </Col>

        <Col style={{ color: "white", fontSize: 20 }} span={24} lg={6}>
          <Row style={{ marginRight: 20 }} justify="end">
            <Link style={{ color: "white" }} to="my_profile">
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
