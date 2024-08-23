import { AxiosError } from 'axios';
import _get from 'lodash/get';
import _toString from 'lodash/toString';

export function handleResponseErrors(error: unknown) {
  const success = false;
  const status = Number(_get(error, 'response.data.status', 500));

  const errorMessage = _get(error, 'response.data.message', 'An error occurred. Please try again!');
  const resultErrors = {
    success,
    status,
    errorMessage,
  };

  if (error instanceof AxiosError) {
    return resultErrors;
  } else {
    return {
      ...resultErrors,
      errorMessage: _toString(error),
    };
  }
}
