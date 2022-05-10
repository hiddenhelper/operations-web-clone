import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ControlledCheckbox from '../../../shared/FormHandler/Checkbox';

import { InfoIcon } from '../../../../../constants';
import { useStyles } from './styles';
import { Grid } from '@material-ui/core';

export interface ICardProps {
  title: string;
  children: React.ReactNode;
  secondaryAction?: React.ReactNode;
  hideSecondaryAction?: boolean;
  styleClass?: any;
  actionStyleClass?: any;
  showAttentionIcon?: boolean;
  checkboxRenderChildEnabled?: boolean;
  isCheckedRenderChild?: boolean;
  showDivider?: boolean;
  onChangeRenderChildEnabled?: () => any;
}

const Card = ({
  title,
  children,
  secondaryAction,
  hideSecondaryAction = false,
  styleClass = '',
  actionStyleClass = '',
  showDivider = true,
  showAttentionIcon = false,
  checkboxRenderChildEnabled = false,
  isCheckedRenderChild,
  onChangeRenderChildEnabled,
}: ICardProps) => {
  const classes = useStyles();
  return (
    <Paper className={`${classes.container} ${styleClass}`} variant="outlined">
      <Grid container={true} alignItems="center" justify="space-between">
        <Grid item={true} sm="auto" xs={12}>
          <Typography variant="h1" className={classes.title}>
            {checkboxRenderChildEnabled && (
              <ControlledCheckbox
                isChecked={isCheckedRenderChild}
                name="renderChild"
                value="renderChild"
                onChange={onChangeRenderChildEnabled}
                inputProps={{ 'data-testid': 'render-child' }}
              />
            )}
            {title}
          </Typography>
        </Grid>
        <Grid item={true} sm="auto" xs={12}>
          {!hideSecondaryAction && (
            <>
              <span className={`${actionStyleClass} ${classes.secondaryActions}`}>
                {showAttentionIcon && <InfoIcon />}
                {secondaryAction}
              </span>
            </>
          )}
        </Grid>
      </Grid>

      {showDivider && <Divider className={classes.divider} />}
      {children}
    </Paper>
  );
};

export default memo(Card);
