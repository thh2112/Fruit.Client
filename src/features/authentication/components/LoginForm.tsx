'use client';

import { localStorageKey } from '@/shared/constant';
import { decrypted, encrypted } from '@/shared/helpers/security';
import styled from '@emotion/styled';
import { Alert, Button, Checkbox, Form, Input, theme } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const FORM_NAME = 'login-form';

enum LoginField {
  EMAIL = 'email',
  PASSWORD = 'password',
  REMEMBER = 'remember',
}
export interface FormField {
  [LoginField.EMAIL]: string;
  [LoginField.PASSWORD]: string;
  [LoginField.REMEMBER]: boolean;
}

interface ILoginFormProps {
  loading: boolean;
  errorMessage: string;
  initialValues?: FormField;
  onSubmit: (data: FormField) => void;
  setRemember: (remember: boolean) => void;
}

const LoginForm = ({ loading, initialValues, errorMessage, onSubmit, setRemember }: ILoginFormProps) => {
  const {
    token: { colorIcon },
  } = theme.useToken();

  const [form] = useForm();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const handleFieldsChange = () => {
    const hasError = form.getFieldsError().some((error) => error.errors.length > 0);
    setDisabledButton(hasError);
  };

  const getUserData = (): Omit<FormField, 'remember'> | null => {
    const encodeLocalKey = encrypted(localStorageKey.user);
    const userData = localStorage.getItem(encodeLocalKey);
    if (userData) {
      const decodeUserData = decrypted(userData);
      return JSON.parse(decodeUserData);
    }

    return null;
  };

  const handleOnSubmit = (data: FormField) => {
    onSubmit(data);
  };

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      const { email, password } = userData;
      form.setFieldsValue({
        password,
        email,
      });
      setRemember(true);
      setDisabledButton(false);
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        name={FORM_NAME}
        onFieldsChange={handleFieldsChange}
        initialValues={initialValues}
        onFinish={handleOnSubmit}
      >
        <FormItem
          name={LoginField.EMAIL}
          rules={[
            {
              type: 'email',
              message: 'Incorrect email format, make sure you entered correctly',
            },
            {
              required: true,
              message: 'Please fill out this field',
            },
          ]}
        >
          <Input size="large" placeholder="Email" prefix={<Mail size={16} color={colorIcon} />} maxLength={30} />
        </FormItem>
        <FormItem
          name={LoginField.PASSWORD}
          rules={[
            {
              required: true,
              message: 'Please fill out this field',
            },
          ]}
        >
          <Input.Password
            maxLength={16}
            size="large"
            placeholder="Password"
            prefix={<Lock size={16} color={colorIcon} />}
          />
        </FormItem>

        <FormItem name={LoginField.REMEMBER} valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </FormItem>

        {errorMessage && <Alert message={errorMessage} type="error" style={{ marginBottom: 24 }} />}

        <FormItem>
          <Button
            loading={loading}
            disabled={disabledButton}
            size="large"
            type="primary"
            htmlType="submit"
            style={{ marginBottom: 0, width: '100%' }}
          >
            Log In
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export const FormItem = styled(Form.Item)({
  width: '100%',
});

export default LoginForm;
