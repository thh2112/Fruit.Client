'use client';

import React from 'react';
import withTheme from '@/libs/antd/theme';
import { Form, Input, Modal } from 'antd';
interface IModalResetPasswordProps {
  openModalReset: boolean;
  setOpenModalReset: (openModalReset: boolean) => void;
}
const ModalResetPassword = ({ openModalReset, setOpenModalReset }: IModalResetPasswordProps) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    setOpenModalReset(false);
  };

  return withTheme(
    <Modal
      open={openModalReset}
      title="Find your account"
      onOk={handleOk}
      onCancel={() => setOpenModalReset(false)}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Please enter your email to find your account!"
          name="email"
          rules={[{ required: true, message: 'Email cannot be empty!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>,
  );
};

export default ModalResetPassword;
