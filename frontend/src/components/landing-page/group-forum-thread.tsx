import { Button, Card, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getRepliesInThread } from "../../common/api";
import { IThreadData, IThreadReplyData } from "../../common/interfaces.d";
import GroupForumNewReply from "./group-forum-new-reply";
import GroupForumReply from "./group-forum-reply";

interface IProps {
  thread: IThreadData;
}

const GroupForumThread: React.FC<IProps> = (props) => {
  const { thread } = props;
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showNewReply, setShowNewReply] = useState<boolean>(false);
  const [replies, setReplies] = useState<IThreadReplyData[]>([]);

  const fetchReplies = async () => {
    const res = await getRepliesInThread(thread.thread_id);
    setReplies(res.data);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  return (
    <>
      <Card
        onClick={() => setShowReplies(!showReplies)}
        key={thread.thread_id}
        style={{
          cursor: "pointer",
          marginBottom: 20,
          borderColor: showReplies ? "#93f2b9" : "#a5dff2",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
        }}
      >
        <h2>{thread.title}</h2>
        <Row style={{ color: "gray" }} justify="space-between">
          {/* TODO :Change to username */}
          <p>By {thread.username}</p>{" "}
          <p>{moment(thread.created_date).format("YYYY-MM-DD HH:mm A")}</p>
        </Row>
        <p>{thread.description}</p>
      </Card>

      {showReplies && (
        <>
          {replies.map((reply) => {
            return <GroupForumReply reply={reply} />;
          })}

          {showNewReply && (
            <GroupForumNewReply
              thread_id={thread.thread_id}
              setShowNewReply={setShowNewReply}
              fetchReplies={fetchReplies}
            />
          )}

          {!showNewReply && (
            <Row justify="end">
              <Button
                onClick={() => setShowNewReply(!showNewReply)}
                style={{ alignSelf: "end", marginBottom: 30 }}
                type="ghost"
              >
                Reply To Thread
              </Button>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default GroupForumThread;
