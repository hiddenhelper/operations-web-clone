import React, { memo, useMemo, useCallback } from 'react';
import { Grid, TextField } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledDatePicker from 'modules/views/shared/FormHandler/ControlledDatePicker';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';

import { GeneralModel, ProjectModel, UserModel } from 'modules/models';
import { LANG } from 'constants/index';
import { getConditionalDefaultValue, getDefaultValue, getOptionListFromNamedEntities, moneyMask, IFormRules } from 'utils';
import { getPlannedMonths } from 'utils/projectUtils';
import { formGlobalStyles, inputGlobalStyles } from 'assets/styles';
import { useStyles as datePickerStyles } from '../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from './styles';

export interface IGeneralInformationProps {
  model: ProjectModel.IProject;
  formRules: IFormRules;
  errors: any;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  timeZoneList: GeneralModel.INamedEntity[];
  isFcaUser: boolean;
  isAdmin: boolean;
  onChange: (event: any) => void;
}

const GeneralInformation = ({
  formRules,
  model,
  errors,
  categoryList,
  regionList,
  fcaNaeList,
  timeZoneList,
  isFcaUser,
  isAdmin,
  onChange,
}: IGeneralInformationProps) => {
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const formClasses = formGlobalStyles();

  const categoryOptionList = useMemo(() => getOptionListFromNamedEntities(categoryList), [categoryList]);
  const regionOptionList = useMemo(() => getOptionListFromNamedEntities(regionList), [regionList]);
  const fcaNaeOptionList = useMemo(() => getOptionListFromNamedEntities(fcaNaeList), [fcaNaeList]);
  const timeZoneOptionList = useMemo(() => getOptionListFromNamedEntities(timeZoneList), [timeZoneList]);
  const plannedMonths = useMemo(() => getPlannedMonths(model.startDate, model.endDate), [model.startDate, model.endDate]);
  const onChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );
  const nycLl196ChangeHandler = useCallback(
    event => {
      const newValue = !!Number(event.target.value);
      onChange(prevState => ({
        ...prevState,
        mustComplyWithNycLL196: newValue,
        ...(newValue === false ? { permitHolder: null, permitNumber: null, licenseNumber: null } : {}),
      }));
    },
    [onChange]
  );
  return (
    <>
      {isFcaUser && (
        <>
          <Card title="Project Name">
            <ControlledError show={!!errors.name} error={!!errors.name && errors.name === 'is required' ? 'Please enter Project Name.' : errors.name}>
              <ControlledInput label="Project Name">
                <TextField
                  variant="outlined"
                  data-testid="project-name-wrapper"
                  placeholder="Project Name, State, Address"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="name"
                  required={formRules.name.required}
                  value={model.name || ''}
                  onChange={onChangeHandler}
                  error={!!errors.name}
                  inputProps={{
                    'data-testid': 'project-name',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Card>
          <Card title="Information">
            <Grid container={true}>
              <Grid item={true} xl={6} lg={6} className={classes.errorPosition}>
                <ControlledError show={!!errors.description} error={errors.description} styleClass={classes.descriptionErrorPosition}>
                  <ControlledInput
                    label="Description (Optional)"
                    styleClass={`${inputGlobalClasses.middleInput} ${classes.descriptionInput} ${classes.topInput} ${inputGlobalClasses.inputPaddingBottom}`}
                  >
                    <TextField
                      variant="outlined"
                      multiline={true}
                      rows={2}
                      data-testid="project-description-wrapper"
                      placeholder="Enter description of the project you are going to create."
                      type="text"
                      autoComplete="off"
                      fullWidth={true}
                      name="description"
                      required={formRules.description.required}
                      value={model.description || ''}
                      onChange={onChangeHandler}
                      error={!!errors.description}
                      inputProps={{
                        'data-testid': 'project-description',
                      }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xl={6} lg={6}>
                <div className={classes.editFieldWrapper}>
                  <ControlledError
                    show={!!errors.ccv}
                    error={errors.ccv && errors.ccv === 'is required' ? 'Please enter CCV.' : errors.ccv}
                    styleClass={classes.fieldError}
                  >
                    <ControlledInput label="Commercial Construction Value" styleClass={`${classes.topInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                      <TextField
                        variant="outlined"
                        data-testid="project-ccv-wrapper"
                        placeholder="$00,000,000.00"
                        type="text"
                        autoComplete="off"
                        fullWidth={true}
                        name="ccv"
                        required={formRules.ccv.required}
                        value={model.ccv || ''}
                        onChange={onChangeHandler}
                        error={!!errors.ccv}
                        inputProps={{
                          'data-testid': 'project-ccv',
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
                </div>
                <div className={classes.editFieldWrapper}>
                  <ControlledError
                    show={!!errors.regionId}
                    error={errors.regionId && errors.regionId === 'is required' ? 'Please enter Region.' : errors.regionId}
                    styleClass={classes.fieldError}
                  >
                    <ControlledInput label={LANG.EN.INPUT.LABEL.FCA_REGION} styleClass={inputGlobalClasses.inputPaddingBottom}>
                      <ControlledSelect
                        label=""
                        name="regionId"
                        includeNone={true}
                        value={model.regionId || ''}
                        options={regionOptionList}
                        error={!!errors.regionId}
                        onChange={onChangeHandler}
                        dataTestId="fca-region-select"
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </Grid>
              <Grid item={true} xl={6} lg={6} className={classes.errorPosition}>
                <ControlledError
                  show={!!errors.categoryId}
                  error={errors.categoryId && errors.categoryId === 'is required' ? 'Please enter Category.' : errors.categoryId}
                >
                  <ControlledInput label="Category" styleClass={inputGlobalClasses.middleInput}>
                    <ControlledSelect
                      label=""
                      name="categoryId"
                      includeNone={true}
                      value={model.categoryId || ''}
                      options={categoryOptionList}
                      error={!!errors.categoryId}
                      onChange={onChangeHandler}
                      dataTestId="category-select"
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xl={6} lg={6} className={classes.errorPosition}>
                <ControlledError show={!!errors.naeId} error={errors.naeId && errors.naeId === 'is required' ? 'Please enter FCA NAE.' : errors.naeId}>
                  <ControlledInput label={LANG.EN.INPUT.LABEL.FCA_NAE}>
                    <ControlledSelect
                      label=""
                      name="naeId"
                      includeNone={true}
                      value={model.naeId || ''}
                      error={!!errors.nae}
                      options={fcaNaeOptionList}
                      onChange={onChangeHandler}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          </Card>
          <Card title="Duration">
            <Grid container={true}>
              <Grid item={true} xs={4}>
                <ControlledError
                  show={!!errors.startDate}
                  error={errors.startDate && errors.startDate === 'is required' ? 'Please enter Start Date.' : errors.startDate}
                >
                  <ControlledInput label="Start Date" styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput}`}>
                    <ControlledDatePicker
                      placeholder="Select Date"
                      variant="outlined"
                      name="startDate"
                      styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                      endDate={model.endDate}
                      value={model.startDate}
                      error={!!errors.startDate}
                      onChange={onChangeHandler}
                      invalidDateMessage={''}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={4}>
                <ControlledError show={!!errors.endDate} error={errors.endDate && errors.endDate === 'is required' ? 'Please enter End Date.' : errors.endDate}>
                  <ControlledInput label="End Date" styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput}`}>
                    <ControlledDatePicker
                      styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                      placeholder="Select Date"
                      variant="outlined"
                      startDate={model.startDate}
                      name="endDate"
                      value={model.endDate}
                      error={!!errors.endDate}
                      onChange={onChangeHandler}
                      invalidDateMessage={''}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={4}>
                <ControlledInput label="Planned Months">
                  <TextField
                    variant="outlined"
                    data-testid="project-ccv-wrapper"
                    placeholder="0"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    disabled={true}
                    className={getConditionalDefaultValue(plannedMonths >= 1, classes.activeOption, '')}
                    value={getConditionalDefaultValue(isNaN(plannedMonths), 0, plannedMonths)}
                    onChange={onChangeHandler}
                    inputProps={{
                      'data-testid': 'project-plannedMonths',
                    }}
                  />
                </ControlledInput>
              </Grid>
            </Grid>
          </Card>
          <Card title="Time Zone">
            <Grid container={true}>
              <Grid item={true} xl={6} lg={6}>
                <ControlledError
                  show={!!errors.timeZoneId}
                  error={getConditionalDefaultValue(
                    errors.timeZoneId && errors.timeZoneId === 'is required',
                    'Please enter Project Time Zone.',
                    errors.timeZoneId
                  )}
                >
                  <ControlledInput label="Project Time Zone">
                    <ControlledSelect
                      label=""
                      name="timeZoneId"
                      includeNone={true}
                      value={getDefaultValue(model.timeZoneId, '')}
                      options={timeZoneOptionList}
                      error={!!errors.timeZoneId}
                      onChange={onChangeHandler}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          </Card>
        </>
      )}
      <Card
        title="NYC LL196"
        actionStyleClass={formClasses.infoSecondaryAction}
        showAttentionIcon={true}
        secondaryAction="Only if it is Required in NYC Projects"
      >
        <Grid container={true}>
          <Grid item={true} xl={12} lg={12}>
            <ControlledError show={!!errors.mustComplyWithNycLL196} error={errors.mustComplyWithNycLL196}>
              <ControlledRadio
                styleClass={`${formClasses.radioWrapper} ${inputGlobalClasses.inputPaddingBottom}`}
                formControlProps={{ label: '', name: 'mustComplyWithNycLL196', onChange: nycLl196ChangeHandler, value: Number(model.mustComplyWithNycLL196) }}
                radioItems={[
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' },
                ]}
                row={true}
              />
            </ControlledError>
          </Grid>
          {model.mustComplyWithNycLL196 && (
            <Grid container={true} spacing={10} className={classes.spacedInputs}>
              <Grid item={true} xl={4} lg={4}>
                <ControlledError show={!!errors.permitHolder} error={errors.permitHolder} styleClass={classes.fieldError}>
                  <ControlledInput label="Permit Holder (Optional)">
                    <TextField
                      variant="outlined"
                      data-testid="project-permitHolder-wrapper"
                      placeholder="Permit Holder"
                      autoComplete="off"
                      fullWidth={true}
                      name="permitHolder"
                      required={formRules.permitHolder.required}
                      value={model.permitHolder || ''}
                      onChange={onChangeHandler}
                      error={!!errors.permitHolder}
                      inputProps={{ 'data-testid': 'project-permitHolder' }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>

              <Grid item={true} xl={4} lg={4}>
                <ControlledError show={!!errors.permitNumber} error={errors.permitNumber} styleClass={classes.fieldError}>
                  <ControlledInput label="Permit Number (Optional)">
                    <TextField
                      variant="outlined"
                      data-testid="project-permitNumber-wrapper"
                      placeholder="Permit Number"
                      autoComplete="off"
                      fullWidth={true}
                      name="permitNumber"
                      required={formRules.permitNumber.required}
                      value={model.permitNumber || ''}
                      onChange={onChangeHandler}
                      error={!!errors.permitNumber}
                      inputProps={{ 'data-testid': 'project-permitNumber' }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>

              <Grid item={true} xl={4} lg={4}>
                <ControlledError show={!!errors.licenseNumber} error={errors.licenseNumber} styleClass={classes.fieldError}>
                  <ControlledInput label="License Number (Optional)">
                    <TextField
                      variant="outlined"
                      data-testid="project-licenseNumber-wrapper"
                      placeholder="License Number"
                      autoComplete="off"
                      fullWidth={true}
                      name="licenseNumber"
                      required={formRules.licenseNumber.required}
                      value={model.licenseNumber || ''}
                      onChange={onChangeHandler}
                      error={!!errors.licenseNumber}
                      inputProps={{ 'data-testid': 'project-licenseNumber' }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Card>
    </>
  );
};

export default memo(GeneralInformation);
