import React, { memo, useMemo, useEffect } from 'react';

import Link from '@material-ui/core/Link';

import Skeleton from '../../../../../../shared/Skeleton';
import PieLineWidget from '../../../../../../shared/Chart/PieLineWidget';

import { ROUTES } from '../../../../../../../../constants';
import { ResourceModel, GeneralModel, StatisticsModel } from '../../../../../../../models';
import { getFormattedDate, parseQuery } from '../../../../../../../../utils/generalUtils';
import { statusWidgetStyles } from '../../../../../../shared/DashboardWidget/styles';

export interface INewWorkersProps {
  queryParams: GeneralModel.IQueryParams;
  linePieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ILinePieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersActivityWidget: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewWorkers = ({ queryParams, linePieStatisticsMap, loading, fetchWorkersActivityWidget }: INewWorkersProps) => {
  const statusWidgetClasses = statusWidgetStyles();
  const idKey = useMemo(() => 'mainNewWorkers', []);
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
      renderDetail={() => (
        <div style={{ width: '100%', display: 'flex' }}>
          <Skeleton isLoading={isWorkerWidgetLoading} animation="wave" variant="text" width={120} height={20}>
            <Link href={`${ROUTES.DASHBOARD_WORKERS.path}?${parseQuery(queryParams)}`}>
              <span className={statusWidgetClasses.widgetCta}>See more details</span>
            </Link>
          </Skeleton>
        </div>
      )}
    />
  );
};

export default memo(NewWorkers);
