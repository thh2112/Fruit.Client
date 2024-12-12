'use client';

import { GenderType } from '@/constanst/consts';
import MyProfileForm, { FORM_ID } from '@/features/authentication/components/MyProfileForm';
import ProfileCard from '@/features/authentication/components/ProfileCard';
import useProfileSession from '@/features/authentication/hooks/useProfileSession';
import useProfileUpdate from '@/features/authentication/hooks/useProfileUpdate';
import { MyProfileContainer } from '@/features/authentication/styled-components';
import { AccountInformationFormValues } from '@/features/authentication/types/auth';
import { SpinLoading } from '@/shared/helpers/spin';
import { Alert, Button, Flex } from 'antd';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import { useMemo, useState } from 'react';
import { message } from 'antd';

const ProfilePage = () => {
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const { myProfile, errorMessage, isLoading } = useProfileSession();
  const { uploadAvatar, updateProfile, loading, errorMessageUpload } = useProfileUpdate({
    cbUploadAvatarSuccess: () => {
      messageApi.success('Change avatar successfully');
      setDisabledSubmitBtn(true);
    },
  });

  const initialValues = useMemo(
    () =>
      ({
        firstName: _get(myProfile, 'firstName', ''),
        lastName: _get(myProfile, 'lastName', ''),
        email: _get(myProfile, 'email', ''),
        phoneNumber: _get(myProfile, 'phoneNumber', ''),
        gender: myProfile?.gender ? _get(myProfile, 'gender', 'N/A') : GenderType.Male,
      }) as AccountInformationFormValues,
    [myProfile],
  );

  const handleChangeAvatar = async (files: File[]) => {
    const formData = new FormData();
    _forEach(files, (file) => {
      formData.append('files', file);
    });
    await uploadAvatar(formData);
  };

  const handleSubmit = async (formValue: AccountInformationFormValues) => {
    await updateProfile(formValue);
  };

  if (errorMessage) {
    return <Alert type="error" message={errorMessage} />;
  }

  if (isLoading) {
    return (
      <Flex style={{ minHeight: '40vh' }}>
        <SpinLoading />
      </Flex>
    );
  }

  return (
    <>
      {contextHolder}
      {myProfile && (
        <MyProfileContainer>
          <Flex vertical gap={24}>
            <ProfileCard
              avatar={myProfile.avatar}
              name={myProfile.name}
              onSubmit={handleChangeAvatar}
              loading={loading}
            />
            <MyProfileForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onDisabled={(data) => setDisabledSubmitBtn(data)}
              loading={loading}
            />
            {errorMessageUpload && <Alert type="error" message={errorMessageUpload} />}
            <div style={{ marginLeft: 'auto' }}>
              <Button size="large" type="primary" htmlType="submit" disabled={disabledSubmitBtn} form={FORM_ID}>
                Save Changes
              </Button>
            </div>
          </Flex>
        </MyProfileContainer>
      )}
    </>
  );
};

export default ProfilePage;
