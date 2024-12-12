import { apiVersion } from '@/constanst/consts';
import _get from 'lodash/get';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { authService } from '../services';
import { endpoints } from '../services/endpoint';
import { AccountInformationFormValues } from '../types/auth';

interface ProfileUpdateProps {
  cbUploadAvatarSuccess?: () => void;
}
const useProfileUpdate = ({ cbUploadAvatarSuccess }: ProfileUpdateProps) => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessageUpload, setErrorMessage] = useState<string>('');

  const uploadAvatar = async (formData: FormData) => {
    try {
      setLoading(true);
      const id = Number(_get(session?.user, 'id'));
      const response = await authService.changeAvatar(endpoints.changeAvatar(apiVersion, id), formData);
      if (response.success && session) {
        await update({
          ...session,
          user: {
            ...session.user,
            avatar: response.data.avatar,
          },
        });
        cbUploadAvatarSuccess?.();
      }
    } catch (error) {
      setErrorMessage((error as any).errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async (payload: AccountInformationFormValues) => {
    try {
      setLoading(true);
      const id = Number(_get(session?.user, 'id'));
      const response = await authService.updateMyProfile(endpoints.updateProfile(apiVersion, id), payload);
      if (response.success && session) {
        await update({
          ...session,
          user: {
            ...session.user,
            ...response.data,
          },
        });
        cbUploadAvatarSuccess?.();
      }
    } catch (error) {
      setErrorMessage((error as any).errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessageUpload, updateProfile, uploadAvatar };
};

export default useProfileUpdate;
