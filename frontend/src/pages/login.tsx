import { RightOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Form, Input, Button, message } from "antd";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../common/api";

interface IProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
const LoginPage: React.FC<IProps> = (props) => {
  const { setIsAuthenticated } = props;
  const history = useHistory();

  const onFinish = async (form: { username: string; password: string }) => {
    const { username, password } = form;

    try {
      const response = await loginUser(username, password);
      if (response.success) {
        message.success("Successfully logged in!");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("user_id", response.user_id);

        history.push("/");
      }
    } catch (error) {
      message.error("Wrong username/password");
    }
  };

  return (
    <>
      <Row style={{ marginTop: "20vh" }} justify="center">
        <Col span={12}>
          <h1 style={{ marginBottom: 0 }}>Login</h1>
          <Divider style={{ marginTop: 10 }} />

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Link to="/register">
              <p style={{ marginTop: 20, textAlign: "end" }}>
                Don't have an account? Register now <RightOutlined />
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

export default LoginPage;
