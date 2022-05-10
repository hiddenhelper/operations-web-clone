import React, { memo } from 'react';

import DashboardRevenue from '../../../../shared/DashboardWidget/DashboardRevenue';

import { GeneralModel, StatisticsModel } from '../../../../../models';

export interface IClientsRevenueProps {
  queryParams: GeneralModel.IQueryParams;
  grossRevenueWidgetStatistics: StatisticsModel.ILineWidgetStatistics;
  grossRevenueWidgetLoading: GeneralModel.ILoadingStatus;
  fetchClientRevenueWidget: (query: GeneralModel.IQueryParams) => void;
}

const ClientsRevenue = ({ queryParams, grossRevenueWidgetStatistics, grossRevenueWidgetLoading, fetchClientRevenueWidget }: IClientsRevenueProps) => {
  return (
    <DashboardRevenue
      title="Clients Revenue"
      total={`$${Math.trunc(grossRevenueWidgetStatistics?.totalRevenue)}`}
      data={grossRevenueWidgetStatistics}
      loading={grossRevenueWidgetLoading}
      queryParams={queryParams}
      fetch={fetchClientRevenueWidget}
    />
  );
};

export default memo(ClientsRevenue);
