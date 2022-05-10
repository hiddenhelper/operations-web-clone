import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import SkeletonComponent from '../../Skeleton';

import { statusWidgetStyles, statusWidgetSkeletonStyles, dashboardWidgetHeaderSkeletonStyles } from '../styles';
import { formatNumberWithCommas } from '../../../../../utils/generalUtils';

export interface IDashboardWidgetHeader {
  title: string;
  value?: string | number;
  activity?: any;
  pill?: React.ReactNode;
  isLoading: boolean;
}

const DashboardWidgetHeader = ({ title, value, activity, pill, isLoading }: IDashboardWidgetHeader) => {
  const skeletonClasses = statusWidgetSkeletonStyles();
  const dashboardWidgetHeaderSkeletonClasses = dashboardWidgetHeaderSkeletonStyles();
  const classes = statusWidgetStyles();

  return (
    <>
      <SkeletonComponent isLoading={isLoading} animation="wave" variant="rect" width={200} height={25}>
        <Typography className={`${classes.widgetTitle} ${classes.widgetTitleBottomMargin}`}>{title}</Typography>
      </SkeletonComponent>
      <SkeletonComponent
        styleClass={dashboardWidgetHeaderSkeletonClasses.headerMarginTop}
        isLoading={isLoading}
        animation="wave"
        variant="rect"
        width={200}
        height={25}
      >
        <div className={`${classes.widgetContentWrapper}`}>
          <span className={`${classes.widgetContentResponsive} ${classes.widgetContent}`}>{formatNumberWithCommas(value)}</span>
          <SkeletonComponent styleClass={skeletonClasses.skeletonChipMarginLeft} isLoading={isLoading} animation="wave" variant="text" width={55} height={25}>
            <div className={classes.chipStatusLeftMargin}>{pill}</div>
          </SkeletonComponent>
        </div>
      </SkeletonComponent>
      {activity && (
        <SkeletonComponent isLoading={isLoading} animation="wave" variant="text" width={'100%'} height={25}>
          {activity}
        </SkeletonComponent>
      )}
    </>
  );
};

export default memo(DashboardWidgetHeader);
