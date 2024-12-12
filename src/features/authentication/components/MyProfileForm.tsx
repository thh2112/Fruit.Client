import { GenderType } from '@/constanst/consts';
import { Col, Form, Input, Row, Select } from 'antd';
import _some from 'lodash/some';
import { useMemo } from 'react';
import { AccountInformationFormValues, AccountInformationLabel } from '../types/auth';

const MY_PROFILE_FORM = 'my-profile-form';
export const FORM_ID = 'my-profile-form-id';

interface MyProfileFormProps {
  initialValues: AccountInformationFormValues;
  loading: boolean;
  onSubmit: (data: AccountInformationFormValues) => void;
  onDisabled: (disabled: boolean) => void;
}
const MyProfileForm = ({ initialValues, loading, onSubmit, onDisabled }: MyProfileFormProps) => {
  const [form] = Form.useForm();

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

  const handleFieldsChange = () => {
    const hasErrors = _some(form.getFieldsError(), ({ errors }) => errors.length);
    onDisabled(hasErrors);
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      name={MY_PROFILE_FORM}
      layout="vertical"
      initialValues={initialValues}
      disabled={loading}
      id={FORM_ID}
      onFinish={onSubmit}
      onFieldsChange={handleFieldsChange}
    >
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Form.Item<AccountInformationFormValues>
            name={AccountInformationLabel.FirstName}
            label="First Name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input maxLength={50} size="large" placeholder={'Enter your first name'} disabled />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item<AccountInformationFormValues>
            name={AccountInformationLabel.LastName}
            label="Last Name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input maxLength={50} size="large" placeholder={'Enter your last name'} disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Form.Item<AccountInformationFormValues>
            name={AccountInformationLabel.Email}
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input maxLength={50} size="large" placeholder={'Enter your email'} disabled />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item<AccountInformationFormValues>
            name={AccountInformationLabel.PhoneNumber}
            label="Phone number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input maxLength={50} size="large" placeholder={'Enter your phone number'} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name={AccountInformationLabel.Gender}
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select size="large" options={genderOptions} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MyProfileForm;
