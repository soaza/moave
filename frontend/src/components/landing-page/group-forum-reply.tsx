import { Button, Card, Row } from "antd";
import moment from "moment";
import React from "react";
import { IThreadReplyData } from "../../common/interfaces.d";

const Fade = require("react-reveal/Fade");

interface IProps {
  reply: IThreadReplyData;
}

const GroupForumReply: React.FC<IProps> = (props) => {
  const { reply } = props;

  return (
    <Fade right>
      <Card
        key={reply.reply_id}
        style={{
          marginBottom: 20,
          borderColor: "gray",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
          width: "70%",
        }}
      >
        <Row style={{ color: "gray" }} justify="space-between">
          {/* TODO :Change to username */}
          <p>By {reply.username}</p>{" "}
          <p>{moment(reply.created_date).format("YYYY-MM-DD HH:mm A")}</p>
        </Row>
        <p>{reply.description}</p>
      </Card>
    </Fade>
  );
};

export default GroupForumReply;
