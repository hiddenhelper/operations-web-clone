import React, { memo, useCallback, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserRow from '../../../../../shared/ClientForm/UserRow';
import ButtonLoader from '../../../../../shared/ButtonLoader';

import { UserModel, GeneralModel } from '../../../../../../models';
import { userActiveRules } from '../../../../../../../constants/form/clientRules';
import { CloseIcon } from '../../../../../../../constants';
import { useForm } from '../../../../../../../utils/useForm';
import { useStyles as AssignModalStyles } from '../../../../../shared/Modal/components/AssignModal/styles';
import { useStyles as buttonStyles } from '../../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../../styles';
import { sanitizeUser } from '../../../../../../../utils/clientUtils';

export interface IEditTabProps {
  fetchUserloading: GeneralModel.ILoadingStatus;
  updateUserLoading: GeneralModel.ILoadingStatus;
  changeAssignTab: () => void;
  fetchGroupSearch: (searchRequest: any) => void;
  updateUserProfile?: (companyId: string, companyUserId: string, user: UserModel.IAccount) => void;
  groupList: any;
  companyId: string;
  companyUserProfile: UserModel.IUser | {};
}

const EditTab = ({
  fetchUserloading,
  updateUserLoading,
  changeAssignTab,
  fetchGroupSearch,
  updateUserProfile,
  groupList,
  companyUserProfile,
  companyId,
}: IEditTabProps) => {
  console.log(companyUserProfile);
  const classes = useStyles();
  const assignModalClasses = AssignModalStyles();
  const buttonClasses = buttonStyles();

  const onUpdate = useCallback(
    user => {
      const { email, firstName, lastName, mobilePhoneNumber, officePhoneNumber, officePhoneExtension, preferredContactMethod } = sanitizeUser(user);

      const userPayload = {
        email,
        firstName,
        lastName,
        mobilePhoneNumber,
        officePhoneNumber,
        officePhoneExtension,
        preferredContactMethod,
        resendInvitation: true,
      };
      updateUserProfile(companyId, user.id, userPayload);
    },
    [updateUserProfile, companyId]
  );

  const { model, errors, onChange, onSubmit, updateRules } = useForm<any>({
    initValues: { ...UserModel.getFallbackUser() } as any,
    formRules: userActiveRules({ assignClientRequired: false }),
    onSubmitCallback: onUpdate,
  });

  const updateFormModel = useCallback(user => onChange({ ...model, ...user, resendInvitation: true }), [model, onChange]);

  useEffect(() => {
    if (Number(model.preferredContactMethod) === UserModel.PreferredContactMethod.PHONE) {
      updateRules(rules => ({ ...rules, mobilePhoneNumber: { ...rules.mobilePhoneNumber, required: true } }));
    } else {
      updateRules(rules => ({ ...rules, mobilePhoneNumber: { ...rules.mobilePhoneNumber, required: false } }));
    }
  }, [model.preferredContactMethod, updateRules]);

  useEffect(() => {
    if (companyUserProfile) {
      updateFormModel(companyUserProfile);
    }
    // eslint-disable-next-line
  }, [companyUserProfile]);

  const finalErrors = { ...errors, ...(updateUserLoading ? updateUserLoading.error?.response?.errors : {}) };
  const getErrors = useCallback((field: string) => finalErrors && finalErrors[field], [finalErrors]);
  return (
    <>
      {!fetchUserloading ||
        (fetchUserloading && fetchUserloading.isLoading && (
          <div className={classes.loadingEditUserWrapper}>
            <Typography>Loading...</Typography>
          </div>
        ))}
      {fetchUserloading && !fetchUserloading.isLoading && Object.keys(companyUserProfile).length > 0 && (
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
              groupList={groupList}
              companyId={companyId}
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
      )}
    </>
  );
};

export default memo(EditTab);
