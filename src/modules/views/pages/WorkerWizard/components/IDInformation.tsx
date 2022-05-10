import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Card from '../../../shared/ResourceManagement/Card';
import ControlledError from '../../../shared/FormHandler/ControlledError';
import ControlledInput from '../../../shared/FormHandler/ControlledInput';
import ControlledSelect from '../../../shared/FormHandler/ControlledSelect';

import { GeneralModel, WorkerModel } from '../../../../models';
import { IFormRules } from '../../../../../utils/useValidator';
import { inputGlobalStyles } from '../../../../../assets/styles/Inputs/styles';
import { useStyles } from '../styles';

export interface IIDInformationProps {
  model: WorkerModel.IWorker;
  errors: any;
  formRules: IFormRules;
  identificationTypeOptions: GeneralModel.ISelectOption[];
  onChangeHandler: (model: any) => void;
  geographicLocationsOptions: GeneralModel.ISelectOption[];
}

const IDInformation = ({ model, errors, formRules, identificationTypeOptions, onChangeHandler, geographicLocationsOptions }: IIDInformationProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();

  return (
    <Card title="Government Issued ID">
      <Grid container={true} className={classes.workerFormContainer}>
        <Grid item={true} xl={4} lg={4}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.identificationTypeId} error={errors.identificationTypeId} styleClass={classes.errorPosition}>
              <ControlledInput label="ID Type (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="identificationTypeId"
                  includeNone={true}
                  value={model.identificationTypeId ?? ''}
                  options={identificationTypeOptions}
                  onChange={onChangeHandler}
                  error={!!errors.identificationTypeId}
                  disabled={false}
                  dataTestId="worker-identificationTypeId"
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={4} lg={4}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.identificationNumber} error={errors.identificationNumber} styleClass={classes.errorPosition}>
              <ControlledInput label="ID Number (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-identificationNumber-wrapper"
                  placeholder="ID Number"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="identificationNumber"
                  required={formRules.identificationNumber?.required}
                  value={model.identificationNumber || ''}
                  onChange={onChangeHandler}
                  error={!!errors.identificationNumber}
                  inputProps={{
                    'data-testid': 'worker-identificationNumber',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={4} lg={4}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.identificationGeographicLocationId}
              error={errors.identificationGeographicLocationId}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Issued By (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="identificationGeographicLocationId"
                  includeNone={true}
                  value={model.identificationGeographicLocationId ?? ''}
                  options={geographicLocationsOptions}
                  onChange={onChangeHandler}
                  error={!!errors.identificationGeographicLocationId}
                  disabled={false}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default memo(IDInformation);
