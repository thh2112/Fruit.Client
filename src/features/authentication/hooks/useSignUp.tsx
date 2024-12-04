import { apiVersion } from '@/constanst/consts';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { authService } from '../services';
import { endpoints } from '../services/endpoint';

interface SignUpHookProps {
  onSuccess: () => void;
}
const useSignUp = ({ onSuccess }: SignUpHookProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data, error, ...restSWR } = useSWRMutation(endpoints.signUp(apiVersion), authService.signUp, {
    onSuccess,
  });

  useEffect(() => {
    if (!error) {
      setErrorMessage(null);
      return;
    }

    const { errorMessage } = error;
    setErrorMessage(errorMessage);
  }, [error]);

  return { ...restSWR, errorMessage };
};

export default useSignUp;
