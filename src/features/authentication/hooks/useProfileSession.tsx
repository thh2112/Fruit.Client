import { apiVersion } from '@/constanst/consts';
import { Session } from 'next-auth';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { transformAccountInformation } from '../mappers';
import { authService } from '../services';
import { endpoints } from '../services/endpoint';
import { AccountInformation } from '../types/auth';
import { SessionWrapperContext } from '@/app/[lng]/providers';

const useProfileSession = () => {
  const {
    state: { session },
    updateSession,
  } = useContext(SessionWrapperContext);

  const [myProfile, setMyProfile] = useState<AccountInformation | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data, isLoading, error, ...restSWR } = useSWR(
    endpoints.myProfile(apiVersion),
    (arg) => authService.myProfile(arg),
    {
      onSuccess: (res) => {
        const myProfile = transformAccountInformation(res.data);
        console.log('xxxx', myProfile);
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            ...myProfile,
          },
        };
        if (updateSession) {
          updateSession(newSession as Session);
        }

        setMyProfile(myProfile);
      },
    },
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    const { errorMessage } = error;
    setErrorMessage(errorMessage);
  }, [error]);

  return { ...restSWR, myProfile, errorMessage, isLoading };
};

export default useProfileSession;
