import React, { memo, useCallback } from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';

import ControlledError from 'modules/views/shared/FormHandler/ControlledError';

import AliasRow from './AliasRow';
import Autocomplete from './Autocomplete';
import GroupHeader from './GroupHeader';

import { GeneralModel, CertificationModel } from 'modules/models';
import { useStyles } from './styles';

export interface ICertificationGroupProps {
  errors: any;
  group: CertificationModel.ICertificationGroup;
  index: number;
  onChange: (groupIndex: number, changes: CertificationModel.ICertificationGroup) => void;
  onDelete: () => void;
  options: GeneralModel.INamedEntity[];
  resetErrors: () => void;
}

const CertificationGroup = ({ errors, group, index, onChange, onDelete, options, resetErrors }: ICertificationGroupProps) => {
  const classes = useStyles();

  const getErrors = useCallback((field: string): undefined | string => errors?.[`certificationGroups[${index}].${field}`], [errors, index]);
  const getCertErrors = useCallback(
    (itemIndex: number, field: string): undefined | string => errors?.[`certificationGroups[${index}].certifications[${itemIndex}].${field}`],
    [errors, index]
  );

  const handleNameChange = useCallback(event => onChange(index, { ...group, name: event.target.value }), [onChange, index, group]);
  const handleValidationTypeChange = useCallback(event => onChange(index, { ...group, validationType: event.target.value }), [onChange, index, group]);
  const handleItemsChanges = useCallback(
    (event, selectedItems) => {
      const groupCopy = { ...group };
      resetErrors();
      groupCopy.certifications = selectedItems.map(selItem => {
        const existingItem = group.certifications.find(item => item.id === selItem.id);
        return { ...selItem, alias: existingItem?.alias || '' };
      });
      onChange(index, groupCopy);
    },
    [onChange, index, group, resetErrors]
  );
  const handleItemRemoved = useCallback(
    certificationId => {
      const groupCopy = { ...group };
      resetErrors();
      groupCopy.certifications = groupCopy.certifications.filter(item => item.id !== certificationId);
      onChange(index, groupCopy);
    },
    [onChange, index, group, resetErrors]
  );

  const handleAliasChange = useCallback(
    (certificationId, value) => {
      const groupCopy = { ...group };
      groupCopy.certifications = groupCopy.certifications.map(item => {
        if (item.id === certificationId) {
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
        label="Certifications:"
        options={options}
        noOptionsText="Certification not found"
        selectedItems={group.certifications}
      />
      <Box className={classes.listWrapper}>
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={6}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography>Alias</Typography>
          </Grid>
        </Grid>
        <Divider />
        {group?.certifications?.length > 0 ? (
          group.certifications.map((certification, itemIndex) => (
            <AliasRow
              key={certification.id}
              getErrors={getCertErrors}
              index={itemIndex}
              item={certification}
              onDeleteItem={handleItemRemoved}
              onAliasUpdated={handleAliasChange}
            />
          ))
        ) : (
          <ControlledError show={!!getErrors('certifications')} error={getErrors('certifications')} />
        )}
      </Box>
    </Box>
  );
};

export default memo(CertificationGroup);
