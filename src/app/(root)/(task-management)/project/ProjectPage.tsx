'use client';

import ProjectFilter from '@/features/task-management/components/ProjectFilter';
import ProjectList from '@/features/task-management/components/ProjectList';
import { IProjectFilter, ProjectStatus } from '@/features/task-management/types/project';
import { KeySearchParamsEnum } from '@/shared/enums';
import useFilter from '@/shared/hooks/useFilter';
import { useMemo } from 'react';

function ProjectPage() {
  const { getValueFilter } = useFilter();

  const initialFilter: IProjectFilter = useMemo(() => {
    const keyword = getValueFilter(KeySearchParamsEnum.KEYWORD) || '';
    const status = Number(getValueFilter(KeySearchParamsEnum.STATUS)) || ProjectStatus.ACTIVE;
    const member = Number(getValueFilter(KeySearchParamsEnum.MEMBER));

    return { keyword, status, member };
  }, []);
  const onSubmit = () => {};
  return (
    <>
      <ProjectFilter onSubmit={onSubmit} loading={false} initialValues={initialFilter} />
      <ProjectList />
    </>
  );
}

export default ProjectPage;
