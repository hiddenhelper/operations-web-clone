import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ControlledError from '../../../shared/FormHandler/ControlledError';
import ControlledInput from '../../../shared/FormHandler/ControlledInput';
import ControlledDatePicker from '../../../shared/FormHandler/ControlledDatePicker';
import ControlledMaskInput from '../../../shared/FormHandler/ControlledMaskInput';

import { AccessControlSystemModel } from '../../../../models';
import { plainNumberMask } from '../../../../../utils/generalUtils';
import { inputGlobalStyles } from '../../../../../assets/styles';
import { useStyles as datePickerStyles } from '../../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../styles';

export interface IReaderFormProps {
  readerFieldName: string;
  model: AccessControlSystemModel.IAccessControlSystem;
  errors: any;
  getReaderError: (field: string) => string;
  onReaderChangeHandler: (event: any) => void;
}

const ReaderForm = ({ readerFieldName, model, errors, getReaderError, onReaderChangeHandler }: IReaderFormProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const datePickerClasses = datePickerStyles();
  return (
    <Grid container={true}>
      <Grid item={true} xl={6} lg={6}>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!getReaderError('serialNumber')}
            error={!!getReaderError('serialNumber') && getReaderError('serialNumber')}
            styleClass={classes.errorPosition}
          >
            <ControlledInput label="Serial Number (Optional)" styleClass={`${inputGlobalClasses.middleInput} ${inputGlobalClasses.inputPaddingBottom}`}>
              <TextField
                autoComplete="off"
                variant="outlined"
                placeholder="Serial Number"
                type="text"
                fullWidth={true}
                name="serialNumber"
                value={model[readerFieldName]?.serialNumber || ''}
                onChange={onReaderChangeHandler}
                error={!!getReaderError('serialNumber')}
                required={false}
                inputProps={{
                  'data-testid': 'reader-serialNumber',
                  maxLength: 25,
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!getReaderError('hostname')}
            error={!!getReaderError('hostname') && getReaderError('hostname') === 'is required' ? 'Hostname is required.' : getReaderError('hostname')}
            styleClass={classes.errorPosition}
          >
            <ControlledInput label="Hostname*" styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}>
              <TextField
                variant="outlined"
                data-testid="reader-hostname-wrapper"
                placeholder="Hostname"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="hostname"
                required={false}
                value={model[readerFieldName]?.hostname || ''}
                onChange={onReaderChangeHandler}
                error={!!getReaderError('hostname')}
                inputProps={{
                  'data-testid': 'reader-hostname',
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError show={!!errors[readerFieldName]?.sshConnectionPort} error={getReaderError('sshConnectionPort')} styleClass={classes.errorPosition}>
            <ControlledInput
              label="SSH Port Connection (Optional)"
              styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
            >
              <TextField
                variant="outlined"
                data-testid="reader-sshConnectionPort-wrapper"
                placeholder="SSH Port Connection"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="sshConnectionPort"
                required={false}
                value={model[readerFieldName]?.sshConnectionPort || ''}
                onChange={onReaderChangeHandler}
                error={!!errors[readerFieldName]?.sshConnectionPort}
                InputProps={{
                  inputComponent: ControlledMaskInput as any,
                }}
                inputProps={{
                  'data-testid': 'reader-sshConnectionPort',
                  mask: plainNumberMask,
                  showMask: true,
                  guide: false,
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError show={!!errors[readerFieldName]?.httpConnectionPort} error={getReaderError('httpConnectionPort')} styleClass={classes.errorPosition}>
            <ControlledInput
              label="HTTP Port Connection (Optional)"
              styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
            >
              <TextField
                variant="outlined"
                data-testid="reader-httpConnectionPort-wrapper"
                placeholder="HTTP Port Connection"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="httpConnectionPort"
                required={false}
                value={model[readerFieldName]?.httpConnectionPort || ''}
                onChange={onReaderChangeHandler}
                error={!!errors[readerFieldName]?.httpConnectionPort}
                InputProps={{
                  inputComponent: ControlledMaskInput as any,
                }}
                inputProps={{
                  'data-testid': 'reader-httpConnectionPort',
                  mask: plainNumberMask,
                  showMask: true,
                  guide: false,
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!errors[readerFieldName]?.lastMaintenanceDate}
            error={errors[readerFieldName]?.lastMaintenanceDate}
            styleClass={classes.errorPosition}
          >
            <ControlledInput
              label="Date of Last Maintenance (Optional)"
              styleClass={`${inputGlobalClasses.middleInput} ${classes.dateInput} ${inputGlobalClasses.inputPaddingBottom}`}
            >
              <ControlledDatePicker
                placeholder="Select Date"
                variant="outlined"
                name="lastMaintenanceDate"
                styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                value={model[readerFieldName]?.lastMaintenanceDate || null}
                error={!!errors[readerFieldName]?.lastMaintenanceDate}
                onChange={onReaderChangeHandler}
                invalidDateMessage={''}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!getReaderError('inServiceDate')}
            error={
              !!getReaderError('inServiceDate') && getReaderError('inServiceDate') === 'is required'
                ? 'In Service Date is required.'
                : getReaderError('inServiceDate')
            }
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
                value={model[readerFieldName]?.inServiceDate || null}
                error={!!getReaderError('inServiceDate')}
                onChange={onReaderChangeHandler}
                invalidDateMessage={''}
              />
            </ControlledInput>
          </ControlledError>
        </div>
      </Grid>
      <Grid item={true} xl={6} lg={6}>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!getReaderError('model')}
            error={!!getReaderError('model') && getReaderError('model') === 'is required' ? 'Model is required.' : getReaderError('model')}
            styleClass={classes.errorPosition}
          >
            <ControlledInput label="Model (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
              <TextField
                variant="outlined"
                data-testid="reader-model-wrapper"
                placeholder="Model"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="model"
                required={false}
                value={model[readerFieldName]?.model || ''}
                onChange={onReaderChangeHandler}
                error={!!errors[readerFieldName]?.model}
                inputProps={{
                  'data-testid': 'reader-model',
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError show={!!getReaderError('hostAddress')} error={getReaderError('hostAddress')} styleClass={classes.errorPosition}>
            <ControlledInput label="Public IP / Domain Name (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
              <TextField
                variant="outlined"
                data-testid="reader-hostAddress-wrapper"
                placeholder="Public IP / Domain Name"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="hostAddress"
                required={false}
                value={model[readerFieldName]?.hostAddress || ''}
                onChange={onReaderChangeHandler}
                error={!!errors[readerFieldName]?.hostAddress}
                inputProps={{
                  'data-testid': 'reader-hostAddress',
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError show={!!getReaderError('telnetConnectionPort')} error={getReaderError('telnetConnectionPort')} styleClass={classes.errorPosition}>
            <ControlledInput label="TELNET Port Connection (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
              <TextField
                variant="outlined"
                data-testid="reader-telnetConnectionPort-wrapper"
                placeholder="TELNET Port Connection"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="telnetConnectionPort"
                required={false}
                value={model[readerFieldName]?.telnetConnectionPort || ''}
                onChange={onReaderChangeHandler}
                error={!!errors[readerFieldName]?.telnetConnectionPort}
                InputProps={{
                  inputComponent: ControlledMaskInput as any,
                }}
                inputProps={{
                  'data-testid': 'reader-telnetConnectionPort',
                  mask: plainNumberMask,
                  showMask: true,
                  guide: false,
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <div className={classes.errorInputWrapper}>
          <ControlledError show={!!getReaderError('tcpConnectionPort')} error={getReaderError('tcpConnectionPort')} styleClass={classes.errorPosition}>
            <ControlledInput label="TCP Port Connection (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
              <TextField
                variant="outlined"
                data-testid="reader-tcpConnectionPort-wrapper"
                placeholder="TCP Port Connection"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="tcpConnectionPort"
                required={false}
                value={model[readerFieldName]?.tcpConnectionPort || ''}
                onChange={onReaderChangeHandler}
                error={!!errors[readerFieldName]?.tcpConnectionPort}
                InputProps={{
                  inputComponent: ControlledMaskInput as any,
                }}
                inputProps={{
                  'data-testid': 'reader-tcpConnectionPort',
                  mask: plainNumberMask,
                  showMask: true,
                  guide: false,
                }}
              />
            </ControlledInput>
          </ControlledError>
        </div>
        <ControlledError show={!!errors[readerFieldName]?.notes} error={errors[readerFieldName]?.notes}>
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
              value={model[readerFieldName]?.notes || ''}
              onChange={onReaderChangeHandler}
              error={null}
              inputProps={{
                'data-testid': '',
              }}
            />
          </ControlledInput>
        </ControlledError>
      </Grid>
    </Grid>
  );
};

export default memo(ReaderForm);
