import React, { memo, useEffect, useMemo, useCallback, useState } from 'react';
import moment from 'moment';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Avatar, withStyles } from '@material-ui/core';
import { Room } from '@material-ui/icons';

import Pagination from 'modules/views/shared/Pagination';
import EmptyList from 'modules/views/shared/EmptyList';
import SelectFilter from 'modules/views/shared/SelectFilter';
import TableCellLink from 'modules/views/shared/TableCellLink';
import ProjectDrawer from 'modules/views/pages/ProjectList/components/ProjectDrawer';

import { ProjectModel, GeneralModel, UserModel } from 'modules/models';
import { getDefaultValue } from 'utils';
import { ProjectsIcon } from 'constants/index';
import { listGlobalStyles, tableGlobalStyles } from 'assets/styles';
import { useStyles, tableRowStyles } from '../../styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IProjectsTabProps {
  clientId: string;
  projectClientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IProject>>;
  projectCount: number;
  projectMap: GeneralModel.IEntityMap<ProjectModel.IProject>;
  queryParams: GeneralModel.IQueryParams;
  loading: GeneralModel.ILoadingStatus;
  loadingSummary: GeneralModel.ILoadingStatus;
  drawer: boolean;
  setDrawer: (state) => void;
  setQueryParams: (queryParams: GeneralModel.IQueryParams) => void;
  onPageChange: (page: number) => void;
  fetchProjectList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchProjectSummary: (id: string) => void;
}

const ProjectsTab = ({
  clientId,
  loading,
  loadingSummary,
  projectClientMap,
  projectCount,
  projectMap,
  queryParams,
  drawer,
  setDrawer,
  fetchProjectList,
  fetchProjectSummary,
  onPageChange,
  setQueryParams,
}: IProjectsTabProps) => {
  const classes = useStyles();
  const listClasses = listGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const projectList = useMemo(
    () => (clientId && Object.keys(projectClientMap).length && projectClientMap[clientId] ? Object.values(projectClientMap[clientId]) : []),
    [projectClientMap, clientId]
  );

  const pageCount = useMemo(() => Math.ceil(projectCount / queryParams.pageSize), [projectCount, queryParams.pageSize]);

  const onFilterRoleChange = useCallback(
    (role: number) => {
      setQueryParams({ ...queryParams, role });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    fetchProjectList(clientId, queryParams);
  }, [clientId, queryParams, fetchProjectList]);

  const [projectId, setProjectId] = useState<string>(null);
  const currentProject = useMemo(() => projectMap[projectId] || ProjectModel.getFallbackProject(), [projectMap, projectId]);
  const openSummary = useCallback(
    (id: string) => {
      fetchProjectSummary(id);
      setProjectId(id);
      setDrawer({ open: true });
    },
    [setDrawer, setProjectId, fetchProjectSummary]
  );
  const closeSummary = useCallback(() => setDrawer({ open: false }), [setDrawer]);

  if (loading && loading.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
        <PermissionGuard permissionsExpression={UserModel.ClientProjectsPermission.VIEWACCESS}>
          <Box className={tableGlobalClasses.filterStatusContainer}>
            <SelectFilter
              value={getDefaultValue(ProjectModel.roleMap[queryParams.role], 'All Roles')}
              optionList={ProjectModel.roleListOptions}
              onChange={onFilterRoleChange}
            />
          </Box>
        </PermissionGuard>
      </div>
      {projectList.length === 0 ? (
        <EmptyList icon={<ProjectsIcon />} text="There are no Projects assigned" />
      ) : (
        <>
          <PermissionGuard permissionsExpression={UserModel.ClientProjectsPermission.VIEWACCESS}>
            <Table aria-label="project-list">
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Job Site Address</TableCell>
                  <TableCell>Estimated Date</TableCell>
                  <TableCell>Clients</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectList.map(project => (
                  <StyledTableRow
                    data-testid="project-client-list-row"
                    key={project.id}
                    onClick={() => openSummary(project.id)}
                    className={listClasses.clickableRow}
                  >
                    <TableCell className={`${classes.cellAvatarRowDirection} ${tableGlobalClasses.cellAvatar}`}>
                      <Avatar>
                        <Room />
                      </Avatar>
                      <TableCellLink href={`/projects/detail/${project.id}`} text={project.name} title="View Project detail" />
                    </TableCell>
                    <TableCell>
                      {project.jobSiteAddress && project.jobSiteAddress.line1 ? `${project.jobSiteAddress.line1}, ` : '-'}
                      {project.jobSiteAddress && project.jobSiteAddress.line2}
                      {project.jobSiteAddress && project.jobSiteAddress.stateName && project.jobSiteAddress.city
                        ? ` ${project.jobSiteAddress.stateName}, ${project.jobSiteAddress.city}`
                        : ''}
                    </TableCell>
                    <TableCell>
                      {project.startDate && project.endDate
                        ? moment(project.startDate).format('MMM DD, YYYY') + ' to ' + moment(project.endDate).format('MMM dd, YYYY')
                        : '-'}
                    </TableCell>
                    <TableCell>{project.clientCount}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </PermissionGuard>
          <PermissionGuard permissionsExpression={UserModel.ClientProjectsPermission.VIEWACCESS}>
            <Pagination page={queryParams.pageNumber} count={pageCount} onChange={onPageChange} />
          </PermissionGuard>
        </>
      )}
      <PermissionGuard permissionsExpression={UserModel.ClientProjectsPermission.VIEWACCESS}>
        <ProjectDrawer project={currentProject} isOpen={drawer} isLoading={loadingSummary && loadingSummary.isLoading} onClose={closeSummary} />
      </PermissionGuard>
    </>
  );
};

export default memo(ProjectsTab);
