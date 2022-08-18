import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import PermissionGuard from 'modules/views/shared/PermissionGuard';
import Card from '../../../shared/ResourceManagement/Card';
import AssignEntity from '../../../shared/AssignEntity';
import AssignEntityOption from '../../../shared/AssignEntityOption';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';
import ControlledError from '../../../shared/FormHandler/ControlledError';
import PhoneNumberInput from '../../../shared/PhoneNumberInput';
import ControlledInput from '../../../shared/FormHandler/ControlledInput';
import ControlledDatePicker from '../../../shared/FormHandler/ControlledDatePicker';

import { ClientModel, GeneralModel, UserModel, WorkerModel } from '../../../../models';
import { getConditionalDefaultValue, isEmpty } from '../../../../../utils/generalUtils';
import { IFormRules } from '../../../../../utils/useValidator';
import { useStyles as datePickerStyles } from '../../../shared/FormHandler/ControlledDatePicker/styles';
import { inputGlobalStyles } from '../../../../../assets/styles';
import { useStyles } from '../styles';

export interface IRequiredInformationProps {
  isFcaUser: boolean;
  model: WorkerModel.IWorker;
  company: ClientModel.IClient;
  errors: any;
  uiRelationMap: GeneralModel.IRelationUiMap;
  loading: GeneralModel.ILoadingStatus;
  formRules: IFormRules;
  isEdit: boolean;
  onChange: (model: any) => void;
  onChangeHandler: (model: any) => void;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId: string) => void;
  fetchCompany: () => void;
  emailHasChanges: boolean;
  countryList?: GeneralModel.INamedEntity[];
  updateRules: (s: IFormRules | ((p: IFormRules) => IFormRules)) => void;
  selfCompany: ClientModel.IClient;
}

