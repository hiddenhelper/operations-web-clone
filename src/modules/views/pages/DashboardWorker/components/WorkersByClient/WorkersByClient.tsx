import React, { memo, useMemo, useEffect } from 'react';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

import { GeneralModel, StatisticsModel } from '../../../../../models';

export interface IWorkersByClientProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByClient: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkersByClient = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersByClient }: IWorkersByClientProps) => {
  const idKey = useMemo(() => 'workersByClient', []);
  const workersByClientList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersByClient(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersByClient]);
  return (
    <DashboardTopTen
      title="Workers by Clients"
      itemTitle="Client"
      isLoading={isLoading}
      list={workersByClientList}
      styles={{ height: '100%', minHeight: '450px' }}
    />
  );
};

export default memo(WorkersByClient);
