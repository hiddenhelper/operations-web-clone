import React, { memo, useMemo, useCallback, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserRow from '../../../../../shared/ClientForm/UserRow';
import ButtonLoader from '../../../../../shared/ButtonLoader';

import { UserModel, ClientModel, GeneralModel } from '../../../../../../models';
import { userActiveRules } from '../../../../../../../constants/form/clientRules';
import { CloseIcon } from '../../../../../../../constants';
import { useForm } from '../../../../../../../utils/useForm';
import { useStyles as AssignModalStyles } from '../../../../../shared/Modal/components/AssignModal/styles';
import { useStyles as buttonStyles } from '../../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../../styles';

export interface IEditTabProps {
  userRole: UserModel.Role;
  updateUserLoading: GeneralModel.ILoadingStatus;
  changeAssignTab: () => void;
  fetchGroupSearch: (searchRequest: any) => void;
  groupList: any;
}

const EditTab = ({ userRole, updateUserLoading, changeAssignTab, fetchGroupSearch, groupList }: IEditTabProps) => {
  const classes = useStyles();
  const assignModalClasses = AssignModalStyles();
  const buttonClasses = buttonStyles();
  const isFcAdmin = useMemo(() => userRole === UserModel.Role.FCA_ADMIN, [userRole]);

  const onUpdate = useCallback(user => console.log(user), []);

  const { model, errors, onChange, onSubmit, updateRules } = useForm<any>({
    initValues: { ...UserModel.getFallbackUser(), assignClient: '' } as any,
    formRules: userActiveRules({ assignClientRequired: isFcAdmin }),
    onSubmitCallback: onUpdate,
  });

  useEffect(() => {
    if (Number(model.preferredContactMethod) === UserModel.PreferredContactMethod.PHONE) {
      updateRules(rules => ({ ...rules, mobilePhoneNumber: { ...rules.mobilePhoneNumber, required: true } }));
    } else {
      updateRules(rules => ({ ...rules, mobilePhoneNumber: { ...rules.mobilePhoneNumber, required: false } }));
    }
  }, [model.preferredContactMethod, updateRules]);

  const finalErrors = { ...errors, ...(updateUserLoading ? updateUserLoading.error?.response?.errors : {}) };
  const getErrors = useCallback((field: string) => finalErrors && finalErrors[field], [finalErrors]);
  return (
    <div className={classes.createUserWrapper}>
      <div className={classes.createUserHeader}>
        <Typography className={classes.createUserTitle}>Edit User</Typography>
        <Button disableRipple={true} className={classes.createUserCloseButton} data-testid="tab-assign-list-btn" onClick={changeAssignTab}>
          <CloseIcon />
        </Button>
      </div>
      <div className={classes.createUserRowWrapper}>
        <UserRow
          user={model}
          index={0}
          showDeleteButton={false}
          hideDeleteContainer={true}
          getErrors={getErrors}
          onChange={onChange}
          fetchGroupSearch={fetchGroupSearch}
          companyId={model.assignClient}
          groupList={groupList}
        />
      </div>
      <ButtonLoader
        className={`${buttonClasses.saveButton} ${assignModalClasses.assignButtonWidth} ${classes.noMargin} ${classes.createUserButtonPosition}`}
        color="primary"
        variant="contained"
        data-testid="create-user-btn"
        onClick={onSubmit}
        text="Update User"
        loadingText="Updating..."
        isLoading={updateUserLoading && updateUserLoading.isLoading}
      />
    </div>
  );
};

export default memo(EditTab);
