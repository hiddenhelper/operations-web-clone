import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import SettingsTab from '../../../../shared/Settings/Tab';
import ProfileUpload from '../../../../shared/UserForm/Profile/components/ProfileUpload';
import Profile from '../../../../shared/UserForm/Profile';

import { FileModel, GeneralModel, UserModel } from '../../../../../models';
import { GENERAL, FormRules } from '../../../../../../constants';
import { useForm } from '../../../../../../utils/useForm';
import { getImageUrl, sanitizeAccountData } from '../../../../../../utils/generalUtils';

export interface IProfileTabProps {
  user: UserModel.IUser;
  isFcaUser: boolean;
  isAdmin: boolean;
  accountData: UserModel.IAccount;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  saveLoading: GeneralModel.ILoadingStatus;
  loadingMap: GeneralModel.IEntityMap<GeneralModel.ILoadingStatus>;
  updateProfile: (data: UserModel.IAccount) => void;
  getAccountData: () => void;
  updateProfilePhoto: () => void;
  clearFileUpload: () => void;
  countryList?: GeneralModel.INamedEntity[];
}

const ProfileTab = ({
  user,
  isFcaUser,
  isAdmin,
  accountData,
  fileMap,
  saveLoading,
  loadingMap,
  updateProfile,
  getAccountData,
  updateProfilePhoto,
  clearFileUpload,
  countryList,
}: IProfileTabProps) => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [url, setProfilePicture] = useState<any>(null);

  const onUpdateProfile = useCallback(
    (data: UserModel.IAccount) => {
      updateProfile(sanitizeAccountData(data));
    },
    [updateProfile]
  );

  const { model, formRules, errors, hasChanges, onSubmit, onChange, update, discardChanges, setHasChanges } = useForm<UserModel.IAccount>({
    initValues: FormRules.account.getAccountInitialData(isFcaUser, isAdmin),
    formRules: FormRules.account.getAccountRules(isFcaUser, isAdmin),
    onSubmitCallback: onUpdateProfile,
  });

  const profilePicture = useMemo(() => fileMap.profilePhoto && Object.values(fileMap.profilePhoto)[0], [fileMap]);

  const pendingFile = useMemo(
    () => profilePicture && (profilePicture.status === FileModel.FileStatus.INACTIVE || profilePicture.status === FileModel.FileStatus.PROGRESS),
    [profilePicture]
  );

  const onSubmitHandler = useCallback(() => {
    /* istanbul ignore else */
    if (!profilePicture?.error) {
      onSubmit();
    }
    /* istanbul ignore else */
    if (pendingFile) {
      setInProgress(true);
      updateProfilePhoto();
    }
  }, [pendingFile, profilePicture, onSubmit, updateProfilePhoto]);

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prev => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onDiscard = useCallback(() => {
    discardChanges();
    setProfilePicture(accountData?.pictureUrl);
    clearFileUpload();
  }, [accountData, setProfilePicture, discardChanges, clearFileUpload]);

  useEffect(() => {
    if (!accountData) {
      getAccountData();
    } else {
      /* istanbul ignore else */
      if (!profilePicture) setProfilePicture(accountData?.pictureUrl);
      update({ ...accountData, email: user.email });
    }
  }, [accountData, user, getAccountData, update, setProfilePicture, profilePicture]);

  useEffect(() => {
    if (profilePicture?.file) {
      setProfilePicture(getImageUrl(profilePicture?.file));
      setHasChanges(true);
    }
  }, [profilePicture?.file, setHasChanges, setProfilePicture]); // eslint-disable-line

  useEffect(() => {
    if (
      inProgress &&
      saveLoading &&
      !saveLoading.isLoading &&
      loadingMap &&
      !Object.values(loadingMap).find(
        /* istanbul ignore next */ (item: any) => item && item?.traceId && item.traceId === GENERAL.TRACE_KEY.SAVE_UPLOAD_PROFILE_PHOTO
      )
    ) {
      setInProgress(false);
      getAccountData();
    }
  }, [inProgress, saveLoading, loadingMap, profilePicture, getAccountData]);
  return (
    <SettingsTab
      renderWrapperContent={() => (
        <>
          <ProfileUpload profilePictureUrl={url} error={profilePicture?.error} />
          <Profile
            model={model}
            formRules={formRules}
            errors={errors}
            account={accountData}
            loading={saveLoading?.isLoading || inProgress}
            hasChanges={hasChanges}
            onDiscard={onDiscard}
            onSubmit={onSubmitHandler}
            onChange={onChangeHandler}
            countryList={countryList}
            isFcaUser={isFcaUser}
          />
        </>
      )}
    />
  );
};

export default memo(ProfileTab);
