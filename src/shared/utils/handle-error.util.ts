import { IResponseError } from '@/app/api/_core/response-error';
import { AxiosError } from 'axios';
import _get from 'lodash/get';
import _toString from 'lodash/toString';

export function handleResponseError(error: unknown) {
  const success = false;
  const data = _get(error, 'response.data.data', null);
  const errorMessageCode = _get(error, 'response.data.errorMessageCode', 'EXH_ERR_002');
  const errorMessage = _get(error, 'response.data.errorMessage', 'An error occurred. Please try again!');
  const resultErrors: IResponseError = {
    success,
    data,
    errorMessage,
    errorMessageCode,
  };
  if (error instanceof AxiosError) {
    return resultErrors;
  }
  if (error instanceof SyntaxError) {
    return {
      ...resultErrors,
      errorMessage: 'There was a syntax error in the response. Please try again!',
    };
  } else {
    return {
      ...resultErrors,
      errorMessage: errorMessage,
    };
  }
}
