import { Card, Row } from "antd";
import moment from "moment";
import React from "react";
import { IThreadData } from "../../common/interfaces.d";

interface IProps {
  thread: IThreadData;
}

const GroupForumThread: React.FC<IProps> = (props) => {
  const { thread } = props;

  return (
    <Card
      key={thread.thread_id}
      style={{
        marginBottom: 20,
        borderColor: "#a5dff2",
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: "10px",
      }}
    >
      <h2>{thread.title}</h2>
      <Row style={{ color: "gray" }} justify="space-between">
        <p>By {thread.username}</p>{" "}
        <p>{moment(thread.created_date).format("YYYY-MM-DD HH:mm A")}</p>
      </Row>
      <p>{thread.description}</p>
    </Card>
  );
};

export default GroupForumThread;
