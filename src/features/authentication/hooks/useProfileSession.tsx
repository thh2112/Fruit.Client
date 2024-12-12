import { apiVersion } from '@/constanst/consts';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { transformAccountInformation } from '../mappers';
import { authService } from '../services';
import { endpoints } from '../services/endpoint';
import { AccountInformation } from '../types/auth';

const useProfileSession = () => {
  const { data: session, update } = useSession();

  const [myProfile, setMyProfile] = useState<AccountInformation | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data, isLoading, error, ...restSWR } = useSWR(
    endpoints.myProfile(apiVersion),
    (arg) => authService.myProfile(arg),
    {
      onSuccess: (res) => {
        const myProfile = transformAccountInformation(res.data);
        update({
          ...session,
          user: {
            ...session?.user,
            ...myProfile,
          },
        });

        setMyProfile(myProfile);
      },
    },
  );

  useEffect(() => {
    if (session) {
      setMyProfile({
        ...myProfile,
        ...session?.user,
      } as unknown as AccountInformation);
    }
  }, [session]);

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