const RequiredInformation = ({
  isFcaUser,
  model,
  company,
  errors,
  uiRelationMap,
  loading,
  formRules,
  isEdit,
  onChange,
  searchCompanies,
  fetchCompany,
  onChangeHandler,
  emailHasChanges,
  countryList,
  updateRules,
  selfCompany,
}: IRequiredInformationProps) => {
  const inputGlobalClasses = inputGlobalStyles();
  const datePickerClasses = datePickerStyles();
  const classes = useStyles();
  const workerTempId = 'worker-company';
  const isLoading = useMemo(() => loading && loading.isLoading, [loading]);
  const hasProjects = useMemo(() => model.projectsCount > 0, [model.projectsCount]);
  const bothCondition = useMemo(() => model.inviteMethod === WorkerModel.InviteMethod.BOTH, [model.inviteMethod]);
  const emailCondition = useMemo(() => model.inviteMethod === WorkerModel.InviteMethod.EMAIL || bothCondition || isEmpty(model.inviteMethod), [
    model.inviteMethod,
    bothCondition,
  ]);
  const mobileCondition = useMemo(() => model.inviteMethod === WorkerModel.InviteMethod.MOBILE_PHONE || bothCondition, [model.inviteMethod, bothCondition]);
  const [canEditEmail, setCanEditEmail] = useState(!isEdit);
  const [canEditMobile, setCanEditMobile] = useState(!isEdit);
  const canEditInviteMethod = useMemo(() => model.invitationStatus !== WorkerModel.WorkerStatus.ACTIVE || !isEdit, [model.invitationStatus, isEdit]);

  useEffect(() => {
    setCanEditEmail(canEditInviteMethod || !emailCondition);
  }, [emailHasChanges, setCanEditEmail, emailCondition, canEditInviteMethod]);

  useEffect(() => {
    setCanEditMobile(canEditInviteMethod || !mobileCondition);
  }, [setCanEditMobile, mobileCondition, canEditInviteMethod]);

  const updateRestrictionRules = useCallback(
    (emailCallbackCondition: boolean, mobileCallbackCondition: boolean) => {
      updateRules(
        /* istanbul ignore next */ prev => ({
          ...prev,
          email: {
            ...prev.email,
            required: emailCallbackCondition,
          },
          mobilePhoneNumber: {
            ...prev.mobilePhoneNumber,
            required: mobileCallbackCondition,
          },
        })
      );
    },
    [updateRules]
  );

  useEffect(() => {
    updateRestrictionRules(emailCondition, mobileCondition);
  }, [emailCondition, mobileCondition, updateRestrictionRules]);

  const onChangeInviteMethod = useCallback(
    event => {
      event.persist();
      const bothOnChangeCondition = Number(event.target.value) === WorkerModel.InviteMethod.BOTH;
      const emailOnChangeCondition = Number(event.target.value) === WorkerModel.InviteMethod.MOBILE_PHONE || bothOnChangeCondition;
      const mobileOnChangeCondition = Number(event.target.value) === WorkerModel.InviteMethod.EMAIL || bothOnChangeCondition;
      updateRestrictionRules(emailOnChangeCondition, mobileOnChangeCondition);
      onChange(
        /* istanbul ignore next */ prevModel => ({
          ...prevModel,
          [event.target.name]: Number(event.target.value),
        })
      );
    },
    [onChange, updateRestrictionRules]
  );

  const onSelect = useCallback(
    (index: number, item, tempId: string) => {
      onChange(
        /* istanbul ignore next */ prevModel => ({
          ...prevModel,
          company: item,
        })
      );
    },
    [onChange]
  );

  const onReset = useCallback(() => {
    onChange(
      /* istanbul ignore next */ prevModel => ({
        ...prevModel,
        company: null,
      })
    );
  }, [onChange]);

  const clientRenderOption = useCallback((option, inputValue) => <AssignEntityOption option={option} inputValue={inputValue} />, []);

  const emailIsRequired = useCallback(emailErrorParam => (emailErrorParam === 'is required' ? 'Email is required.' : errors.email), [errors.email]);

  const emailError = useMemo(
    () => (!!errors.email && errors.email === 'Please enter a valid Email Address.' ? 'Please enter a valid Email.' : emailIsRequired(errors.email)),
    [errors.email, emailIsRequired]
  );

  const mobileIsRequired = useCallback(
    mobilePhoneNumberErrorParam => (mobilePhoneNumberErrorParam === 'is required' ? 'Mobile Phone Number is required.' : errors.mobilePhoneNumber),
    [errors.mobilePhoneNumber]
  );

  const mobilePhoneError = useMemo(
    () =>
      !!errors.mobilePhoneNumber && errors.mobilePhoneNumber === 'Please enter a valid Mobile Phone Number.'
        ? 'Please enter a valid Mobile Phone Number.'
        : mobileIsRequired(errors.mobilePhoneNumber),
    [errors.mobilePhoneNumber, mobileIsRequired]
  );

  const inviteMethodValue = useMemo(() => (isEmpty(model.inviteMethod) ? 2 : Number(model.inviteMethod)), [model.inviteMethod]);

  useEffect(() => {
    if (!isFcaUser && !company) fetchCompany();
  }, [isFcaUser, company, fetchCompany]);

  useEffect(() => {
    if (!isFcaUser) {
      console.log('item', selfCompany);
      onChange(
        /* istanbul ignore next */ prevModel => ({
          ...prevModel,
          company: selfCompany,
        })
      );
    }
    // eslint-disable-next-line
  }, [isFcaUser]);

  const today = new Date();
  return (
    <Card title="Required Information">
      <Grid container={true} className={classes.workerFormContainer}>
        <PermissionGuard permissionsExpression={UserModel.ClientsPermission.VIEWACCESS}>
          {isFcaUser && (
            <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12}>
              <div className={inputGlobalClasses.inputPaddingBottom}>
                <div className={classes.errorInputWrapper}>
                  <ControlledError
                    show={!!errors.company}
                    error={getConditionalDefaultValue(errors?.company === 'is required', 'Client Name is required.', errors.company)}
                  >
                    <AssignEntity
                      index={0}
                      tempId={workerTempId}
                      optionLabel="name"
                      result={uiRelationMap[workerTempId]?.searchResult || []}
                      isLoading={isLoading}
                      showCreateNew={false}
                      assignValue={model.company}
                      placeholder="Client Name"
                      existRelation={uiRelationMap && uiRelationMap[workerTempId]}
                      onSelect={onSelect}
                      search={searchCompanies}
                      renderOption={clientRenderOption}
                      onReset={onReset}
                      showError={!!errors.company}
                      disabled={hasProjects}
                    />
                  </ControlledError>
                </div>
              </div>
            </Grid>
          )}
        </PermissionGuard>

        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.firstName}
              error={!!errors.firstName && errors.firstName === 'is required' ? 'First Name is required.' : errors.firstName}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="First Name" styleClass={inputGlobalClasses.inputPaddingBottom}>
                <TextField
                  variant="outlined"
                  data-testid="worker-first-name-wrapper"
                  placeholder="First Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="firstName"
                  required={formRules.firstName?.required}
                  value={model.firstName || ''}
                  onChange={onChangeHandler}
                  error={!!errors.firstName}
                  inputProps={{
                    'data-testid': 'worker-firstName',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.middleName}
              error={!!errors.middleName && errors.middleName === 'is required' ? 'Middle Name is required.' : errors.middleName}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Middle Name (Optional)" styleClass={inputGlobalClasses.inputPaddingBottom}>
                <TextField
                  variant="outlined"
                  data-testid="worker-middle-name-wrapper"
                  placeholder="Middle Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="middleName"
                  required={formRules.middleName?.required}
                  value={model.middleName}
                  onChange={onChangeHandler}
                  error={!!errors.middleName}
                  inputProps={{
                    'data-testid': 'worker-middleName',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.lastName}
              error={getConditionalDefaultValue(errors?.lastName === 'is required', 'Last Name is required.', errors.lastName)}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Last Name" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-last-name-wrapper"
                  placeholder="Last Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="lastName"
                  required={formRules.lastName?.required}
                  value={model.lastName || ''}
                  onChange={onChangeHandler}
                  error={!!errors.lastName}
                  inputProps={{
                    'data-testid': 'worker-lastName',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.dateOfBirth}
              error={getConditionalDefaultValue(errors?.dateOfBirth === 'is required', 'Date of Birth is required.', errors.dateOfBirth)}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Date of Birth" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledDatePicker
                  placeholder="Date of Birth"
                  variant="outlined"
                  name="dateOfBirth"
                  styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput} ${datePickerClasses.fullWidth}`}
                  value={model.dateOfBirth}
                  error={!!errors.dateOfBirth}
                  onChange={onChangeHandler}
                  invalidDateMessage={''}
                  endDate={today.toString()}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.email} error={emailError} styleClass={classes.errorPosition}>
              <ControlledInput label={`Email ${formRules.email?.required ? '' : '(Optional)'}`} styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-email-wrapper"
                  placeholder="Email"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="email"
                  required={formRules.email?.required}
                  value={model.email || ''}
                  onChange={onChangeHandler}
                  error={!!errors.email}
                  disabled={!canEditEmail}
                  inputProps={{
                    'data-testid': 'worker-email',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xs={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.mobilePhoneNumber} error={mobilePhoneError} styleClass={classes.errorPosition}>
              <ControlledInput
                label={`Mobile Phone ${formRules.mobilePhoneNumber?.required ? '' : '(Optional)'}`}
                styleClass={`${inputGlobalClasses.inputPaddingBottom}`}
              >
                <PhoneNumberInput
                  countryList={countryList}
                  value={model.mobilePhoneNumber || ''}
                  className="contact-information-mobile"
                  onChange={onChangeHandler}
                  disabled={!canEditMobile}
                  inputProps={{
                    variant: 'outlined',
                    error: errors.mobilePhoneNumber,
                    name: 'mobilePhoneNumber',
                    required: formRules.mobilePhoneNumber?.required,
                    'data-testid': 'mobile-worker-phone',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xs={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.phoneNumber}
              error={!!errors.phoneNumber && errors.phoneNumber === 'is invalid phone number' ? 'Please enter a valid Alternate Phone.' : errors.phoneNumber}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Alternate Phone (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <PhoneNumberInput
                  countryList={countryList}
                  value={model.phoneNumber || ''}
                  onChange={onChangeHandler}
                  inputProps={{
                    variant: 'outlined',
                    error: errors.phoneNumber,
                    name: 'phoneNumber',
                    required: formRules.phoneNumber?.required,
                    'data-testid': 'worker-phone',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xs={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledInput label="Invite Method">
              <ControlledRadio
                row={true}
                containerStyleClass={classes.inviteMethodInput}
                radioItems={WorkerModel.InviteMethodValues}
                disabled={!canEditInviteMethod}
                formControlProps={{
                  name: 'inviteMethod',
                  label: '',
                  value: inviteMethodValue,
                  onChange: onChangeInviteMethod,
                }}
              />
            </ControlledInput>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default memo(RequiredInformation);
