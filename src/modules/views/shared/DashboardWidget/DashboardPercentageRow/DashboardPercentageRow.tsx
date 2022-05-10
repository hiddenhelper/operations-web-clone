import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';

import Skeleton from '../../Skeleton';
import ControlledTooltip from '../../ResourceManagement/ControlledTooltip';

import { StatisticsModel } from '../../../../models';
import { getDefaultValue } from '../../../../../utils/generalUtils';

export interface IDashboardPercentageRowProps {
  item: StatisticsModel.ITopTenStatistics;
  isLoading: boolean;
  color?: string;
}

const DashboardPercentageRow = ({ isLoading, color, item }: IDashboardPercentageRowProps) => {
  return (
    <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'100%'} height="auto">
      <Grid container={true} style={{ height: '24px', marginBottom: '6.5px' }}>
        <Grid item={true} xl={12} lg={12} xs={12} sm={12}>
          <Grid container={true}>
            <Grid item={true} xl={3} lg={3} xs={3} sm={3}>
              <ControlledTooltip title={item.description} placement={'left-start'}>
                <div style={{ alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>
              </ControlledTooltip>
            </Grid>
            <Grid item={true} xl={8} lg={8} xs={8} sm={8} style={{ display: 'flex', alignItems: 'center', paddingLeft: '5px' }}>
              <div style={{ width: `${item.percentage}%`, backgroundColor: getDefaultValue(color, '#E9A61F'), height: '8px', borderRadius: '4px' }} />
            </Grid>
            <Grid item={true} xl={1} lg={1} xs={1} sm={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {item.total}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Skeleton>
  );
};

export default memo(DashboardPercentageRow);
