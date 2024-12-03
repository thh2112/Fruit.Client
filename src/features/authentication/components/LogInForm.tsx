import { passwordRegex } from '@/constanst/consts';
import { Button, Checkbox, Flex, Form, Input, Typography, theme } from 'antd';
import { Lock, Mail } from 'lucide-react';
import { FormItem } from '../styled-components';
import { useEffect, useState } from 'react';
import _some from 'lodash/some';
import Link from 'next/link';

const LOGIN_FORM = 'login-form';
enum FormLabelType {
  Email = 'email',
  Password = 'password',
  RememberMe = 'rememberMe',
}
const requiredFields = [FormLabelType.Email, FormLabelType.Password];

interface LoginFormValue {
  [FormLabelType.Email]: string;
  [FormLabelType.Password]: string;
  [FormLabelType.RememberMe]: boolean;
}

interface LoginFormProps {
  onSubmit: (formValue: LoginFormValue) => void;
  initialValue: LoginFormValue;
  loading: boolean;
}
export const LogInForm = ({ onSubmit, initialValue, loading }: LoginFormProps) => {
  const [disabledForm, setDisabledForm] = useState<boolean>(true);

  const {
    token: { colorIcon },
  } = theme.useToken();

  const [form] = Form.useForm();

  const handleOnSubmit = (formValue: LoginFormValue) => {
    onSubmit(formValue);
  };

  const handleFieldsChange = () => {
    const hasErrors = _some(form.getFieldsError(), ({ errors }) => errors.length);
    const isFieldsTouched = form.isFieldsTouched(requiredFields, true);

    setDisabledForm(hasErrors || !isFieldsTouched);
  };

  return (
    <Form<LoginFormValue>
      form={form}
      autoComplete="off"
      name={LOGIN_FORM}
      onFinish={handleOnSubmit}
      onFieldsChange={handleFieldsChange}
      disabled={loading}
      initialValues={initialValue}
      style={{ width: 540, maxWidth: '100%' }}
    >
      <FormItem
        name={FormLabelType.Email}
        rules={[
          { required: true, message: 'Please input your email!' },
          {
            type: 'email',
            message: 'Incorrect email format, make sure you entered correctly',
          },
        ]}
      >
        <Input size="large" type="primary" placeholder="Email" prefix={<Mail size={16} color={colorIcon} />} />
      </FormItem>
      <FormItem
        required
        name={FormLabelType.Password}
        dependencies={[FormLabelType.Password]}
        rules={[
          {
            validator: async (_, value) => {
              if (!value) {
                return Promise.reject(new Error('Please input your password!'));
              }
              if (!passwordRegex.test(value)) {
                return Promise.reject(
                  new Error(
                    'The password must be a string from 8 to 16 character long, without any white space, and include both capital and lowercase letters, special characters as well as numbers',
                  ),
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password
          size="large"
          type="primary"
          placeholder="Password"
          prefix={<Lock size={16} color={colorIcon} />}
        />
      </FormItem>
      <FormItem name={FormLabelType.RememberMe}>
        <Flex align="center" justify="space-between">
          <Checkbox>Remember me</Checkbox>
          <Link href={'/'}>Forgot Password?</Link>
        </Flex>
      </FormItem>
      <FormItem style={{ margin: 0 }}>
        <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit" disabled={disabledForm}>
          Log In
        </Button>
      </FormItem>
    </Form>
  );
};
