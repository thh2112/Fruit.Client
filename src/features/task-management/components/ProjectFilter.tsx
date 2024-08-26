'use client';

import { IProjectFilter, ProjectStatus } from '@/features/task-management/types/project';
import Icon from '@/shared/components/icons/CommonIcon';
import { DEFAULT_PAGE_NUMBER } from '@/shared/constant';
import { KeySearchParamsEnum } from '@/shared/enums';
import useFilter from '@/shared/hooks/useFilter';
import { DataParamFilter } from '@/shared/types/filter';
import { FormProps } from '@/shared/types/form';
import styled from '@emotion/styled';
import { Button, Col, Flex, Form, Input, Row, Select, theme, Typography } from 'antd';
import _debounce from 'lodash/debounce';
import _toString from 'lodash/toString';
import { Plus, Search } from 'lucide-react';
import { useMemo } from 'react';

const enum FormFieldLabel {
  KEYWORD = 'keyword',
  STATUS = 'status',
}

const PROJECT_FILTER_FORM = 'project-filter-form';
const DEBOUNCE_TIME = 500;
const { Text } = Typography;

interface ProjectFilterProps extends FormProps<IProjectFilter> {
  onClickBtn: () => void;
}

function ProjectFilter({ initialValues, onClickBtn }: ProjectFilterProps) {
  const {
    token: { colorIcon, padding },
  } = theme.useToken();

  const { handleSetFilter } = useFilter();

  const [form] = Form.useForm();
  const statusOptions = useMemo(
    () => [
      {
        label: 'Active',
        value: ProjectStatus.ACTIVE,
      },
      {
        label: 'Archived',
        value: ProjectStatus.ARCHIVED,
      },
    ],
    [],
  );

  const setFilterValue = (formValues: IProjectFilter) => {
    const { keyword, status } = formValues;
    const filterValues: DataParamFilter[] = [
      { key: KeySearchParamsEnum.KEYWORD, value: keyword },
      { key: KeySearchParamsEnum.STATUS, value: status as unknown as string },
      { key: KeySearchParamsEnum.PAGE_NUMBER, value: _toString(DEFAULT_PAGE_NUMBER) },
    ];

    handleSetFilter(filterValues);
  };

  const handleFieldsChange = _debounce(() => {
    const formValues = form.getFieldsValue();
    setFilterValue(formValues);
  }, DEBOUNCE_TIME);

  return (
    <Form
      form={form}
      name={PROJECT_FILTER_FORM}
      autoComplete="off"
      onFinish={() => {}}
      initialValues={initialValues}
      disabled={false}
      onFieldsChange={handleFieldsChange}
    >
      <Row gutter={[padding, padding]} justify="end">
        <Col xs={24} sm={24} md={6} xxl={4}>
          <FormItem name={FormFieldLabel.STATUS}>
            <SelectAntd size="large" options={statusOptions} defaultActiveFirstOption></SelectAntd>
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={6} xxl={4}>
          <FormItem name={FormFieldLabel.KEYWORD}>
            <Input
              style={{ width: '100%' }}
              placeholder="Search projects"
              maxLength={30}
              size="large"
              prefix={
                <Icon>
                  <Search size={16} color={colorIcon} />
                </Icon>
              }
            />
          </FormItem>
        </Col>
        <Col>
          <Button type="primary" size="large" onClick={onClickBtn}>
            <Flex gap={4}>
              <Icon>
                <Plus size={16} />
              </Icon>
              <Text>Project</Text>
            </Flex>
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

const FormItem = styled(Form.Item)({
  marginBottom: 0,
});

const SelectAntd = styled(Select)({});

export default ProjectFilter;
