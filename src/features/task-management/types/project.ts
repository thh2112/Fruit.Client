export enum ProjectStatus {
  ACTIVE = 1,
  ARCHIVED = 2,
}

export interface IProjectFilter {
  status: ProjectStatus;
  keyword: string;
}
