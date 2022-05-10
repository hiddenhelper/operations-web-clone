import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DashboardWidget from '../../DashboardWidget';
import DashboardPercentageRow from '../../DashboardWidget/DashboardPercentageRow';
import Skeleton from '../../Skeleton';

import { StatisticsModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles as dashboardStyles } from '../../../pages/Dashboard/styles';
import { statusWidgetStyles } from '../../DashboardWidget/styles';

export interface IDashboardTopTenProps {
  list: StatisticsModel.ITopTenStatistics[];
  title: string;
  itemTitle: string;
  isLoading: boolean;
  rowColor?: string;
  styles?: any;
  containerStyles?: any;
  renderFilter?: () => void;
}

const DashboardTopTen = ({ title, itemTitle, list, rowColor, styles, containerStyles, isLoading, renderFilter }: IDashboardTopTenProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  const statusWidgetClasses = statusWidgetStyles();
  return (
    <DashboardWidget
      styles={{ height: '100%', minHeight: '444px', ...styles }}
      renderHeader={() => (
        <div style={{ ...containerStyles?.header }} className={`${dashboardGlobalClasses.widgetTitleMarginBottom} ${dashboardGlobalClasses.withFilter}`}>
          <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={getConditionalDefaultValue(!!renderFilter, '60%', '100%')} height={30}>
            <Typography className={`${statusWidgetClasses.widgetTitle} ${statusWidgetClasses.widgetTitleInlinePosition}`}>{title}</Typography>
          </Skeleton>
          {renderFilter && renderFilter()}
        </div>
      )}
      renderContent={() => (
        <div style={{ paddingTop: '15px', ...containerStyles?.content }}>
          <Grid container={true} style={{ height: '24px', marginBottom: '12px' }}>
            <Grid item={true} xl={12} lg={12} xs={12} sm={12}>
              <Grid container={true}>
                <Grid item={true} xl={6} lg={6} xs={6} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'30%'} height={15}>
                    <Typography style={{ fontWeight: 'bold' }}>{itemTitle}</Typography>
                  </Skeleton>
                </Grid>
                <Grid item={true} xl={6} lg={6} xs={6} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'30%'} height={15}>
                    <Typography style={{ fontWeight: 'bold' }}>Quantity</Typography>
                  </Skeleton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {list.map((item, index) => (
            <DashboardPercentageRow key={index} isLoading={isLoading} item={item} color={rowColor} />
          ))}
        </div>
      )}
    />
  );
};

export default memo(DashboardTopTen);
