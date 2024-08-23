import _get from 'lodash/get';
import _map from 'lodash/map';
import { IProject } from '@/features/task-management/types/project';

export function transformProject(data: unknown): IProject[] {
  if (!data) {
    throw new Error('Invalid project data');
  }

  const projects = _get(data, 'data.data', []);
  return _map(projects, (project) => ({
    id: Number(_get(project, 'id')),
    name: _get(project, 'name', ''),
    key: _get(project, 'key', ''),
    icon: _get(project, 'icon', ''),
    author: _get(project, 'author'),
    createdAt: _get(project, 'createdAt', ''),
  }));
}
