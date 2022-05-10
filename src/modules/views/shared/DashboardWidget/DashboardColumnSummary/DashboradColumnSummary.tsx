import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';

import SkeletonComponent from '../../Skeleton';

import { getDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IColumnSummary {
  title: string;
  subtitle: string;
  renderActivity?: any;
  styleClass?: string;
  isLoading: boolean;
}

const ColumnSummary = ({ title, subtitle, renderActivity, styleClass, isLoading }: IColumnSummary) => {
  const classes = useStyles();
  return (
    <SkeletonComponent styleClass={classes.skeletonTextWrapper} isLoading={isLoading} animation="wave" variant="rect" width={'100%'} height={75}>
      <div className={`${getDefaultValue(styleClass, '')} ${classes.columnSummaryWrapper}`}>
        <Typography className={classes.columnSummaryTitle}>{title}</Typography>

        <Typography className={classes.columnSummarySubtitle}>{subtitle}</Typography>

        <div className={classes.columnSummaryActivity}>{renderActivity}</div>
      </div>
    </SkeletonComponent>
  );
};

export default memo(ColumnSummary);
