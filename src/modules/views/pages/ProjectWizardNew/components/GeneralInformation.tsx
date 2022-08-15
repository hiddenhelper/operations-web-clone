import React, { memo, useMemo, useCallback } from 'react';
import { Grid, TextField } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledDatePicker from 'modules/views/shared/FormHandler/ControlledDatePicker';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';

import { GeneralModel } from 'modules/models';
import { LANG } from 'constants/index';
import { getConditionalDefaultValue, getDefaultValue, getOptionListFromNamedEntities, moneyMask } from 'utils';
import { getPlannedMonths } from 'utils/projectUtils';
import { formGlobalStyles, inputGlobalStyles } from 'assets/styles';
import { useStyles as datePickerStyles } from '../../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../styles';
import { FormRules } from '../../../../../constants/form';

export interface IGeneralInformationProps {
  model: any;
  errors: any;
  reviewMode: boolean;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  timeZoneList: GeneralModel.INamedEntity[];
  isFcaUser: boolean;
  onChange: (event: any) => void;
}

const GeneralInformation = ({
  reviewMode,
  errors,
  model,
  categoryList,
  regionList,
  fcaNaeList,
  timeZoneList,
  isFcaUser,
  onChange,
}: IGeneralInformationProps) => {
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const formClasses = formGlobalStyles();

  const formRules = useMemo(() => (reviewMode ? FormRules.projectNew.GeneralInformationApprovalRules : FormRules.projectNew.GeneralInformationDraftRules), [
    reviewMode,
  ]);
  const labelRules = FormRules.projectNew.GeneralInformationLabelRules;
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
            <Grid container={true}>
              <Grid item={true} xs={12}>
                <ControlledError show={!!errors.name} error={!!errors.name && errors.name === 'is required' ? 'Please enter Project Name.' : errors.name}>
                  <ControlledInput label="Project Name" required={labelRules.name.required} showMark={labelRules.name.required}>
                    <TextField
                      variant="outlined"
                      data-testid="project-name-wrapper"
                      placeholder="Project Name"
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
              </Grid>
            </Grid>
          </Card>
          <Card title="Information">
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={12} sm={12} md={6}>
                <ControlledError show={!!errors.description} error={errors.description} styleClass={classes.descriptionErrorPosition}>
                  <ControlledInput label="Description" styleClass={`${classes.descriptionInput} ${classes.topInput}`}>
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
              <Grid item={true} xs={12} sm={12} md={6}>
                <Grid container={true} spacing={2}>
                  <Grid item={true} xs={12}>
                    <ControlledError show={!!errors.ccv} error={errors.ccv && errors.ccv === 'is required' ? 'Please enter CCV.' : errors.ccv}>
                      <ControlledInput
                        label="Commercial Construction Value"
                        styleClass={`${classes.topInput}`}
                        required={labelRules.ccv.required}
                        showMark={labelRules.ccv.required}
                      >
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
                  </Grid>
                  <Grid item={true} xs={12}>
                    <ControlledError
                      show={!!errors.regionId}
                      error={errors.regionId && errors.regionId === 'is required' ? 'Please enter Region.' : errors.regionId}
                    >
                      <ControlledInput label={LANG.EN.INPUT.LABEL.FCA_REGION} required={labelRules.regionId.required} showMark={labelRules.regionId.required}>
                        <ControlledSelect
                          label=""
                          name="regionId"
                          includeNone={true}
                          value={model.regionId || ''}
                          options={regionOptionList}
                          error={!!errors.regionId}
                          required={formRules.regionId.required}
                          onChange={onChangeHandler}
                          dataTestId="fca-region-select"
                        />
                      </ControlledInput>
                    </ControlledError>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item={true} xs={12} sm={12} md={6}>
                <ControlledError
                  show={!!errors.categoryId}
                  error={errors.categoryId && errors.categoryId === 'is required' ? 'Please enter Category.' : errors.categoryId}
                >
                  <ControlledInput label="Category" required={labelRules.categoryId.required} showMark={labelRules.categoryId.required}>
                    <ControlledSelect
                      label=""
                      name="categoryId"
                      includeNone={true}
                      value={model.categoryId || ''}
                      options={categoryOptionList}
                      error={!!errors.categoryId}
                      required={formRules.categoryId.required}
                      onChange={onChangeHandler}
                      dataTestId="category-select"
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={12} sm={12} md={6}>
                <ControlledError show={!!errors.naeId} error={errors.naeId && errors.naeId === 'is required' ? 'Please enter FCA NAE.' : errors.naeId}>
                  <ControlledInput label={LANG.EN.INPUT.LABEL.FCA_NAE} required={labelRules.naeId.required} showMark={labelRules.naeId.required}>
                    <ControlledSelect
                      label=""
                      name="naeId"
                      includeNone={true}
                      value={model.naeId || ''}
                      error={!!errors.naeId}
                      options={fcaNaeOptionList}
                      required={formRules.naeId.required}
                      onChange={onChangeHandler}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={12}>
                <ControlledError show={!!errors.setupNotes} error={errors.setupNotes} styleClass={classes.descriptionErrorPosition}>
                  <ControlledInput label="Setup Notes" styleClass={`${classes.descriptionInput} ${classes.topInput}`}>
                    <TextField
                      variant="outlined"
                      multiline={true}
                      rows={2}
                      data-testid="project-setupNotes-wrapper"
                      placeholder="Enter setup notes of the project you are going to create."
                      type="text"
                      autoComplete="off"
                      fullWidth={true}
                      name="setupNotes"
                      value={model.setupNotes || ''}
                      onChange={onChangeHandler}
                      error={!!errors.setupNotes}
                      inputProps={{
                        'data-testid': 'project-setupNotes',
                      }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          </Card>
          <Card title="Duration">
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={12} sm={12} md={4}>
                <ControlledError
                  show={!!errors.startDate}
                  error={errors.startDate && errors.startDate === 'is required' ? 'Please enter Start Date.' : errors.startDate}
                >
                  <ControlledInput
                    label="Start Date"
                    styleClass={`${classes.dateInput}`}
                    required={labelRules.startDate.required}
                    showMark={labelRules.startDate.required}
                  >
                    <ControlledDatePicker
                      placeholder="Select Date"
                      variant="outlined"
                      name="startDate"
                      styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                      endDate={model.endDate}
                      value={model.startDate}
                      error={!!errors.startDate}
                      required={formRules.startDate.required}
                      onChange={onChangeHandler}
                      invalidDateMessage={''}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={12} sm={12} md={4}>
                <ControlledError show={!!errors.endDate} error={errors.endDate && errors.endDate === 'is required' ? 'Please enter End Date.' : errors.endDate}>
                  <ControlledInput
                    label="End Date"
                    styleClass={`${classes.dateInput}`}
                    required={labelRules.endDate.required}
                    showMark={labelRules.endDate.required}
                  >
                    <ControlledDatePicker
                      styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                      placeholder="Select Date"
                      variant="outlined"
                      startDate={model.startDate}
                      name="endDate"
                      value={model.endDate}
                      error={!!errors.endDate}
                      required={formRules.endDate.required}
                      onChange={onChangeHandler}
                      invalidDateMessage={''}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={12} sm={12} md={4}>
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
              <Grid item={true} xs={12} sm={12} md={6}>
                <ControlledError
                  show={!!errors.timeZoneId}
                  error={getConditionalDefaultValue(
                    errors.timeZoneId && errors.timeZoneId === 'is required',
                    'Please enter Project Time Zone.',
                    errors.timeZoneId
                  )}
                >
                  <ControlledInput label="Project Time Zone" required={labelRules.timeZoneId.required} showMark={labelRules.timeZoneId.required}>
                    <ControlledSelect
                      label=""
                      name="timeZoneId"
                      includeNone={true}
                      value={getDefaultValue(model.timeZoneId, '')}
                      options={timeZoneOptionList}
                      error={!!errors.timeZoneId}
                      required={formRules.timeZoneId.required}
                      onChange={onChangeHandler}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          </Card>
        </>
      )}

      <Card title="NYC LL196" actionStyleClass={formClasses.iSecondaryAction} showAttentionIcon={true} secondaryAction="Only if it is Required in NYC Projects">
        <Grid container={true}>
          <Grid item={true} xl={12} lg={12}>
            <ControlledError show={!!errors.mustComplyWithNycLL196} error={errors.mustComplyWithNycLL196}>
              <ControlledRadio
                styleClass={`${formClasses.radioWrapper} ${inputGlobalClasses.inputPaddingBottom}`}
                formControlProps={{
                  label: '',
                  name: 'mustComplyWithNycLL196',
                  onChange: nycLl196ChangeHandler,
                  value: Number(model.mustComplyWithNycLL196),
                }}
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
                      // required={formRules.permitHolder.required}
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
                      // required={formRules.permitNumber.required}
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
                      required={reviewMode ? formRules.licenseNumber.requiredForApproval : formRules.licenseNumber.required}
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
