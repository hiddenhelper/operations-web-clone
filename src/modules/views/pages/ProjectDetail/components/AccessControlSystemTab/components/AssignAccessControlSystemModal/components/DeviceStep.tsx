import React, { memo, useCallback, useMemo } from 'react';

import { Grid, TextField } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';

import { GeneralModel, AccessControlSystemModel, AddressModel } from 'modules/models';
import { getConditionalDefaultValue, getDefaultValue } from 'utils/generalUtils';
import { useStyles } from './styles';

export interface IDeviceAccessControlSystemStepProps {
  model: AccessControlSystemModel.IProjectAccessControlSystem;
  errors: any;
  formRules: any;
  accessControlSystem: AccessControlSystemModel.IProjectAccessControlSystem;
  accessControlSystemAssignProjectLoading: GeneralModel.ILoadingStatus;
  unassignAccessControlSystemAssignProjectLoading: GeneralModel.ILoadingStatus;
  onChange: (data: any) => void;
  locations: AddressModel.ILocation[];
}

const DeviceAccessControlSystemStep = ({
  model,
  errors,
  formRules,
  accessControlSystem,
  accessControlSystemAssignProjectLoading,
  unassignAccessControlSystemAssignProjectLoading,
  locations,
  onChange,
}: IDeviceAccessControlSystemStepProps) => {
  const classes = useStyles();
  const locationOptionList = useMemo(() => locations.map(location => ({ value: location.id, label: location.name })), [locations]);
  const directionTypeList = useMemo(() => getDefaultValue(AccessControlSystemModel.readerTypeByTypeMap[accessControlSystem.type], []), [
    accessControlSystem.type,
  ]);
  const isHandHeld = useMemo(() => model.type === AccessControlSystemModel.AccessControlSystemType.HANDHELD, [model.type]);

  const onChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevModel => ({
        ...prevModel,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onBooleanChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevModel => ({
        ...prevModel,
        [event.target.name]: !!Number(event.target.value),
      }));
    },
    [onChange]
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

  if (
    !model ||
    (accessControlSystemAssignProjectLoading && accessControlSystemAssignProjectLoading.isLoading) ||
    (unassignAccessControlSystemAssignProjectLoading && unassignAccessControlSystemAssignProjectLoading.isLoading)
  ) {
    return <>Loading...</>;
  }

  return (
    <>
      {!isHandHeld && (
        <Card data-testid="device-step" title="Location">
          <Grid container={true}>
            <Grid item={true} lg={12} xl={12} style={{ margin: '20px 0' }}>
              <ControlledError
                error={getConditionalDefaultValue(errors?.locationId === 'is required', 'Please select a Location.', errors?.locationId)}
                show={!!errors.locationId}
              >
                <ControlledSelect
                  error={!!errors?.locationId}
                  includeNone={true}
                  inputProps={{
                    'data-testid': 'location-select',
                  }}
                  label="Location Name"
                  name="locationId"
                  onChange={onChangeHandler}
                  options={locationOptionList}
                  value={getDefaultValue(model?.locationId, '')}
                />
              </ControlledError>
            </Grid>
          </Grid>
        </Card>
      )}
      <Card
        data-testid="device-step"
        title={`${AccessControlSystemModel.accessControlSystemTypeMap[accessControlSystem?.type]} (${accessControlSystem?.serialNumber})`}
      >
        <Grid container={true} style={{ margin: '20px 0' }}>
          <Grid item={true} lg={!isHandHeld ? 6 : 12} xl={!isHandHeld ? 6 : 12}>
            <ControlledError
              show={!!errors.deviceName}
              error={getConditionalDefaultValue(errors?.deviceName === 'is required', 'Please enter a Device Name.', errors?.deviceName)}
            >
              <ControlledInput label="Device Name">
                <TextField
                  variant="outlined"
                  data-testid="acs-device-name-wrapper"
                  placeholder="Device Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="deviceName"
                  required={formRules?.deviceName.required}
                  value={model.deviceName || ''}
                  onChange={onChangeHandler}
                  error={!!errors.deviceName}
                  inputProps={{
                    'data-testid': 'device-name',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          {!isHandHeld && (
            <Grid item={true} lg={6} xl={6} style={{ paddingLeft: '40px' }}>
              <ControlledError show={!!errors.hasReverseInstallation} error={null}>
                <ControlledInput label="Reverse Installation">
                  <ControlledRadio
                    row={true}
                    containerStyleClass={classes.hasReverseInstallation}
                    radioItems={[
                      { value: 0, label: 'No' },
                      { value: 1, label: 'Yes' },
                    ]}
                    formControlProps={{
                      name: 'hasReverseInstallation',
                      label: '',
                      value: Number(model.hasReverseInstallation),
                      onChange: onBooleanChangeHandler,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
          )}
        </Grid>
      </Card>
      {!isHandHeld && model.reader1 && (
        <Card title={`Reader 1 (${accessControlSystem?.reader1?.serialNumber})`}>
          <Grid container={true}>
            <Grid item={true} lg={12} xl={12} style={{ margin: '20px 0' }}>
              <ControlledError
                show={!!errors?.reader1?.hostAddress}
                error={getConditionalDefaultValue(
                  errors?.reader1?.hostAddress === 'is required',
                  'Please enter Public Ip / Domain Name.',
                  errors?.reader1?.hostAddress
                )}
              >
                <ControlledInput label="Public IP / Domain Name">
                  <TextField
                    variant="outlined"
                    placeholder="Public IP / Domain Name"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="hostAddress"
                    required={formRules?.reader1?.hostAddress}
                    value={model.reader1?.hostAddress || ''}
                    onChange={onReaderChangeHandler}
                    error={!!errors?.reader1?.hostAddress}
                    inputProps={{
                      'data-testid': 'reader-1-hostaddress',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} lg={12} xl={12}>
              <Grid container={true}>
                <Grid item={true} lg={6} xl={6} style={{ paddingRight: '15px' }}>
                  <ControlledError
                    show={!!errors?.reader1?.telnetConnectionPort}
                    error={getConditionalDefaultValue(
                      errors?.reader1?.telnetConnectionPort === 'is required',
                      'Please enter a Telnet Connection Port.',
                      errors?.reader1?.telnetConnectionPort
                    )}
                  >
                    <ControlledInput label="TELNET Connection Port">
                      <TextField
                        variant="outlined"
                        placeholder="TELNET Connection Port"
                        type="text"
                        autoComplete="off"
                        fullWidth={true}
                        name="telnetConnectionPort"
                        required={formRules?.reader1?.telnetConnectionPort}
                        value={getDefaultValue(model.reader1?.telnetConnectionPort, '')}
                        onChange={onReaderChangeHandler}
                        error={!!errors?.reader1?.telnetConnectionPort}
                        inputProps={{
                          'data-testid': 'reader-1-telnet-connection-port',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </Grid>
                <Grid item={true} lg={6} xl={6} style={{ paddingLeft: '15px' }}>
                  <ControlledError
                    show={!!errors?.reader1?.directionType}
                    error={getConditionalDefaultValue(
                      errors?.reader1?.directionType === 'is required',
                      'Please enter a Direction Type.',
                      errors?.reader1?.directionType
                    )}
                  >
                    <ControlledSelect
                      label="Direction Type"
                      name="directionType"
                      value={getDefaultValue(model.reader1?.directionType, '')}
                      options={directionTypeList}
                      onChange={onReaderChangeHandler}
                      dataTestId="reader-2-direction-type"
                      error={!!errors?.reader1?.directionType}
                      includeNone={true}
                    />
                  </ControlledError>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
      {!isHandHeld && model.reader2 && (
        <Card title={`Reader 2 (${model.reader2?.serialNumber})`}>
          <Grid container={true}>
            <Grid item={true} lg={12} xl={12} style={{ margin: '20px 0' }}>
              <ControlledError
                show={!!errors?.reader2?.hostAddress}
                error={getConditionalDefaultValue(
                  errors?.reader2?.hostAddress === 'is required',
                  'Please enter public ip / domain name.',
                  errors?.reader2?.hostAddress
                )}
              >
                <ControlledInput label="Public IP / Domain Name">
                  <TextField
                    variant="outlined"
                    placeholder="Public IP / Domain Name"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="hostAddress"
                    required={formRules?.reader2?.hostAddress}
                    value={model.reader2?.hostAddress || ''}
                    onChange={onReader2ChangeHandler}
                    error={!!errors?.reader2?.hostAddress}
                    inputProps={{
                      'data-testid': 'reader-2-hostaddress',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} lg={12} xl={12}>
              <Grid container={true}>
                <Grid item={true} lg={6} xl={6} style={{ paddingRight: '15px' }}>
                  <ControlledError
                    show={!!errors?.reader2?.telnetConnectionPort}
                    error={getConditionalDefaultValue(
                      errors?.reader2?.telnetConnectionPort === 'is required',
                      'Please enter a Telnet Connection Port.',
                      errors?.reader2?.telnetConnectionPort
                    )}
                  >
                    <ControlledInput label="TELNET Connection Port">
                      <TextField
                        variant="outlined"
                        placeholder="TELNET Connection Port"
                        type="text"
                        autoComplete="off"
                        fullWidth={true}
                        name="telnetConnectionPort"
                        required={formRules?.reader2?.telnetConnectionPort}
                        value={getDefaultValue(model.reader2?.telnetConnectionPort, '')}
                        onChange={onReader2ChangeHandler}
                        error={!!errors?.reader2?.telnetConnectionPort}
                        inputProps={{
                          'data-testid': 'reader-2-telnet-connection-port',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </Grid>
                <Grid item={true} lg={6} xl={6} style={{ paddingLeft: '15px' }}>
                  <ControlledError
                    show={!!errors?.reader2?.directionType}
                    error={getConditionalDefaultValue(
                      errors?.reader2?.directionType === 'is required',
                      'Please enter a Direction Type.',
                      errors?.reader2?.directionType
                    )}
                  >
                    <ControlledSelect
                      label="Direction Type"
                      name="directionType"
                      value={getDefaultValue(model.reader2?.directionType, '')}
                      options={directionTypeList}
                      onChange={onReader2ChangeHandler}
                      dataTestId="reader-2-direction-type"
                      error={!!errors?.reader2?.directionType}
                      includeNone={true}
                    />
                  </ControlledError>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default memo(DeviceAccessControlSystemStep);
