import React, { memo, useMemo, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AutocompleteFilter from '../../../../shared/AutocompleteFilter';
import SelectFilter from '../../../../shared/SelectFilter';
import NewActiveProjects from '../../../../shared/DashboardWidget/NewActiveProjects';
import ProjectsRevenue from '../../../../shared/DashboardWidget/ProjectsRevenue';
import TopTenProjects from '../../../../shared/DashboardWidget/TopTenProjects';
import WorkersActivity from '../../../../shared/DashboardWidget/WorkersActivity';
import ObservationsByWorkers from '../../../../shared/DashboardWidget/ObservationsByWorkers';
import WorkersByTradesNonMinority from '../../../../shared/DashboardWidget/WorkersByTradesNonMinority';
import WorkersByTradesMinority from '../../../../shared/DashboardWidget/WorkersByTradesMinority';
import NewAssignedWorkers from './components/NewAssignedWorkers';

import { GeneralModel } from '../../../../../models';
import { useResize } from '../../../../../../utils/useResize';
import { useQueryParamState } from '../../../../../../utils/useQueryParamState';
import { useLocationFilter } from '../../../../../../utils/useLocationFilter';
import { getDefaultValue } from '../../../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useStyles } from '../../styles';

export interface IClientDashboardProps {
  queryParams: GeneralModel.IQueryParams;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  onPeriodChange: (period: number) => void;
}

// tslint:disable-next-line:no-nused-variable
const ClientDashboard = ({ queryParams, setQueryParams, onPeriodChange }: IClientDashboardProps) => {
  useResize();
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const [wQueryParams, setWorkerParams] = useQueryParamState<GeneralModel.IQueryParams>({
    wPeriod: GeneralModel.TimeFilterType.LAST_WEEK,
  });
  const workerQueryParams = useMemo(() => ({ stateCode: wQueryParams.wStateCode, countryCode: wQueryParams.wCountryCode, period: wQueryParams.wPeriod }), [
    wQueryParams,
  ]);

  const [locationOptionList, locationLabel, onLocationChange, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });
  // @ts-ignore
  // eslint-disable-next-line
  const [wLocationOptionList, wLocationLabel, , , getLocationCode, wLocationCode] = useLocationFilter({ queryParams: workerQueryParams });

  const projectQueryParams = useMemo(() => ({ stateCode: queryParams.stateCode, period: queryParams.period }), [queryParams]);
  const workerActivityParams = useMemo(() => ({ ...workerQueryParams, filterByWorker: true }), [workerQueryParams]);

  const onWLocationChange = useCallback(
    (stateCode: string) => {
      const wLocationParams = getLocationCode(stateCode);
      setWorkerParams({ ...wQueryParams, wStateCode: wLocationParams?.stateCode, wCountryCode: wLocationParams?.countryCode });
    },
    [setWorkerParams, getLocationCode, wQueryParams]
  );

  const onWorkerPeriodChange = useCallback(
    (period: number) => {
      setWorkerParams({ ...wQueryParams, wPeriod: period });
    },
    [setWorkerParams, wQueryParams]
  );
  return (
    <>
      <div>
        <div className={classes.widgetsContainer}>
          <div className={classes.widgetTitleWithFilter}>
            <Typography className={`${classes.dashboardSubtitle} ${classes.dashboardAccent}`}>Projects by period</Typography>
            <div className={tableGlobalClasses.widgetFilterContainer}>
              <div className={tableGlobalClasses.filterActionsContainer}>
                <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                  <AutocompleteFilter value={locationCode} label={locationLabel} optionList={locationOptionList} onChange={onLocationChange} />
                </Box>
                <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
                <Box className={`${classes.filterMargin} ${tableGlobalClasses.filterStatusContainer}`}>
                  <SelectFilter
                    value={getDefaultValue(GeneralModel.dayFilterTypeMap[projectQueryParams.period], GeneralModel.TimeFilterType.LAST_WEEK)}
                    optionList={GeneralModel.dayFilterOptionList}
                    onChange={onPeriodChange}
                  />
                </Box>
              </div>
            </div>
          </div>
          <Grid className={`${classes.widgetTrailingResponsive} ${classes.widgetTrailingRight}`} container={true}>
            <Grid item={true} xl={8} lg={8} md={12} sm={12} xs={12}>
              <NewActiveProjects queryParams={projectQueryParams} />
            </Grid>
            <Grid item={true} xl={4} lg={4} md={5} sm={12} xs={12}>
              <ProjectsRevenue queryParams={projectQueryParams} />
            </Grid>
          </Grid>
        </div>
        <TopTenProjects queryParams={projectQueryParams} />
      </div>
      <div className={classes.widgetsContainer} style={{ marginTop: '60px' }}>
        <div className={classes.widgetTitleWithFilter}>
          <Typography className={`${classes.dashboardSubtitle} ${classes.dashboardAccent}`}>Workers by period</Typography>
          <div className={tableGlobalClasses.widgetFilterContainer}>
            <div className={tableGlobalClasses.filterActionsContainer}>
              <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                <AutocompleteFilter value={wLocationCode} label={wLocationLabel} optionList={wLocationOptionList} onChange={onWLocationChange} />
              </Box>
              <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
              <Box className={`${classes.filterMargin} ${tableGlobalClasses.filterStatusContainer}`}>
                <SelectFilter
                  value={getDefaultValue(GeneralModel.dayFilterTypeMap[wQueryParams.wPeriod], GeneralModel.TimeFilterType.LAST_WEEK)}
                  optionList={GeneralModel.dayFilterOptionList}
                  onChange={onWorkerPeriodChange}
                />
              </Box>
            </div>
          </div>
        </div>
        <Grid className={`${classes.widgetTrailingResponsive} ${classes.widgetTrailingRight}`} container={true}>
          <Grid item={true} xl={8} lg={8} md={12} sm={12} xs={12}>
            <NewAssignedWorkers queryParams={workerQueryParams} />
          </Grid>
          <Grid item={true} xl={4} lg={4} md={5} sm={12} xs={12}>
            <WorkersActivity
              style={{ width: 600, height: 518, fontSize: 16, padding: { left: 35, right: 20, bottom: 35, top: 30 } }}
              queryParams={workerActivityParams}
            />
          </Grid>
        </Grid>
        <div className={classes.widgetsContainer}>
          <Grid className={`${classes.widgetTrailingResponsive} ${classes.widgetSpacing}`} container={true}>
            <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container={true}>
                <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '13px' }}>
                  <ObservationsByWorkers queryParams={workerQueryParams} />
                </Grid>
                <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '7px', paddingLeft: '5px' }}>
                  <WorkersByTradesMinority queryParams={workerQueryParams} />
                </Grid>
                <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingLeft: '10px' }}>
                  <WorkersByTradesNonMinority queryParams={workerQueryParams} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default memo(ClientDashboard);
