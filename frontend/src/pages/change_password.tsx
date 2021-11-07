import { Form, Input, Button, Row, Col, Divider, message } from "antd";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { changePassword } from "../common/api";

interface IProps {
}

const ChangePasswordPage: React.FC<IProps> = (props) => {
  const history = useHistory();

  const username = localStorage.getItem("username") as string;

  const onFinish = async (form: { oldPassword: string, newPassword: string, confirmNewPassword: string }) => {
    const { oldPassword, newPassword, confirmNewPassword } = form;

    if (newPassword !== confirmNewPassword) {
      message.error("New password does not match!")
    } else {
      return;
    }

    try {
      const response = await changePassword(username, oldPassword, newPassword);
      if (response.success) {
        message.success("Successfully changed password!");

        history.push("/");
      }
    } catch (error) {
      message.error("Current password does not match");
    }
  };

  return (
    <>
      <Row style={{ marginTop: "20vh" }} justify="center">
        <Col span={12}>
          <h1 style={{ marginBottom: 0 }}>Change Password</h1>
          <Divider style={{ marginTop: 10 }} />

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Current Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your current password!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePasswordPage;
