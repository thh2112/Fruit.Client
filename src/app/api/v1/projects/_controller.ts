import { IProject } from '@/features/task-management/types/project';
import { NextRequest } from 'next/server';
import { OkPagination } from '../../_core/sucess-response';
import { projectService } from './_service';
import _toString from 'lodash/toString';
import qs from 'query-string';

export const projectController = {
  getProjects: async (request: NextRequest) => {
    const headers = request.headers;
    const { searchParams } = new URL(request.url);
    const params = qs.parse(_toString(searchParams));
    const { data, paging } = await projectService.getProjects(headers, params);
    return new OkPagination<IProject[]>({
      data,
      paging,
    }).send();
  },
};
