'use client';

import ProjectFilter from '@/features/task-management/components/ProjectFilter';
import ProjectList from '@/features/task-management/components/ProjectList';
import useProjects from '@/features/task-management/hooks/useProjects';
import { IProjectFilter, IProjectSearchParams, ProjectStatus } from '@/features/task-management/types/project';
import { KeySearchParamsEnum } from '@/shared/enums';
import useFilter from '@/shared/hooks/useFilter';
import { Alert, Flex, Spin } from 'antd';
import { useMemo } from 'react';
import _get from 'lodash/get';
import { useSearchParams } from 'next/navigation';
function ProjectPage() {
  const { getValueFilter } = useFilter();
  const searchParams = useSearchParams();

  const payload: IProjectSearchParams = useMemo(() => {
    const keyword = getValueFilter(KeySearchParamsEnum.KEYWORD) || '';
    const status = Number(getValueFilter(KeySearchParamsEnum.STATUS)) || ProjectStatus.ACTIVE;
    const  pageNumber = Number(getValueFilter(KeySearchParamsEnum.PAGE_NUMBER));
    return { keyword, status, pageNumber };
  }, [searchParams])

  const { isLoading, data, paging, errorMessage } = useProjects(payload);

  const totalItems = _get(paging, 'totalItem', 0);
  const initialFilter: IProjectFilter = useMemo(() => {
    const keyword = getValueFilter(KeySearchParamsEnum.KEYWORD) || '';
    const status = Number(getValueFilter(KeySearchParamsEnum.STATUS)) || ProjectStatus.ACTIVE;
    const member = Number(getValueFilter(KeySearchParamsEnum.MEMBER));

    return { keyword, status, member };
  }, []);

  const handleClickBtn = () => {}

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
      <ProjectFilter loading={isLoading} initialValues={initialFilter} onClickBtn={handleClickBtn} />
      <ProjectList loading={isLoading} projects={data} totalItems={totalItems} />
    </>
  );
}

export default ProjectPage;
