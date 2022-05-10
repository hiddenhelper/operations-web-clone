import React, { memo, useMemo, useEffect } from 'react';

import { GeneralModel, StatisticsModel } from '../../../../models';
import DashboardTopTen from '../DashboardTopTen';

export interface IWorkersByTradesMinorityProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByTradesMinority: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkersByTradesMinority = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersByTradesMinority }: IWorkersByTradesMinorityProps) => {
  const idKey = useMemo(() => 'workersByTradesMinority', []);
  const workersByTradesMinorityList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersByTradesMinority(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersByTradesMinority]);
  return (
    <DashboardTopTen
      title="Workers by Trades - Minority"
      itemTitle="Trade"
      isLoading={isLoading}
      list={workersByTradesMinorityList}
      styles={{ minHeight: '100%' }}
    />
  );
};

export default memo(WorkersByTradesMinority);
