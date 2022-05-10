import React, { memo, useCallback } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

import ControlledButton from '../../FormHandler/ControlledButton';

import { StatisticsModel, GeneralModel } from '../../../../models';
import { formatNumberWithCommas, getFormattedDate } from '../../../../../utils/generalUtils';
import { workerStyles } from '../../../pages/WorkerList/styles';
import { tableRowStyles } from '../../../../../assets/styles/Tables/styles';
import { listGlobalStyles } from '../../../../../assets/styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IDashboardTableRowProps {
  row: StatisticsModel.IProjectTopTenStatistics;
  navigate: (path: string) => void;
}

const DashboardTableRow = ({ row, navigate }: IDashboardTableRowProps) => {
  const workerClasses = workerStyles();
  const listClasses = listGlobalStyles();

  const onNavigate = useCallback(() => {
    navigate(`/projects/detail/${row.project?.id}`);
  }, [row, navigate]);

  return (
    <StyledTableRow className={listClasses.invertedRow} data-testid="worker-list-row">
      <TableCell className={`${listClasses.listName}`}>
        <div className={workerClasses.workerRow}>
          <div className={workerClasses.workerCenter}>
            <ControlledButton>
              <Button data-testid="navigate-btn" onClick={onNavigate} disableRipple={true}>
                {row.project?.name}
              </Button>
            </ControlledButton>
          </div>
        </div>
      </TableCell>
      <TableCell>{getFormattedDate(row.creationDate, GeneralModel.DateFormat.DATE)}</TableCell>
      <TableCell>{row.totalClients}</TableCell>
      <TableCell>{row.totalWorkers}</TableCell>
      <TableCell>$ {formatNumberWithCommas(row.totalRevenue)}</TableCell>
    </StyledTableRow>
  );
};

export default memo(DashboardTableRow);
