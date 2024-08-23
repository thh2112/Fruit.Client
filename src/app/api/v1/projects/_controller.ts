import { IProject } from '@/features/task-management/types/project';
import { NextRequest } from 'next/server';
import { OkPagination } from '../../_core/sucess-response';
import { projectService } from './_service';

export const projectController = {
  getProjects: async (request: NextRequest) => {
    const { data, paging } = await projectService.getProjects(request);
    return new OkPagination<IProject[]>({
      data,
      paging,
    }).send();
  },
};
