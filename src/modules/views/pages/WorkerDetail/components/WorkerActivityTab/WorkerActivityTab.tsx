import React, { useEffect, memo, useMemo } from 'react';
import moment from 'moment';
import { Table, TableHead, TableCell, TableRow, TableBody, Box, Divider, withStyles } from '@material-ui/core';

import EmptyList from 'modules/views/shared/EmptyList';
import Pagination from 'modules/views/shared/Pagination';
import SelectFilter from 'modules/views/shared/SelectFilter';
import TableCellLink from 'modules/views/shared/TableCellLink';

import WorkerProjectFilter from '../WorkerProjectFilter';

import { WorkerModel, ProjectModel, GeneralModel } from 'modules/models';
import { WorkersIcon } from 'constants/index';
import { getDefaultValue } from 'utils';
import { listTableRowStyles, tableGlobalStyles } from 'assets/styles';
import { useStyles } from './styles';

export interface IWorkerActivityState {
  projectId: string;
  period: string;
}

export interface IWorkerActivityTabProps {
  worker: WorkerModel.IWorker;
  workerActivityList: WorkerModel.IWorkerActivity[];
  projectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IWorkerProject>>;
  queryParams: GeneralModel.IQueryParams;
  workerActivityCount: number;
  fetchWorkerActivity: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => void;
  onPageChange: (page: number) => void;
  onFilterPeriodChange: (period: number) => void;
  onFilterProjectChange: (projectId: string) => void;
}
const StyledTableRow = withStyles(listTableRowStyles)(TableRow);

const WorkerActivityTab = ({
  worker,
  queryParams,
  workerActivityList,
  projectMap,
  workerActivityCount,
  fetchWorkerProjectList,
  fetchWorkerActivity,
  onPageChange,
  onFilterPeriodChange,
  onFilterProjectChange,
}: IWorkerActivityTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const pageCount = useMemo(() => Math.ceil(workerActivityCount / queryParams.limit), [workerActivityCount, queryParams.limit]);
  const classes = useStyles();

  useEffect(() => {
    fetchWorkerActivity(worker?.id, queryParams);
  }, [worker, queryParams]); // eslint-disable-line

  return (
    <>
      <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
        <div className={tableGlobalClasses.filterActionsContainerLeft}>
          <WorkerProjectFilter
            workerId={worker?.id}
            queryParams={queryParams}
            projectMap={projectMap[worker?.id]}
            onFilterProjectChange={onFilterProjectChange}
            fetchWorkerProjectList={fetchWorkerProjectList}
          />
          <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer}`}>
            <SelectFilter
              value={getDefaultValue(GeneralModel.timeFilterTypeMap[queryParams.period], 'All Times')}
              optionList={GeneralModel.workerActivityPeriodList}
              onChange={onFilterPeriodChange}
            />
          </Box>
        </div>
      </div>
      {!workerActivityList.length && <EmptyList icon={<WorkersIcon />} text="There is no Activity" />}
      {workerActivityList.length ? (
        <>
          <Table aria-label="project-list">
            <TableHead>
              <TableRow>
                <TableCell>Activity</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Location Site</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workerActivityList.map((activity, index) => (
                <StyledTableRow data-testid="activity-list-row" key={index}>
                  <TableCell>
                    <span>
                      <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" fill={WorkerModel.workerActivityNameMap[activity?.type]?.color} />
                      </svg>
                    </span>
                    <span className={classes.activityName}>{WorkerModel.workerActivityNameMap[activity?.type]?.name}</span>
                  </TableCell>
                  <TableCell>{moment(activity.dateTime).format('MMM DD, YYYY, hh:mm A')}</TableCell>
                  <TableCell>
                    {activity?.project?.id ? (
                      <TableCellLink href={`/projects/detail/${activity.project.id}`} text={activity.project.name} title="View Project detail" />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{activity.location ?? '-'}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination data-testid="pagination" page={queryParams.page} count={pageCount} onChange={onPageChange} />
        </>
      ) : null}
    </>
  );
};

export default memo(WorkerActivityTab);
