'use client';

import ProjectFilter from '@/features/task-management/components/ProjectFilter';
import ProjectList from '@/features/task-management/components/ProjectList';
import useProjects from '@/features/task-management/hooks/useProjects';
import { IProjectFilter, ProjectStatus } from '@/features/task-management/types/project';
import { KeySearchParamsEnum } from '@/shared/enums';
import useFilter from '@/shared/hooks/useFilter';
import { Alert, Flex, Spin } from 'antd';
import { useMemo } from 'react';
import _get from 'lodash/get';
function ProjectPage() {
  const { getValueFilter } = useFilter();
  const { isLoading, data, paging, errorMessage } = useProjects();

  const totalItems = _get(paging, 'totalItem', 0);
  const initialFilter: IProjectFilter = useMemo(() => {
    const keyword = getValueFilter(KeySearchParamsEnum.KEYWORD) || '';
    const status = Number(getValueFilter(KeySearchParamsEnum.STATUS)) || ProjectStatus.ACTIVE;
    const member = Number(getValueFilter(KeySearchParamsEnum.MEMBER));

    return { keyword, status, member };
  }, []);

  const onSubmit = () => {};

  if (isLoading) {
    return (
      <Flex align="center" justify="center">
        <Spin />
      </Flex>
    );
  }
  return (
    <>
      {errorMessage && <Alert message={errorMessage} type="success" />}
      <ProjectFilter onSubmit={onSubmit} loading={isLoading} initialValues={initialFilter} />
      <ProjectList loading={isLoading} projects={data} totalItems={totalItems} />
    </>
  );
}

export default ProjectPage;
