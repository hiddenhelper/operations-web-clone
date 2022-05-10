import React, { memo } from 'react';

import DashboardRevenue from '../DashboardRevenue';

import { GeneralModel, StatisticsModel, UserModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';

export interface IProjectsRevenueProps {
  userRole: UserModel.Role;
  queryParams: GeneralModel.IQueryParams;
  grossRevenueWidgetStatistics: StatisticsModel.ILineWidgetStatistics;
  grossRevenueWidgetLoading: GeneralModel.ILoadingStatus;
  fetchGrossRevenueWidget: (query: GeneralModel.IQueryParams) => void;
}

const ProjectsRevenue = ({
  userRole,
  queryParams,
  grossRevenueWidgetStatistics,
  grossRevenueWidgetLoading,
  fetchGrossRevenueWidget,
}: IProjectsRevenueProps) => {
  return (
    <DashboardRevenue
      title={getConditionalDefaultValue(userRole === UserModel.Role.FCA_ADMIN, 'Projects Revenue', 'Projects Invoices')}
      total={getConditionalDefaultValue(grossRevenueWidgetStatistics?.totalRevenue, `$${Math.trunc(grossRevenueWidgetStatistics?.totalRevenue)}`, null)}
      data={grossRevenueWidgetStatistics}
      loading={grossRevenueWidgetLoading}
      queryParams={queryParams}
      fetch={fetchGrossRevenueWidget}
    />
  );
};

export default memo(ProjectsRevenue);
