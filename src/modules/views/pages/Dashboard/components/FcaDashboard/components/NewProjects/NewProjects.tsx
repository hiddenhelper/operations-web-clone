import React, { memo, useMemo, useEffect } from 'react';

import Link from '@material-ui/core/Link';

import Skeleton from '../../../../../../shared/Skeleton';
import PieLineWidget from '../../../../../../shared/Chart/PieLineWidget';

import { ROUTES } from '../../../../../../../../constants';
import { ResourceModel, GeneralModel, StatisticsModel } from '../../../../../../../models';
import { getFormattedDate, parseQuery } from '../../../../../../../../utils/generalUtils';
import { statusWidgetStyles } from '../../../../../../shared/DashboardWidget/styles';
export interface INewProjectsProps {
  queryParams: GeneralModel.IQueryParams;
  linePieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ILinePieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchProjectWidget: (key: string, query: GeneralModel.IQueryParams) => void;
}

const NewProjects = ({ queryParams, linePieStatisticsMap, loading, fetchProjectWidget }: INewProjectsProps) => {
  const statusWidgetClasses = statusWidgetStyles();

  const idKey = useMemo(() => 'mainNewProjects', []);
  const data = useMemo(() => linePieStatisticsMap[idKey] || StatisticsModel.getLinePieWidgetFallback(), [linePieStatisticsMap, idKey]);
  const isProjectWidgetLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const pieChartData = useMemo(
    () =>
      data.pieChart.map(entry => ({
        ...entry,
        x: ResourceModel.pieStatusMap[entry.status],
        y: entry.total,
        color: ResourceModel.statusColorMap[entry.status],
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
    fetchProjectWidget(idKey, queryParams);
  }, [queryParams, idKey, fetchProjectWidget]);
  return (
    <PieLineWidget
      title="New Projects"
      total={data.newProjects}
      lineChartData={lineChartData}
      pieChartData={pieChartData}
      isLoading={isProjectWidgetLoading}
      renderDetail={() => (
        <div style={{ width: '100%', display: 'flex' }}>
          <Skeleton isLoading={isProjectWidgetLoading} animation="wave" variant="text" width={120} height={20}>
            <Link href={`${ROUTES.DASHBOARD_PROJECTS.path}?${parseQuery(queryParams)}`}>
              <span className={statusWidgetClasses.widgetCta}>See more details</span>
            </Link>
          </Skeleton>
        </div>
      )}
    />
  );
};

export default memo(NewProjects);
