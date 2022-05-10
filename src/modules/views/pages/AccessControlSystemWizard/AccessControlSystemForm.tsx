import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Card from '../../shared/ResourceManagement/Card';
import ControlledError from '../../shared/FormHandler/ControlledError';
import ControlledInput from '../../shared/FormHandler/ControlledInput';
import ControlledSelect from '../../shared/FormHandler/ControlledSelect/ControlledSelect';
import ControlledDatePicker from '../../shared/FormHandler/ControlledDatePicker';
import ReaderForm from './components/ReaderForm';

import { AccessControlSystemModel } from '../../../models';
import { IFormRules } from '../../../../utils/useValidator';
import { useStyles as datePickerStyles } from '../../shared/FormHandler/ControlledDatePicker/styles';
import { inputGlobalStyles } from '../../../../assets/styles/Inputs/styles';
import { useStyles } from './styles';

export interface IAccessControlSystemFormProps {
  model: AccessControlSystemModel.IAccessControlSystem;
  formRules: IFormRules;
  errors: any;
  edit: boolean;
  onChange: (model: any) => void;
  clearErrors: () => void;
}

const AccessControlSystemForm = ({ model, formRules, errors, edit, onChange, clearErrors }: IAccessControlSystemFormProps) => {
  const [isReader2Enabled, setIsReader2] = useState<boolean>(false);
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const isTurnstile = useMemo(() => model.type === AccessControlSystemModel.AccessControlSystemType.TURNSTILE, [model.type]);
  const isEnclosedTurnstile = useMemo(() => model.type === AccessControlSystemModel.AccessControlSystemType.ENCLOSED_TS, [model.type]);
  const isPortal = useMemo(() => model.type === AccessControlSystemModel.AccessControlSystemType.PORTAL, [model.type]);
  const isHandheld = useMemo(() => model.type === AccessControlSystemModel.AccessControlSystemType.HANDHELD, [model.type]);
  const getReaderError = useCallback(
    fieldName => {
      return errors[`reader1.${fieldName}`] || (errors.reader1 ? errors.reader1[fieldName] : false);
    },
    [errors]
  );
  const getReader2Error = useCallback(
    fieldName => {
      return errors[`reader2.${fieldName}`] || (errors.reader2 ? errors.reader2[fieldName] : false);
    },
    [errors]
  );

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onRenderReader2 = useCallback(() => {
    onChange(prevState => ({ ...prevState, reader2: isReader2Enabled ? null : AccessControlSystemModel.getFallbackReader() }));
    setIsReader2(!isReader2Enabled);
  }, [isReader2Enabled, onChange]);

  const onDeviceTypeChange = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      const value = parseInt(event.target.value, 10);
      onChange(() => ({
        ...AccessControlSystemModel.getFallbackAccessControlSystem(),
        type: value,
        reader1: value === AccessControlSystemModel.AccessControlSystemType.HANDHELD ? null : AccessControlSystemModel.getFallbackReader(),
      }));
      clearErrors();
      setIsReader2(false);
    },
    [onChange, clearErrors]
  );

  const onReaderChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        reader1: {
          ...prevState.reader1,
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  const onReader2ChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        reader2: {
          ...prevState.reader2,
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  useEffect(() => {
    if (model.reader2) setIsReader2(true);
  }, [model.reader2]);

  return (
    <>
      <Card title="Device Type">
        <ControlledSelect
          label="Type*"
          name="type"
          value={model.type}
          options={AccessControlSystemModel.typeOptionList}
          onChange={onDeviceTypeChange}
          error={errors.type}
          disabled={edit}
          dataTestId="device-type-select"
        />
      </Card>
      <Card title="Information">
        <Grid container={true}>
          <Grid item={true} xl={12} lg={12}>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors.serialNumber} error={!!errors.serialNumber && errors.serialNumber} styleClass={classes.errorPosition}>
                <ControlledInput label="Serial Number (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Serial Number"
                    type="text"
                    fullWidth={true}
                    name="serialNumber"
                    value={model.serialNumber || ''}
                    onChange={onChangeHandler}
                    error={!!errors.serialNumber}
                    inputProps={{
                      'data-testid': 'serialNumber',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
          <Grid item={true} xl={6} lg={6}>
            {(isTurnstile || isEnclosedTurnstile || isPortal) && (
              <div className={classes.errorInputWrapper}>
                <ControlledError show={!!errors.lastRefurbishedDate} error={errors.lastRefurbishedDate} styleClass={classes.errorPosition}>
                  <ControlledInput
                    label="Date of Last Refurbished (Optional)"
                    styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                  >
                    <ControlledDatePicker
                      placeholder="Select Date"
                      variant="outlined"
                      name="lastRefurbishedDate"
                      styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                      value={model.lastRefurbishedDate}
                      error={!!errors.lastRefurbishedDate}
                      onChange={onChangeHandler}
                      invalidDateMessage={''}
                    />
                  </ControlledInput>
                </ControlledError>
              </div>
            )}
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors.lastMaintenanceDate} error={errors.lastMaintenanceDate} styleClass={classes.errorPosition}>
                <ControlledInput
                  label="Date of Last Maintenance (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="lastMaintenanceDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.lastMaintenanceDate}
                    error={!!errors.lastMaintenanceDate}
                    onChange={onChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors.inServiceDate}
                error={!!errors.inServiceDate && errors.inServiceDate === 'is required' ? 'In Service Date is required.' : errors.inServiceDate}
                styleClass={classes.errorPosition}
              >
                <ControlledInput
                  label="In Service Date (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="inServiceDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.inServiceDate}
                    error={!!errors.inServiceDate}
                    onChange={onChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            {isHandheld && (
              <div className={classes.errorInputWrapper}>
                <ControlledError show={!!errors.orderDate} error={errors.orderDate} styleClass={classes.errorPosition}>
                  <ControlledInput
                    label="Order/Purchase Date (Optional)"
                    styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                  >
                    <ControlledDatePicker
                      placeholder="Select Date"
                      variant="outlined"
                      name="orderDate"
                      styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                      value={model.orderDate}
                      error={!!errors.orderDate}
                      onChange={onChangeHandler}
                      invalidDateMessage={''}
                    />
                  </ControlledInput>
                </ControlledError>
              </div>
            )}
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors.warrantyExpirationDate}
                error={
                  !!errors.warrantyExpirationDate && errors.warrantyExpirationDate === 'is required'
                    ? 'Warranty Expiration Date is required.'
                    : errors.warrantyExpirationDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput
                  label="Warranty Expiration Date (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="warrantyExpirationDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.warrantyExpirationDate}
                    error={!!errors.warrantyExpirationDate}
                    onChange={onChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
          <Grid item={true} xl={6} lg={6}>
            {(isTurnstile || isEnclosedTurnstile || isPortal) && (
              <div className={classes.errorInputWrapper}>
                <ControlledError show={!!errors.version} error={errors.version} styleClass={classes.errorPosition}>
                  <ControlledInput label="Version (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                    <ControlledSelect
                      name="version"
                      includeNone={true}
                      value={model.version}
                      options={AccessControlSystemModel.deviceVersionOptionList}
                      onChange={onChangeHandler}
                      error={!!errors.version}
                      disabled={false}
                    />
                  </ControlledInput>
                </ControlledError>
              </div>
            )}
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors.lifeCycle} error={errors.lifeCycle} styleClass={classes.errorPosition}>
                <ControlledInput label="Life Cycle" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <ControlledSelect
                    name="lifeCycle"
                    value={model.lifeCycle}
                    options={AccessControlSystemModel.lifeCycleOptionList}
                    error={!!errors.lifeCycle}
                    onChange={onChangeHandler}
                    dataTestId="lifeCycle-select"
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            {isHandheld && (
              <>
                <div className={classes.errorInputWrapper}>
                  <ControlledError show={!!errors.vendor} error={errors.vendor} styleClass={classes.errorPosition}>
                    <ControlledInput label="Vendor (Optional)" styleClass={`${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                      <TextField
                        variant="outlined"
                        data-testid="vendor-wrapper"
                        placeholder="Vendor"
                        type="text"
                        autoComplete="off"
                        fullWidth={true}
                        name="vendor"
                        required={false}
                        value={model.vendor || ''}
                        onChange={onChangeHandler}
                        error={!!errors.vendor}
                        inputProps={{
                          'data-testid': 'vendor',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
                <div className={classes.errorInputWrapper}>
                  <ControlledError show={!!errors.invoice} error={errors.invoice} styleClass={classes.errorPosition}>
                    <ControlledInput
                      label="Invoiced (Accounting use only) (Optional)"
                      styleClass={`${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                    >
                      <TextField
                        variant="outlined"
                        data-testid="invoiced-wrapper"
                        placeholder="Invoiced"
                        type="text"
                        autoComplete="off"
                        fullWidth={true}
                        name="invoice"
                        required={false}
                        value={model.invoice || ''}
                        onChange={onChangeHandler}
                        error={!!errors.invoice}
                        inputProps={{
                          'data-testid': 'invoiced',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </>
            )}
            <ControlledError show={false} error={errors.notes}>
              <ControlledInput label="Notes (Optional)" styleClass={` ${classes.descriptionInput}  ${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  multiline={true}
                  rows={2}
                  data-testid=""
                  placeholder="Notes"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="notes"
                  value={model.notes || ''}
                  onChange={onChangeHandler}
                  error={null}
                  inputProps={{
                    'data-testid': 'acs-notes',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        </Grid>
      </Card>
      {(isTurnstile || isPortal || isEnclosedTurnstile) && (
        <>
          <Card title="Reader 1">
            <ReaderForm readerFieldName="reader1" model={model} errors={errors} getReaderError={getReaderError} onReaderChangeHandler={onReaderChangeHandler} />
          </Card>
          <Card
            title="Reader 2"
            showDivider={isReader2Enabled}
            checkboxRenderChildEnabled={true}
            onChangeRenderChildEnabled={onRenderReader2}
            isCheckedRenderChild={isReader2Enabled}
          >
            {isReader2Enabled && (
              <ReaderForm
                readerFieldName="reader2"
                model={model}
                errors={errors}
                getReaderError={getReader2Error}
                onReaderChangeHandler={onReader2ChangeHandler}
              />
            )}
          </Card>
        </>
      )}
    </>
  );
};

export default memo(AccessControlSystemForm);
