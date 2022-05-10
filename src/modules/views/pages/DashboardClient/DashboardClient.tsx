import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AutocompleteFilter from '../../shared/AutocompleteFilter';
import Container from '../../shared/Container';
import SelectFilter from '../../shared/SelectFilter';

import NewActiveClients from './components/NewActiveClients';
import ClientsRevenue from './components/ClientsRevenue';
import ClientsByTrades from './components/ClientsByTrades';
import NewWorkers from './components/NewWorkers';
import TopTenClients from './components/TopTenClients';

import { GeneralModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { useResize } from '../../../../utils/useResize';
import { useLocationFilter } from '../../../../utils/useLocationFilter';
import { getDefaultValue } from '../../../../utils/generalUtils';

import { tableGlobalStyles } from '../../../../assets/styles';
import { useStyles as dashboardStyles } from '../Dashboard/styles';

const DashboardClient = () => {
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
  return (
    <Container>
      <div className="client-header">
        <Typography className={dashboardGlobalClasses.stepWrapper} color="primary" align="left">
          <Link to="/">Dashboard</Link> {'>'} <span>Clients</span>
        </Typography>
      </div>
      <div className={`${dashboardGlobalClasses.widgetsContainer} ${dashboardGlobalClasses.noMarginTop} `}>
        <div className={dashboardGlobalClasses.widgetTitleWithFilter}>
          <Typography
            className={`${dashboardGlobalClasses.dashboardSubtitle} ${dashboardGlobalClasses.dashboardAccent} ${dashboardGlobalClasses.titlePaddingBottom}`}
          >
            Clients Dashboard
          </Typography>
        </div>
        <div className={`${dashboardGlobalClasses.widgetsContainer} ${dashboardGlobalClasses.noMarginTop} `}>
          <div className={dashboardGlobalClasses.widgetTitleWithFilter}>
            <Typography className={dashboardGlobalClasses.dashboardTitle}>Clients Dashboard</Typography>
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
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetTrailingRight}`} container={true}>
          <Grid item={true} xl={8} lg={8} md={7} sm={12} xs={12}>
            <NewActiveClients queryParams={queryParams} />
          </Grid>

          <Grid item={true} xl={4} lg={4} md={5} sm={12} xs={12}>
            <ClientsRevenue queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <div className={dashboardGlobalClasses.widgetsContainer}>
        <Grid className={`${dashboardGlobalClasses.widgetTrailingResponsive} ${dashboardGlobalClasses.widgetSpacing}`} container={true} spacing={2}>
          <Grid item={true} xl={4} lg={4} md={6} sm={12} xs={12}>
            <ClientsByTrades queryParams={queryParams} />
          </Grid>
          <Grid item={true} xl={8} lg={8} md={7} sm={12} xs={12}>
            <NewWorkers queryParams={queryParams} />
          </Grid>
        </Grid>
      </div>
      <TopTenClients queryParams={queryParams} />
    </Container>
  );
};

export default memo(DashboardClient);
