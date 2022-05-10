import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { statusWidgetSkeletonStyles, statusWidgetStyles } from '../DashboardWidget/styles';

export interface IStatisticWidget {
  title: string;
  subtitle?: string;
  content: string | number;
  renderContentPill?: React.ReactNode;
  renderAuxContent?: React.ReactNode;
  renderActivity?: React.ReactNode;
  inlineContent: boolean;
  widgetCta?: React.ReactNode;
  loading?: boolean;
}

const StatisticWidget = ({
  title,
  subtitle,
  content,
  renderContentPill,
  renderAuxContent,
  renderActivity,
  inlineContent,
  widgetCta,
  loading,
}: IStatisticWidget) => {
  const skeletonClasses = statusWidgetSkeletonStyles();
  const classes = statusWidgetStyles();

  return (
    <Paper className={`${classes.widget} ${classes.noDetail}`} elevation={0}>
      {loading && inlineContent && (
        <div>
          <div className={skeletonClasses.wrapper}>
            <Skeleton className={skeletonClasses.inlineMain} animation={'wave'} variant="text" width={270} height={58} />
            {renderActivity && <Skeleton className={skeletonClasses.inlineActivity} animation={'wave'} variant="text" width={270} height={25} />}
          </div>
          {renderAuxContent && <Skeleton className={skeletonClasses.inlineAuxContent} animation={'wave'} variant="rect" width={'100%'} height={216} />}
          <Skeleton className={skeletonClasses.inlineCta} animation={'wave'} variant="text" width={120} height={23} />
        </div>
      )}
      {loading && !inlineContent && (
        <div>
          <Typography className={`${classes.widgetTitle} ${classes.widgetTitleBottomMargin}`}>{title}</Typography>
          <div className={skeletonClasses.columnMainContent} data-testid="statistics-widget-skeleton">
            <Skeleton className={skeletonClasses.columnContent} animation={'wave'} variant="text" width={270} height={63} />
            {renderAuxContent && <Skeleton className={skeletonClasses.columnAuxContent} animation={'wave'} variant="rect" width={'100%'} height={168} />}
          </div>
          {!renderAuxContent && <Skeleton className={skeletonClasses.columnActivity} animation={'wave'} variant="text" width={200} height={23} />}
        </div>
      )}
      {!loading && (
        <>
          <div className={classes.widgetContainer}>
            {inlineContent ? (
              <div>
                <div className={classes.widgetInlineStatusWrapper}>
                  <div
                    className={`${classes.widgetContentWrapper} ${getConditionalDefaultValue(!renderAuxContent, classes.widgetContentWrapperBottomMargin, '')}`}
                  >
                    <span className={`${classes.widgetContent} ${classes.widgetInlineMargin}`}>{content}</span>
                    <Typography className={` ${classes.widgetTitle} ${classes.widgetTitleInlinePosition}`}>{title}</Typography>
                    <div className={classes.chipStatusLeftMargin}>{renderContentPill}</div>
                  </div>
                  <div
                    className={`${getConditionalDefaultValue(
                      !renderAuxContent,
                      classes.widgetMarginBottom + ' ' + classes.widgetContentWrapperNoTopMargin,
                      ''
                    )}`}
                  >
                    {renderActivity}
                  </div>
                </div>
                <Typography className={`${classes.widgetSubtitle} ${classes.widgetSubtitleInlinePosition}`}>{subtitle}</Typography>
              </div>
            ) : (
              <>
                <Typography className={`${classes.widgetTitle} ${classes.widgetTitleBottomMargin}`}>{title}</Typography>
                {subtitle && <Typography className={`${classes.widgetSubtitle} ${classes.widgetSubtitlePosition}`}>{subtitle}</Typography>}
                <div
                  className={`${classes.widgetContentWrapper} ${getConditionalDefaultValue(
                    !subtitle && !renderAuxContent,
                    classes.widgetContentWrapperBottomMargin,
                    classes.widgetTitleMarginBottom
                  )}`}
                >
                  <span className={`${classes.widgetContentResponsive} ${classes.widgetContent}`}>{content}</span>
                  <div className={classes.chipStatusLeftMargin}>{renderContentPill}</div>
                </div>
              </>
            )}

            <div className={`${getConditionalDefaultValue(renderAuxContent, classes.widgetAuxContentPadding, '')}`}>{renderAuxContent}</div>
          </div>

          {!inlineContent && (
            <div className={`${getConditionalDefaultValue(!renderAuxContent, classes.widgetContentWrapperNoTopMargin, '')}`}>{renderActivity}</div>
          )}

          {widgetCta}
        </>
      )}
    </Paper>
  );
};

export default memo(StatisticWidget);
