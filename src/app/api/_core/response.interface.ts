export interface IResponse<T> {
  success: boolean;
  data: T;
  errorMessage: string;
  errorMessageCode: string;
}
