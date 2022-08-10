import React, { memo, useMemo, useCallback, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserRow from '../../../../../shared/ClientForm/UserRow';
import ControlledSelect from '../../../../../shared/FormHandler/ControlledSelect';
import ControlledInput from '../../../../../shared/FormHandler/ControlledInput';
import ControlledError from '../../../../../shared/FormHandler/ControlledError';
import ButtonLoader from '../../../../../shared/ButtonLoader';

import { UserModel, ClientModel, GeneralModel } from '../../../../../../models';
import { userActiveRules } from '../../../../../../../constants/form/clientRules';
import { CloseIcon } from '../../../../../../../constants';
import { useForm } from '../../../../../../../utils/useForm';
import { sanitizeUser } from '../../../../../../../utils/clientUtils';
import { getConditionalDefaultValue } from '../../../../../../../utils/generalUtils';
import { useStyles as AssignModalStyles } from '../../../../../shared/Modal/components/AssignModal/styles';
import { useStyles as buttonStyles } from '../../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../../styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface ICreateTabProps {
  userCompanyId: string;
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  saveUserLoading: GeneralModel.ILoadingStatus;
  changeAssignTab: () => void;
  saveUser: (companyId: string, user: UserModel.IUser) => void;
  fetchGroupSearch: (searchRequest: any) => void;
  groupList: any;
  isFcaUser: boolean;
  isAdmin: boolean;
}

const CreateTab = ({
  isFcaUser,
  isAdmin,
  userCompanyId,
  clientMap,
  saveUserLoading,
  changeAssignTab,
  saveUser,
  fetchGroupSearch,
  groupList,
}: ICreateTabProps) => {
  const classes = useStyles();
  const assignModalClasses = AssignModalStyles();
  const buttonClasses = buttonStyles();
  const clientList = useMemo(() => Object.values(clientMap).map(item => ({ value: item.id, label: item.name })), [clientMap]);
  const isFcAdmin = useMemo(() => isFcaUser && isAdmin, [isFcaUser, isAdmin]);

  const onCreate = useCallback(user => saveUser(getConditionalDefaultValue(isFcAdmin, user.assignClient, userCompanyId), sanitizeUser(user)), [
    saveUser,
    userCompanyId,
    isFcAdmin,
  ]);

  const { model, errors, onChange, onSubmit, updateRules } = useForm<any>({
    initValues: { ...UserModel.getFallbackUser(), assignClient: '' } as any,
    formRules: userActiveRules({ assignClientRequired: isFcAdmin }),
    onSubmitCallback: onCreate,
  });

  const onChangeClient = useCallback(
    event => {
      event.persist();
      onChange(prevModel => ({ ...prevModel, assignClient: event.target.value }));
    },
    [onChange]
  );

  useEffect(() => {
    if (Number(model.preferredContactMethod) === UserModel.PreferredContactMethod.PHONE) {
      updateRules(rules => ({ ...rules, mobilePhoneNumber: { ...rules.mobilePhoneNumber, required: true } }));
    } else {
      updateRules(rules => ({ ...rules, mobilePhoneNumber: { ...rules.mobilePhoneNumber, required: false } }));
    }
  }, [model.preferredContactMethod, updateRules]);

  const finalErrors = { ...errors, ...(saveUserLoading ? saveUserLoading.error?.response?.errors : {}) };
  const getErrors = useCallback((field: string) => finalErrors && finalErrors[field], [finalErrors]);
  return (
    <div className={classes.createUserWrapper}>
      <div className={classes.createUserHeader}>
        <Typography className={classes.createUserTitle}>Create New User</Typography>
        <Button disableRipple={true} className={classes.createUserCloseButton} data-testid="tab-assign-list-btn" onClick={changeAssignTab}>
          <CloseIcon />
        </Button>
      </div>
      {isFcAdmin && (
        <div className={`${classes.createUserAssignWrapper} ${classes.errorPosition}`}>
          <div className={classes.createUserAssignInput}>
            <ControlledError
              show={!!getErrors('assignClient')}
              error={getErrors('assignClient') === 'is required' ? 'Please enter Client.' : getErrors('assignClient')}
            >
              <ControlledInput label="Assign to">
                <ControlledSelect
                  includeNone={true}
                  dataTestId="client-list-select"
                  name="assignClient"
                  value={model.assignClient}
                  options={clientList}
                  error={!!getErrors('assignClient')}
                  onChange={onChangeClient}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </div>
      )}
      <div className={classes.createUserRowWrapper}>
        <UserRow
          user={model}
          index={0}
          showDeleteButton={false}
          hideDeleteContainer={true}
          getErrors={getErrors}
          onChange={onChange}
          fetchGroupSearch={fetchGroupSearch}
          companyId={isFcAdmin ? model.assignClient : userCompanyId}
          groupList={groupList}
          isFcAdmin={isFcAdmin}
        />
      </div>
      <PermissionGuard permissionsExpression={UserModel.UsersPermission.MANAGE}>
        <ButtonLoader
          className={`${buttonClasses.saveButton} ${assignModalClasses.assignButtonWidth} ${classes.noMargin} ${classes.createUserButtonPosition}`}
          color="primary"
          variant="contained"
          data-testid="create-user-btn"
          onClick={onSubmit}
          text="Create User"
          loadingText="Creating..."
          isLoading={saveUserLoading && saveUserLoading.isLoading}
        />
      </PermissionGuard>
    </div>
  );
};

export default memo(CreateTab);
