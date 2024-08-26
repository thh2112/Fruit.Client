import { IProject, IProjectSearchParams } from '@/features/task-management/types/project';
import apiClient from '@/libs/axios/http-client';
import { ResponsePaging } from '@/shared/types/api-response';

export const projectService = {
  getProjects: async (url: string, searchParams: IProjectSearchParams) => {
    const response = await apiClient.get<ResponsePaging<IProject[]>>(url, { params: searchParams });
    return response;
  },
};
