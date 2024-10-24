import { apiVersion } from '@/shared/constant';
import { User } from '@/shared/types/user';
import { handleResponseErrors } from '@/shared/utils';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { authService } from '../services';
import { endpoint } from '../services/endpoint';

interface RegisterMutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}
const useRegister = ({ onSuccess, onError }: RegisterMutationProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { trigger, error, ...restSWR } = useSWRMutation(endpoint.register(apiVersion), authService.register, {
    onSuccess: (data) => {
      if (data.data !== null) {
        setUser(data.data);
        onSuccess?.();
      }
    },
    onError: (error) => {
      console.log('error', error);
      const { errorMessage } = handleResponseErrors(error);
      setErrorMessage(errorMessage);
      onError?.();
    },
  });

  return { ...restSWR, trigger, user, errorMessage };
};

export default useRegister;
