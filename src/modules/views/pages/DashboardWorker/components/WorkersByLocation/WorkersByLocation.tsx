import React, { memo, useMemo, useEffect } from 'react';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import { getConditionalDefaultValue } from '../../../../../../utils/generalUtils';

export interface IWorkersByLocationProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByLocation: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkersByLocation = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersByLocation }: IWorkersByLocationProps) => {
  const idKey = useMemo(() => 'workersByLocation', []);
  const workersByLocationList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const dataList = useMemo(
    () =>
      workersByLocationList.map(item => ({
        ...item,
        description: getConditionalDefaultValue(!queryParams.stateCode, item.description, item.description),
      })),
    [queryParams.stateCode, workersByLocationList]
  );

  useEffect(() => {
    fetchWorkersByLocation(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersByLocation]);
  return (
    <DashboardTopTen
      title="Workers by Locations"
      itemTitle={getConditionalDefaultValue(!queryParams.stateCode, 'State', 'City')}
      isLoading={isLoading}
      list={dataList}
    />
  );
};

export default memo(WorkersByLocation);
