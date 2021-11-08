import { Form, Input, Row, Button, message } from "antd";
import React from "react";
import { createGroup } from "../../common/api";

interface IProps {
  fetchGroups: () => void;
}

const GroupCreateFrom: React.FC<IProps> = (props) => {
  const { fetchGroups } = props;
  const loggedUserId = localStorage.getItem("user_id") as string;

  const handleSubmit = async (form: { title: string; description: string }) => {
    const { title, description } = form;
    const res = await createGroup(loggedUserId, title, description);
    if (res.success) {
      message.success("Successfully created group!");
      fetchGroups();
    } else {
      message.error("Server Error, please try again");
    }
  };

  return (
    <Form onFinish={handleSubmit} labelCol={{ span: 6 }}>
      <Form.Item required name="title" label="Title">
        <Input placeholder="Insert Group Title" />
      </Form.Item>

      <Form.Item required name="description" label="Description">
        <Input.TextArea placeholder="Insert Group Description" />
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Create New Group
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default GroupCreateFrom;
