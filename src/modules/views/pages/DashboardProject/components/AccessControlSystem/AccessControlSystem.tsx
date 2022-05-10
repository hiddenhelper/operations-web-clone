import React, { memo, useEffect, useMemo } from 'react';
import { VictoryPie } from 'victory';

import Typography from '@material-ui/core/Typography';

import DashboardWidget from '../../../../shared/DashboardWidget';
import DashboardColumnSummary from '../../../../shared/DashboardWidget/DashboardColumnSummary';
import Skeleton from '../../../../shared/Skeleton';

import { AccessControlSystemModel, GeneralModel, StatisticsModel } from '../../../../../models';
import { useStyles as dashboardStyles } from '../../../Dashboard/styles';
import { useStyles } from '../../../DashboardWorker/styles';
import { getDefaultValue } from '../../../../../../utils/generalUtils';

export interface IAccessControlSystemProps {
  queryParams: GeneralModel.IQueryParams;
  acsWidget: StatisticsModel.IAcsSummaryStatistics;
  loading: GeneralModel.ILoadingStatus;
  fetchAcsWidget: (query: GeneralModel.IQueryParams) => void;
}

const AccessControlSystem = ({ queryParams, acsWidget, loading, fetchAcsWidget }: IAccessControlSystemProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  const classes = useStyles();

  const chartData = useMemo(() => acsWidget || StatisticsModel.getAcsSummaryFallback(), [acsWidget]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  const pieData = useMemo(
    () => [
      { x: '', y: chartData.totalRecords, color: '#E5E5E5' },
      { x: '', y: chartData.totalFilter, color: '#006DF7' },
    ],
    [chartData]
  );

  const handheldTotal: number = useMemo(
    () => chartData.pieChart.find(item => item.segment === AccessControlSystemModel.AccessControlSystemType.HANDHELD)?.total,
    [chartData]
  );
  const enclosedTsTotal: number = useMemo(
    () => chartData.pieChart.find(item => item.segment === AccessControlSystemModel.AccessControlSystemType.ENCLOSED_TS)?.total,
    [chartData]
  );
  const openPortalTotal: number = useMemo(
    () => chartData.pieChart.find(item => item.segment === AccessControlSystemModel.AccessControlSystemType.PORTAL)?.total,
    [chartData]
  );
  const turnstileTotal: number = useMemo(
    () => chartData.pieChart.find(item => item.segment === AccessControlSystemModel.AccessControlSystemType.TURNSTILE)?.total,
    [chartData]
  );

  useEffect(() => {
    fetchAcsWidget(queryParams);
  }, [queryParams, fetchAcsWidget]);
  return (
    <DashboardWidget
      styleClass={`${dashboardGlobalClasses.smallWidgetMinHeight} ${dashboardGlobalClasses.widgetCenterContent}`}
      renderContent={() => (
        <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '8px' }}>
          <Skeleton isLoading={isLoading} animation="wave" variant="text" width={126} height={126}>
            <div
              style={{
                width: '230px',
                height: '100%',
                marginRight: '24px',
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
            title="Access Control System"
            subtitle={`From a total of ${chartData.totalRecords} devices`}
            isLoading={isLoading}
            renderActivity={
              <ul className={classes.columnActivityList}>
                <li className={classes.columnActivityListItem}>
                  <span>{getDefaultValue(handheldTotal, 0)}</span>
                  <Typography>Handheld</Typography>
                </li>
                <li className={classes.columnActivityListItem}>
                  <span>{getDefaultValue(enclosedTsTotal, 0)}</span>
                  <Typography>Enclosed TS</Typography>
                </li>
                <li className={classes.columnActivityListItem}>
                  <span>{getDefaultValue(openPortalTotal, 0)}</span>
                  <Typography>Open Portal</Typography>
                </li>
                <li className={classes.columnActivityListItem}>
                  <span>{getDefaultValue(turnstileTotal, 0)}</span>
                  <Typography>Turnstile</Typography>
                </li>
              </ul>
            }
          />
        </div>
      )}
    />
  );
};

export default memo(AccessControlSystem);
