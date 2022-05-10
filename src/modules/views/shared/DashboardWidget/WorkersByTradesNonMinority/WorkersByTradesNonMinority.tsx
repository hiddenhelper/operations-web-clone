import React, { memo, useMemo, useEffect } from 'react';

import { GeneralModel, StatisticsModel } from '../../../../models';
import DashboardTopTen from '../DashboardTopTen';

export interface IWorkersByTradesNonMinorityProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByTradesNonMinority: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkersByTradesNonMinority = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersByTradesNonMinority }: IWorkersByTradesNonMinorityProps) => {
  const idKey = useMemo(() => 'workersByTradesNonMinority', []);
  const workersByTradesNonMinorityList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersByTradesNonMinority(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersByTradesNonMinority]);
  return <DashboardTopTen title="Workers by Trades - Non Minority" itemTitle="Trade" isLoading={isLoading} list={workersByTradesNonMinorityList} />;
};

export default memo(WorkersByTradesNonMinority);
