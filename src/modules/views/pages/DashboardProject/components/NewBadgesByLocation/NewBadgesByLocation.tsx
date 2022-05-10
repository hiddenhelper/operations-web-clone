import React, { memo, useMemo, useEffect } from 'react';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import { getConditionalDefaultValue } from '../../../../../../utils/generalUtils';

export interface INewBadgesByLocationProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchBadgeLocation: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewBadgesByLocation = ({ queryParams, topTenStatisticsMap, loading, fetchBadgeLocation }: INewBadgesByLocationProps) => {
  const idKey = useMemo(() => 'projectNewBadgesByLocation', []);
  const badgesByLocationList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const dataList = useMemo(
    () =>
      badgesByLocationList.map(item => ({
        ...item,
        description: getConditionalDefaultValue(!queryParams.stateCode, item.description, item.description),
      })),
    [queryParams.stateCode, badgesByLocationList]
  );

  useEffect(() => {
    fetchBadgeLocation(idKey, queryParams);
  }, [queryParams, idKey, fetchBadgeLocation]);
  return (
    <DashboardTopTen
      title="New Badges by Locations"
      itemTitle={getConditionalDefaultValue(queryParams.stateCode, 'City', 'State')}
      isLoading={isLoading}
      list={dataList}
      styles={{ height: '100%' }}
    />
  );
};

export default memo(NewBadgesByLocation);
