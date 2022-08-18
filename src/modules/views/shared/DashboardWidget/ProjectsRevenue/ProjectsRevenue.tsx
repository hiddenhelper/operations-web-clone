import React, { memo } from 'react';

import DashboardRevenue from '../DashboardRevenue';

import { GeneralModel, StatisticsModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';

export interface IProjectsRevenueProps {
  queryParams: GeneralModel.IQueryParams;
  grossRevenueWidgetStatistics: StatisticsModel.ILineWidgetStatistics;
  grossRevenueWidgetLoading: GeneralModel.ILoadingStatus;
  fetchGrossRevenueWidget: (query: GeneralModel.IQueryParams) => void;
  isFcaUser: boolean;
  isAdmin: boolean;
}

const ProjectsRevenue = ({
  isFcaUser,
  isAdmin,
  queryParams,
  grossRevenueWidgetStatistics,
  grossRevenueWidgetLoading,
  fetchGrossRevenueWidget,
}: IProjectsRevenueProps) => {
  return (
    <DashboardRevenue
      title={getConditionalDefaultValue(isFcaUser, 'Projects Revenue', 'Projects Invoices')}
      total={getConditionalDefaultValue(grossRevenueWidgetStatistics?.totalRevenue, `$${Math.trunc(grossRevenueWidgetStatistics?.totalRevenue)}`, null)}
      data={grossRevenueWidgetStatistics}
      loading={grossRevenueWidgetLoading}
      queryParams={queryParams}
      fetch={fetchGrossRevenueWidget}
    />
  );
};

export default memo(ProjectsRevenue);
