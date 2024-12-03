import styled from '@emotion/styled';
import { Form } from 'antd';

const FORM_WIDTH = 600;
export const FormContainer = styled(Form)((props) => ({
  width: FORM_WIDTH,
}));

export const FormItem = styled(Form.Item)((props) => ({
  marginTop: 12,
}));
