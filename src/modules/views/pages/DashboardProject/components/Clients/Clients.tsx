import React, { memo, useEffect, useMemo } from 'react';

import PieWidget from '../../../../shared/DashboardWidget/PieWidget';

import { GeneralModel, StatisticsModel, ProjectModel } from '../../../../../models';
import { getPieData } from '../../../../../../utils/generalUtils';

export interface IClientsProps {
  queryParams: GeneralModel.IQueryParams;
  pieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.IPieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchClientWidget: (key: string, query: GeneralModel.IQueryParams) => void;
}

const Clients = ({ queryParams, pieStatisticsMap, loading, fetchClientWidget }: IClientsProps) => {
  const idKey = useMemo(() => 'projectClients', []);
  const data = useMemo(() => pieStatisticsMap[idKey] || StatisticsModel.getPieWidgetStatisticsFallback(), [pieStatisticsMap, idKey]);

  const pieChartData = useMemo(() => getPieData(data.pieChart, ProjectModel.roleMap, GeneralModel.pieBlueMap), [data]);

  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchClientWidget(idKey, queryParams);
  }, [queryParams, idKey, fetchClientWidget]);
  return (
    <PieWidget
      title="Clients"
      total={data.totalRecords}
      data={pieChartData}
      isLoading={isLoading}
      showDetailRoute={false}
      style={{ pieParentStyles: { marginBottom: '0px' } }}
    />
  );
};

export default memo(Clients);
