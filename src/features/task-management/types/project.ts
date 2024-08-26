import { BaseSearchParams } from '@/shared/types/search-params';
import { User } from '@/shared/types/user';

export enum ProjectStatus {
  ACTIVE = 1,
  ARCHIVED = 2,
}

export interface IProjectFilter {
  status: ProjectStatus;
  keyword: string;
}

export interface IProject {
  id: number;
  name: string;
  key: string;
  icon: string;
  author: User;
  createdAt: Date | string;
}

export interface IProjectSearchParams extends BaseSearchParams {
  status?: ProjectStatus;
}
