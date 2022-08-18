import React, { memo, useMemo, useEffect } from 'react';

import moment from 'moment';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import Container from 'modules/views/shared/Container';
import EmptyList from 'modules/views/shared/EmptyList';
import PageTitle from 'modules/views/shared/PageTitle';
import StatusChip from 'modules/views/shared/StatusChip';
import { useStyles as statusChipStyles } from 'modules/views/shared/StatusChip/styles';

import { ClientsIcon } from '../../../../constants';
import { GeneralModel, ProcoreModel } from 'modules/models';
import { getConditionalDefaultValue } from 'utils/generalUtils';
import { tableGlobalStyles } from 'assets/styles';
import { tableRowStyles } from 'assets/styles/Tables/styles';

import { useStyles } from '../AdminSettings/styles';
import { useStylesTable } from './styles';

export interface IProcoreClientsProps {
  clients?: ProcoreModel.IProcoreClient[];
  getProcoreClients: () => void;
  loading: GeneralModel.ILoadingStatus;
  isFcaUser: boolean;
  isAdmin: boolean;
}

const ProcoreClients = ({ clients, getProcoreClients, loading, isFcaUser, isAdmin }: IProcoreClientsProps) => {
  const classes = useStyles();
  const classesTable = useStylesTable();
  const tableGlobalClasses = tableGlobalStyles();

  const StyledTableRow = withStyles(tableRowStyles)(TableRow);
  const statusChipClasses = statusChipStyles();

  const statusChipMap = useMemo(
    () => ({
      [ProcoreModel.ProcoreClientStatus.ACTIVE]: { label: 'Mapped', class: statusChipClasses.active },
      [ProcoreModel.ProcoreClientStatus.PENDING]: { label: 'Pending', class: statusChipClasses.pending },
    }),
    [statusChipClasses]
  );

  useEffect(() => {
    getProcoreClients?.();
  }, [getProcoreClients]);

  const emptyText = `There are no ${isFcaUser ? 'Clients' : 'Companies'} assigned`;
  const title = `Procore ${isFcaUser ? 'Clients' : 'Companies'}`;

  return (
    <Container className={tableGlobalClasses.tableWrapper}>
      <PageTitle title={title} />
      <Table aria-label="project-list">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Integration Date</TableCell>
            <TableCell>Number of Projects</TableCell>
            <TableCell className={`${classes.alignLeftStatus}`} align="right">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients?.length > 0 &&
            clients?.map(item => {
              const urlToProcoreMapping = `/procore-clients/client-mapping/${item.company.id}`;
              return (
                <StyledTableRow className={`${classes.tableContainer}`} data-testid="project-client-list-row" key={item.company.id}>
                  <TableCell>
                    <Link to={urlToProcoreMapping} className={classesTable.link}>
                      {item.company.name}
                    </Link>
                  </TableCell>
                  <TableCell className={classesTable.colorCell}>
                    {getConditionalDefaultValue(item.createdAt, moment(item.createdAt).format('DD MMM, YYYY. hh:mm A'))}
                  </TableCell>
                  <TableCell className={classesTable.colorCell}>{item.numberOfProjects}</TableCell>
                  <TableCell align="right">
                    <StatusChip styleClasses={`${statusChipMap[item.status].class} ${classes.chipSize}`} label={statusChipMap[item.status].label} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      {!clients && loading?.isLoading === false && <EmptyList icon={<ClientsIcon />} text={emptyText} />}
    </Container>
  );
};

export default memo(ProcoreClients);
