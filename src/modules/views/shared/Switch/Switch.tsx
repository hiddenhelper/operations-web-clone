import React from 'react';
import { Switch as MaterialSwitch } from '@material-ui/core';
import { useStyles } from './styles';

export default function Switch({ checked, onChange, ...rest }) {
  const classes = useStyles();
  return <MaterialSwitch className={`${classes.switch} ${checked && classes.checked}`} checked={checked} onChange={onChange} color="primary" {...rest} />;
}
