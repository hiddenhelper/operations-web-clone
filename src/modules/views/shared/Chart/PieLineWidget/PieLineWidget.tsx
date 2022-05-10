import React, { memo, useRef } from 'react';

import Grid from '@material-ui/core/Grid';

import DashboardWidget from '../../DashboardWidget';
import DashboardWidgetInlineHeader from '../../DashboardWidget/DashboardWidgetInlineHeader';
import PieChart from '../PieChart';
import LineChart from '../LineChart';

import { getDefaultValue, getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { statusWidgetStyles } from '../../DashboardWidget/styles';

export interface IPieLineWigetProps {
  title: string;
  total: number;
  lineChartData: any;
  pieChartData: any;
  isLoading: boolean;
  styles?: any;
  showDivider?: boolean;
  renderDetail?: () => React.ReactNode;
}

const PieLineWidget = ({ title, total, lineChartData, pieChartData, styles, isLoading, showDivider = true, renderDetail }: IPieLineWigetProps) => {
  const statusWidgetClasses = statusWidgetStyles();
  const chartRef: React.RefObject<any> = useRef();
  return (
    <DashboardWidget
      styleClass={getConditionalDefaultValue(showDivider, statusWidgetClasses.widgetMinHeight, '')}
      renderHeader={() => (
        <div className={statusWidgetClasses.headerRow}>
          <DashboardWidgetInlineHeader title={title} value={getDefaultValue(total, 0)} isLoading={isLoading} />
        </div>
      )}
      renderContent={() => (
        <Grid style={getDefaultValue(styles?.pieLineWidgetContainer, { marginBottom: '10px', minHeight: '350px' })} container={true}>
          <Grid
            ref={chartRef}
            item={true}
            xl={8}
            lg={8}
            md={12}
            xs={12}
            className={statusWidgetClasses.lineChartWithPieContent}
            style={getDefaultValue(styles?.lineChartWithPieContent, {})}
          >
            <LineChart
              width={chartRef?.current?.clientWidth || 0}
              height={chartRef?.current?.clientHeight || 0}
              isLoading={isLoading}
              series={[
                {
                  name: 'serie 1',
                  data: lineChartData,
                  style: {
                    data: {
                      stroke: '#1F86E8',
                      strokeWidth: 2,
                    },
                  },
                },
              ]}
            />
          </Grid>
          <Grid
            item={true}
            xl={4}
            lg={4}
            md={12}
            xs={12}
            className={getConditionalDefaultValue(!styles?.pieContainer, statusWidgetClasses.pieChartWithLineDefaultContainer, '')}
            style={getDefaultValue(styles?.pieContainer, {})}
          >
            <PieChart
              pieProps={{
                innerRadius: 130,
                padAngle: 4,
                style: { pieContainerHeight: getDefaultValue(styles?.pieContainerHeight, '73%') },
                labels: () => '',
              }}
              isLoading={isLoading}
              data={pieChartData}
              styles={styles}
            />
          </Grid>
        </Grid>
      )}
      showDivider={showDivider}
      renderDetail={renderDetail}
    />
  );
};

export default memo(PieLineWidget);
