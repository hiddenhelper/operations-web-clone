import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import Skeleton from '../../Skeleton';

import { formatNumberWithCommas, getConditionalDefaultValue, getDefaultValue } from '../../../../../utils/generalUtils';

import { statusWidgetStyles, dashboardWidgetInlineHeaderSkeletonStyles } from '../styles';

export interface IDashboardWidgetInlineHeader {
  title: string;
  subtitle?: string;
  value?: string | number;
  pill?: React.ReactNode;
  styleClass?: string;
  contentWrapperStyleClass?: string;
  isLoading: boolean;
  showValue?: boolean;
}

const DashboardWidgetInlineHeader = ({
  title,
  subtitle,
  value,
  pill,
  styleClass,
  contentWrapperStyleClass,
  showValue = true,
  isLoading,
}: IDashboardWidgetInlineHeader) => {
  const dashboardWidgetInlineHeaderSkeletonClasses = dashboardWidgetInlineHeaderSkeletonStyles();
  const classes = statusWidgetStyles();
  return (
    <div className={getDefaultValue(styleClass, '')}>
      <div className={`${getConditionalDefaultValue(!showValue, classes.widgetPaddingTitle, '')} ${classes.widgetInlineStatusWrapper}`}>
        <div className={`${classes.widgetContentWrapper} ${classes.widgetContentWrapperBottomMargin} ${contentWrapperStyleClass}`}>
          {showValue && (
            <Skeleton
              styleClass={dashboardWidgetInlineHeaderSkeletonClasses.valueWrapper}
              isLoading={isLoading}
              animation="wave"
              variant="rect"
              width={68}
              height={40}
            >
              <span className={`${classes.widgetContent} ${classes.widgetInlineMargin}`}>{formatNumberWithCommas(value)}</span>
            </Skeleton>
          )}
          <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={120} height={25}>
            <Typography className={` ${classes.widgetTitle} ${classes.widgetTitleInlinePosition}`}>{title}</Typography>
          </Skeleton>
          <Skeleton
            styleClass={`${dashboardWidgetInlineHeaderSkeletonClasses.pillMarginLeft}`}
            isLoading={isLoading}
            animation="wave"
            variant="rect"
            width={50}
            height={25}
          >
            <div className={classes.chipStatusLeftMargin}>{pill}</div>
          </Skeleton>
        </div>
      </div>
      {subtitle && (
        <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={200} height={25}>
          <Typography className={`${classes.widgetSubtitle} ${classes.widgetSubtitleInlinePosition}`}>{subtitle}</Typography>
        </Skeleton>
      )}
    </div>
  );
};

export default memo(DashboardWidgetInlineHeader);
