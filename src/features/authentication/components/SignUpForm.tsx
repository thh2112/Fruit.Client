import { Alert, Button, Form, Input, Select, theme } from 'antd';
import { FormItem } from '../styled-components';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { GenderType, passwordRegex } from '@/constanst/consts';
import { useEffect, useMemo, useState } from 'react';
import _some from 'lodash/some';
import { SignUpFormLabel, SignUpFormValue } from '../types/auth';

const SIGN_UP_FORM = 'sign-up-form';

const requiredFields: (keyof SignUpFormValue)[] = [
  SignUpFormLabel.Email,
  SignUpFormLabel.Password,
  SignUpFormLabel.ConfirmPassword,
  SignUpFormLabel.FirstName,
  SignUpFormLabel.LastName,
  SignUpFormLabel.PhoneNumber,
];

interface SignUpFormProps {
  loading: boolean;
  onSubmit: (formValue: SignUpFormValue) => void;
  errorMessage: string | null;
  isRegisterSuccess: boolean;
}

const SignUpForm = ({ loading, onSubmit, errorMessage, isRegisterSuccess }: SignUpFormProps) => {
  const {
    token: { colorIcon },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [disabledForm, setDisabledForm] = useState<boolean>(true);

  const genderOptions = useMemo(
    () => [
      {
        label: 'Male',
        value: GenderType.Male,
      },
      {
        label: 'Female',
        value: GenderType.Female,
      },
      {
        label: 'Other',
        value: GenderType.Other,
      },
    ],
    [],
  );

  const handleOnFinish = (formValue: SignUpFormValue) => {
    onSubmit(formValue);
  };

  const handleFieldsChange = () => {
    const hasErrors = _some(form.getFieldsError(), ({ errors }) => errors.length);
    const isFieldsTouched = form.isFieldsTouched(requiredFields, true);

    setDisabledForm(hasErrors || !isFieldsTouched);
  };

  useEffect(() => {
    if (!isRegisterSuccess) {
      return;
    }

    form.resetFields();
    setDisabledForm(true);
  }, [isRegisterSuccess]);

  return (
    <Form
      form={form}
      name={SIGN_UP_FORM}
      autoComplete="off"
      style={{ width: '100%' }}
      onFinish={handleOnFinish}
      disabled={loading}
      onFieldsChange={handleFieldsChange}
    >
      <FormItem
        name={SignUpFormLabel.FirstName}
        rules={[
          { required: true, message: 'Please input your first name!' },
          {
            max: 50,
            message: 'The first name must be a string with a maximum length of 50',
          },
        ]}
      >
        <Input size="large" type="primary" placeholder="First name" prefix={<User size={16} color={colorIcon} />} />
      </FormItem>

      <FormItem
        name={SignUpFormLabel.LastName}
        rules={[
          { required: true, message: 'Please input your last name!' },
          {
            max: 50,
            message: 'The last name must be a string with a maximum length of 50',
          },
        ]}
      >
        <Input size="large" type="primary" placeholder="Last name" prefix={<User size={16} color={colorIcon} />} />
      </FormItem>

      <FormItem
        name={SignUpFormLabel.Email}
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
        name={SignUpFormLabel.Password}
        dependencies={[SignUpFormLabel.Password]}
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

      <FormItem
        name={SignUpFormLabel.ConfirmPassword}
        dependencies={[SignUpFormLabel.Password]}
        rules={[
          {
            validator: async (_, value) => {
              const password = form.getFieldValue(SignUpFormLabel.Password)?.trim();
              if (value !== password) {
                return Promise.reject(new Error('Password does not match!'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password
          size="large"
          type="primary"
          placeholder="Confirm password"
          prefix={<Lock size={16} color={colorIcon} />}
        />
      </FormItem>

      <FormItem
        name={SignUpFormLabel.PhoneNumber}
        rules={[
          { required: true, message: 'Please input your phone number!' },
          { min: 10, message: 'The phone number must be a string with a min length of 10' },
          { max: 16, message: 'The phone number field must be a string with a maximum length of 16' },
        ]}
      >
        <Input size="large" type="primary" placeholder="Phone number" prefix={<Phone size={16} color={colorIcon} />} />
      </FormItem>

      <FormItem name={SignUpFormLabel.Gender} rules={[{ required: true, message: 'Please input your gender!' }]}>
        <Select size="large" options={genderOptions} defaultActiveFirstOption defaultValue={GenderType.Male} />
      </FormItem>

      {errorMessage && <Alert message={errorMessage} type="error" style={{ marginBottom: 24 }} />}

      <FormItem style={{ margin: 0 }}>
        <Button
          type="primary"
          size="large"
          style={{ width: '100%' }}
          htmlType="submit"
          disabled={disabledForm}
          loading={loading}
        >
          Sign up
        </Button>
      </FormItem>
    </Form>
  );
};

export default SignUpForm;
