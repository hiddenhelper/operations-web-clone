import React, { memo, useEffect, useRef } from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';

import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';

import { GeneralModel } from 'modules/models';
import { TrashCan } from 'constants/index';
import { useStyles } from './styles';

interface IGroupHeaderProps {
  getErrors: (field: string) => undefined | string;
  handleDelete: () => void;
  handleNameChange: (event: any) => void;
  handleValidationTypeChange: (event: any) => void;
  id?: string;
  name: string;
  validationType: number;
}

const GroupHeader = ({ getErrors, handleDelete, handleNameChange, handleValidationTypeChange, id, name, validationType }: IGroupHeaderProps) => {
  const classes = useStyles();

  const groupNameInputRef = useRef(null);

  useEffect(() => {
    if (!id && groupNameInputRef.current) {
      groupNameInputRef.current?.focus(); // Focus group name input on group creation
    }
  }, [id]);

  return (
    <Box className={classes.groupHeader}>
      <Box>
        <ControlledError show={!!getErrors('name')} error={getErrors('name')} styleClass={classes.groupNameErrorMessage}>
          <TextField
            autoComplete="off"
            className={classes.titleInput}
            data-testid="group-name"
            error={!!getErrors('name')}
            inputRef={groupNameInputRef}
            name="name"
            onChange={handleNameChange}
            placeholder="Group name"
            required={true}
            value={name}
          />
        </ControlledError>
      </Box>
      <Box className={classes.validationTypeWrapper}>
        <ControlledError show={!!getErrors('validationType')} error={getErrors('validationType')}>
          <ControlledSelect
            dataTestId="validation-type"
            error={!!getErrors('validationType')}
            name="validationType"
            onChange={handleValidationTypeChange}
            options={GeneralModel.GroupValidationOptions}
            styleClass={classes.validationTypeInput}
            value={validationType}
          />
        </ControlledError>
        <IconButton data-testid="delete-group-button" onClick={handleDelete} title="Delete group" className={classes.deleteGroupButton}>
          <TrashCan />
        </IconButton>
      </Box>
    </Box>
  );
};

export default memo(GroupHeader);
