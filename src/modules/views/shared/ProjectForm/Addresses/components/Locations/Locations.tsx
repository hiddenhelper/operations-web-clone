import React, { memo, useMemo, useCallback } from 'react';
import { Button, Grid, TextField, Divider, IconButton } from '@material-ui/core';
import { AddressModel } from 'modules/models';
import { getConditionalDefaultValue } from 'utils/generalUtils';
import { formGlobalStyles } from 'assets/styles';

import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import Card from 'modules/views/shared/ResourceManagement/Card';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';
import { AddIcon, DeleteIcon } from 'constants/icons';
import { useStyles } from './styles';
import { Status } from 'modules/models/resource';

export interface ILocationsProps {
  onChange: (event: any) => void;
  locationsList: AddressModel.ILocation[];
  status: Status;
  errors: any;
}
const Locations = ({ onChange, locationsList, status, errors }: ILocationsProps) => {
  const currentLocationsList = useMemo(() => getConditionalDefaultValue(locationsList.length === 0, [AddressModel.getFallbackLocation()], locationsList), [
    locationsList,
  ]);

  const buttonGlobalStyles = buttonStyles();
  const locationStyles = useStyles();
  const formClasses = formGlobalStyles();
  const showAdd = !!currentLocationsList[currentLocationsList.length - 1]?.name;
  const getErrors = useCallback(
    (field, index) => {
      const errorIndex = `${field}[${index}].name`;
      if (errors && errors.locations) return errors.locations[errorIndex];
    },
    [errors]
  );

  const deleteLocation = useCallback(
    index => {
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          locations: currentLocationsList.length > 0 ? [...currentLocationsList].filter((u, i) => i !== index) : [AddressModel.getFallbackLocation()],
        })
      );
    },
    [currentLocationsList, onChange]
  );

  const onChangeHandler = useCallback(
    (location: AddressModel.ILocation, index: number) => {
      if (!location.name.length && status === Status.DRAFT) {
        deleteLocation(index);
      } else {
        onChange(
          /* istanbul ignore next */
          prevState => {
            return {
              ...prevState,
              locations: [...currentLocationsList.slice(0, index), location, ...currentLocationsList.slice(index + 1, currentLocationsList.length)],
            };
          }
        );
      }
    },
    [currentLocationsList, status, onChange, deleteLocation]
  );

  const addLocation = useCallback(() => {
    const lastLocation = currentLocationsList[currentLocationsList.length - 1];
    if (!lastLocation.name) return;

    onChange(
      /* istanbul ignore next */ prevState => ({
        ...prevState,
        locations: [...currentLocationsList, AddressModel.getFallbackLocation()],
      })
    );
  }, [currentLocationsList, onChange]);

  return (
    <Card title="Project Locations">
      {currentLocationsList.map((location, index) => {
        const showDelete = (status === Status.DRAFT && location.name) || currentLocationsList.length > 1;
        const canDelete = !location.isUsed;
        return (
          <div key={index}>
            <Grid data-testid="user-row-item" container={true}>
              <Grid item={true} lg={showDelete ? 11 : 12}>
                <Grid container={true}>
                  <Grid container={true} className={`${formClasses.rowsWrapper} ${locationStyles.field}`}>
                    <div className={locationStyles.errorInputWrapper}>
                      <ControlledError
                        show={!!getErrors('locations', index)}
                        error={getConditionalDefaultValue(
                          getErrors('locations', index) === 'is required',
                          'Please enter a Location name.',
                          getErrors('locations', index)
                        )}
                      >
                        <ControlledInput label="Location Name">
                          <TextField
                            autoFocus={true}
                            autoComplete="off"
                            variant="outlined"
                            placeholder="Location Name"
                            type="text"
                            fullWidth={true}
                            name="name"
                            required={true}
                            value={location.name || ''}
                            onChange={e => onChangeHandler({ ...location, name: e.currentTarget.value }, index)}
                            error={!!getErrors('locations', index)}
                            inputProps={{
                              'data-testid': 'project-location-name',
                            }}
                          />
                        </ControlledInput>
                      </ControlledError>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {showDelete && (
                <Grid lg={1} item={true}>
                  <IconButton
                    style={{ left: '1em' }}
                    className={`${buttonGlobalStyles.deleteButton} ${!canDelete && buttonGlobalStyles.disabled}`}
                    data-testid="delete-location-button"
                    onClick={() => deleteLocation(index)}
                    disabled={!canDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
            <Divider className={locationStyles.divider} />
          </div>
        );
      })}
      <ControlledButton>
        <Button
          disableRipple={true}
          startIcon={<AddIcon />}
          className={`${locationStyles.addButtonRow} ${buttonGlobalStyles.addUserButton} ${getConditionalDefaultValue(
            showAdd,
            formClasses.enableUserButton,
            formClasses.disableUserButton
          )}`}
          data-testid="add-location-button"
          onClick={addLocation}
        >
          Add Location
        </Button>
      </ControlledButton>
    </Card>
  );
};

export default memo(Locations);
