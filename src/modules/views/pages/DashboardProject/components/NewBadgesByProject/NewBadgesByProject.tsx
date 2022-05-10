import React, { memo, useMemo, useEffect } from 'react';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

export interface INewBadgesByProjectProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchBadgeProject: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewBadgesByProject = ({ queryParams, topTenStatisticsMap, loading, fetchBadgeProject }: INewBadgesByProjectProps) => {
  const idKey = useMemo(() => 'projectNewBadgesByProject', []);
  const badgesByProjectList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchBadgeProject(idKey, queryParams);
  }, [queryParams, idKey, fetchBadgeProject]);
  return <DashboardTopTen title="New Badges by Projects" itemTitle="Project" isLoading={isLoading} list={badgesByProjectList} styles={{ height: '100%' }} />;
};

export default memo(NewBadgesByProject);
