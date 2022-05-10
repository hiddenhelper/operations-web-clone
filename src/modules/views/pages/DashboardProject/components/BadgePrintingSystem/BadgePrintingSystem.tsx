import React, { memo, useEffect, useMemo } from 'react';
import { VictoryPie } from 'victory';

import DashboardWidget from '../../../../shared/DashboardWidget';
import DashboardColumnSummary from '../../../../shared/DashboardWidget/DashboardColumnSummary';
import Skeleton from '../../../../shared/Skeleton';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import { useStyles as dashboardStyles } from '../../../Dashboard/styles';
import { useStyles } from '../../../DashboardWorker/styles';

export interface IBadgePrintingSystemProps {
  queryParams: GeneralModel.IQueryParams;
  bpsWidget: StatisticsModel.IDeviceStatistics;
  loading: GeneralModel.ILoadingStatus;
  fetchBpsWidget: (query: GeneralModel.IQueryParams) => void;
}

const BadgePrintingSystem = ({ queryParams, bpsWidget, loading, fetchBpsWidget }: IBadgePrintingSystemProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  const classes = useStyles();

  const chartData = useMemo(() => bpsWidget || StatisticsModel.getAcsSummaryFallback(), [bpsWidget]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const pieData = useMemo(
    () => [
      { x: '', y: chartData.totalRecords, color: '#E5E5E5' },
      { x: '', y: chartData.totalFilter, color: '#006DF7' },
    ],
    [chartData]
  );

  useEffect(() => {
    fetchBpsWidget(queryParams);
  }, [queryParams, fetchBpsWidget]);
  return (
    <DashboardWidget
      styleClass={`${dashboardGlobalClasses.smallWidgetMinHeight} ${dashboardGlobalClasses.widgetCenterContent}`}
      renderContent={() => (
        <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Skeleton isLoading={isLoading} animation="wave" variant="text" width={126} height={126}>
            <div
              style={{
                width: '230px',
                height: '100%',
                marginRight: '38px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VictoryPie data={pieData} innerRadius={120} labels={() => ''} colorScale={pieData.reduce((colors, entry) => [...colors, entry.color], [])} />
              <span
                style={{
                  fontSize: '38px',
                  position: 'absolute',
                  color: 'rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {chartData.totalFilter}
                <span style={{ display: 'block', fontSize: '15px', marginTop: '-12px' }}>devices</span>
              </span>
            </div>
          </Skeleton>
          <DashboardColumnSummary
            isLoading={isLoading}
            title="Badge Printing System"
            subtitle={`From a total of ${chartData.totalRecords} devices`}
            styleClass={classes.columnNoActivity}
          />
        </div>
      )}
    />
  );
};

export default memo(BadgePrintingSystem);
