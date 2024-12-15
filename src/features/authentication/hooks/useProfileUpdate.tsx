import { apiVersion } from '@/constanst/consts';
import _get from 'lodash/get';
import { useContext, useState } from 'react';
import { authService } from '../services';
import { endpoints } from '../services/endpoint';
import { AccountInformationFormValues } from '../types/auth';
import { SessionWrapperContext } from '@/app/[lng]/providers';

interface ProfileUpdateProps {
  cbUploadAvatarSuccess?: () => void;
}
const useProfileUpdate = ({ cbUploadAvatarSuccess }: ProfileUpdateProps) => {
  const {
    state: { session },
    updateSession,
  } = useContext(SessionWrapperContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessageUpload, setErrorMessage] = useState<string>('');

  const uploadAvatar = async (formData: FormData) => {
    try {
      setLoading(true);
      const id = Number(_get(session?.user, 'id'));
      const response = await authService.changeAvatar(endpoints.changeAvatar(apiVersion, id), formData);
      if (response.success && session) {
        if (updateSession) {
          await updateSession({
            ...session,
            user: {
              ...session.user,
              image: response.data.avatar,
            },
          });
        }
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
        if (updateSession) {
          await updateSession({
            ...session,
            user: {
              ...session.user,
              ...response.data,
            },
          });
        }
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
