import React from "react";
import { Button, Form, Input, message, Modal, Row } from "antd";
import { createThread } from "../../common/api";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  group_id: string;
  fetchThreads: () => void;
}

const NewThreadModal: React.FC<IProps> = (props) => {
  const { showModal, setShowModal, group_id, fetchThreads } = props;

  const loggedUserId = localStorage.getItem("user_id") as string;

  const handleSubmit = async (fields: {
    title: string;
    description: string;
  }) => {
    const { title, description } = fields;

    const res = await createThread(title, description, loggedUserId, group_id);

    if (res.success) {
      message.success("Thread started!");
      setShowModal(false);
      fetchThreads();
    } else {
      message.error("Server Error, please try again");
    }
  };

  return (
    <Modal
      onCancel={() => setShowModal(false)}
      footer={null}
      title="Start a new Thread"
      visible={showModal}
    >
      <Form onFinish={handleSubmit} labelCol={{ span: 6 }}>
        <Form.Item required name="title" label="Title">
          <Input />
        </Form.Item>

        <Form.Item required name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Row justify="center">
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Create New Thread
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewThreadModal;
