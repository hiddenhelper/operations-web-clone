import React, { memo } from 'react';

import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

import { getDefaultValue } from '../../../../../utils/generalUtils';

import { useStyles } from './styles';

export interface IControlledTooltip extends TooltipProps {
  children: React.ReactElement;
  styleClass?: string;
}

const ControlledTooltip = ({ children, styleClass, ...props }: IControlledTooltip) => {
  const classes = useStyles();
  return (
    <Tooltip className={getDefaultValue(styleClass, '')} classes={{ tooltip: classes.tooltipRoot }} {...props}>
      {children}
    </Tooltip>
  );
};

export default memo(ControlledTooltip);
