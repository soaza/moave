import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getThreadsInGroup } from "../../common/api";
import { IThreadData } from "../../common/interfaces.d";
import Loader from "../loader/loader";
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
  const [loading, setLoading] = useState(false);

  const fetchThreads = async () => {
    setLoading(true);
    const res = await getThreadsInGroup(group_id, loggedUserId);
    setThreads(res.data);
    setLoading(false);
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
        <h1>Posts</h1>

        <Button onClick={() => setShowModal(true)} type="primary">
          Start a thread
        </Button>
      </Row>

      {loading && <Loader />}
      {!loading &&
        threads.map((thread) => {
          return <GroupForumThread thread={thread} />;
        })}

      {!loading && threads.length === 0 && <div> No threads found.</div>}
    </div>
  );
};

export default GroupForum;
