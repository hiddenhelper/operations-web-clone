import React, { memo } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

export interface IControlledInputProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  showMark?: boolean;
  dataTestId?: string;
  styleClass?: any;
}

const ControlledInput = ({ label, required, showMark, children, dataTestId, styleClass = '' }: IControlledInputProps) => {
  const classes = useStyles();
  const requiredMark = showMark && <span className={classes.requiredMark}>*</span>;

  return (
    <FormControl className={`${classes.formControl} ${styleClass}`}>
      <Typography color="secondary" variant="caption" align="left" component="h1">
        {label} {required && requiredMark}
      </Typography>
      <div data-testid={dataTestId}>{children}</div>
    </FormControl>
  );
};

export default memo(ControlledInput);
