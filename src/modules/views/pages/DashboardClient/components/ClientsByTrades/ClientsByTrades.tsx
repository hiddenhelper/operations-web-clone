import React, { memo, useMemo, useEffect } from 'react';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

import { GeneralModel, StatisticsModel } from '../../../../../models';

export interface IClientByTradesProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchClientsByTrades: (key: string, query: GeneralModel.IQueryParams) => void;
}

const ClientByTrades = ({ queryParams, topTenStatisticsMap, loading, fetchClientsByTrades }: IClientByTradesProps) => {
  const idKey = useMemo(() => 'clientsByTrades', []);
  const list = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchClientsByTrades(idKey, queryParams);
  }, [queryParams, idKey, fetchClientsByTrades]);
  return <DashboardTopTen styles={{ minHeight: 'auto !important' }} title="Clients By Trades" itemTitle="Trade" isLoading={isLoading} list={list} />;
};

export default memo(ClientByTrades);
