import React from 'react';
import { Form, Input, Button } from 'antd';

function Login() {
  const onSubmit = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
