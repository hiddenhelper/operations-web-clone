import React, { memo, useMemo } from 'react';
import { VictoryPie } from 'victory';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Skeleton from '../../Skeleton';
import BulletLabel from '../../BulletLabel';
import { useStyles } from './styles';
import { roundNumber, getConditionalDefaultValue, getDefaultValue } from '../../../../../utils/generalUtils';

export interface IPieChartProps {
  pieProps: {
    padAngle: number;
    innerRadius: number;
    style: any;
    labels: () => any;
  };
  data: {
    x: string;
    y: number;
    percentage: number;
    color?: string;
  }[];
  isLoading: boolean;
  styles?: any;
}

const ControlledPieChart = ({ pieProps, data, styles, isLoading }: IPieChartProps) => {
  const classes = useStyles();
  const dataList = useMemo(() => data, [data]);
  const isEmpty = useMemo(() => dataList.reduce((total, entry) => (total += entry.y), 0) === 0, [dataList]);
  const pieData = useMemo(
    () =>
      getConditionalDefaultValue(
        isEmpty,
        [{ x: 'empty', y: 1, percentage: 100, color: '#878787' }],
        dataList.filter(entry => entry.y > 0)
      ),
    [dataList, isEmpty]
  );
  return (
    <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'100%'} height={'96%'}>
      <Grid container={true} style={getDefaultValue(styles?.pieChartContainer, { flexDirection: 'row', height: '100%' })}>
        <Grid
          item={true}
          xl={12}
          lg={12}
          style={{ paddingRight: 0, textAlign: 'center', height: getDefaultValue(pieProps.style.pieContainerHeight, '100%') }}
          className={classes.pieChartClass}
        >
          <VictoryPie
            padAngle={pieProps.padAngle}
            labels={pieProps.labels}
            innerRadius={pieProps.innerRadius}
            data={pieData}
            colorScale={pieData.reduce((colors, entry) => [...colors, entry.color], [])}
            style={pieProps.style}
          />
        </Grid>
        <Grid item={true} xl={12} lg={12} style={getDefaultValue(styles?.pieChartList, {})}>
          {dataList.map(entry => (
            <Grid key={entry.x} container={true}>
              <Grid item={true} xl={9} lg={9}>
                <BulletLabel label={entry.x} color={entry.color} />
              </Grid>
              <Grid item={true} xl={2} lg={2}>
                <Typography style={{ color: '#4C4C4C', fontSize: '15px', textAlign: 'right' }}>{roundNumber(entry.percentage)}%</Typography>
              </Grid>
              <Grid item={true} xl={1} lg={1}>
                <Typography style={{ color: '#4C4C4C', fontSize: '15px', fontWeight: 'bold', textAlign: 'right' }}>{entry.y}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Skeleton>
  );
};

export default memo(ControlledPieChart);
