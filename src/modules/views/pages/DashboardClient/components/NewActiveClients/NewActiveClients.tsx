import React, { memo, useEffect, useMemo } from 'react';

import DashboardWidget from '../../../../shared/DashboardWidget';
import DashboardWidgetInlineHeader from '../../../../shared/DashboardWidget/DashboardWidgetInlineHeader';
import DashboardMap from '../../../../shared/DashboardWidget/DashboardMap';
import Skeleton from '../../../../shared/Skeleton';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import { useStyles as dashboardStyles } from '../../../Dashboard/styles';
import { statusWidgetStyles } from '../../../../shared/DashboardWidget/styles';

export interface INewActiveClientsProps {
  queryParams: GeneralModel.IQueryParams;
  locationWidget: StatisticsModel.ILocationStatistics;
  loading: GeneralModel.ILoadingStatus;
  fetchActiveClients: (query: GeneralModel.IQueryParams) => void;
}

const NewActiveClients = ({ queryParams, locationWidget, loading, fetchActiveClients }: INewActiveClientsProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  const statusWidgetClasses = statusWidgetStyles();

  const chartData = useMemo(() => (locationWidget ? locationWidget : StatisticsModel.getLocationFallback()), [locationWidget]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchActiveClients(queryParams);
  }, [queryParams, fetchActiveClients]);
  return (
    <DashboardWidget
      styleClass={statusWidgetClasses.widgetMinHeight}
      renderHeader={() => <DashboardWidgetInlineHeader title={'New Active Clients'} value={chartData.total} isLoading={isLoading} />}
      renderContent={() => (
        <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'100%'} height={334}>
          <div style={{ height: '380px' }} className={`${dashboardGlobalClasses.temporalPlaceholder} ${dashboardGlobalClasses.temporalLargePlaceholder}`}>
            <DashboardMap pointList={chartData.pointList} />
          </div>
        </Skeleton>
      )}
    />
  );
};

export default memo(NewActiveClients);
