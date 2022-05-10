import React, { ReactNode } from 'react';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';

export interface IBannerProps {
  onButtonClick?: () => void;
  buttonLabel: string;
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
  testId?: string;
}

export const Banner = ({ onButtonClick, icon, title, subTitle, buttonLabel, testId }: IBannerProps) => {
  const classes = useStyles();
  return (
    <Grid container={true} className={classes.container} spacing={0} data-testid={testId ?? 'banner'}>
      <Grid item={true} xs={10} className={classes.titleContainer}>
        {icon && (
          <Box className={classes.iconContainer} data-testid="icon-container">
            {icon}
          </Box>
        )}
        <Box>
          {title && <h2>{title}</h2>}
          {subTitle && <h3>{subTitle}</h3>}
        </Box>
      </Grid>
      {onButtonClick && (
        <Grid item={true} xs={2} className={classes.linkContainer}>
          <span onClick={onButtonClick}>{buttonLabel}</span>
        </Grid>
      )}
    </Grid>
  );
};
