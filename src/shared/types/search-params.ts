import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/shared/constant';

export interface BaseSearchParams {
  keyword?: string;
  maxPerPage?: number;
  pageNumber?: number;
}

export class SearchParams {
  maxPerPage: number;
  pageNumber: number;
  keyword: string;

  constructor(obj?: SearchParams) {
    this.maxPerPage = obj?.maxPerPage || DEFAULT_PAGE_SIZE;
    this.pageNumber = obj?.pageNumber || DEFAULT_PAGE_NUMBER;
    this.keyword = obj?.keyword || '';
  }
}
