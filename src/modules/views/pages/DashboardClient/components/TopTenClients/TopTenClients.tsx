import React, { memo, useMemo, useEffect } from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import DashboardTable from '../../../../shared/DashboardWidget/DashboardTable';
import Skeleton from '../../../../shared/Skeleton';
import ClientRow from './ClientRow';

import { GeneralModel, StatisticsModel } from '../../../../../models';

export interface ITopTenClientsProps {
  queryParams: GeneralModel.IQueryParams;
  clientTopTenWidget: StatisticsModel.IClientTopTenStatistics[];
  loading: GeneralModel.ILoadingStatus;
  fetchClientTopTen: (query: GeneralModel.IQueryParams) => void;
  navigate: (path: string) => void;
}

const TopTenClients = ({ queryParams, loading, clientTopTenWidget, fetchClientTopTen, navigate }: ITopTenClientsProps) => {
  const dataList = useMemo(() => (clientTopTenWidget ? clientTopTenWidget : []), [clientTopTenWidget]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);

  useEffect(() => {
    fetchClientTopTen(queryParams);
  }, [queryParams, fetchClientTopTen]);
  return (
    <DashboardTable
      title={'Top 10 Clients'}
      isLoading={isLoading}
      renderHeader={() => (
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Projects</TableCell>
          <TableCell>Workers</TableCell>
          <TableCell>Total Active Badges</TableCell>
          <TableCell>Invoice Amount</TableCell>
        </TableRow>
      )}
      renderBody={() => (
        <>
          {dataList.map(client => (
            <Skeleton key={client.company.id} isLoading={isLoading} animation="wave" variant="text" width={'100%'} height={60}>
              <ClientRow client={client} navigate={navigate} />
            </Skeleton>
          ))}
        </>
      )}
    />
  );
};

export default memo(TopTenClients);
