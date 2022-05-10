import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Grid, TextField } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledDatePicker from 'modules/views/shared/FormHandler/ControlledDatePicker';

import { ConsentFormModel, GeneralModel, WorkerModel } from 'modules/models';
import { getFormattedOptionList, isEmpty, moneyMask } from 'utils/generalUtils';
import { IFormRules } from 'utils/useValidator';

import { useStyles as datePickerStyles } from 'modules/views/shared/FormHandler/ControlledDatePicker/styles';
import { fullScreenModalGlobalStyles } from 'assets/styles';
import PhoneNumberInput from 'modules/views/shared/PhoneNumberInput';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput';

export interface IProjectInformationProps {
  model: ConsentFormModel.IProjectInformationForm;
  projectInformationData: { [key: string]: ConsentFormModel.IConsentFormField };
  formRules: IFormRules;
  errors: any;
  onChange: (event: any) => void;
  countryList: GeneralModel.INamedEntity[];
  jobTitlesList: WorkerModel.IJobTitle[];
  socJobTitlesList: WorkerModel.ISocJobTitle[];
  tradeStatusesList: WorkerModel.ITradeStatus[];
  languageTurnerProtocolsList: WorkerModel.ILanguageTurnerProtocol[];
  skilledTradeList: WorkerModel.ISkilledTrade[];
  updateRules: (s: IFormRules | ((p: IFormRules) => IFormRules)) => void;
}

const optionalVariant = (label: string) => `${label} (Optional)`;
const isOptionalLabel = (isMandatory: boolean, label: string) => `${isMandatory ? label : optionalVariant(label)}`;

