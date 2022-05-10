import React, { memo } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ControlledButton from '../FormHandler/ControlledButton';

import { DeleteIcon } from '../../../../constants';
import { useStyles } from './style';

export interface IDeleteEntityButtonProps {
  styleContainerClass?: string;
  styleClass?: string;
  onClick: () => void;
}

const DeleteEntityButton = ({ onClick, styleClass = '', styleContainerClass = '' }) => {
  const classes = useStyles();
  return (
    <ControlledButton styleClass={styleContainerClass}>
      <IconButton className={`${classes.deleteButton} ${styleClass}`} data-testid="delete-entity-button" onClick={onClick} disableRipple={true}>
        <DeleteIcon />
      </IconButton>
    </ControlledButton>
  );
};

export default memo(DeleteEntityButton);
