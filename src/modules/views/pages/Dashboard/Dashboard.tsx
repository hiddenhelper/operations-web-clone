import React, { memo, useEffect, useMemo, useCallback } from 'react';

import Typography from '@material-ui/core/Typography';

import DashboardStatusWidget from 'modules/views/shared/StatisticWidget';
import PageTitle from 'modules/views/shared/PageTitle';
import Container from 'modules/views/shared/Container';
import FcaDashboard from './components/FcaDashboard';
import ClientDashboard from './components/ClientDashboard';

import { GeneralModel, StatisticsModel, UserModel } from '../../../models';
import { InfoIcon } from '../../../../constants';
import { useResize } from '../../../../utils/useResize';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { getConditionalDefaultValue, getDefaultValue, getTimeFromNow, formatNumberWithCommas } from '../../../../utils/generalUtils';
import { statusWidgetStyles } from '../../shared/DashboardWidget/styles';
import { listGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';
import { useTimeZone } from '../../../../utils/useTimeZone';
import { hasValidPermissions } from 'modules/models/user';

export interface IDashboardProps {
  newBadges: StatisticsModel.ITodayWidgetStatistics;
  grossRevenue: StatisticsModel.ITodayWidgetStatistics;
  workersActivity: StatisticsModel.ITodayWidgetStatistics;
  newBadgesLoading: GeneralModel.ILoadingStatus;
  grossRevenueLoading: GeneralModel.ILoadingStatus;
  workersActivityLoading: GeneralModel.ILoadingStatus;
  currentUserPermissions: UserModel.IPermission[];
  fetchNewBadges: () => void;
  fetchWorkersActivity: () => void;
  fetchGrossRevenue: () => void;
  clearStatistics: () => void;
  isFcaUser: boolean;
  isAdmin: boolean;
}

const Dashboard = ({
  newBadges,
  grossRevenue,
  workersActivity,
  newBadgesLoading,
  grossRevenueLoading,
  workersActivityLoading,
  currentUserPermissions,
  fetchNewBadges,
  fetchGrossRevenue,
  fetchWorkersActivity,
  clearStatistics,
  isFcaUser,
  isAdmin,
}: IDashboardProps) => {
  useResize(); // listen window.resize
  const listClasses = listGlobalStyles();
  const statusWidgetClasses = statusWidgetStyles();
  const classes = useStyles();

  const { timeZoneOffset } = useTimeZone();

  const newBadgesContent = useMemo(() => (newBadgesLoading && !newBadgesLoading.isLoading ? newBadges?.total : 'Loading...'), [newBadgesLoading, newBadges]);

  const [queryParams, setQueryParams] = useQueryParamState<{ stateCode: string; period: GeneralModel.TimeFilterType; timeZoneOffset: string }>({
    stateCode: '',
    period: GeneralModel.TimeFilterType.LAST_WEEK,
    timeZoneOffset,
  });

  const onFilterPeriodChange = useCallback(
    (period: number) => {
      setQueryParams({ ...queryParams, period: period });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    if (hasValidPermissions(UserModel.BadgesPermission.VIEWACCESS, currentUserPermissions)) fetchNewBadges();
    fetchGrossRevenue();
    fetchWorkersActivity();
  }, [currentUserPermissions, fetchNewBadges, fetchGrossRevenue, fetchWorkersActivity]);

  useEffect(() => {
    return function unMount() {
      clearStatistics();
    };
  }, [clearStatistics]);

  return (
    <Container>
      {!isFcaUser && (
        <div className={classes.legend}>
          <InfoIcon /> Information displayed on the Dashboard represents your company’s activity and activity of companies that have been invited by you.
        </div>
      )}

      <PageTitle title="Hi!" subtitle="Welcome Back" right={<></>} styles={{ minWidth: '300px' }} />
      <div className={`${classes.widgetsContainer} ${classes.widgetsContainerPaddingBottom}`}>
        <div className={classes.activityWrapper}>
          <Typography className={`${classes.dashboardSubtitle} ${classes.dashboardAccent}`}>Today’s activity</Typography>
        </div>

        <div className={`${listClasses.widgetsWrapper}`} id="summary-widgets">
          <DashboardStatusWidget
            loading={getDefaultValue(newBadgesLoading?.isLoading, true)}
            title={'New Badges'}
            content={newBadgesContent}
            renderActivity={
              <span className={statusWidgetClasses.widgetStatus}>
                {getConditionalDefaultValue(newBadges?.total, `Last badge created ${getTimeFromNow(newBadges?.lastActivity)}`, 'No activity today')}
              </span>
            }
            inlineContent={false}
          />
          <DashboardStatusWidget
            loading={getDefaultValue(grossRevenueLoading?.isLoading, true)}
            title={getConditionalDefaultValue(isFcaUser, 'Revenue', 'Project Invoices')}
            content={`$ ${formatNumberWithCommas(getDefaultValue(Math.trunc(grossRevenue?.total), 0))}`}
            renderActivity={
              <span className={statusWidgetClasses.widgetStatus}>
                {!grossRevenue?.lastActivity ? 'No activity today' : `Last invoice created ${getTimeFromNow(grossRevenue.lastActivity)}`}
              </span>
            }
            inlineContent={false}
          />
          <DashboardStatusWidget
            loading={getDefaultValue(workersActivityLoading?.isLoading, true)}
            title={'Workers activity'}
            content={workersActivity?.total}
            renderActivity={
              <span className={statusWidgetClasses.widgetStatus}>
                {!workersActivity?.lastActivity ? 'No activity today' : `Last activity ${getTimeFromNow(workersActivity.lastActivity)}`}
              </span>
            }
            inlineContent={false}
          />
        </div>
      </div>
      {isFcaUser && <FcaDashboard queryParams={queryParams} setQueryParams={setQueryParams} onPeriodChange={onFilterPeriodChange} />}

      {!isFcaUser && <ClientDashboard queryParams={queryParams} setQueryParams={setQueryParams} onPeriodChange={onFilterPeriodChange} />}
    </Container>
  );
};

export default memo(Dashboard);
