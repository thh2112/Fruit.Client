export type ApiVersion = {
  version: string;
};

export type Pagination = {
  pageNumber: number;
  maxPerPage: number;
  totalPage: number;
  totalItem: number;
};

export interface ApiResponse<T = null> {
  status: number;
  errorMessage: string;
  errorMessageCode: string;
  data: T;
}

export interface ResponsePaging<T> extends ApiResponse<T> {
  paging: Pagination;
}
