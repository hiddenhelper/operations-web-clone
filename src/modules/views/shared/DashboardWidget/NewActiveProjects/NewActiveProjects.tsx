import React, { memo, useEffect, useMemo } from 'react';

import DashboardWidget from '../DashboardWidget';
import DashboardWidgetInlineHeader from '../DashboardWidgetInlineHeader';
import DashboardMap from '../DashboardMap';
import Skeleton from '../../Skeleton';

import { GeneralModel, StatisticsModel } from '../../../../models';
import { useStyles as dashboardStyles } from '../../../pages/Dashboard/styles';
import { statusWidgetStyles } from '../styles';

export interface INewActiveProjectsProps {
  queryParams: GeneralModel.IQueryParams;
  locationWidget: StatisticsModel.ILocationStatistics;
  loading: GeneralModel.ILoadingStatus;
  fetchActiveProjects: (query: GeneralModel.IQueryParams) => void;
}

const NewActiveProjects = ({ queryParams, locationWidget, loading, fetchActiveProjects }: INewActiveProjectsProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  const statusWidgetClasses = statusWidgetStyles();

  const chartData = useMemo(() => (locationWidget ? locationWidget : StatisticsModel.getLocationFallback()), [locationWidget]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const pointList = useMemo(() => chartData.pointList.filter(point => point.latitude !== 0 && point.longitude !== 0), [chartData]);

  useEffect(() => {
    fetchActiveProjects(queryParams);
  }, [queryParams, fetchActiveProjects]);
  return (
    <DashboardWidget
      styleClass={statusWidgetClasses.widgetMinHeight}
      renderHeader={() => <DashboardWidgetInlineHeader title={'New Active Projects'} value={chartData.total} isLoading={isLoading} />}
      renderContent={() => (
        <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'100%'} height={334}>
          <div style={{ height: '380px' }} className={`${dashboardGlobalClasses.temporalPlaceholder} ${dashboardGlobalClasses.temporalLargePlaceholder}`}>
            <DashboardMap pointList={pointList} />
          </div>
        </Skeleton>
      )}
    />
  );
};

export default memo(NewActiveProjects);
