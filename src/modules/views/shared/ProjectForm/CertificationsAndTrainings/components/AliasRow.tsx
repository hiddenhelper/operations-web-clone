import React, { memo, useCallback, useState } from 'react';
import { Box, Divider, Grid, IconButton, TextField, Typography } from '@material-ui/core';

import ControlledError from 'modules/views/shared/FormHandler/ControlledError';

import { CertificationModel, TrainingModel } from 'modules/models';
import { DeleteIcon } from 'constants/index';
import { useStyles } from './styles';

export interface IAliasRowProps {
  getErrors: (certIndex: number, field: string) => undefined | string;
  index: number;
  item: CertificationModel.IProjectCertification | TrainingModel.IProjectTraining;
  onAliasUpdated: (itemId: string, alias: string) => void;
  onDeleteItem: (itemId: string) => void;
}

const AliasRow = ({ getErrors, index, item, onAliasUpdated, onDeleteItem }: IAliasRowProps) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const handleAliasUpdated = useCallback(event => onAliasUpdated(item.id, event.target.value), [item.id, onAliasUpdated]);

  const alias = !item.alias ? '' : item.alias;
  return (
    <>
      <Grid container={true} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} data-testid="alias-row">
        <Grid item={true} sm={true}>
          <ControlledError show={!!getErrors(index, 'id')} error={getErrors(index, 'id')}>
            <Typography>{item.name}</Typography>
          </ControlledError>
        </Grid>
        <Grid item={true} sm={true} style={{ display: 'flex', alignItems: 'center' }}>
          <Box style={{ width: '100%' }}>
            <ControlledError show={!!getErrors(index, 'alias')} error={getErrors(index, 'alias')}>
              <TextField
                autoComplete="off"
                className={`${classes.aliasInput} ${!!getErrors(index, 'alias') && classes.aliasError}`}
                data-testid="item-alias"
                error={!!getErrors(index, 'alias')}
                fullWidth={true}
                name="alias"
                onBlur={onBlur}
                onChange={handleAliasUpdated}
                onFocus={onFocus}
                placeholder="Alias"
                value={alias}
              />
            </ControlledError>
          </Box>
          {(isHover || isFocused) && (
            <IconButton
              className={classes.deleteAliasButton}
              data-testid="delete-item-button"
              disableRipple={true}
              onClick={() => onDeleteItem(item.id)}
              title="Remove Item"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default memo(AliasRow);
