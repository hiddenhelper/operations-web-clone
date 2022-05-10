import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import Skeleton from '../../Skeleton';

import { useStyles as dashboardStyles } from '../../../pages/Dashboard/styles';

export interface IDashboardTableProps {
  title: string;
  isLoading: boolean;
  renderHeader: () => void;
  renderBody: () => void;
}

const DashboardTable = ({ title, isLoading, renderHeader, renderBody }: IDashboardTableProps) => {
  const dashboardGlobalClasses = dashboardStyles();
  return (
    <div className={dashboardGlobalClasses.tableWrapper}>
      <Paper elevation={0}>
        <Skeleton isLoading={isLoading} animation="wave" variant="text" width={180} height={25}>
          <Typography className={`${dashboardGlobalClasses.tableTitle} ${dashboardGlobalClasses.tableTitlePaddingBottom}`}>{title}</Typography>
        </Skeleton>
        <div className={dashboardGlobalClasses.tableOverflow}>
          <Skeleton isLoading={isLoading} animation="wave" variant="text" width={'100%'}>
            <Table aria-label="main-projects">
              <TableHead>
                <>{renderHeader()}</>
              </TableHead>
              <TableBody>
                <>{renderBody()}</>
              </TableBody>
            </Table>
          </Skeleton>
        </div>
      </Paper>
    </div>
  );
};

export default memo(DashboardTable);
