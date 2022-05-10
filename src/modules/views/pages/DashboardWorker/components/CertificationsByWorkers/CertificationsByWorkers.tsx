import React, { memo, useMemo, useEffect } from 'react';

import { GeneralModel, StatisticsModel } from '../../../../../models';
import DashboardTopTen from '../../../../shared/DashboardWidget/DashboardTopTen';

export interface ICertificationsByWorkersProps {
  queryParams: GeneralModel.IQueryParams;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  loading: GeneralModel.ILoadingStatus;
  fetchWorkersCertifications: (key: string, query: GeneralModel.IQueryParams) => void;
}

const CertificationsByWorkers = ({ queryParams, topTenStatisticsMap, loading, fetchWorkersCertifications }: ICertificationsByWorkersProps) => {
  const idKey = useMemo(() => 'ceritficationsByWorkers', []);
  const certificationsByWorkersList = useMemo(() => topTenStatisticsMap[idKey] || [], [topTenStatisticsMap, idKey]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchWorkersCertifications(idKey, queryParams);
  }, [queryParams, idKey, fetchWorkersCertifications]);
  return (
    <DashboardTopTen title="Certifications by Workers" itemTitle="Certification" isLoading={isLoading} list={certificationsByWorkersList} rowColor="#1F86E8" />
  );
};

export default memo(CertificationsByWorkers);
