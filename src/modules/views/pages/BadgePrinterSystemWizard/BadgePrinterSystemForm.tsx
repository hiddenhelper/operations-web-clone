import React, { memo, useCallback, useMemo } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Card from '../../shared/ResourceManagement/Card/Card';
import ControlledError from '../../shared/FormHandler/ControlledError';
import ControlledInput from '../../shared/FormHandler/ControlledInput';
import ControlledSelect from '../../shared/FormHandler/ControlledSelect/ControlledSelect';
import ControlledDatePicker from '../../shared/FormHandler/ControlledDatePicker';
import ControlledMaskInput from '../../shared/FormHandler/ControlledMaskInput';

import { BadgePrintingSystemModel } from '../../../models';
import { IFormRules } from '../../../../utils/useValidator';
import { inputGlobalStyles } from '../../../../assets/styles/Inputs/styles';
import { useStyles as datePickerStyles } from '../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../AccessControlSystemWizard/styles';

export interface IBadgePrintingSystemFormProps {
  model: BadgePrintingSystemModel.IBadgePrintingSystem;
  formRules: IFormRules;
  errors: any;
  onChange: (model: any) => void;
}

const BadgePrinterSystemForm = ({ model, formRules, errors, onChange }: IBadgePrintingSystemFormProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const datePickerClasses = datePickerStyles();

  const printerOptionList = useMemo(() => Object.entries(BadgePrintingSystemModel.printerMap).map(([key, value]) => ({ label: value, value: key })), []);

  const hasSeriaNumberError = useCallback(field => errors && (errors[field]?.serialNumber || errors[`${field}.serialNumber`]), [errors]);

  const getSerialNumberError = useCallback(field => errors[`${field}.serialNumber`] || errors[field]?.serialNumber, [errors]);

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

  const onLaptopChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        laptop: {
          ...prevState.laptop,
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  const onPrinterChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        printer: {
          ...prevState.printer,
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  const onScannerChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        scanner: {
          ...prevState.scanner,
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  const moneyMask = useMemo(
    () =>
      createNumberMask({
        prefix: '$',
        suffix: '',
        allowDecimal: true,
      }),
    []
  );
  return (
    <>
      <Card title="General Information">
        <Grid container={true}>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors.name}
                error={!!errors.name && errors.name === 'is required' ? 'BPS Name is required.' : errors.name}
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="BPS Name" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="BPS Name"
                    type="text"
                    fullWidth={true}
                    name="name"
                    value={model.name || ''}
                    onChange={onChangeHandler}
                    error={!!errors.name}
                    required={formRules.name.required}
                    inputProps={{
                      'data-testid': 'bps-name',
                      maxLength: 254,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
          <Grid item={true} xl={6} lg={6}>
            <ControlledError show={false} error={errors.notes}>
              <ControlledInput label="Notes (Optional)" styleClass={` ${classes.descriptionInput}  ${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  multiline={true}
                  rows={2}
                  placeholder="Notes"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="notes"
                  value={model.notes || ''}
                  onChange={onChangeHandler}
                  error={!!errors?.notes}
                  inputProps={{
                    'data-testid': 'bps-notes',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        </Grid>
      </Card>

      <Card title="Laptop">
        <Grid container={true}>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!hasSeriaNumberError('laptop')}
                error={
                  !!hasSeriaNumberError('laptop') && errors?.laptop?.serialNumber === 'is required'
                    ? 'Serial Number is required.'
                    : getSerialNumberError('laptop')
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Serial Number" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Serial Number"
                    type="text"
                    fullWidth={true}
                    name="serialNumber"
                    value={model.laptop?.serialNumber || ''}
                    onChange={onLaptopChangeHandler}
                    error={!!hasSeriaNumberError('laptop')}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-laptop-serialNumber',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.laptop?.osVersion} error={errors?.laptop?.osVersion} styleClass={classes.errorPosition}>
                <ControlledInput label="OS Version (Optional)" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="OS Version"
                    type="text"
                    fullWidth={true}
                    name="osVersion"
                    value={model.laptop?.osVersion || ''}
                    onChange={onLaptopChangeHandler}
                    error={!!errors?.laptop?.osVersion}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-laptop-osVersion',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.laptop?.vendor} error={errors?.laptop?.vendor} styleClass={classes.errorPosition}>
                <ControlledInput label="Vendor (Optional)" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Vendor"
                    type="text"
                    fullWidth={true}
                    name="vendor"
                    value={model.laptop?.vendor || ''}
                    onChange={onLaptopChangeHandler}
                    error={!!errors?.laptop?.vendor}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-laptop-vendor',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.laptop?.orderDate} error={errors?.laptop?.orderDate} styleClass={classes.errorPosition}>
                <ControlledInput
                  label="Order/Purchase Date (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="orderDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.laptop?.orderDate || null}
                    error={!!errors?.laptop?.orderDate}
                    onChange={onLaptopChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.laptop?.inServiceDate}
                error={
                  !!errors?.laptop?.inServiceDate && errors?.laptop?.inServiceDate === 'is required'
                    ? 'In Service Date is required.'
                    : errors?.laptop?.inServiceDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput
                  label="In Service Date"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="inServiceDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.laptop?.inServiceDate || null}
                    error={!!errors?.laptop?.inServiceDate}
                    onChange={onLaptopChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.laptop?.model}
                error={!!errors?.laptop?.model && errors?.laptop?.model === 'is required' ? 'Model is required.' : errors?.laptop?.model}
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Model" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="Model"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="model"
                    required={false}
                    value={model.laptop?.model || ''}
                    onChange={onLaptopChangeHandler}
                    error={!!errors.laptop?.model}
                    inputProps={{
                      'data-testid': 'bps-laptop-model',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.laptop?.price} error={errors?.laptop?.price} styleClass={classes.errorPosition}>
                <ControlledInput label="Item Price (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="$0"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="price"
                    required={false}
                    value={model.laptop?.price || ''}
                    onChange={onLaptopChangeHandler}
                    error={!!errors.laptop?.price}
                    inputProps={{
                      'data-testid': 'bps-laptop-price',
                      mask: moneyMask,
                      showMask: true,
                      guide: false,
                    }}
                    InputProps={{
                      inputComponent: ControlledMaskInput as any,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.laptop?.invoice} error={errors?.laptop?.invoice} styleClass={classes.errorPosition}>
                <ControlledInput label="Invoiced (Accounting Use Only) (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="Invoiced"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="invoice"
                    required={false}
                    value={model.laptop?.invoice || ''}
                    onChange={onLaptopChangeHandler}
                    error={!!errors.laptop?.invoice}
                    inputProps={{
                      'data-testid': 'bps-laptop-invoice',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.laptop?.warrantyExpirationDate}
                error={
                  !!errors?.laptop?.warrantyExpirationDate && errors?.laptop?.warrantyExpirationDate === 'is required'
                    ? 'Warranty expired Date is required.'
                    : errors?.laptop?.warrantyExpirationDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Warranty Expiration Date" styleClass={`${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="warrantyExpirationDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.laptop?.warrantyExpirationDate || null}
                    error={!!errors?.laptop?.warrantyExpirationDate}
                    onChange={onLaptopChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <ControlledError show={!!errors?.laptop?.notes} error={errors?.laptop?.notes}>
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
                  value={model.laptop?.notes || ''}
                  onChange={onLaptopChangeHandler}
                  error={!!errors?.laptop?.notes}
                  inputProps={{
                    'data-testid': 'bps-laptop-notes',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        </Grid>
      </Card>

      <Card title="Printer">
        <Grid container={true}>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={true}
                error={!!errors?.printer?.type && errors?.printer?.type === 'is required' ? 'Type is required.' : errors?.printer?.type}
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Type" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <ControlledSelect
                    name="type"
                    includeNone={true}
                    noneLabel={'Select Option'}
                    value={model.printer?.type === null ? '' : model.printer?.type}
                    options={printerOptionList}
                    error={!!errors?.printer?.type}
                    onChange={onPrinterChangeHandler}
                    dataTestId="bps-printer-type"
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.printer?.model}
                error={!!errors?.printer?.model && errors?.printer?.model === 'is required' ? 'Model is required.' : errors?.printer?.model}
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Model" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Model"
                    type="text"
                    fullWidth={true}
                    name="model"
                    value={model.printer?.model || ''}
                    onChange={onPrinterChangeHandler}
                    error={!!errors?.printer?.model}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-printer-model',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.printer?.vendor} error={errors?.printer?.vendor} styleClass={classes.errorPosition}>
                <ControlledInput label="Vendor (Optional)" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Vendor"
                    type="text"
                    fullWidth={true}
                    name="vendor"
                    value={model.printer?.vendor || ''}
                    onChange={onPrinterChangeHandler}
                    error={!!errors?.printer?.vendor}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-printer-vendor',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.printer?.orderDate} error={errors?.printer?.orderDate} styleClass={classes.errorPosition}>
                <ControlledInput
                  label="Order/Purchase Date (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="orderDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.printer?.orderDate || null}
                    error={!!errors?.printer?.orderDate}
                    onChange={onPrinterChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.printer?.lastMaintenanceDate} error={errors?.printer?.lastMaintenanceDate} styleClass={classes.errorPosition}>
                <ControlledInput
                  label="Date of Last Maintenance (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="lastMaintenanceDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.printer?.lastMaintenanceDate || null}
                    error={!!errors?.printer?.lastMaintenanceDate}
                    onChange={onPrinterChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.printer?.inServiceDate}
                error={
                  !!errors?.printer?.inServiceDate && errors?.printer?.inServiceDate === 'is required'
                    ? 'In Service Date is required.'
                    : errors?.printer?.inServiceDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput
                  label="In Service Date"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="inServiceDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.printer?.inServiceDate || null}
                    error={!!errors?.printer?.inServiceDate}
                    onChange={onPrinterChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!hasSeriaNumberError('printer')}
                error={
                  !!hasSeriaNumberError('printer') && errors?.printer?.serialNumber === 'is required'
                    ? 'Serial Number is required.'
                    : getSerialNumberError('printer')
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Serial Number" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="Serial Number"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="serialNumber"
                    required={false}
                    value={model.printer?.serialNumber || ''}
                    onChange={onPrinterChangeHandler}
                    error={!!hasSeriaNumberError('printer')}
                    inputProps={{
                      'data-testid': 'bps-printer-serialNumber',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.printer?.price} error={errors?.printer?.price} styleClass={classes.errorPosition}>
                <ControlledInput label="Item Price (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="$0"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="price"
                    required={false}
                    value={model.printer?.price || ''}
                    onChange={onPrinterChangeHandler}
                    error={!!errors?.printer?.price}
                    inputProps={{
                      'data-testid': 'bps-printer-price',
                      mask: moneyMask,
                      showMask: true,
                      guide: false,
                    }}
                    InputProps={{
                      inputComponent: ControlledMaskInput as any,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.printer?.invoice} error={errors?.printer?.invoice} styleClass={classes.errorPosition}>
                <ControlledInput label="Invoiced (Accounting Use Only) (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="Invoiced"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="invoice"
                    required={false}
                    value={model.printer?.invoice || ''}
                    onChange={onPrinterChangeHandler}
                    error={!!errors?.printer?.invoice}
                    inputProps={{
                      'data-testid': 'bps-printer-invoice',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.printer?.warrantyExpirationDate}
                error={
                  !!errors?.printer?.warrantyExpirationDate && errors?.printer?.warrantyExpirationDate === 'is required'
                    ? 'Warranty Expiration Date is required.'
                    : errors?.printer?.warrantyExpirationDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Warranty Expiration Date" styleClass={`${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="warrantyExpirationDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.printer?.warrantyExpirationDate || null}
                    error={!!errors?.printer?.warrantyExpirationDate}
                    onChange={onPrinterChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <ControlledError show={!!errors.laptop?.notes} error={errors.laptop?.notes}>
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
                  value={model.printer?.notes || ''}
                  onChange={onPrinterChangeHandler}
                  error={!!errors?.printer?.notes}
                  inputProps={{
                    'data-testid': '',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        </Grid>
      </Card>

      <Card title="Scanner">
        <Grid container={true}>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!hasSeriaNumberError('scanner')}
                error={
                  !!hasSeriaNumberError('scanner') && errors?.scanner?.serialNumber === 'is required'
                    ? 'Serial Number is required.'
                    : getSerialNumberError('scanner')
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Serial Number" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Serial Number"
                    type="text"
                    fullWidth={true}
                    name="serialNumber"
                    value={model.scanner?.serialNumber || ''}
                    onChange={onScannerChangeHandler}
                    error={!!hasSeriaNumberError('scanner')}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-scanner-serialNumber',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.scanner?.price} error={errors?.scanner?.price} styleClass={classes.errorPosition}>
                <ControlledInput label="Item Price (Optional)" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="$0"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="price"
                    required={false}
                    value={model.scanner?.price || ''}
                    onChange={onScannerChangeHandler}
                    error={!!errors?.scanner?.price}
                    inputProps={{
                      'data-testid': 'bps-scanner-price',
                      mask: moneyMask,
                      showMask: true,
                      guide: false,
                    }}
                    InputProps={{
                      inputComponent: ControlledMaskInput as any,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.scanner?.invoice} error={errors?.scanner?.invoice} styleClass={classes.errorPosition}>
                <ControlledInput
                  label="Invoiced (Accounting Use Only) (Optional)"
                  styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Invoiced"
                    type="text"
                    fullWidth={true}
                    name="invoice"
                    value={model.scanner?.invoice || ''}
                    onChange={onScannerChangeHandler}
                    error={!!errors?.scanner?.invoice}
                    required={false}
                    inputProps={{
                      'data-testid': 'bps-scanner-invoiced',
                      maxLength: 25,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.scanner?.warrantyExpirationDate}
                error={
                  !!errors?.scanner?.warrantyExpirationDate && errors?.scanner?.warrantyExpirationDate === 'is required'
                    ? 'Warranty Expiration Date is required.'
                    : errors?.scanner?.warrantyExpirationDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput
                  label="Warranty Expiration Date"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="warrantyExpirationDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.scanner?.warrantyExpirationDate || null}
                    error={!!errors?.scanner?.warrantyExpirationDate}
                    onChange={onScannerChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.scanner?.inServiceDate}
                error={
                  !!errors?.scanner?.inServiceDate && errors?.scanner?.inServiceDate === 'is required'
                    ? 'In Service Date is required.'
                    : errors?.scanner?.inServiceDate
                }
                styleClass={classes.errorPosition}
              >
                <ControlledInput
                  label="In Service Date"
                  styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
                >
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="inServiceDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.scanner?.inServiceDate || null}
                    error={!!errors?.scanner?.inServiceDate}
                    onChange={onScannerChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
          </Grid>
          <Grid item={true} xl={6} lg={6}>
            <div className={classes.errorInputWrapper}>
              <ControlledError
                show={!!errors?.scanner?.model}
                error={!!errors?.scanner?.model && errors?.scanner?.model === 'is required' ? 'Model is required.' : errors?.scanner?.model}
                styleClass={classes.errorPosition}
              >
                <ControlledInput label="Model" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="Model"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="model"
                    required={false}
                    value={model.scanner?.model || ''}
                    onChange={onScannerChangeHandler}
                    error={!!errors?.scanner?.model}
                    inputProps={{
                      'data-testid': 'bps-scanner-model',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.scanner?.vendor} error={errors?.scanner?.vendor} styleClass={classes.errorPosition}>
                <ControlledInput label="Vendor (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                  <TextField
                    variant="outlined"
                    placeholder="Vendor"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="vendor"
                    required={false}
                    value={model.scanner?.vendor || ''}
                    onChange={onScannerChangeHandler}
                    error={!!errors?.scanner?.vendor}
                    inputProps={{
                      'data-testid': 'bps-scanner-vendor',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <div className={classes.errorInputWrapper}>
              <ControlledError show={!!errors?.scanner?.orderDate} error={errors?.scanner?.orderDate} styleClass={classes.errorPosition}>
                <ControlledInput label="Order/Purchase Date (Optional)" styleClass={` ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}>
                  <ControlledDatePicker
                    placeholder="Select Date"
                    variant="outlined"
                    name="orderDate"
                    styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                    value={model.scanner?.orderDate || null}
                    error={!!errors?.scanner?.orderDate}
                    onChange={onScannerChangeHandler}
                    invalidDateMessage={''}
                  />
                </ControlledInput>
              </ControlledError>
            </div>
            <ControlledError show={!!errors.scanner?.notes} error={errors?.scanner?.notes}>
              <ControlledInput label="Notes (Optional)" styleClass={` ${classes.descriptionInput}  ${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  multiline={true}
                  rows={2}
                  placeholder="Notes"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="notes"
                  value={model.scanner?.notes || ''}
                  onChange={onScannerChangeHandler}
                  error={!!errors?.scanner?.notes}
                  inputProps={{
                    'data-testid': 'bps-scanner-notes',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default memo(BadgePrinterSystemForm);
