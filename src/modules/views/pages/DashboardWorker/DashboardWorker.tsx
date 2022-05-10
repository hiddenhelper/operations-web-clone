import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AutocompleteFilter from 'modules/views/shared/AutocompleteFilter';
import Container from 'modules/views/shared/Container';
import SelectFilter from 'modules/views/shared/SelectFilter';
import ObservationsByWorkers from 'modules/views/shared/DashboardWidget/ObservationsByWorkers';
import WorkersActivity from 'modules/views/shared/DashboardWidget/WorkersActivity';
import WorkersByTradesMinority from 'modules/views/shared/DashboardWidget/WorkersByTradesMinority';
import WorkersByTradesNonMinority from 'modules/views/shared/DashboardWidget/WorkersByTradesNonMinority';

import CertificationsByWorkers from './components/CertificationsByWorkers';
import NewWorkers from './components/NewWorkers';
import Trainings from './components/Trainings';
import WorkersByClient from './components/WorkersByClient';
import WorkersByDemographicData from './components/WorkersByDemographicData';
import WorkersByJobData from './components/WorkersByJobData';
import WorkersByLocation from './components/WorkersByLocation';
import WorkersByProject from './components/WorkersByProject';

import { GeneralModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { useResize } from '../../../../utils/useResize';
import { useLocationFilter } from '../../../../utils/useLocationFilter';
import { getDefaultValue } from '../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../assets/styles';
import { useStyles as dashboardStyles } from '../Dashboard/styles';

export interface IDashboardWorkerProps {
  clearStatistics: () => void;
}

const DashboardWorker = ({ clearStatistics }: IDashboardWorkerProps) => {
  useResize(); // listen window.resize
  const tableGlobalClasses = tableGlobalStyles();
  const dashboardGlobalClasses = dashboardStyles();

  const [queryParams, setQueryParams] = useQueryParamState<{ stateCode: string; period: GeneralModel.TimeFilterType }>({
    stateCode: '',
    period: GeneralModel.TimeFilterType.LAST_WEEK,
  });

  const workerActivityParams = useMemo(() => ({ ...queryParams, filterByWorker: true }), [queryParams]);

  const [locationOptionList, locationLabel, onLocationChange, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });

  const onFilterPeriodChange = useCallback(
    (period: number) => {
      setQueryParams({ ...queryParams, period: period });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    return function unMount() {
      clearStatistics();
    };
  }, [clearStatistics]);
  return (
    <Container>
      <div className="client-list-header">
        <Typography className={dashboardGlobalClasses.stepWrapper} component="p" color="primary" align="left">
          <Link to="/">Dashboard</Link> {'>'} <span>Workers</span>
        </Typography>
      </div>
      <div className={`${dashboardGlobalClasses.widgetsContainer} ${dashboardGlobalClasses.noMarginTop} `}>
        <div className={dashboardGlobalClasses.widgetTitleWithFilter}>
          <Typography
            className={`${dashboardGlobalClasses.dashboardSubtitle} ${dashboardGlobalClasses.dashboardAccent} ${dashboardGlobalClasses.titlePaddingBottom}`}
          >
            Workers Dashboard
          </Typography>
        </div>
        <div className={`${dashboardGlobalClasses.widgetsContainer} ${dashboardGlobalClasses.noMarginTop} `}>
          <div className={dashboardGlobalClasses.widgetTitleWithFilter}>
            <Typography className={dashboardGlobalClasses.dashboardTitle}>Workers Dashboard</Typography>
            <div className={tableGlobalClasses.widgetFilterContainer}>
              <div className={tableGlobalClasses.filterActionsContainer}>
                <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                  <AutocompleteFilter value={locationCode} optionList={locationOptionList} label={locationLabel} onChange={onLocationChange} />
                </Box>
                <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
                <Box className={`${dashboardGlobalClasses.filterMargin} ${tableGlobalClasses.filterStatusContainer}`}>
                  <SelectFilter
                    optionList={GeneralModel.dayFilterOptionList}
                    value={getDefaultValue(GeneralModel.dayFilterTypeMap[queryParams.period], GeneralModel.TimeFilterType.TODAY)}
                    onChange={onFilterPeriodChange}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12} style={{ minHeight: '462px' }}>
            <NewWorkers queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container={true}>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '15px' }}>
                <WorkersByProject queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '10px', paddingLeft: '5px' }}>
                <WorkersByClient queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingLeft: '10px' }}>
                <WorkersByLocation queryParams={queryParams} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid item={true} xl={8} lg={8} sm={12} xs={12} style={{ paddingRight: '10px' }}>
            <WorkersActivity queryParams={workerActivityParams} />
          </Grid>
          <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingLeft: '10px' }}>
            <WorkersByJobData queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container={true}>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '15px' }}>
                <WorkersByTradesMinority queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '10px', paddingLeft: '5px' }}>
                <WorkersByTradesNonMinority queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingLeft: '10px' }}>
                <WorkersByDemographicData queryParams={queryParams} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container={true}>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '15px' }}>
                <Trainings queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingRight: '10px', paddingLeft: '5px' }}>
                <CertificationsByWorkers queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={4} lg={4} sm={12} xs={12} style={{ paddingLeft: '10px' }}>
                <ObservationsByWorkers queryParams={queryParams} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default memo(DashboardWorker);
