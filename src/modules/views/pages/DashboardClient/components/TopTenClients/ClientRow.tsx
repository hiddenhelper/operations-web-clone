import React, { memo, useCallback } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

import ControlledButton from '../../../../shared/FormHandler/ControlledButton';

import { StatisticsModel } from '../../../../../models';
import { formatNumberWithCommas } from '../../../../../../utils/generalUtils';
import { workerStyles } from '../../../WorkerList/styles';
import { tableRowStyles } from '../../../../../../assets/styles/Tables/styles';
import { listGlobalStyles } from '../../../../../../assets/styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IClientRowProps {
  client: StatisticsModel.IClientTopTenStatistics;
  navigate: (path: string) => void;
}

const ClientRow = ({ client, navigate }: IClientRowProps) => {
  const workerClasses = workerStyles();
  const listClasses = listGlobalStyles();

  const onNavigate = useCallback(() => {
    navigate(`/clients/detail/${client.company.id}`);
  }, [client, navigate]);

  return (
    <StyledTableRow className={listClasses.invertedRow} data-testid="client-list-row">
      <TableCell className={`${listClasses.listName}`}>
        <div className={workerClasses.workerRow}>
          <div className={workerClasses.workerCenter}>
            <ControlledButton>
              <Button data-testid="navigate-btn" onClick={onNavigate} disableRipple={true}>
                {client.company.name}
              </Button>
            </ControlledButton>
          </div>
        </div>
      </TableCell>
      <TableCell>{client.projectsCount}</TableCell>
      <TableCell>{formatNumberWithCommas(client.workersCount)}</TableCell>
      <TableCell>{formatNumberWithCommas(client.activeBadgesCount)}</TableCell>
      <TableCell>$ {formatNumberWithCommas(client.totalRevenue)}</TableCell>
    </StyledTableRow>
  );
};

export default memo(ClientRow);
