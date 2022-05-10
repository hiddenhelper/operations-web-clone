import React, { memo, useEffect, useMemo } from 'react';

import LineWidget from '../LineWidget';

import { GeneralModel, StatisticsModel } from '../../../../models';
import { getFormattedDate, getLineChartTicksByData } from '../../../../../utils/generalUtils';

export interface IDashboardRevenueProps {
  title: string;
  total: number | string;
  queryParams: GeneralModel.IQueryParams;
  data: StatisticsModel.ILineWidgetStatistics;
  loading: GeneralModel.ILoadingStatus;
  fetch: (query: GeneralModel.IQueryParams) => void;
}

const DashboardRevenue = ({ title, total, queryParams, data, loading, fetch }: IDashboardRevenueProps) => {
  const grossRevenueWidgetData = useMemo(() => (data ? data : StatisticsModel.getLineWidgetFallback()), [data]);

  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const lineChartData = useMemo(
    () =>
      grossRevenueWidgetData.lineChart.map(entry => ({
        x: getFormattedDate(entry.date, GeneralModel.DateFormat.DATE_MONTH),
        y: entry.count,
      })),
    [grossRevenueWidgetData]
  );

  useEffect(() => {
    fetch(queryParams);
  }, [queryParams, fetch]);

  return (
    <LineWidget
      title={title}
      total={total}
      isLoading={isLoading}
      data={lineChartData}
      padding={{ left: 30, right: 10, bottom: 40, top: 30 }}
      displayXAxisTicks={getLineChartTicksByData}
    />
  );
};

export default memo(DashboardRevenue);
