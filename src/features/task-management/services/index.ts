import { IProject } from '@/features/task-management/types/project';
import apiClient from '@/libs/axios/http-client';
import { ResponsePaging } from '@/shared/types/api-response';

export const projectService = {
  getProjects: async (url: string) => {
    const response = await apiClient<ResponsePaging<IProject[]>>(url);
    return response;
  },
};
