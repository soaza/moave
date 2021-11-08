import React from "react";
import { Card, Input, Form, Button, Row, message } from "antd";
import { createReply } from "../../common/api";

interface IProps {
  setShowNewReply: (showNewReply: boolean) => void;
  thread_id: number;
  fetchReplies: () => void;
}

const GroupForumNewReply: React.FC<IProps> = (props) => {
  const { setShowNewReply, thread_id, fetchReplies } = props;

  const loggedUserId = localStorage.getItem("user_id") as string;

  const handleSubmit = async (form: { description: string }) => {
    const { description } = form;

    const res = await createReply(thread_id, loggedUserId, description);

    if (res.success) {
      message.success("Replied to thread!");
      setShowNewReply(false);
      fetchReplies();
    } else {
      message.error("Server Error, please try again");
    }
  };

  return (
    <Card
      //   key={thread.thread_id}
      style={{
        marginBottom: 20,
        borderColor: "gray",
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: "10px",
        width: "70%",
      }}
    >
      <Form onFinish={handleSubmit}>
        <Form.Item required name="description">
          <Input.TextArea placeholder="Insert new reply here" />
        </Form.Item>

        <Row justify="end">
          <Form.Item>
            <Button
              onClick={() => setShowNewReply(false)}
              style={{ marginRight: 20 }}
              type="ghost"
            >
              Cancel Reply
            </Button>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Send Reply
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default GroupForumNewReply;
