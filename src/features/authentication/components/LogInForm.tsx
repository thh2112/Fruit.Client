import { localStorageKey } from '@/constanst/consts';
import { decrypted, encrypted } from '@/shared/utils';
import { Alert, Button, Checkbox, Flex, Form, Input, theme } from 'antd';
import _some from 'lodash/some';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FormItem } from '../styled-components';
import { SignInFormLabel, SignInFormValue } from '../types/auth';

const LOGIN_FORM = 'login-form';

const requiredFields = [SignInFormLabel.Email, SignInFormLabel.Password];

interface LoginFormProps {
  onSubmit: (formValue: SignInFormValue) => void;
  initialValue: SignInFormValue;
  loading: boolean;
  errorMessage: string | null;
}
export const LogInForm = ({ onSubmit, initialValue, loading, errorMessage }: LoginFormProps) => {
  const [disabledForm, setDisabledForm] = useState<boolean>(true);

  const {
    token: { colorIcon },
  } = theme.useToken();

  const [form] = Form.useForm();
  const rememberMe = Form.useWatch(SignInFormLabel.RememberMe, form);

  const getUserData: SignInFormValue = useMemo(() => {
    const encodeLocalKey = encrypted(localStorageKey.userInfo);
    const userData = localStorage.getItem(encodeLocalKey);
    if (userData) {
      const decodeUserData = decrypted(userData);
      return JSON.parse(decodeUserData);
    } else {
      return null;
    }
  }, []);
  const handleOnSubmit = (formValue: SignInFormValue) => {
    onSubmit(formValue);
  };

  const handleFieldsChange = () => {
    const hasErrors = _some(form.getFieldsError(), ({ errors }) => errors.length);
    const isFieldsTouched = form.isFieldsTouched(requiredFields, true);

    setDisabledForm(hasErrors || !isFieldsTouched);
  };

  useEffect(() => {
    if (getUserData) {
      form.setFieldsValue({ ...getUserData });
      setDisabledForm(false);
      return;
    }
    form.setFieldsValue({ ...initialValue });
  }, [initialValue, getUserData]);

  return (
    <Form<SignInFormValue>
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
        name={SignInFormLabel.Email}
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
        name={SignInFormLabel.Password}
        dependencies={[SignInFormLabel.Password]}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          size="large"
          type="primary"
          placeholder="Password"
          prefix={<Lock size={16} color={colorIcon} />}
        />
      </FormItem>
      <FormItem name={SignInFormLabel.RememberMe} valuePropName="checked">
        <Flex align="center" justify="space-between">
          <Checkbox checked={rememberMe}>Remember me</Checkbox>
          <Link href={'/'}>Forgot Password?</Link>
        </Flex>
      </FormItem>
      {errorMessage && <Alert type="error" message={errorMessage} style={{ marginBottom: 24 }} />}
      <FormItem style={{ margin: 0 }}>
        <Button
          type="primary"
          size="large"
          style={{ width: '100%' }}
          htmlType="submit"
          disabled={disabledForm}
          loading={loading}
        >
          Log In
        </Button>
      </FormItem>
    </Form>
  );
};
