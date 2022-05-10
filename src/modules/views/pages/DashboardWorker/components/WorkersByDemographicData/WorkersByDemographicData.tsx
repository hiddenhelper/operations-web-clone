import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';

import Box from '@material-ui/core/Box';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';
import PieWidget from '../../../../shared/DashboardWidget/PieWidget';
import SelectFilter from '../../../../shared/SelectFilter';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import { getPieData } from '../../../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../../../assets/styles';

export interface IWorkersByDemographicDataProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  pieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.IPieWidgetStatistics>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByEthnicity: (key: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkersByDemographicData: (key: string, query: GeneralModel.IQueryParams, filter: GeneralModel.IDemographicFilter) => void;
}

const WorkersByDemographicData = ({
  queryParams,
  topTenStatisticsMap,
  pieStatisticsMap,
  loading,
  fetchWorkersByEthnicity,
  fetchWorkersByDemographicData,
}: IWorkersByDemographicDataProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const idKey = useMemo(() => 'workersByDemographicData', []);

  const [filter, setFilter] = useState<number>(GeneralModel.IDemographicFilter.PRIMARY_LANGUAGE);
  const ethnicityList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const data = useMemo(() => pieStatisticsMap[idKey] || StatisticsModel.getPieWidgetStatisticsFallback(), [pieStatisticsMap, idKey]);
  const pieChartData = useMemo(() => getPieData(data.pieChart, GeneralModel.demographicMap[filter], GeneralModel.pieBlueMap), [filter, data]);
  const isLoading: boolean = useMemo(() => !!loading?.isLoading, [loading]);

  const onChangeFilter = useCallback(value => setFilter(value), [setFilter]);

  const renderFilter = useCallback(
    () => (
      <Box style={{ paddingTop: '18px' }} className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.subFilterContainer}`}>
        <SelectFilter value={GeneralModel.demographicFilterMap[filter]} optionList={GeneralModel.demographicFilterList} onChange={onChangeFilter} />
      </Box>
    ),
    [tableGlobalClasses, filter, onChangeFilter]
  );

  useEffect(() => {
    if (filter === GeneralModel.IDemographicFilter.ETHNICITY) fetchWorkersByEthnicity(idKey, queryParams);
    else fetchWorkersByDemographicData(idKey, queryParams, filter);
  }, [queryParams, idKey, filter, fetchWorkersByEthnicity, fetchWorkersByDemographicData]);
  return filter === GeneralModel.IDemographicFilter.ETHNICITY ? (
    <DashboardTopTen
      title="Workers by Demographic Data"
      itemTitle="Ethnicity"
      isLoading={isLoading}
      list={ethnicityList}
      styles={{ height: '100%' }}
      containerStyles={{ content: { paddingTop: 0 }, header: { alignItems: 'flex-start' } }}
      renderFilter={renderFilter}
    />
  ) : (
    <PieWidget
      title="Workers by Demographic Data"
      total={data.newClients}
      data={pieChartData}
      isLoading={isLoading}
      showDetailRoute={false}
      showValue={false}
      style={{
        pieWidgetContainer: { height: '100%' },
        pieWidgetItem: { height: '100%' },
        pieChartList: {
          marginTop: '-20px',
        },
        pieParentStyles: {
          display: 'inline-block',
          textAlign: 'center',
          marginBottom: 0,
          marginTop: '-15px',
        },
      }}
      renderFilter={renderFilter}
    />
  );
};

export default memo(WorkersByDemographicData);
