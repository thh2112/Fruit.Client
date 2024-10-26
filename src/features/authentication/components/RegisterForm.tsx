import { IThemeAntd } from '@/libs/antd/theme';
import { GenderEnum } from '@/shared/enums';
import { patternPassword } from '@/shared/utils';
import styled from '@emotion/styled';
import { Alert, Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useMemo, useState } from 'react';
import { RegisterPayload } from '../types/auth';

export enum FormFieldLabel {
  EMAIL = 'email',
  PASSWORD = 'password',
  FULL_NAME = 'fullName',
  ADDRESS = 'address',
  PHONE = 'phone',
  BOD = 'bod',
  GENDER = 'gender',
}

const FORM_NAME = 'register-form';

interface RegisterFormProps {
  initialValues: RegisterPayload;
  errorMessage?: string;
  onSubmit: (data: RegisterPayload) => void;
  loading: boolean;
}
function RegisterForm({ initialValues, onSubmit, errorMessage, loading }: RegisterFormProps) {
  const [form] = useForm();
  const [disabledForm, setDisabledForm] = useState<boolean>(true);

  const genderOptions = useMemo(() => {
    return [
      {
        label: 'Male',
        value: GenderEnum.MALE,
      },
      {
        label: 'Female',
        value: GenderEnum.FEMALE,
      },
      {
        label: 'Other',
        value: GenderEnum.OTHER,
      },
    ];
  }, []);

  const handleFieldsChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledForm(hasErrors);
  };

  const handleSubmit = () => {
    onSubmit(form.getFieldsValue());
  };

  return (
    <RegisterFormContainer
      form={form}
      name={FORM_NAME}
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
      onFieldsChange={handleFieldsChange}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Email"
        name={FormFieldLabel.EMAIL}
        rules={[
          {
            required: true,
            message: 'Please fill out this field',
          },
          {
            type: 'email',
            message: 'Incorrect email format, make sure you entered correctly',
          },
        ]}
      >
        <Input placeholder="Please enter email" size="large" />
      </Form.Item>
      <Form.Item
        label="Password"
        name={FormFieldLabel.PASSWORD}
        rules={[
          {
            required: true,
            message: 'Please fill out this field',
          },
          {
            pattern: patternPassword,
            message:
              'Password must be between 8 and 16 characters long, without any white space, and include both capital and lowercase letters as well as numbers',
          },
        ]}
      >
        <Input.Password placeholder="Please enter password" size="large" />
      </Form.Item>
      <Form.Item
        label="Full name"
        name={FormFieldLabel.FULL_NAME}
        rules={[
          {
            required: true,
            message: 'Please fill out this field',
          },
        ]}
      >
        <Input placeholder="Please enter full name" size="large" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name={FormFieldLabel.GENDER}
        rules={[
          {
            required: true,
            message: 'Please fill out this field',
          },
        ]}
      >
        <Select placeholder="Please enter gender" size="large" options={genderOptions} />
      </Form.Item>

      {errorMessage && <Alert type="error" message={errorMessage} style={{ marginBottom: 24 }} />}

      <Form.Item style={{ width: '100%', textAlign: 'right' }}>
        <Button size="large" type="primary" htmlType="submit" disabled={disabledForm} loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </RegisterFormContainer>
  );
}

export const RegisterFormContainer = styled(Form)((props) => ({
  flex: 1,
  '.ant-form-item-label': {
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: (props.theme as IThemeAntd).antdToken?.colorBgMask,
    },
  },
}));

export default RegisterForm;
