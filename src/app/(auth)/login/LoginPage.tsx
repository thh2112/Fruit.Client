'use client';
import LoginMethod from '@/features/authentication/components/LoginMethod';
import withTheme from '@/libs/antd/theme';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Flex, Form, Input } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'antd/es/form/Form';
import { PUBLIC_ROTER } from '@/shared/constant';
import ModalResetPassword from '@/features/authentication/components/ModalResetPassword';

enum LoginFiels {
  EMAIL = 'email',
  PASSWORD = 'password',
}
interface FormField {
  [LoginFiels.EMAIL]: string;
  [LoginFiels.PASSWORD]: string;
}

interface ILoginProps {
  disabled: boolean;
  onSubmit: (data: FormField) => void;
  initialValues?: FormField;
}
const LoginPage = ({ disabled, onSubmit, initialValues }: ILoginProps) => {
  const [form] = useForm();

  const [rememberMe, setRememberMe] = React.useState<boolean>(false);
  const [disabledButton, setDisabledButton] = React.useState<boolean>(disabled);
  const [openModalReset, setOpenModalReset] = React.useState<boolean>(false);

  const handleFieldsChange = () => {
    const hasError = form.getFieldsError().some((error) => error.errors.length > 0);
    setDisabledButton(hasError);
  };

  const handleOpenModalReset = () => {
    setOpenModalReset(true);
  };

  const getUserFromLocalStorage = useMemo(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (!user) {
        return null;
      }
      return JSON.parse(user);
    }
    return null;
  }, []);

  const handleOnSubmit = (data: FormField) => {
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify({ ...data }));
    } else {
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const user = getUserFromLocalStorage;
    form.setFieldsValue(user);
    if (user) {
      setDisabledButton(false);
    }
  }, []);

  return withTheme(
    <>
      <Flex align="center" justify="center" vertical style={{ height: '100vh' }}>
        <Card
          title="Login"
          headStyle={{ textAlign: 'center', fontSize: 20 }}
          bordered={true}
          style={{ width: 400, padding: 10 }}
        >
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            onFieldsChange={handleFieldsChange}
            initialValues={initialValues}
            onFinish={handleOnSubmit}
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
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                  Remember me
                </Checkbox>
              </Form.Item>

              <a onClick={handleOpenModalReset} className="login-form-forgot">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                disabled={disabledButton}
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%', marginBottom: 20 }}
              >
                Log in
              </Button>
              <LoginMethod />
              Don't have account ? <a href={PUBLIC_ROTER.REGISTER}>register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
      {openModalReset && <ModalResetPassword openModalResset={openModalReset} setOpenModalResset={openModalReset} />}
    </>,
  );
};

export default LoginPage;
