import React, { memo, useCallback, useMemo } from 'react';

import ProfileTab from './components/Profile';
import PasswordTab from './components/Password';
import IntegrationsTab from './components/Integrations';
import ButtonTab from '../../shared/ButtonTab';
import SettingsLayout from '../../shared/Settings/Layout';

import { FileModel, GeneralModel, ResourceModel, UserModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';

export interface ISettingsProps {
  userRole: UserModel.Role;
  user: UserModel.IUser;
  accountData: UserModel.IAccount;
  changePasswordLoading: GeneralModel.ILoadingStatus;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  saveLoading: GeneralModel.ILoadingStatus;
  loadingMap: GeneralModel.IEntityMap<GeneralModel.ILoadingStatus>;
  isFcaUser: boolean;
  isAdmin: boolean;
  changePassword: (currentPassword, newPassword) => void;
  clearChangePasswordLoading: () => void;
  updateProfile: (data: UserModel.IAccount) => void;
  updateProfilePhoto: () => void;
  getAccountData: () => void;
  clearFileUpload: () => void;
  status: { isConnected: boolean };
  getStatusProcore: () => void;
  connectProcore: (data) => void;
  disconnectProcore: () => void;
  countryList?: GeneralModel.INamedEntity[];
  saveProcoreLoading: any;
  disconnectProcoreLoading: any;
}

export interface IQueryParams {
  filter: string;
}

const Settings = ({
  userRole,
  user,
  changePasswordLoading,
  accountData,
  fileMap,
  saveLoading,
  loadingMap,
  isFcaUser,
  isAdmin,
  changePassword,
  clearChangePasswordLoading,
  updateProfile,
  getAccountData,
  updateProfilePhoto,
  clearFileUpload,
  status,
  getStatusProcore,
  connectProcore,
  disconnectProcore,
  countryList,
  saveProcoreLoading,
}: ISettingsProps) => {
  const [queryParams, setQueryParams] = useQueryParamState<IQueryParams>({
    filter: ResourceModel.settingsFilterMap[ResourceModel.SettingsFilterType.PROFILE].key,
  });

  const filterList = useMemo(() => Object.values(ResourceModel.settingsFilterMap).filter(item => item.roleList.includes(userRole)), [userRole]);

  const setFilter = useCallback(
    (filter: number) => {
      setQueryParams({ filter: ResourceModel.settingsFilterMap[filter].key });
    },
    [setQueryParams]
  );
  return (
    <SettingsLayout
      title="Account Settings"
      renderFilter={() => (
        <>
          {filterList.map(optFilter => (
            <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={optFilter.key === queryParams.filter} setFilter={setFilter} />
          ))}
        </>
      )}
      renderContent={() => (
        <>
          {queryParams.filter === 'profile' && (
            <ProfileTab
              user={user}
              isFcaUser={isFcaUser}
              isAdmin={isAdmin}
              accountData={accountData}
              fileMap={fileMap}
              saveLoading={saveLoading}
              loadingMap={loadingMap}
              updateProfile={updateProfile}
              getAccountData={getAccountData}
              updateProfilePhoto={updateProfilePhoto}
              clearFileUpload={clearFileUpload}
              countryList={countryList}
            />
          )}
          {queryParams.filter === 'password' && (
            <PasswordTab changePassword={changePassword} loading={changePasswordLoading} clearLoading={clearChangePasswordLoading} />
          )}
          {queryParams.filter === 'integrations' && userRole === 'CLIENT_ADMIN' && (
            <IntegrationsTab
              saveProcoreLoading={saveProcoreLoading}
              status={status}
              getStatusProcore={getStatusProcore}
              connectProcore={connectProcore}
              disconnectProcore={disconnectProcore}
            />
          )}
        </>
      )}
    />
  );
};

export default memo(Settings);
