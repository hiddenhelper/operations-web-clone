import React, { memo, useCallback } from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';

import ControlledError from 'modules/views/shared/FormHandler/ControlledError';

import AliasRow from './AliasRow';
import Autocomplete from './Autocomplete';
import GroupHeader from './GroupHeader';

import { GeneralModel, TrainingModel } from 'modules/models';
import { useStyles } from './styles';

interface ITrainingGroupProps {
  errors: any;
  group: TrainingModel.ITrainingGroup;
  index: number;
  onChange: (groupIndex: number, changes: TrainingModel.ITrainingGroup) => void;
  onDelete: () => void;
  options: GeneralModel.INamedEntity[];
}

const TrainingGroup = ({ errors, group, index, onChange, onDelete, options }: ITrainingGroupProps) => {
  const classes = useStyles();

  const getErrors = useCallback((field: string): undefined | string => errors?.[`trainingGroups[${index}].${field}`], [errors, index]);
  const getTrainingErrors = useCallback(
    (itemIndex: number, field: string): undefined | string => errors?.[`trainingGroups[${index}].trainings[${itemIndex}].${field}`],
    [errors, index]
  );

  const handleNameChange = useCallback(event => onChange(index, { ...group, name: event.target.value }), [onChange, index, group]);
  const handleValidationTypeChange = useCallback(event => onChange(index, { ...group, validationType: event.target.value }), [onChange, index, group]);
  const handleItemsChanges = useCallback(
    (event, selectedItems) => {
      const groupCopy = { ...group };
      groupCopy.trainings = selectedItems.map(selItem => {
        const existingCert = group.trainings.find(item => item.id === selItem.id);
        return { ...selItem, alias: existingCert?.alias || '' };
      });
      onChange(index, groupCopy);
    },
    [onChange, index, group]
  );
  const handleItemRemoved = useCallback(
    trainingId => {
      const groupCopy = { ...group };
      groupCopy.trainings = groupCopy.trainings.filter(item => item.id !== trainingId);
      onChange(index, groupCopy);
    },
    [onChange, index, group]
  );

  const handleAliasChange = useCallback(
    (trainingId, value) => {
      const groupCopy = { ...group };
      groupCopy.trainings = groupCopy.trainings.map(item => {
        if (item.id === trainingId) {
          return { ...item, alias: value };
        } else {
          return item;
        }
      });
      onChange(index, groupCopy);
    },
    [onChange, index, group]
  );

  return (
    <Box className={classes.group} key={group.id ?? index}>
      <GroupHeader
        getErrors={getErrors}
        handleDelete={onDelete}
        handleNameChange={handleNameChange}
        handleValidationTypeChange={handleValidationTypeChange}
        id={group.id}
        name={group.name}
        validationType={group.validationType}
      />
      <Divider className={classes.groupDivider} />
      <Autocomplete
        handleChanges={handleItemsChanges}
        label="Trainings:"
        options={options}
        noOptionsText="Training not found"
        selectedItems={group.trainings}
      />
      <Box className={classes.listWrapper}>
        <Grid container={true}>
          <Grid item={true} sm={true}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item={true} sm={true}>
            <Typography>Alias</Typography>
          </Grid>
        </Grid>
        <Divider />
        {group?.trainings?.length > 0 ? (
          group.trainings.map((training, itemIndex) => (
            <AliasRow
              key={training.id}
              getErrors={getTrainingErrors}
              index={itemIndex}
              item={training}
              onDeleteItem={handleItemRemoved}
              onAliasUpdated={handleAliasChange}
            />
          ))
        ) : (
          <ControlledError show={!!getErrors('trainings')} error={getErrors('trainings')} />
        )}
      </Box>
    </Box>
  );
};

export default memo(TrainingGroup);
