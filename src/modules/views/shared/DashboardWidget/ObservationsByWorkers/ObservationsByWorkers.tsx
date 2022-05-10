import React, { memo, useMemo, useEffect } from 'react';

import { GeneralModel, StatisticsModel } from '../../../../models';
import DashboardTopTen from '../DashboardTopTen';

export interface IObservationsByWorkersProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersObservations: (key: string, query: GeneralModel.IQueryParams) => void;
}

const ObservationsByWorkers = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersObservations }: IObservationsByWorkersProps) => {
  const idKey = useMemo(() => 'observationsByWorkers', []);
  const observationsByWorkersList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersObservations(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersObservations]);
  return <DashboardTopTen title="Observations by Workers" itemTitle="Observation" isLoading={isLoading} list={observationsByWorkersList} rowColor="#1F86E8" />;
};

export default memo(ObservationsByWorkers);
