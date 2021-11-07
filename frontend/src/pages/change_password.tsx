import { RightOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Divider, message } from "antd";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { changePassword, registerUser } from "../common/api";

interface IProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
const ChangePasswordPage: React.FC<IProps> = (props) => {
  const { setIsAuthenticated } = props;
  const history = useHistory();

  const onFinish = async (form: { username: string, oldPassword: string, newPassword: string }) => {
    const { username, oldPassword, newPassword } = form;

    try {
      const response = await changePassword(username, oldPassword, newPassword);
      if (response.success) {
        message.success("Successfully registered!");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("user_id", response.user_id);

        history.push("/");
      }
    } catch (error) {
      message.error("Username already exists");
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
              name="currentpassword"
              rules={[
                { required: true, message: "Please input your current password!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newpassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmnewpassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Link to="/login">
              <p style={{ marginTop: 20, textAlign: "end" }}>
                Have an account already? Login now <RightOutlined />
              </p>
            </Link>

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
