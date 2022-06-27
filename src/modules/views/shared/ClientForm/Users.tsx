import React, { memo, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';

import { UserModel, GeneralModel } from '../../../models';
import { AddIcon, LANG } from '../../../../constants';
import { isUserEmpty } from '../../../../constants/form/clientRules';
import { formGlobalStyles } from '../../../../assets/styles';
import { useStyles as buttonStyles } from '../../shared/FormHandler/ControlledButton/styles';

import Card from '../ResourceManagement/Card';
import ControlledButton from '../FormHandler/ControlledButton';
import UserRow from './UserRow';
import { getConditionalDefaultValue } from '../../../../utils/generalUtils';

export interface IUsersProps {
  userList: UserModel.IUser[];
  errors: any;
  onChange: (event: any) => void;
  countryList?: GeneralModel.INamedEntity[];
  fetchGroupSearch: (searchRequest: any) => void;
  companyId: string;
  groupList: any;
  userRole: UserModel.Role;
}

const Users = ({ userRole, userList = [], errors, onChange, countryList, groupList, fetchGroupSearch, companyId }: IUsersProps) => {
  const isFcAdmin = useMemo(() => userRole === UserModel.Role.FCA_ADMIN, [userRole]);
  const formClasses = formGlobalStyles();
  const buttonGlobalStyles = buttonStyles();
  const currentUserList = useMemo(() => getConditionalDefaultValue(userList.length === 0, [UserModel.getFallbackUser()], userList), [userList]);
  const getErrors = useCallback(
    (field, index) => {
      const errorIndex = `users[${index}].${field}`;
      if (errors && errors[errorIndex]) return errors[errorIndex];
      if (errors && errors.users) return errors.users[`users[${index}].${field}`];
    },
    [errors]
  );
  const onChangeHandler = useCallback(
    (user: UserModel.IUser, index: number) => {
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          users: [...currentUserList.slice(0, index), user, ...currentUserList.slice(index + 1, currentUserList.length)],
        })
      );
    },
    [currentUserList, onChange]
  );
  const addUser = useCallback(() => {
    const lastUser = currentUserList[currentUserList.length - 1];
    /* istanbul ignore else */ if (!isUserEmpty(lastUser)) {
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          users: [...currentUserList, UserModel.getFallbackUser()],
        })
      );
    }
  }, [currentUserList, onChange]);
  const deleteUser = useCallback(
    index => {
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          users: currentUserList.length > 0 ? [...currentUserList].filter((u, i) => i !== index) : [UserModel.getFallbackUser()],
        })
      );
    },
    [currentUserList, onChange]
  );
  const showDelete = useMemo(() => currentUserList.length > 1, [currentUserList]);
  const showAdd = useMemo(() => !isUserEmpty(currentUserList[currentUserList.length - 1]), [currentUserList]);

  return (
    <Card title="Add Users" showAttentionIcon={true} actionStyleClass={formClasses.userAction} secondaryAction={LANG.EN.USERS.ADMIN_REQUIRED}>
      {currentUserList.map((user, index) => (
        <UserRow
          key={index}
          index={index}
          user={user}
          getErrors={getErrors}
          onChange={onChangeHandler}
          onDeleteUser={deleteUser}
          showDeleteButton={showDelete}
          countryList={countryList}
          fetchGroupSearch={fetchGroupSearch}
          companyId={companyId}
          groupList={groupList}
          isFcAdmin={isFcAdmin}
        />
      ))}
      <ControlledButton>
        <Button
          disableRipple={true}
          startIcon={<AddIcon />}
          className={`${buttonGlobalStyles.addUserButton} ${getConditionalDefaultValue(showAdd, formClasses.enableUserButton, formClasses.disableUserButton)}`}
          data-testid="add-user-button"
          onClick={addUser}
        >
          Add user
        </Button>
      </ControlledButton>
    </Card>
  );
};

export default memo(Users);
