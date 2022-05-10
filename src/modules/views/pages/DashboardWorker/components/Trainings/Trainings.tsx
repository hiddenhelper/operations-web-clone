import React, { memo, useEffect, useMemo } from 'react';

import PieWidget from '../../../../shared/DashboardWidget/PieWidget';

import { GeneralModel, StatisticsModel } from '../../../../../models';

export interface IWorkerTrainigsWidgetProps {
  queryParams: GeneralModel.IQueryParams;
  pieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.IPieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersTrainings: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkerTrainigsWidget = ({ queryParams, pieStatisticsMap, loading, fetchWorkersTrainings }: IWorkerTrainigsWidgetProps) => {
  const idKey = useMemo(() => 'workersTrainings', []);
  const data = useMemo(() => pieStatisticsMap[idKey] || StatisticsModel.getPieWidgetStatisticsFallback(), [pieStatisticsMap, idKey]);

  const pieChartData = useMemo(
    () =>
      data.pieChart.map((entry, index) => ({
        ...entry,
        x: GeneralModel.trainingMap[entry.segment],
        y: entry.total,
        color: GeneralModel.pieBlueMap[index],
      })),
    [data]
  );

  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersTrainings(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersTrainings]);
  return (
    <PieWidget
      title="Trainings"
      total={data.totalRecords}
      data={pieChartData}
      isLoading={isLoading}
      showDetailRoute={false}
      showValue={true}
      style={{
        pieWidgetContainer: { height: '100%' },
        pieWidgetItem: { height: '100%' },
        pieChartList: {
          marginTop: '-25px',
        },
        pieParentStyles: {
          display: 'inline-block',
          textAlign: 'center',
          marginBottom: 20,
        },
      }}
    />
  );
};

export default memo(WorkerTrainigsWidget);
