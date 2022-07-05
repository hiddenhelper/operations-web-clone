import React, { memo, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Prompt } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AutocompleteFilter from '../../shared/AutocompleteFilter';
import Container from '../../shared/Container';
import StatusWidget from '../../shared/StatusWidget';
import Pagination from '../../shared/Pagination';
import RoleGuard from '../../shared/RoleGuard';
import SelectFilter from '../../shared/SelectFilter';
import ButtonTab from '../../shared/ButtonTab';
import PageTitle from '../../shared/PageTitle';
import ProjectDrawer from './components/ProjectDrawer';
import ProjectRow from './components/ProjectRow';
import ProjectBanner from './components/ProjectBanner';

import { ProjectModel, GeneralModel, ResourceModel, UserModel, StatisticsModel } from '../../../models';
import { getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { useLocationFilter } from '../../../../utils/useLocationFilter';
import { tableGlobalStyles } from '../../../../assets/styles/Tables/styles';
import { useStyles as buttonStyles } from '../../shared/FormHandler/ControlledButton/styles';
import { listGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';
import { useTimeZone } from '../../../../utils/useTimeZone';

export interface IProjectListProps {
  userRole: UserModel.Role;
  projectMap: GeneralModel.IEntityMap<ProjectModel.IProject>;
  projectCount: number;
  listLoading: GeneralModel.ILoadingStatus;
  loading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  projectStatistics: StatisticsModel.IProjectStatistics;
  invoiceStatistics: StatisticsModel.IInvoiceStatistics;
  statisticsLoading: GeneralModel.ILoadingStatus;
  currentFilter: string;
  fetchProjectList: (query: GeneralModel.IQueryParams) => void;
  fetchProjectSummary: (id: string) => void;
  clearProjectMap: () => void;
  deleteProject: (id: string, query: GeneralModel.IQueryParams) => void;
  navigate: (path: string) => void;
  fetchProjectStatistics: () => void;
  fetchInvoiceStatistics: () => void;
  clearProjectStatistics: () => void;
  clearInvoiceStatistics: () => void;
  updateCurrentFilter: (filter: string) => void;
}

const ProjectList = ({
  userRole,
  projectCount,
  projectMap,
  listLoading,
  loading,
  deleteLoading,
  projectStatistics,
  invoiceStatistics,
  statisticsLoading,
  currentFilter,
  navigate,
  fetchProjectList,
  fetchProjectSummary,
  fetchProjectStatistics,
  fetchInvoiceStatistics,
  clearProjectMap,
  clearProjectStatistics,
  clearInvoiceStatistics,
  deleteProject,
  updateCurrentFilter,
}: IProjectListProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const listClasses = listGlobalStyles();
  const projectListRef = useRef();
  const { timeZoneOffset } = useTimeZone();
  const [queryParams, setQueryParams] = useQueryParamState<any>({
    filter: userRole === UserModel.Role.FCA_ADMIN ? currentFilter || ResourceModel.filterMap[ResourceModel.Status.DRAFT].key : 'my-projects',
    page: 1,
    limit: 15,
    period: GeneralModel.TimeFilterType.ALL_TIMES,
    timeZoneOffset,
  });
  const [locationOptionList, locationLabel, onLocationFilter, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>(null);
  const currentProject = useMemo(() => projectMap[projectId] || ProjectModel.getFallbackProject(), [projectMap, projectId]);
  const projectList: ProjectModel.IProject[] = useMemo(
    () => Object.values(projectMap).filter(project => project.companyProjectStatus !== ProjectModel.CompanyProjectStatus.PENDING),
    [projectMap]
  );
  const bannerList: ProjectModel.IProject[] = useMemo(
    () => Object.values(projectMap).filter(project => project.companyProjectStatus === ProjectModel.CompanyProjectStatus.PENDING),
    [projectMap]
  );
  const filterList = useMemo(() => Object.values(ResourceModel.filterMap).filter(item => item.roleList.includes(userRole)), [userRole]);
  const pageCount = useMemo(() => Math.ceil(projectCount / queryParams.limit), [projectCount, queryParams.limit]);
  const isFcAdmin = useMemo(() => UserModel.Role.FCA_ADMIN === userRole, [userRole]);

  const getStatusFilter = useCallback((filter: ResourceModel.Status) => (isFcAdmin ? ResourceModel.keyFilterMap[filter] : undefined), [isFcAdmin]);

  const onPageChange = useCallback(
    newPage => {
      setQueryParams({ ...queryParams, status: getStatusFilter(queryParams.filter), page: newPage });
    },
    [setQueryParams, getStatusFilter, queryParams]
  );

  const openProject = useCallback(
    (clientId: string) => {
      fetchProjectSummary(clientId);
      setProjectId(clientId);
      setOpenDrawer(true);
    },
    [setOpenDrawer, setProjectId, fetchProjectSummary]
  );

  const closeClient = useCallback(() => setOpenDrawer(false), [setOpenDrawer]);
  const setFilter = useCallback(
    filter => {
      updateCurrentFilter(ResourceModel.filterMap[filter].key);
      setQueryParams({ filter: ResourceModel.filterMap[filter].key, page: 1 });
      setOpenDrawer(false);
    },
    [setOpenDrawer, setQueryParams, updateCurrentFilter]
  );

  const handleDeleteProject = useCallback(
    id => {
      const newPage = projectList.length === 1 && queryParams.page !== 1;

      deleteProject(id, {
        ...queryParams,
        status: getStatusFilter(queryParams.filter),
        newPage,
      });

      setOpenDrawer(false);
    },
    [deleteProject, getStatusFilter, projectList, queryParams]
  );

  const handleCreateProjectClick = useCallback(() => {
    navigate('/projects/wizard/new');
  }, [navigate]);

  const handleBannerClick = useCallback(
    (id: string) => {
      navigate(`/projects/invitation/${id}`);
    },
    [navigate]
  );

  const onNavigateAway = useCallback(() => {
    setOpenDrawer(false);
    return true;
  }, [setOpenDrawer]);

  const onFilterLocationChange = useCallback(
    (stateCode: string) => {
      onLocationFilter(stateCode, { page: 1 });
    },
    [onLocationFilter]
  );

  const onFilterPeriodChange = useCallback(
    (period: number) => {
      setQueryParams({ ...queryParams, period: period, page: 1 });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    fetchProjectList({ ...queryParams, status: getStatusFilter(queryParams.filter) });
  }, [fetchProjectList, getStatusFilter, queryParams]);

  useEffect(() => {
    if (!projectStatistics) fetchProjectStatistics();
  }, [projectStatistics, fetchProjectStatistics]);

  useEffect(() => {
    if (!isFcAdmin && !invoiceStatistics) fetchInvoiceStatistics();
  }, [invoiceStatistics, isFcAdmin, fetchInvoiceStatistics]);

  useEffect(() => {
    return function unMount() {
      clearProjectMap();
      clearProjectStatistics();
      clearInvoiceStatistics();
      setOpenDrawer(false);
    };
  }, [setOpenDrawer, clearProjectMap, clearProjectStatistics, clearInvoiceStatistics]);
  return (
    <Container id="project-list" ref={projectListRef}>
      <Prompt data-testid="prompt-navigate" message={onNavigateAway} />
      <div className={getConditionalDefaultValue(openDrawer, listClasses.generalListContent, '')}>
        <PageTitle
          title="Projects"
          right={
            <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
              <>
                <Button
                  className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge}`}
                  color="primary"
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  type="submit"
                  onClick={handleCreateProjectClick}
                  data-testid="create-project-btn"
                >
                  Create Project
                </Button>
              </>
            </RoleGuard>
          }
        />
        <div className={listClasses.widgetsWrapper} id="summary-widgets">
          <StatusWidget
            total={getConditionalDefaultValue(isFcAdmin, getDefaultValue(projectStatistics?.draft, 0), getDefaultValue(projectStatistics?.pending, 0))}
            status={ProjectModel.widgetMap[userRole].First.status}
            content={
              <p className={classes.reviewLink} onClick={() => setFilter(ResourceModel.Status.DRAFT)}>
                {ProjectModel.widgetMap[userRole].First.content}
              </p>
            }
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getConditionalDefaultValue(
              isFcAdmin,
              getDefaultValue(projectStatistics?.pendingApproval, 0),
              getDefaultValue(projectStatistics?.accepted, 0)
            )}
            status={ProjectModel.widgetMap[userRole].Second.status}
            content={
              <p className={classes.reviewLink} onClick={() => setFilter(ResourceModel.Status.PENDING_APPROVAL)}>
                {ProjectModel.widgetMap[userRole].Second.content}
              </p>
            }
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={ProjectModel.widgetMap[userRole].Third.total(
              getConditionalDefaultValue(isFcAdmin, getDefaultValue(projectStatistics?.active, 0), getDefaultValue(projectStatistics?.billing, 0))
            )}
            status={ProjectModel.widgetMap[userRole].Third.status}
            content={
              <p className={classes.reviewLink} onClick={() => setFilter(ResourceModel.Status.ACTIVE)}>
                {ProjectModel.widgetMap[userRole].Third.content}
              </p>
            }
            loading={statisticsLoading?.isLoading}
          />
        </div>
        <div className={tableGlobalClasses.tableWrapper}>
          <div className={tableGlobalClasses.filterContainer}>
            <div className={tableGlobalClasses.statusFilter}>
              {filterList.map(optFilter => (
                <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={optFilter.key === queryParams.filter} setFilter={setFilter} />
              ))}
            </div>
            <div className={tableGlobalClasses.filterActionsContainer}>
              <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                <AutocompleteFilter value={locationCode} optionList={locationOptionList} label={locationLabel} onChange={onFilterLocationChange} />
              </Box>
              <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
              <Box className={tableGlobalClasses.filterStatusContainer}>
                <SelectFilter
                  value={getDefaultValue(GeneralModel.timeFilterTypeMap[queryParams.period], 'All')}
                  optionList={GeneralModel.timeFilterOptionList}
                  onChange={onFilterPeriodChange}
                />
              </Box>
            </div>
          </div>
          {listLoading && !listLoading.isLoading ? (
            <>
              <RoleGuard roleList={[UserModel.Role.CLIENT_ADMIN]}>
                <>
                  {queryParams.filter === 'my-projects' &&
                    bannerList.map(project => <ProjectBanner key={project.id} project={project} onOpen={handleBannerClick} />)}
                </>
              </RoleGuard>
              {projectList.length > 0 && (
                <>
                  <Table aria-label="project-list">
                    <TableHead>
                      <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Estimated Date</TableCell>
                        <TableCell>{getConditionalDefaultValue(isFcAdmin, 'Clients', 'Companies')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectList.map(project => (
                        <ProjectRow key={project.id} project={project} onOpen={openProject} />
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination data-testid="pagination" page={queryParams.page} count={pageCount} onChange={onPageChange} />
                </>
              )}
            </>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
      <ProjectDrawer
        userRole={userRole}
        project={currentProject}
        isOpen={openDrawer}
        projectListElement={projectListRef.current}
        isLoading={loading && loading.isLoading}
        deleteLoading={deleteLoading}
        onClose={closeClient}
        onDelete={handleDeleteProject}
      />
    </Container>
  );
};

export default memo(ProjectList);
