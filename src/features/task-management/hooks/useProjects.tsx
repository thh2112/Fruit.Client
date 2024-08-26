import { IProject, IProjectSearchParams } from '@/features/task-management/types/project';
import { Pagination } from '@/shared/types/api-response';
import { handleResponseErrors } from '@/shared/utils';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { endpoint } from '@/features/task-management/services/endpoint';
import { projectService } from '@/features/task-management/services';

const useProjects = (searchParams: IProjectSearchParams) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [paging, setPaging] = useState<Pagination | null>(null);

  const { error, ...restSWR } = useSWR(
    [endpoint.getProjects(), { ...searchParams }],
    (args) => projectService.getProjects(args[0], args[1]),
    {
      onSuccess: (response) => {
        const { data, paging } = response.data;
        setProjects(data);
        setPaging(paging);
      },
    },
  );

  const errorMessage = useMemo(() => {
    const { errorMessage } = handleResponseErrors(error);
    return errorMessage;
  }, [error]);
  return { ...restSWR, data: projects, paging, errorMessage };
};

export default useProjects;
