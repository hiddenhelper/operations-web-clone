import React, { memo } from 'react';

import Chip from '@material-ui/core/Chip';

import { useStyles } from './styles';

export interface IStatusChipProps {
  label: string;
  color?: any;
  icon?: React.ReactElement;
  styleClasses?: string;
}

const StatusChip = ({ styleClasses = '', color = 'primary', icon, label }: IStatusChipProps) => {
  const classes = useStyles();
  return <Chip className={`${classes.statusChip} ${styleClasses}`} color={color} label={label} icon={icon} />;
};

export default memo(StatusChip);
