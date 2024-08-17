'use client';

import Icon from '@/shared/components/icons/CommonIcon';
import styled from '@emotion/styled';
import { Avatar, Col, Flex, Form, Input, Row, Select, theme } from 'antd';
import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { IProjectFilter, ProjectStatus } from '@/features/task-management/types/project';
import _debounce from 'lodash/debounce';
import { FormProps } from '@/shared/types/form';
import useFilter from '@/shared/hooks/useFilter';
import { DataParamFilter } from '@/shared/types/filter';
import { KeySearchParamsEnum } from '@/shared/enums';
import _toString from 'lodash/toString';
import { DEFAULT_PAGE_NUMBER } from '@/shared/constant';

const enum FormFieldLabel {
  KEYWORD = 'keyword',
  STATUS = 'status',
}
const PROJECT_FILTER_FORM = 'project-filter-form';
const DEBOUNCE_TIME = 500;

interface ProjectFilterProps extends FormProps<IProjectFilter> {}

function ProjectFilter({ onSubmit, initialValues }: ProjectFilterProps) {
  const {
    token: { paddingLG, colorIcon },
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
    onSubmit(formValues);
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
      <Row gutter={[paddingLG, paddingLG]} justify="space-between">
        <Col xs={24} sm={24} md={6} xxl={6}>
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
      </Row>
    </Form>
  );
}

const FormItem = styled(Form.Item)({
  marginBottom: 0,
});

const SelectAntd = styled(Select)({
  minWidth: 320,
});

export default ProjectFilter;
