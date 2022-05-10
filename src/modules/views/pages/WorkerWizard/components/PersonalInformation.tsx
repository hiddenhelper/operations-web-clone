import React, { memo, useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ControlledError from '../../../shared/FormHandler/ControlledError';
import ControlledInput from '../../../shared/FormHandler/ControlledInput';
import ControlledSelect from '../../../shared/FormHandler/ControlledSelect';
import ControlledMaskInput from '../../../shared/FormHandler/ControlledMaskInput';
import Card from '../../../shared/ResourceManagement/Card/Card';

import { useStyles } from '../styles';
import { inputGlobalStyles } from '../../../../../assets/styles/Inputs/styles';

import { GeneralModel, WorkerModel } from '../../../../models';
import { IFormRules } from '../../../../../utils/useValidator';

export interface IPersonalInformationProps {
  model: WorkerModel.IWorker;
  errors: any;
  formRules: IFormRules;
  ethnicityListOptions: GeneralModel.ISelectOption[];
  languageListOptions: GeneralModel.ISelectOption[];
  hasCustomPrimaryLanguage: boolean;
  onChangeHandler: (model: any) => void;
  onBooleanChangeHandler: (model: any) => void;
}

const PersonalInformation = ({
  model,
  errors,
  formRules,
  ethnicityListOptions,
  languageListOptions,
  hasCustomPrimaryLanguage,
  onChangeHandler,
  onBooleanChangeHandler,
}: IPersonalInformationProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const isVeteranValue = useMemo(() => (model.isVeteran === null ? '' : Number(model.isVeteran)), [model.isVeteran]);

  return (
    <Card title="Personal Information">
      <Grid container={true} className={classes.workerFormContainer}>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.gender} error={errors.gender} styleClass={classes.errorPosition}>
              <ControlledInput label="Gender (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="gender"
                  includeNone={true}
                  value={model.gender ?? ''}
                  options={[
                    { value: GeneralModel.Gender.MALE, label: GeneralModel.genderMap[GeneralModel.Gender.MALE] },
                    { value: GeneralModel.Gender.FEMALE, label: GeneralModel.genderMap[GeneralModel.Gender.FEMALE] },
                  ]}
                  onChange={onChangeHandler}
                  error={!!errors.gender}
                  disabled={false}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.ethnicityId} error={errors.ethnicityId} styleClass={classes.errorPosition}>
              <ControlledInput label="Ethnicity (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="ethnicityId"
                  includeNone={true}
                  value={model.ethnicityId ?? ''}
                  options={ethnicityListOptions}
                  onChange={onChangeHandler}
                  error={!!errors.gender}
                  disabled={false}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={hasCustomPrimaryLanguage ? 4 : 6} lg={hasCustomPrimaryLanguage ? 4 : 6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.primaryLanguageId} error={errors.primaryLanguageId} styleClass={classes.errorPosition}>
              <ControlledInput label="Primary Language (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="primaryLanguageId"
                  includeNone={true}
                  value={model.primaryLanguageId ?? ''}
                  options={languageListOptions}
                  onChange={onChangeHandler}
                  error={!!errors.primaryLanguageId}
                  disabled={false}
                  dataTestId="worker-primaryLanguageId"
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        {hasCustomPrimaryLanguage && (
          <Grid item={true} xl={4} lg={4}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors.otherPrimaryLanguage}
                error={errors.otherPrimaryLanguage === 'is required' ? 'Other Primary Language is required.' : errors.otherPrimaryLanguage}
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Other Primary Language" styleClass={inputGlobalClasses.inputPaddingBottom}>
                  <TextField
                    variant="outlined"
                    data-testid="worker-otherPrimaryLanguage-wrapper"
                    placeholder="Other Primary Language"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="otherPrimaryLanguage"
                    required={formRules.otherPrimaryLanguage?.required}
                    value={model.otherPrimaryLanguage || ''}
                    onChange={onChangeHandler}
                    error={!!errors.otherPrimaryLanguage}
                    inputProps={{ 'data-testid': 'worker-otherPrimaryLanguage' }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
        )}
        <Grid item={true} xl={hasCustomPrimaryLanguage ? 4 : 6} lg={hasCustomPrimaryLanguage ? 4 : 6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.isVeteran} error={errors.isVeteran} styleClass={classes.errorPosition}>
              <ControlledInput label="Veteran (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="isVeteran"
                  includeNone={true}
                  value={isVeteranValue}
                  options={GeneralModel.booleanOptionList}
                  onChange={onBooleanChangeHandler}
                  error={!!errors.isVeteran}
                  disabled={false}
                  dataTestId="worker-isVeteran"
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.allergies} error={errors.allergies} styleClass={classes.errorPosition}>
              <ControlledInput label="Allergies (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-allergies-wrapper"
                  placeholder="Allergies"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="allergies"
                  required={formRules.allergies?.required}
                  value={model.allergies || ''}
                  onChange={onChangeHandler}
                  error={!!errors.allergies}
                  inputProps={{
                    'data-testid': 'worker-allergies',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.socialSecurityNumber} error={errors.socialSecurityNumber} styleClass={classes.errorPosition}>
              <ControlledInput label="Last 4 SSN (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-ssn-wrapper"
                  placeholder="0000"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="socialSecurityNumber"
                  required={formRules.socialSecurityNumber?.required}
                  value={model.socialSecurityNumber || ''}
                  onChange={onChangeHandler}
                  error={!!errors.socialSecurityNumber}
                  inputProps={{
                    'data-testid': 'worker-ssn',
                    mask: [/\d/, /\d/, /\d/, /\d/],
                    placeholderChar: '0',
                    showMask: true,
                    guide: false,
                    maxLength: 4,
                  }}
                  InputProps={{
                    inputComponent: ControlledMaskInput as any,
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default memo(PersonalInformation);
