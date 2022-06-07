import React, { memo } from 'react';

import { getConditionalDefaultValue } from 'utils';
import { useStepIconStyles } from './StepIconStyles';

export interface IStepIconProps {
  active: boolean;
  completed: boolean;
  started: boolean;
}

const StepIcon = ({ active, completed, started }: IStepIconProps) => {
  const classes = useStepIconStyles();

  return (
    <div className={classes.root} data-testid={'step-icon'}>
      <div
        className={`${classes.circle} ${getConditionalDefaultValue(active && !completed, classes.active, '')} ${getConditionalDefaultValue(
          completed,
          classes.completed,
          ''
        )} ${getConditionalDefaultValue(started && !completed, classes.started, '')} ${getConditionalDefaultValue(
          !active && !completed,
          classes.uncompleted,
          ''
        )} ${getConditionalDefaultValue(started && active && !completed, classes.startedAndActive, '')}`}
      />
      {completed ? <span className={classes.checkmark} /> : ''}
    </div>
  );
};

export default memo(StepIcon);
