import React, { memo, useMemo, useCallback } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';
import { getDefaultValue, getBigLineChartTicksByData } from '../../../../../utils/generalUtils';

import Skeleton from '../../Skeleton';

interface ISerie {
  name: string;
  data: { x: string; y: number }[];
  style: any;
}
export interface ILineChartProps {
  width: number;
  height?: number;
  fontSize?: number;
  padding?: { left: number; right: number; bottom: number; top: number };
  isLoading: boolean;
  series: ISerie[];
  displayXAxisTicks?: (tick: any) => void;
}

const ControlledLineChart = ({
  width,
  height,
  series,
  isLoading,
  fontSize = 12,
  padding = { left: 30, right: 20, bottom: 30, top: 30 },
  displayXAxisTicks,
}: ILineChartProps) => {
  const serieList = useMemo(() => series, [series]);
  const isEmpty = useMemo(() => serieList.reduce((total, serie) => serie.data.reduce((totalSerie, entry) => (totalSerie += entry.y), 0), 0) === 0, [serieList]);
  const getTickLabel = useCallback(
    ({ datum }) => {
      if (isEmpty || datum % 1 !== 0) return '';
      if (datum >= 1000) return `${Number(datum / 1000)}k`;
      return datum;
    },
    [isEmpty]
  );

  const defaultDisplayXAxisTicks = useCallback(getBigLineChartTicksByData, []);
  const hideGridAxis: any = useCallback(
    tick => {
      if (tick.index === 0 || tick.index === tick.ticks.length - 1) return 'none';
      if (displayXAxisTicks) return displayXAxisTicks(tick);
      return defaultDisplayXAxisTicks(tick);
    },
    [displayXAxisTicks, defaultDisplayXAxisTicks]
  );
  return (
    <Skeleton isLoading={isLoading} animation="wave" variant="rect" width={'99%'} height={'100%'}>
      <VictoryChart padding={padding} width={width} height={height || undefined} theme={VictoryTheme.material}>
        <VictoryAxis
          dependentAxis={true}
          tickLabelComponent={<VictoryLabel dx={0} dy={0} text={getTickLabel} />}
          style={{
            axis: { strokeWidth: 0 },
            ticks: {
              size: 0,
              stroke: 'white',
            },
            tickLabels: {
              fontSize,
              fill: '#878787',
            },
            grid: {
              strokeDasharray: 1,
              strokeWidth: 1,
            },
          }}
        />
        <VictoryAxis
          crossAxis={true}
          tickLabelComponent={
            <VictoryLabel
              dx={tick => {
                if (tick.index === 0) return 15;
                if (tick.index === tick.ticks.length - 1) return -20;
                return 0;
              }}
              dy={0}
            />
          }
          style={{
            axis: { strokeWidth: 1, stroke: '#eceff1' },
            ticks: { size: 0, stroke: 'white' },
            tickLabels: {
              fontSize,
              fill: '#878787',
              dominantBaseline: 'hanging',
              display: getDefaultValue(displayXAxisTicks, defaultDisplayXAxisTicks),
            },
            grid: {
              strokeDasharray: 1,
              strokeWidth: 1,
              display: hideGridAxis,
            },
          }}
        />
        {serieList.map(serie => (
          <VictoryLine key={serie.name} style={serie.style} data={serie.data} />
        ))}
      </VictoryChart>
    </Skeleton>
  );
};

export default memo(ControlledLineChart);
