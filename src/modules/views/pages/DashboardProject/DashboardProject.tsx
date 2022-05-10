import React, { memo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AutocompleteFilter from 'modules/views/shared/AutocompleteFilter';
import Container from 'modules/views/shared/Container';
import SelectFilter from 'modules/views/shared/SelectFilter';
import NewActiveProjects from 'modules/views/shared/DashboardWidget/NewActiveProjects';
import ProjectsRevenue from 'modules/views/shared/DashboardWidget/ProjectsRevenue';
import TopTenProjects from 'modules/views/shared/DashboardWidget/TopTenProjects';
import WorkersActivity from 'modules/views/shared/DashboardWidget/WorkersActivity';

import Clients from './components/Clients';
import AccessControlSystem from './components/AccessControlSystem';
import BadgePrintingSystem from './components/BadgePrintingSystem';
import NewBadgesByLocation from './components/NewBadgesByLocation';
import NewBadgesByProject from './components/NewBadgesByProject';

import { GeneralModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { useResize } from '../../../../utils/useResize';
import { useLocationFilter } from '../../../../utils/useLocationFilter';
import { getDefaultValue } from '../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../assets/styles';
import { useStyles as dashboardStyles } from '../Dashboard/styles';

export interface IDashboardProjectProps {
  clearStatistics: () => void;
}

const DashboardProject = ({ clearStatistics }: IDashboardProjectProps) => {
  useResize(); // listen window.resize
  const tableGlobalClasses = tableGlobalStyles();
  const dashboardGlobalClasses = dashboardStyles();

  const [queryParams, setQueryParams] = useQueryParamState<GeneralModel.IQueryParams>({
    period: GeneralModel.TimeFilterType.LAST_WEEK,
  });

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
      <div className="project-header">
        <Typography className={dashboardGlobalClasses.stepWrapper} component="p" color="primary" align="left">
          <Link to="/">Dashboard</Link> {'>'} <span>Projects</span>
        </Typography>
      </div>
      <div className={`${dashboardGlobalClasses.widgetsContainer} ${dashboardGlobalClasses.noMarginTop} `}>
        <div className={dashboardGlobalClasses.widgetTitleWithFilter}>
          <Typography
            className={`${dashboardGlobalClasses.dashboardSubtitle} ${dashboardGlobalClasses.dashboardAccent} ${dashboardGlobalClasses.titlePaddingBottom}`}
          >
            Projects Dashboard
          </Typography>
        </div>
        <div className={`${dashboardGlobalClasses.widgetsContainer} ${dashboardGlobalClasses.noMarginTop} `}>
          <div className={dashboardGlobalClasses.widgetTitleWithFilter}>
            <Typography className={dashboardGlobalClasses.dashboardTitle}>Projects Dashboard</Typography>
            <div className={tableGlobalClasses.widgetFilterContainer}>
              <div className={tableGlobalClasses.filterActionsContainer}>
                <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                  <AutocompleteFilter value={locationCode} label={locationLabel} optionList={locationOptionList} onChange={onLocationChange} />
                </Box>
                <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
                <Box className={`${dashboardGlobalClasses.filterMargin} ${tableGlobalClasses.filterStatusContainer}`}>
                  <SelectFilter
                    value={getDefaultValue(GeneralModel.dayFilterTypeMap[queryParams.period], GeneralModel.TimeFilterType.TODAY)}
                    optionList={GeneralModel.dayFilterOptionList}
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
          <Grid className={dashboardGlobalClasses.middleWidget} item={true} xl={8} lg={8} md={7} sm={12} xs={12}>
            <NewActiveProjects queryParams={queryParams} />
          </Grid>

          <Grid className={dashboardGlobalClasses.lastWidgetItem} item={true} xl={4} lg={4} md={5} sm={12} xs={12}>
            <ProjectsRevenue queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid className={dashboardGlobalClasses.middleWidget} item={true} xl={8} lg={8} md={6} sm={12} xs={12}>
            <WorkersActivity queryParams={queryParams} />
          </Grid>
          <Grid className={dashboardGlobalClasses.lastWidgetItem} item={true} xl={4} lg={4} md={6} sm={12} xs={12}>
            <Clients queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true}>
          <Grid className={dashboardGlobalClasses.middleWidget} item={true} xl={8} lg={8} md={6} sm={12} xs={12}>
            <Grid container={true}>
              <Grid item={true} xl={6} lg={6} sm={12} xs={12} style={{ minHeight: '444px', paddingRight: '10px' }}>
                <NewBadgesByLocation queryParams={queryParams} />
              </Grid>
              <Grid item={true} xl={6} lg={6} sm={12} xs={12} style={{ minHeight: '444px', paddingLeft: '10px' }}>
                <NewBadgesByProject queryParams={queryParams} />
              </Grid>
            </Grid>
          </Grid>
          <Grid className={dashboardGlobalClasses.lastWidgetItem} item={true} xl={4} lg={4} md={12} sm={12} xs={12}>
            <Grid container={true} direction={'column'} justify={'space-between'} style={{ height: '100%' }}>
              <AccessControlSystem queryParams={queryParams} />
              <BadgePrintingSystem queryParams={queryParams} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <TopTenProjects queryParams={queryParams} />
    </Container>
  );
};

export default memo(DashboardProject);
