import React, { memo, useEffect, useMemo } from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import DashboardTable from '../DashboardTable';
import DashboardTableRow from '../DashboardTableRow';

import { GeneralModel, StatisticsModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';

export interface ITopTenProjectsProps {
  queryParams: GeneralModel.IQueryParams;
  projectTopTenWidget: StatisticsModel.IProjectTopTenStatistics[];
  loading: GeneralModel.ILoadingStatus;
  isFcaUser: boolean;
  isAdmin: boolean;
  fetchProjectTopTen: (query: GeneralModel.IQueryParams) => void;
}

const TopTenProjects = ({ queryParams, projectTopTenWidget, loading, isFcaUser, isAdmin, fetchProjectTopTen }: ITopTenProjectsProps) => {
  const dataList = useMemo(() => (projectTopTenWidget ? projectTopTenWidget : []), [projectTopTenWidget]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);
  const isFcAdmin: boolean = useMemo(() => isFcaUser && isAdmin, [isFcaUser, isAdmin]);

  useEffect(() => {
    fetchProjectTopTen(queryParams);
  }, [queryParams, fetchProjectTopTen]);
  return (
    <DashboardTable
      title={'Top 10 Projects'}
      isLoading={isLoading}
      renderHeader={() => (
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Creation Date</TableCell>
          <TableCell>{getConditionalDefaultValue(isFcAdmin, 'Clients', 'Companies')}</TableCell>
          <TableCell>Workers</TableCell>
          <TableCell>{getConditionalDefaultValue(isFcAdmin, 'Revenue', 'Invoices')}</TableCell>
        </TableRow>
      )}
      renderBody={() => (
        <>
          {dataList.map(item => (
            <DashboardTableRow key={item.project?.id} row={item} />
          ))}
        </>
      )}
    />
  );
};

export default memo(TopTenProjects);
