import React, { useCallback, memo } from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';

import { useStyles } from './styles';

export interface IControlledChipProps {
  item?: {
    id?: string;
    name?: string;
  };
  dataTestId: string;
  showDelete?: boolean;
  label?: string;
  statusChip?: boolean;
  statusChipClass?: string;
  styleClass?: string;
  onDelete?: (item: any) => void;
}

const ControlledChip = ({
  item,
  dataTestId,
  showDelete = true,
  onDelete,
  label = '',
  statusChip = false,
  statusChipClass = '',
  styleClass = '',
}: IControlledChipProps) => {
  const classes = useStyles();
  const onDeleteHandler = useCallback(() => item && onDelete(item.id), [onDelete, item]);
  return (
    <Chip
      key={item?.id}
      label={item?.name || label}
      onDelete={showDelete && onDelete && onDeleteHandler}
      color="primary"
      variant="outlined"
      deleteIcon={showDelete && <ClearIcon />}
      className={`${statusChip ? classes.statusChip : classes.selectChip} ${classes[statusChipClass]} ${styleClass}`}
      data-testid={dataTestId}
    />
  );
};

export default memo(ControlledChip);
