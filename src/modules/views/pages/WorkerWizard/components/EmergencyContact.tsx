import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Card from '../../../shared/ResourceManagement/Card';
import ControlledError from '../../../shared/FormHandler/ControlledError';
import ControlledInput from '../../../shared/FormHandler/ControlledInput';

import { WorkerModel, GeneralModel } from '../../../../models';
import { IFormRules } from '../../../../../utils/useValidator';
import { inputGlobalStyles } from '../../../../../assets/styles/Inputs/styles';
import { useStyles } from '../styles';
import PhoneNumberInput from '../../../shared/PhoneNumberInput';

export interface IEmergencyContactProps {
  model: WorkerModel.IWorker;
  errors: any;
  formRules: IFormRules;
  onChangeHandler: (model: any) => void;
  countryList?: GeneralModel.INamedEntity[];
}

const EmergencyContact = ({ model, errors, formRules, onChangeHandler, countryList }: IEmergencyContactProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();
  return (
    <Card title="Emergency Contact">
      <Grid container={true} className={classes.workerFormContainer}>
        <Grid item={true} xl={4} lg={4}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.emergencyContactName} error={errors.emergencyContactName} styleClass={classes.errorPosition}>
              <ControlledInput label="Emergency Contact Name (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-emergencyContactName-wrapper"
                  placeholder="Emergency Contact Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="emergencyContactName"
                  required={formRules.emergencyContactName?.required}
                  value={model.emergencyContactName || ''}
                  onChange={onChangeHandler}
                  error={!!errors.emergencyContactName}
                  inputProps={{
                    'data-testid': 'worker-emergencyContactName',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={4} lg={4}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.emergencyContactPhone}
              error={
                !!errors.emergencyContactPhone && errors.emergencyContactPhone === 'is invalid phone number'
                  ? 'Please enter a valid Emergency Contact Phone.'
                  : errors.phoneNumber
              }
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Emergency Contact Phone (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <PhoneNumberInput
                  countryList={countryList}
                  value={model.emergencyContactPhone || ''}
                  onChange={onChangeHandler}
                  inputProps={{
                    variant: 'outlined',
                    error: errors.emergencyContactPhone,
                    name: 'emergencyContactPhone',
                    required: formRules.emergencyContactPhone?.required,
                    'data-testid': 'worker-emergencyContactPhone',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={4} lg={4}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.emergencyContactRelationship} error={errors.emergencyContactRelationship} styleClass={classes.errorPosition}>
              <ControlledInput label="Relationship (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-emergencyContactRelationship-wrapper"
                  placeholder="Relationship"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="emergencyContactRelationship"
                  required={formRules.emergencyContactRelationship?.required}
                  value={model.emergencyContactRelationship || ''}
                  onChange={onChangeHandler}
                  error={!!errors.emergencyContactRelationship}
                  inputProps={{
                    'data-testid': 'worker-emergencyContactRelationship',
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

export default memo(EmergencyContact);
