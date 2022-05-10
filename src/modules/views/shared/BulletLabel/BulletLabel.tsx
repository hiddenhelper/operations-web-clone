import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import { getDefaultValue } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IBulletLabelProps {
  label: string;
  color: string;
  styleClass?: string;
}

const BulletLabel = ({ label, color = 'gray', styleClass }: IBulletLabelProps) => {
  const classes = useStyles();

  return (
    <div className={`${getDefaultValue(styleClass, '')} ${classes.bulletLabelWrapper}`}>
      <span className={`${classes.statusCircle}`} style={{ backgroundColor: color }} />
      <Typography className={classes.statusText}>{label}</Typography>
    </div>
  );
};

export default memo(BulletLabel);
