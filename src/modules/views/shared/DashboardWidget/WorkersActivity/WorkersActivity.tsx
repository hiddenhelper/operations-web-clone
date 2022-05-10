import React, { memo, useEffect, useMemo, useRef } from 'react';

import Grid from '@material-ui/core/Grid';

import DashboardWidget from '../DashboardWidget';
import DashboardWidgetInlineHeader from '../DashboardWidgetInlineHeader';
import LineChart from '../../Chart/LineChart';

import { GeneralModel, StatisticsModel } from '../../../../models';
import { getConditionalDefaultValue, getDefaultValue, getFormattedDate } from '../../../../../utils/generalUtils';
import { statusWidgetStyles } from '../styles';

export interface IWorkersActivityProps {
  queryParams: GeneralModel.IQueryParams;
  linePieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ILinePieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  style?: any;
  fetchWorkersActivity: (key: string, query: GeneralModel.IQueryParams) => void;
}

const WorkersActivity = ({ queryParams, linePieStatisticsMap, loading, style, fetchWorkersActivity }: IWorkersActivityProps) => {
  const statusWidgetClasses = statusWidgetStyles();
  const chartRef: React.RefObject<any> = useRef();

  const idKey = useMemo(() => 'projectWorkersActivity', []);
  const data = useMemo(() => linePieStatisticsMap[idKey] || StatisticsModel.getLinePieWidgetFallback(), [linePieStatisticsMap, idKey]);

  const isLoading: boolean = useMemo(() => loading?.isLoading, [loading]);

  const chartData = useMemo(
    () =>
      data.lineChart.map(entry => ({
        x: getFormattedDate(entry.date, GeneralModel.DateFormat.DATE_MONTH),
        y: entry.count,
      })),
    [data]
  );

  useEffect(() => {
    fetchWorkersActivity(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersActivity]);
  return (
    <DashboardWidget
      renderHeader={() => (
        <div className={statusWidgetClasses.headerRow}>
          <DashboardWidgetInlineHeader title="Workers Activity" value={getDefaultValue(data.totalRecords, 0)} isLoading={isLoading} />
        </div>
      )}
      renderContent={() => (
        <Grid style={{ marginBottom: '0px', minHeight: '350px' }} container={true}>
          <Grid ref={chartRef} item={true} xl={12} lg={12} md={12} xs={12}>
            <LineChart
              width={getConditionalDefaultValue(style?.width, style?.width, getDefaultValue(chartRef?.current?.clientWidth, 0))}
              height={getConditionalDefaultValue(style?.height, style?.height, getDefaultValue(chartRef?.current?.clientHeight, 0))}
              isLoading={isLoading}
              padding={getDefaultValue(style?.padding, { left: 35, right: 20, bottom: 30, top: 30 })}
              fontSize={style?.fontSize}
              series={[
                {
                  name: 'serie 1',
                  data: chartData,
                  style: {
                    data: {
                      stroke: '#1F86E8',
                      strokeWidth: 3,
                    },
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
      )}
    />
  );
};

export default memo(WorkersActivity);
