import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AutocompleteFilter from '../../../../shared/AutocompleteFilter';
import SelectFilter from '../../../../shared/SelectFilter';
import ProjectsRevenue from '../../../../shared/DashboardWidget/ProjectsRevenue';
import NewProjects from './components/NewProjects';
import NewWorkers from './components/NewWorkers';
import NewClients from './components/NewClients';

import { GeneralModel } from '../../../../../models';
import { useResize } from '../../../../../../utils/useResize';
import { useLocationFilter } from '../../../../../../utils/useLocationFilter';
import { getDefaultValue } from '../../../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useStyles } from '../../styles';

export interface IFcaDashboardProps {
  queryParams: GeneralModel.IQueryParams;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  onPeriodChange: (period: number) => void;
}

const FcaDashboard = ({ queryParams, setQueryParams, onPeriodChange }: IFcaDashboardProps) => {
  useResize();
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const [locationOptionList, locationLabel, onLocationChange, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });
  return (
    <>
      <div className={classes.widgetsContainer}>
        <div className={classes.widgetTitleWithFilter}>
          <Typography className={`${classes.dashboardSubtitle} ${classes.dashboardAccent} ${classes.titlePaddingBottom}`}>Reports by period</Typography>
          <div className={tableGlobalClasses.widgetFilterContainer}>
            <div className={tableGlobalClasses.filterActionsContainer}>
              <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                <AutocompleteFilter value={locationCode} label={locationLabel} optionList={locationOptionList} onChange={onLocationChange} />
              </Box>
              <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
              <Box className={`${classes.filterMargin} ${tableGlobalClasses.filterStatusContainer}`}>
                <SelectFilter
                  value={getDefaultValue(GeneralModel.dayFilterTypeMap[queryParams.period], GeneralModel.TimeFilterType.LAST_WEEK)}
                  optionList={GeneralModel.dayFilterOptionList}
                  onChange={onPeriodChange}
                />
              </Box>
            </div>
          </div>
        </div>
        <Grid className={`${classes.widgetTrailingResponsive} ${classes.widgetTrailingRight}`} container={true}>
          <Grid item={true} xl={8} lg={8} md={12} sm={12} xs={12}>
            <NewProjects queryParams={queryParams} />
          </Grid>
          <Grid item={true} xl={4} lg={4} md={5} sm={12} xs={12}>
            <ProjectsRevenue queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <div className={classes.widgetsContainer}>
        <Grid className={`${classes.widgetTrailingResponsive} ${classes.widgetTrailingRight}`} container={true}>
          <Grid item={true} xl={8} lg={8} md={12} sm={12} xs={12}>
            <NewWorkers queryParams={queryParams} />
          </Grid>
          <Grid item={true} xl={4} lg={4} md={5} sm={12} xs={12}>
            <NewClients queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default memo(FcaDashboard);
