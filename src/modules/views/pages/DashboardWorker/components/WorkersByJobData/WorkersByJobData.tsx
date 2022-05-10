import React, { memo, useMemo, useEffect, useCallback, useState } from 'react';

import Box from '@material-ui/core/Box';

import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';
import SelectFilter from '../../../../shared/SelectFilter';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import { tableGlobalStyles } from '../../../../../../assets/styles';

export interface IWorkersByJobdataProps {
  queryParams: { stateCode: string; period: GeneralModel.TimeFilterType; filter?: number };
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersByJobDataStart: (key: string, query: GeneralModel.IQueryParams, filter: GeneralModel.IJobFilter) => void;
}

const WorkersByJobdata = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersByJobDataStart }: IWorkersByJobdataProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const idKey = useMemo(() => 'workersByJobdata', []);
  const workersByJobDataList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);
  const [filter, setFilter] = useState<number>(GeneralModel.IJobFilter.TRADE);

  const onChangeFilter = useCallback(value => setFilter(value), [setFilter]);

  useEffect(() => {
    fetchWorkersByJobDataStart(idKey, { ...queryParams }, filter);
  }, [queryParams, idKey, filter, fetchWorkersByJobDataStart]);
  return (
    <DashboardTopTen
      title="Workers by Job Data"
      itemTitle={GeneralModel.jobFilterMap[filter]}
      isLoading={isLoading}
      list={workersByJobDataList}
      rowColor="#1F86E8"
      renderFilter={() => (
        <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.subFilterContainer}`}>
          <SelectFilter value={GeneralModel.jobFilterMap[filter]} optionList={GeneralModel.jobDataFilterList} onChange={onChangeFilter} />
        </Box>
      )}
    />
  );
};

export default memo(WorkersByJobdata);
