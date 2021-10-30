import { Button, Card, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getThreadsInGroup } from "../../common/api";
import { IThreadData } from "../../common/interfaces.d";
import GroupForumThread from "./group-forum-thread";
import NewThreadModal from "./new-thread-modal";

interface IProps {
  group_id: string;
}

const GroupForum: React.FC<IProps> = (props) => {
  const { group_id } = props;
  const loggedUserId = localStorage.getItem("user_id") as string;

  const [showModal, setShowModal] = useState(false);
  const [threads, setThreads] = useState<IThreadData[]>([]);

  const fetchThreads = async () => {
    const res = await getThreadsInGroup(group_id, loggedUserId);
    setThreads(res.data);
  };

  useEffect(() => {
    fetchThreads();
  }, [group_id, loggedUserId]);

  return (
    <div style={{ minHeight: 1000 }}>
      <NewThreadModal
        showModal={showModal}
        setShowModal={setShowModal}
        group_id={group_id}
        fetchThreads={fetchThreads}
      />

      <Row justify="space-between">
        <h1>
          <span style={{ color: "gray" }}> MARVEL</span> Posts
        </h1>

        <Button onClick={() => setShowModal(true)} type="primary">
          Start a thread
        </Button>
      </Row>

      {threads.map((thread) => {
        return <GroupForumThread thread={thread} />;
      })}
    </div>
  );
};

export default GroupForum;
