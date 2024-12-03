import { Button, Form, Input, theme } from 'antd';
import { FormItem } from '../styled-components';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { passwordRegex } from '@/constanst/consts';
import { useState } from 'react';
import _some from 'lodash/some';

enum FormLabelType {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  FirstName = 'firstName',
  LastName = 'lastName',
  PhoneNumber = 'phoneNumber',
}
const SIGN_UP_FORM = 'sign-up-form';

const requiredFields: (keyof SignUpFormValue)[] = [
  FormLabelType.Email,
  FormLabelType.Password,
  FormLabelType.ConfirmPassword,
  FormLabelType.FirstName,
  FormLabelType.LastName,
  FormLabelType.PhoneNumber,
];

interface SignUpFormValue {
  [FormLabelType.Email]: string;
  [FormLabelType.Password]: string;
  [FormLabelType.ConfirmPassword]: string;
  [FormLabelType.FirstName]: string;
  [FormLabelType.LastName]: string;
  [FormLabelType.PhoneNumber]: string;
}
interface SignUpFormProps {
  loading: boolean;
  onSubmit: (formValue: SignUpFormValue) => void;
}

const SignUpForm = ({ loading, onSubmit }: SignUpFormProps) => {
  const {
    token: { colorIcon },
  } = theme.useToken();

  const [disabledForm, setDisabledForm] = useState<boolean>(true);

  const handleOnFinish = (formValue: SignUpFormValue) => {
    onSubmit(formValue);
  };

  const handleFieldsChange = () => {
    const hasErrors = _some(form.getFieldsError(), ({ errors }) => errors.length);
    const isFieldsTouched = form.isFieldsTouched(requiredFields, true);

    setDisabledForm(hasErrors || !isFieldsTouched);
  };

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name={SIGN_UP_FORM}
      autoComplete="off"
      style={{ width: 540, maxWidth: '100%' }}
      onFinish={handleOnFinish}
      disabled={loading}
      onFieldsChange={handleFieldsChange}
    >
      <FormItem
        name={FormLabelType.FirstName}
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
        name={FormLabelType.LastName}
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

      <FormItem
        name={FormLabelType.ConfirmPassword}
        dependencies={[FormLabelType.Password]}
        rules={[
          {
            validator: async (_, value) => {
              const password = form.getFieldValue(FormLabelType.Password)?.trim();
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
        name={FormLabelType.PhoneNumber}
        rules={[
          { required: true, message: 'Please input your phone number!' },
          { min: 10, message: 'The phone number must be a string with a min length of 10' },
          { max: 16, message: 'The phone number field must be a string with a maximum length of 16' },
        ]}
      >
        <Input size="large" type="primary" placeholder="Phone number" prefix={<Phone size={16} color={colorIcon} />} />
      </FormItem>

      <FormItem style={{ margin: 0 }}>
        <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit" disabled={disabledForm}>
          Sign up
        </Button>
      </FormItem>
    </Form>
  );
};

export default SignUpForm;
