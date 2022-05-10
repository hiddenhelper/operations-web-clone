import React, { memo, useMemo, useEffect } from 'react';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

import { GeneralModel, StatisticsModel } from '../../../../../models';

export interface IWorkersByProjectProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByProject: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkersByProject = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersByProject }: IWorkersByProjectProps) => {
  const idKey = useMemo(() => 'workersByProject', []);
  const workersByProjectList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersByProject(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersByProject]);
  return <DashboardTopTen title="Workers by Projects" itemTitle="Project" isLoading={isLoading} list={workersByProjectList} />;
};

export default memo(WorkersByProject);
