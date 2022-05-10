import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

export interface IControlledErrorProps {
  error: string;
  show: boolean;
  children?: React.ReactNode;
  styleClass?: string;
}

const ControlledError = ({ error, show, children, styleClass = '' }: IControlledErrorProps) => {
  const classes = useStyles();
  return (
    <>
      {children}
      {show && (
        <Typography className={`${styleClass} ${classes.errorMessage} errorMessage`} color="secondary" variant="caption" align="left" component="h1">
          {error}
        </Typography>
      )}
    </>
  );
};

export default memo(ControlledError);