const ProjectInformation = ({
  formRules,
  projectInformationData,
  model,
  errors,
  onChange,
  countryList,
  jobTitlesList,
  socJobTitlesList,
  tradeStatusesList,
  languageTurnerProtocolsList,
  skilledTradeList,
  updateRules,
}: IProjectInformationProps) => {
  const [showOtherTradeInput, setShowOtherTradeInput] = useState<boolean>(false);
  const datePickerClasses = datePickerStyles();
  const modalClasses = fullScreenModalGlobalStyles();
  const section3EmployeeValue = useMemo(() => (model.section3Employee === null ? '' : Number(model.section3Employee)), [model.section3Employee]);
  const section3ResidentValue = useMemo(() => (model.section3Resident === null ? '' : Number(model.section3Resident)), [model.section3Resident]);
  const stepStatusValue = useMemo(() => (model.stepStatus === null ? '' : Number(model.stepStatus)), [model.stepStatus]);
  const eligibleToWorkInUsValue = useMemo(() => (model.eligibleToWorkInUs === null ? '' : Number(model.eligibleToWorkInUs)), [model.eligibleToWorkInUs]);
  const lgbtqValue = useMemo(() => (model.lgbtq === null ? '' : Number(model.lgbtq)), [model.lgbtq]);

  const yearsOfExperienceValue = useMemo(() => (!model.yearsOfExperience || model.yearsOfExperience === 0 ? '' : model.yearsOfExperience), [
    model.yearsOfExperience,
  ]);
  const paymentTypeValue = useMemo(() => (!model.paymentType || model.paymentType === 0 ? '' : model.paymentType), [model.paymentType]);

  const jobTitleOptions = useMemo(() => jobTitlesList.map(getFormattedOptionList), [jobTitlesList]);
  const socJobTitleOptions = useMemo(() => socJobTitlesList.map(getFormattedOptionList), [socJobTitlesList]);
  const tradeStatusOptions = useMemo(() => tradeStatusesList.map(getFormattedOptionList), [tradeStatusesList]);
  const languageTurnerProtocolOptions = useMemo(() => languageTurnerProtocolsList.map(getFormattedOptionList), [languageTurnerProtocolsList]);
  const skilledTradeOptions = useMemo(() => skilledTradeList.map(getFormattedOptionList), [skilledTradeList]);

  const selectedSkilledTradeOption = useMemo(() => skilledTradeOptions?.find(item => item.value === model?.projectSkilledTradeId), [
    model,
    skilledTradeOptions,
  ]);

  useEffect(() => {
    if (!selectedSkilledTradeOption) return;
    if (selectedSkilledTradeOption.label === 'Other') {
      setShowOtherTradeInput(true);
      updateRules(prevRules => ({ ...prevRules, otherProjectSkilledTrade: { ...prevRules.otherProjectSkilledTrade, required: true } }));
    } else {
      onChange(prevState => ({ ...prevState, otherProjectSkilledTrade: null }));
      setShowOtherTradeInput(false);
      updateRules(prevRules => ({ ...prevRules, otherProjectSkilledTrade: { ...prevRules.otherProjectSkilledTrade, required: false } }));
    }
  }, [onChange, selectedSkilledTradeOption, updateRules]);

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: isEmpty(event.target.value) ? null : event.target.value,
      }));
    },
    [onChange]
  );
  const onBooleanChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: isEmpty(event.target.value) ? null : !!Number(event.target.value),
      }));
    },
    [onChange]
  );

  return (
    <Card styleClass={modalClasses.projectFormModal} title="Project Information">
      <Grid className={modalClasses.projectFormPaddingTop} spacing={2} container={true}>
        {projectInformationData?.PROJECT_SKILLED_TRADE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.projectSkilledTradeId}
              error={
                errors.projectSkilledTradeId && errors.projectSkilledTradeId === 'is required'
                  ? `Please enter ${projectInformationData?.PROJECT_SKILLED_TRADE.name}.`
                  : errors.projectSkilledTradeId
              }
            >
              <ControlledSelect
                label={isOptionalLabel(formRules?.projectSkilledTradeId.required, projectInformationData.PROJECT_SKILLED_TRADE.name)}
                name="projectSkilledTradeId"
                includeNone={true}
                value={model.projectSkilledTradeId ?? ''}
                options={skilledTradeOptions}
                onChange={onChangeHandler}
                error={!!errors.projectSkilledTradeId}
                dataTestId="consentform-projectSkilledTrade"
              />
            </ControlledError>
          </Grid>
        )}
        {showOtherTradeInput && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.otherProjectSkilledTrade}
              error={
                errors.otherProjectSkilledTrade && errors.otherProjectSkilledTrade === 'is required'
                  ? 'Please enter Other Project Trade.'
                  : errors.otherProjectSkilledTrade
              }
            >
              <ControlledInput label="Other Project Trade">
                <TextField
                  variant="outlined"
                  placeholder="Other Project Trade"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="otherProjectSkilledTrade"
                  required={formRules?.otherProjectSkilledTrade.required}
                  value={model.otherProjectSkilledTrade || ''}
                  onChange={onChangeHandler}
                  error={!!errors.otherProjectSkilledTrade}
                  inputProps={{ 'data-testid': 'consentform-otherProjectSkilledTrade' }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.HARD_HAT_NUMBER && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.hardHatNumber}
              error={errors.hardHatNumber && errors.hardHatNumber === 'is required' ? 'Please enter Hard Hat Number.' : errors.hardHatNumber}
            >
              <ControlledInput label={isOptionalLabel(formRules?.hardHatNumber.required, projectInformationData.HARD_HAT_NUMBER.name)}>
                <TextField
                  variant="outlined"
                  placeholder={projectInformationData.HARD_HAT_NUMBER.name}
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="hardHatNumber"
                  required={formRules?.hardHatNumber.required}
                  value={model.hardHatNumber || ''}
                  onChange={onChangeHandler}
                  error={!!errors.hardHatNumber}
                  inputProps={{ 'data-testid': 'consentform-hardHatNumber' }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.JOB_TITLE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.jobTitleId}
              error={errors.jobTitleId && errors.jobTitleId === 'is required' ? `Please enter ${projectInformationData?.JOB_TITLE.name}.` : errors.jobTitleId}
            >
              <ControlledSelect
                label={isOptionalLabel(formRules?.jobTitleId.required, projectInformationData.JOB_TITLE.name)}
                name="jobTitleId"
                includeNone={true}
                value={model.jobTitleId ?? ''}
                options={jobTitleOptions}
                onChange={onChangeHandler}
                error={!!errors.jobTitleId}
                dataTestId="consentform-jobTitle"
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.TRADE_STATUS && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.tradeStatusId}
              error={
                errors.tradeStatusId && errors.tradeStatusId === 'is required'
                  ? `Please enter ${projectInformationData?.TRADE_STATUS.name}.`
                  : errors.tradeStatusId
              }
            >
              <ControlledSelect
                label={isOptionalLabel(formRules?.tradeStatusId.required, projectInformationData.TRADE_STATUS.name)}
                name="tradeStatusId"
                includeNone={true}
                value={model.tradeStatusId ?? ''}
                options={tradeStatusOptions}
                onChange={onChangeHandler}
                error={!!errors.tradeStatusId}
                dataTestId="consentform-tradeStatus"
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.SUPERVISOR_NAME && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.supervisorName}
              error={errors.supervisorName && errors.supervisorName === 'is required' ? 'Please enter Supervisor Name.' : errors.supervisorName}
            >
              <ControlledInput label={isOptionalLabel(formRules?.supervisorName.required, projectInformationData.SUPERVISOR_NAME.name)}>
                <TextField
                  variant="outlined"
                  data-testid="consentform-name-wrapper"
                  placeholder={projectInformationData.SUPERVISOR_NAME.name}
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="supervisorName"
                  required={formRules?.supervisorName.required}
                  value={model.supervisorName || ''}
                  onChange={onChangeHandler}
                  error={!!errors.supervisorName}
                  inputProps={{ 'data-testid': 'consentform-supervisorName' }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.SUPERVISOR_PHONE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.supervisorPhone}
              error={errors.supervisorPhone && errors.supervisorPhone === 'is required' ? 'Please enter Supervisor Phone.' : errors.supervisorPhone}
            >
              <ControlledInput label={isOptionalLabel(formRules?.supervisorPhone.required, projectInformationData.SUPERVISOR_PHONE.name)}>
                <PhoneNumberInput
                  countryList={countryList}
                  value={model.supervisorPhone}
                  onChange={onChangeHandler}
                  inputProps={{
                    variant: 'outlined',
                    error: !!errors.supervisorPhone,
                    name: 'supervisorPhone',
                    'data-testid': 'consentform-supervisorPhone',
                    required: formRules?.supervisorPhone.required,
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.SECTION_3_EMPLOYEE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.section3Employee}
              error={
                errors.section3Employee && errors.section3Employee === 'is required'
                  ? `Please complete ${projectInformationData?.SECTION_3_EMPLOYEE.name}.`
                  : errors.section3Employee
              }
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.section3Employee.required, projectInformationData.SECTION_3_EMPLOYEE.name)}
                name="section3Employee"
                value={section3EmployeeValue}
                options={GeneralModel.booleanOptionList}
                onChange={onBooleanChangeHandler}
                error={!!errors.section3Employee}
                inputProps={{ 'data-testid': 'consentform-section3Employee' }}
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.SECTION_3_RESIDENT && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.section3Resident}
              error={
                errors.section3Resident && errors.section3Resident === 'is required'
                  ? `Please enter ${projectInformationData?.SECTION_3_RESIDENT.name}.`
                  : errors.section3Resident
              }
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.section3Resident.required, projectInformationData.SECTION_3_RESIDENT.name)}
                name="section3Resident"
                value={section3ResidentValue}
                options={GeneralModel.booleanOptionList}
                onChange={onBooleanChangeHandler}
                error={!!errors.section3Resident}
                inputProps={{ 'data-testid': 'consentform-section3Resident' }}
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.STEP_STATUS && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.stepStatus}
              error={errors.stepStatus && errors.stepStatus === 'is required' ? `Please enter ${projectInformationData?.STEP_STATUS.name}.` : errors.stepStatus}
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.stepStatus.required, projectInformationData.STEP_STATUS.name)}
                name="stepStatus"
                value={stepStatusValue}
                options={GeneralModel.booleanOptionList}
                onChange={onBooleanChangeHandler}
                error={!!errors.stepStatus}
                inputProps={{ 'data-testid': 'consentform-stepStatus' }}
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.DATE_OF_HIRE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.dateOfHire}
              error={errors.dateOfHire && errors.dateOfHire === 'is required' ? 'Please enter Date Of Hire.' : errors.dateOfHire}
            >
              <ControlledInput label={isOptionalLabel(formRules?.dateOfHire.required, projectInformationData.DATE_OF_HIRE.name)}>
                <ControlledDatePicker
                  placeholder="Select Date"
                  variant="outlined"
                  name="dateOfHire"
                  styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.fullWidth} ${datePickerClasses.adornmentStart}`}
                  value={model.dateOfHire}
                  error={!!errors.dateOfHire}
                  onChange={onChangeHandler}
                  invalidDateMessage={''}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.ELIGIBLE_TO_WORK_IN_US && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.eligibleToWorkInUs}
              error={
                errors.eligibleToWorkInUs && errors.eligibleToWorkInUs === 'is required'
                  ? `Please enter ${projectInformationData?.ELIGIBLE_TO_WORK_IN_US.name}.`
                  : errors.eligibleToWorkInUs
              }
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.eligibleToWorkInUs.required, projectInformationData.ELIGIBLE_TO_WORK_IN_US.name)}
                name="eligibleToWorkInUs"
                value={eligibleToWorkInUsValue}
                options={GeneralModel.booleanOptionList}
                onChange={onBooleanChangeHandler}
                error={!!errors.eligibleToWorkInUs}
                inputProps={{ 'data-testid': 'consentform-eligibleToWorkInUs' }}
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.SOC_JOB_TITLE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.socJobTitleId}
              error={
                errors.socJobTitleId && errors.socJobTitleId === 'is required'
                  ? `Please enter ${projectInformationData?.SOC_JOB_TITLE.name}.`
                  : errors.socJobTitleId
              }
            >
              <ControlledSelect
                label={isOptionalLabel(formRules?.socJobTitleId.required, projectInformationData.SOC_JOB_TITLE.name)}
                name="socJobTitleId"
                includeNone={true}
                value={model.socJobTitleId ?? ''}
                options={socJobTitleOptions}
                onChange={onChangeHandler}
                error={!!errors.socJobTitleId}
                dataTestId="consentform-socJobTitle"
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.YEARS_OF_EXPERIENCE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.yearsOfExperience}
              error={
                errors.yearsOfExperience && errors.yearsOfExperience === 'is required'
                  ? `Please enter ${projectInformationData?.YEARS_OF_EXPERIENCE.name}.`
                  : errors.yearsOfExperience
              }
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.yearsOfExperience.required, projectInformationData.YEARS_OF_EXPERIENCE.name)}
                name="yearsOfExperience"
                value={yearsOfExperienceValue}
                options={ConsentFormModel.yearsOfExperienceList}
                onChange={onChangeHandler}
                error={!!errors.yearsOfExperience}
                inputProps={{ 'data-testid': 'consentform-yearsOfExperience' }}
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.PAYMENT_TYPE && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.paymentType}
              error={
                errors.paymentType && errors.paymentType === 'is required' ? `Please enter ${projectInformationData?.PAYMENT_TYPE.name}.` : errors.paymentType
              }
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.paymentType.required, projectInformationData.PAYMENT_TYPE.name)}
                name="paymentType"
                value={paymentTypeValue}
                options={WorkerModel.paymentTypeList}
                onChange={onChangeHandler}
                error={!!errors.paymentType}
                inputProps={{ 'data-testid': 'consentform-paymentType' }}
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.HOURLY_RATE_PAY && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.hourlyRatePay}
              error={
                errors.hourlyRatePay && errors.hourlyRatePay === 'is required'
                  ? `Please enter ${projectInformationData?.HOURLY_RATE_PAY.name}.`
                  : errors.hourlyRatePay
              }
            >
              <ControlledInput label={isOptionalLabel(formRules?.hourlyRatePay.required, projectInformationData.HOURLY_RATE_PAY.name)}>
                <TextField
                  variant="outlined"
                  placeholder="$000.00"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="hourlyRatePay"
                  required={formRules?.hourlyRatePay.required}
                  value={model.hourlyRatePay ?? ''}
                  onChange={onChangeHandler}
                  error={!!errors.hourlyRatePay}
                  inputProps={{
                    'data-testid': 'consentform-hourlyRatePay',
                    mask: moneyMask,
                    showMask: true,
                    guide: false,
                    maxLength: 14,
                  }}
                  InputProps={{
                    inputComponent: ControlledMaskInput as any,
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.LANGUAGE_TURNER_PROTOCOL && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.languageTurnerProtocolId}
              error={
                errors.languageTurnerProtocolId && errors.languageTurnerProtocolId === 'is required'
                  ? `Please enter ${projectInformationData?.LANGUAGE_TURNER_PROTOCOL.name}.`
                  : errors.languageTurnerProtocolId
              }
            >
              <ControlledSelect
                label={isOptionalLabel(formRules?.languageTurnerProtocolId.required, projectInformationData.LANGUAGE_TURNER_PROTOCOL.name)}
                name="languageTurnerProtocolId"
                includeNone={true}
                value={model.languageTurnerProtocolId ?? ''}
                options={languageTurnerProtocolOptions}
                onChange={onChangeHandler}
                error={!!errors.languageTurnerProtocolId}
                dataTestId="consentform-languageTurnerProtocol"
              />
            </ControlledError>
          </Grid>
        )}
        {projectInformationData?.LGBTQ && (
          <Grid item={true} xs={12} md={4}>
            <ControlledError
              show={!!errors.lgbtq}
              error={errors.lgbtq && errors.lgbtq === 'is required' ? `Please complete ${projectInformationData?.LGBTQ.name}.` : errors.lgbtq}
            >
              <ControlledSelect
                includeNone={true}
                noneLabel={'Select Option'}
                label={isOptionalLabel(formRules?.lgbtq.required, projectInformationData.LGBTQ.name)}
                name="lgbtq"
                value={lgbtqValue}
                options={GeneralModel.booleanOptionList}
                onChange={onBooleanChangeHandler}
                error={!!errors.lgbtq}
                inputProps={{ 'data-testid': 'consentform-lgbtq' }}
              />
            </ControlledError>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default memo(ProjectInformation);
