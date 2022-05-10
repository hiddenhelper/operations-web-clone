import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';

import DashboardWidget from '../../DashboardWidget';
import DashboardWidgetHeader from '../../DashboardWidget/DashboardWidgetHeader';
import LineChart from '../../Chart/LineChart';

import { useStyles } from './styles';

export interface ILineWidgetProps {
  title: string;
  total: number | string;
  data: { x: string; y: number }[];
  isLoading: boolean;
  padding?: { left: number; right: number; bottom: number; top: number };
  displayXAxisTicks?: (tick: any) => void;
}

const LineWidget = ({ title, total, data, padding = { left: 35, right: 10, bottom: 40, top: 30 }, isLoading, displayXAxisTicks }: ILineWidgetProps) => {
  const classes = useStyles();
  return (
    <DashboardWidget
      renderHeader={() => (
        <div className={`${classes.widgetTitleMarginBottom}`}>
          <DashboardWidgetHeader title={title} value={total} isLoading={isLoading} />
        </div>
      )}
      renderContent={() => (
        <Grid
          container={true}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '335px',
          }}
        >
          <Grid item={true} xl={12} lg={12} md={12} xs={12} style={{ maxHeight: '370px', height: '370px' }} className={classes.revenueWidgetContent}>
            <LineChart
              width={600}
              height={530}
              isLoading={isLoading}
              fontSize={16}
              padding={padding}
              displayXAxisTicks={displayXAxisTicks}
              series={[
                {
                  name: 'serie 1',
                  data: data,
                  style: {
                    data: {
                      stroke: '#1F86E8',
                      strokeWidth: 3,
                    },
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
      )}
    />
  );
};

export default memo(LineWidget);
