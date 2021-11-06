import * as React from "react";
import { Carousel, Col, Row, Tabs } from "antd";
import {
  getFriendsEvents,
  getGroupsUserJoined,
  getLatestMovies,
} from "../common/api";
import { IEventData, IGroupData, IMovieData } from "../common/interfaces.d";
import { Link } from "react-router-dom";
import ProfileSingleActivity from "../components/profile/profile-single-activity";
import GroupForum from "../components/landing-page/group-forum";
import GroupCreateJoinTab from "../components/landing-page/group-create-join-tab";

const { useEffect, useState } = React;

const { TabPane } = Tabs;

interface ITabs {
  title: string;
  key: string;
}

const LandingPage: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<IMovieData[]>();
  const [currentMovie, setCurrentMovie] = useState<IMovieData>();
  const [newsfeedEvents, setNewsfeedEvents] = useState<IEventData[]>([]);
  const [groupsJoined, setGroupsJoined] = useState<IGroupData[]>([]);

  const loggedUserId = localStorage.getItem("user_id") as string;

  // Fetch Groups
  const fetchGroups = async () => {
    const groupRes = await getGroupsUserJoined(loggedUserId);
    setGroupsJoined(groupRes.data);
  };

  // Fetch Movies
  const fetchLatestMovies = async () => {
    const res = await getLatestMovies();
    setLatestMovies(
      res.data.results.filter((movie) => movie.backdrop_path !== null)
    );
  };

  // Fetch news feed
  const fetchFriendsActivity = async () => {
    const activityRes = await getFriendsEvents(loggedUserId);
    setNewsfeedEvents(activityRes.data);
  };

  useEffect(() => {
    if (loggedUserId) {
      fetchGroups();
      fetchLatestMovies();
      fetchFriendsActivity();
    }
  }, [loggedUserId]);

  const renderTabContent = (key: any) => {
    if (key === "FRONTPAGE") {
      return newsfeedEvents.map((event, index) => {
        return <ProfileSingleActivity key={index} event={event} />;
      });
    }
    if (key === "ADDJOIN") {
      return <GroupCreateJoinTab fetchGroups={fetchGroups} />;
    }
    return <GroupForum group_id={key} />;
  };

  return (
    <>
      <div style={{ backgroundColor: "black", color: "white" }}>
        <Row>
          <Col span={16}>
            <Carousel
              beforeChange={(curr, next) => {
                if (latestMovies) setCurrentMovie(latestMovies[next]);
              }}
              autoplay
              dotPosition="top"
              effect="fade"
            >
              {latestMovies?.map((movie, index) => {
                return movie.backdrop_path ? (
                  <img
                    key={index}
                    alt="Movie Poster"
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                  ></img>
                ) : null;
              })}
            </Carousel>
          </Col>

          <Col style={{ padding: 30 }} span={8}>
            {currentMovie && (
              <div>
                <p style={{ fontSize: 40 }}>{currentMovie.title}</p>

                <p style={{ fontSize: 16 }}>{currentMovie.overview}</p>

                <Link to={`/movie?id=${currentMovie.id}`}>See more</Link>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <Row justify="center">
        <Col span={18}>
          <Tabs
            style={{ marginTop: 10 }}
            tabPosition="left"
            defaultActiveKey="1"
          >
            <TabPane tab="Front Page" key={"FRONTPAGE"}>
              {renderTabContent("FRONTPAGE")}
            </TabPane>

            {groupsJoined.map((group) => {
              return (
                <TabPane tab={group.group_name} key={group.group_id}>
                  {renderTabContent(group.group_id)}
                </TabPane>
              );
            })}

            <TabPane tab="Add/Join Groups" key={"ADDJOIN"}>
              <div style={{ minHeight: 500 }}>
                {renderTabContent("ADDJOIN")}
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
