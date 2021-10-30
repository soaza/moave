import { Button, Card, Modal, Row } from "antd";
import React, { useState } from "react";
import NewThreadModal from "./new-thread-modal";

interface IProps {
  group_id: string;
}

const GroupForum: React.FC<IProps> = (props) => {
  const { group_id } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ height: 1000 }}>
      <NewThreadModal
        showModal={showModal}
        setShowModal={setShowModal}
        group_id={group_id}
      />

      <Row justify="space-between">
        <h1>
          <span style={{ color: "gray" }}> MARVEL</span> Posts
        </h1>

        <Button onClick={() => setShowModal(true)} type="primary">
          Start a thread
        </Button>
      </Row>
      <Card
        style={{
          minHeight: 200,
          borderColor: "#a5dff2",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
        }}
      >
        <h2>Best Marvel movie of 2021?</h2>
        <Row style={{ color: "gray" }} justify="space-between">
          <p>By user1</p> <p>08/10/2021</p>
        </Row>
        <p>What are your best movies of 2021? Personally mine is Spider-man!</p>
      </Card>
    </div>
  );
};

export default GroupForum;
