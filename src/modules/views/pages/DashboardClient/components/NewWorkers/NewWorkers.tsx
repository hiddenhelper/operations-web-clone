import React, { memo, useMemo, useEffect } from 'react';

import PieLineWidget from '../../../../shared/Chart/PieLineWidget';

import { ResourceModel, GeneralModel, StatisticsModel } from '../../../../../models';
import { getFormattedDate } from '../../../../../../utils/generalUtils';

export interface INewWorkersProps {
  queryParams: GeneralModel.IQueryParams;
  linePieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ILinePieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersActivityWidget: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewWorkers = ({ queryParams, linePieStatisticsMap, loading, fetchWorkersActivityWidget }: INewWorkersProps) => {
  const idKey = useMemo(() => 'clientNewWorkers', []);
  const data = useMemo(() => linePieStatisticsMap[idKey] || StatisticsModel.getLinePieWidgetFallback(), [linePieStatisticsMap, idKey]);

  const isWorkerWidgetLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const lineChartData = useMemo(
    () =>
      data.lineChart.map(entry => ({
        x: getFormattedDate(entry.date, GeneralModel.DateFormat.DATE_MONTH),
        y: entry.count,
      })),
    [data]
  );

  const workersPieChartData = useMemo(
    () =>
      data.pieChart.map(entry => ({
        ...entry,
        x: ResourceModel.workerPieStatusMap[entry.status],
        y: entry.total,
        color: ResourceModel.statusWorkerColorMap[entry.status],
      })),
    [data]
  );

  useEffect(() => {
    fetchWorkersActivityWidget(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersActivityWidget]);
  return (
    <PieLineWidget
      title="New Workers"
      total={data.totalRecords}
      lineChartData={lineChartData}
      pieChartData={workersPieChartData}
      isLoading={isWorkerWidgetLoading}
      showDivider={false}
      styles={{
        pieLineWidgetContainer: { height: '100%' },
        pieChartContainer: { height: '100%', width: '92%', marginLeft: '7%', display: 'flex' },
        pieChartList: { width: '90%' },
      }}
    />
  );
};

export default memo(NewWorkers);
