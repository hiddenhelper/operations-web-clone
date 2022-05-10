import React, { memo, useEffect, useMemo } from 'react';

import PieWidget from '../../../../../../shared/DashboardWidget/PieWidget';

import { ResourceModel, GeneralModel, StatisticsModel } from '../../../../../../../models';
import { parseQuery } from '../../../../../../../../utils/generalUtils';
import { ROUTES } from '../../../../../../../../constants';

export interface INewClientsProps {
  queryParams: GeneralModel.IQueryParams;
  pieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.IPieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchClientWidget: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewClients = ({ queryParams, pieStatisticsMap, loading, fetchClientWidget }: INewClientsProps) => {
  const idKey = useMemo(() => 'mainNewClients', []);
  const data = useMemo(() => pieStatisticsMap[idKey] || StatisticsModel.getPieWidgetStatisticsFallback(), [pieStatisticsMap, idKey]);

  const pieChartData = useMemo(
    () =>
      data.chart.map(entry => ({
        ...entry,
        x: ResourceModel.pieStatusMap[entry.status],
        y: entry.total,
        color: ResourceModel.statusColorMap[entry.status],
      })),
    [data]
  );

  const isClientWidgetLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchClientWidget(idKey, queryParams);
  }, [queryParams, idKey, fetchClientWidget]);
  return (
    <PieWidget
      title="New Clients"
      total={data.newClients}
      data={pieChartData}
      isLoading={isClientWidgetLoading}
      detailRoute={`${ROUTES.DASHBOARD_CLIENTS.path}?${parseQuery(queryParams)}`}
    />
  );
};

export default memo(NewClients);
