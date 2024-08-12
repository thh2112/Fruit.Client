'use client';
import LoginMethod from '@/features/authentication/components/LoginMethod';
import { Button, Card, Divider, Flex, Form, Input } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import withTheme from '@/libs/antd/theme';
enum LoginField {
  EMAIL = 'email',
  PASSWORD = 'password',
}

interface RegisterInputs {
  [LoginField.EMAIL]: string;
  [LoginField.PASSWORD]: string;
}

interface IRegisterProps {
  disabled: boolean;
  onSubmit: (data: RegisterInputs) => void;
}

const RegisterPage = ({ disabled, onSubmit }: IRegisterProps) => {
  const [form] = Form.useForm();
  const [disabledButton, setDisabledButton] = React.useState<boolean>(disabled);

  const handleChangeFields = () => {
    const hasError = form.getFieldsError().some((error) => error.errors.length > 0);

    setDisabledButton(hasError);
  };

  const onHandleSubmit = (data: RegisterInputs) => {};
  return withTheme(
    <Flex style={{ height: '100vh' }} align="center" justify="center">
      <Card
        title="Register"
        headStyle={{ textAlign: 'center', fontSize: 20 }}
        bordered={true}
        style={{ width: 400, padding: 10 }}
      >
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFieldsChange={handleChangeFields}
          onFinish={onHandleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 40 }}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={disabledButton}
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%', marginBottom: 20 }}
            >
              Register
            </Button>
            <Divider>Or login with</Divider>
            <LoginMethod />
            You have account ? <a href="/login">Login now!</a>
          </Form.Item>
        </Form>
      </Card>
    </Flex>,
  );
};

export default RegisterPage;
