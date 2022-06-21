import React, { memo, useMemo, useEffect } from 'react';

import PieLineWidget from '../../../../../../shared/Chart/PieLineWidget';

import { ResourceModel, GeneralModel, StatisticsModel } from '../../../../../../../models';
import { getFormattedDate } from '../../../../../../../../utils/generalUtils';
export interface INewAssignedWorkersProps {
  queryParams: GeneralModel.IQueryParams;
  linePieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ILinePieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersWidget: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewAssigendWorkers = ({ queryParams, linePieStatisticsMap, loading, fetchWorkersWidget }: INewAssignedWorkersProps) => {
  const idKey = useMemo(() => 'mainNewAssignedWorkers', []);
  const data = useMemo(() => linePieStatisticsMap[idKey] || StatisticsModel.getLinePieWidgetFallback(), [linePieStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const pieChartData = useMemo(
    () =>
      data.pieChart.map(entry => ({
        ...entry,
        x: ResourceModel.workerPieStatusMap[entry.status],
        y: entry.total,
        color: ResourceModel.statusWorkerColorMap[entry.status],
      })),
    [data]
  );
  const lineChartData = useMemo(
    () =>
      data.lineChart.map(entry => ({
        x: getFormattedDate(entry.date, GeneralModel.DateFormat.DATE_MONTH),
        y: entry.count,
      })),
    [data]
  );

  useEffect(() => {
    fetchWorkersWidget(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersWidget]);
  return (
    <PieLineWidget
      title="New Assigned Workers"
      total={data.totalRecords}
      lineChartData={lineChartData}
      pieChartData={pieChartData}
      isLoading={isLoading}
      showDivider={false}
      styles={{
        pieLineWidgetContainer: { height: '100%', minHeight: '380px' },
        pieChartContainer: { height: '70%', width: '80%', marginLeft: '7%', display: 'flex' },
        pieChartList: { float: 'right', marginTop: '8%' },
        pieContainer: {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'center',
        },
        lineChartWithPieContent: { maxHeight: '100%' },
        pieContainerHeight: '81%',
      }}
    />
  );
};

export default memo(NewAssigendWorkers);
