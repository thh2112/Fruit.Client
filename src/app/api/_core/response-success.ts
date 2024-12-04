import { IResponse } from './response.interface';

export type Pagination = {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
};

export type PaginatedResult<T> = {
  result: T;
  paging: Pagination;
};

export interface IResponseSuccess<T> extends IResponse<T> {}

export interface IResponseSuccessPaginated<T> extends IResponseSuccess<T> {
  paging: Pagination;
}
