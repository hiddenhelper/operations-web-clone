import React, { memo } from 'react';

import Button from '@material-ui/core/Button';

import ControlledButton from '../FormHandler/ControlledButton/ControlledButton';

import { useStyles } from './styles';
import { AddIcon } from '../../../../constants';

export interface IAddEntityButtonProps {
  onAdd: () => void;
  isAddDisabled: boolean;
  title: string;
}

const AddEntityButton = ({ onAdd, isAddDisabled, title }: IAddEntityButtonProps) => {
  const classes = useStyles();

  return (
    <ControlledButton>
      <Button
        data-testid="add-item-button"
        disableRipple={true}
        startIcon={<AddIcon />}
        onClick={onAdd}
        disabled={isAddDisabled}
        className={`${classes.addEntityButton} ${isAddDisabled ? classes.disableButton : classes.enableButton}`}
      >
        Add {title}
      </Button>
    </ControlledButton>
  );
};

export default memo(AddEntityButton);
