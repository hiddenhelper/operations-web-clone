import React, { memo } from 'react';

import { InfoIcon } from '../../../../constants';

import { useStyles } from './styles';

const BadgeSynchronizingLabel = () => {
  const classes = useStyles();
  return (
    <div className={classes.isSynchronizingLegendContainer}>
      <div>
        <InfoIcon />
      </div>
      <div className={classes.isSynchronizingLegend}>
        Actions are disabled at the moment, badge is being synchronized. Please wait a few minutes and refresh.
      </div>
    </div>
  );
};

export default memo(BadgeSynchronizingLabel);
