import React, { useMemo, memo } from 'react';

import { AcceptedIcon, ExpiredIcon } from '../../../../constants';
import { useStyles } from './styles';

export enum MatchType {
  MATCH = 'match',
  NO_MATCH = 'noMatch',
}

export interface IMatchingFieldProps {
  type: MatchType;
  children: React.ReactNode;
}

const MatchingField = ({ type, children }: IMatchingFieldProps) => {
  const classes = useStyles();
  const matchIconMap = useMemo(
    () => ({
      [MatchType.MATCH]: <AcceptedIcon className={classes.workerModalIcon} />,
      [MatchType.NO_MATCH]: <ExpiredIcon className={classes.workerModalIcon} />,
    }),
    [classes.workerModalIcon]
  );
  return (
    <li className={`${type} ${classes.labelWrapper}`}>
      <div className={classes.workerModalIconMargin}>{matchIconMap[type]}</div>
      {children}
    </li>
  );
};

export default memo(MatchingField);
