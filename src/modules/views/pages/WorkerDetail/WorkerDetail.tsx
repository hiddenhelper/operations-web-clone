import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Badge, Avatar, Button } from '@material-ui/core/';

import { Banner } from 'modules/views/shared';
import Container from 'modules/views/shared/Container';
import WorkerBadge from 'modules/views/shared/ResourceManagement/WorkerBadge';
import CardSummary from 'modules/views/shared/CardSummary/CardSummary';
import AvatarImage from 'modules/views/shared/AvatarImage';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';

import CertificationTab from './components/CertificationTab';
import WorkerActivityTab from './components/WorkerActivityTab';
import ProjectsTab from './components/ProjectsTab';
import TrainingTab from './components/TrainingsTab';
import Review from './components/Review';
import ObservationsTab from './components/ObservationsTab';

import { GeneralModel, UserModel, WorkerModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { isEmpty, isUUID } from '../../../../utils/generalUtils';
import { listGlobalStyles, tableGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';
import { useTimeZone } from '../../../../utils/useTimeZone';

export interface IWorkerDetailProps {
  workerMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  workerLoading: GeneralModel.ILoadingStatus;
  userRole: UserModel.Role;
  fetchWorker: (id: string) => void;
  clearWorkerMap: () => void;
  clearLoadingMap: () => void;
  clearWorkerActivityList: () => void;
  clearWorkerObservationList: () => void;
  navigate: (path: string) => void;
}

const WorkerDetail = ({
  workerMap,
  workerLoading,
  userRole,
  fetchWorker,
  clearWorkerMap,
  clearLoadingMap,
  clearWorkerActivityList,
  clearWorkerObservationList,
  navigate,
}: IWorkerDetailProps) => {
  const { id, step } = useParams<{ id: string; step: string }>();
  const workerId = useMemo(() => (isUUID(id) ? id : null), [id]);
  const classes = useStyles();
  const listClasses = listGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const { timeZoneOffset } = useTimeZone();
  const currentTab = useMemo(() => (step ? step : 'projects'), [step]);
  const currentWorker = useMemo(() => (workerMap[workerId] ? workerMap[workerId] : WorkerModel.getFallbackWorker()), [workerMap, workerId]);
  const isFCAdmin = useMemo(() => userRole === UserModel.Role.FCA_ADMIN, [userRole]);
  const isWorkerLoaded = useMemo(() => !!(currentWorker.id !== null && workerLoading && !workerLoading.isLoading && !workerLoading.hasError), [
    currentWorker,
    workerLoading,
  ]);
  const [queryParams, setQueryParams] = useQueryParamState<GeneralModel.IQueryParams>({
    page: 1,
    limit: 15,
    tab: '',
    timeZoneOffset,
  });

  const onPageChange = useCallback(/* istanbul ignore next */ (newPage: number) => setQueryParams({ ...queryParams, page: newPage }), [
    setQueryParams,
    queryParams,
  ]);

  const onFilterProjectChange = useCallback(
    /* istanbul ignore next */

    (projectId: string) => {
      setQueryParams({ ...queryParams, projectId, page: 1 });
    },
    [setQueryParams, queryParams]
  );

  const onFilterPeriodChange = useCallback(
    /* istanbul ignore next */

    (period: number) => {
      setQueryParams({ ...queryParams, period: period, page: 1 });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (!workerMap[workerId]) fetchWorker(workerId);
  }, [workerMap[workerId], fetchWorker]); // eslint-disable-line

  useEffect(() => {
    if (!isEmpty(currentWorker.id)) {
      clearWorkerActivityList();
      clearWorkerObservationList();
    }
  }, [currentWorker.id, clearWorkerActivityList, clearWorkerObservationList]);

  useEffect(() => {
    return function unMount() {
      clearWorkerMap();
      clearLoadingMap();
    };
  }, [clearWorkerMap, clearLoadingMap]);

  const handleEditReview = useCallback(() => {
    navigate(`/workers/wizard/${currentWorker.id}`);
  }, [currentWorker, navigate]);

  return (
    <Container id="worker-detail">
      {currentWorker.invitationStatus === WorkerModel.WorkerStatus.MIGRATED && (
        <Banner
          testId="migrated-worker-banner"
          onButtonClick={handleEditReview}
          buttonLabel="Review Worker Information"
          icon={
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={<WorkerInviteStatusIcon invitationStatus={4} />}
            >
              <Avatar>
                <AvatarImage url={''} />
              </Avatar>
            </Badge>
          }
          title="This is a migrated worker"
          subTitle="Complete the missing information if necessary, and invite the Worker to be part of the platform."
        />
      )}
      <div className="worker-detail-header">
        <Typography className={classes.breadcrumb} color="primary" align="left">
          <Link to="/workers">Workers</Link> {'>'} Worker Detail
        </Typography>
        <div className={classes.titleSkeleton}>
          <Typography className={listClasses.title} color="primary" align="left" component="h1" variant="h5">
            {currentWorker.firstName} {currentWorker.lastName}
          </Typography>
        </div>
      </div>
      <div className={classes.workerSummary}>
        <WorkerBadge worker={currentWorker} />
        <CardSummary model={currentWorker} />
      </div>
      <div className={tableGlobalClasses.filterContainer}>
        <div className={tableGlobalClasses.statusFilter}>
          {WorkerModel.tabList.map(optFilter => (
            <Link tabIndex={-1} key={optFilter.id} to={`/workers/detail/${workerId}/${optFilter.key}`} data-testid="filter-status-opt">
              <Button className={optFilter.key === currentTab ? tableGlobalClasses.activeFilter : ''}>{optFilter.title}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div className={tableGlobalClasses.tableWrapper}>
        {!isWorkerLoaded && 'Loading...'}
        {isWorkerLoaded && currentTab === WorkerModel.WorkerDetailsTabs.PROJECTS && (
          <ProjectsTab worker={currentWorker} queryParams={queryParams} onPageChange={onPageChange} />
        )}
        {isWorkerLoaded && currentTab === WorkerModel.WorkerDetailsTabs.ACTIVITY && (
          <WorkerActivityTab
            worker={currentWorker}
            queryParams={queryParams}
            onPageChange={onPageChange}
            onFilterPeriodChange={onFilterPeriodChange}
            onFilterProjectChange={onFilterProjectChange}
          />
        )}
        {isWorkerLoaded && currentTab === WorkerModel.WorkerDetailsTabs.CERTIFICATIONS && (
          <CertificationTab worker={currentWorker} queryParams={queryParams} onPageChange={onPageChange} setQueryParams={setQueryParams} />
        )}
        {isWorkerLoaded && currentTab === WorkerModel.WorkerDetailsTabs.TRAINIGS && (
          <TrainingTab worker={currentWorker} queryParams={queryParams} onPageChange={onPageChange} onFilterProjectChange={onFilterProjectChange} />
        )}
        {isWorkerLoaded && currentTab === WorkerModel.WorkerDetailsTabs.OBSERVATIONS && (
          <ObservationsTab
            worker={currentWorker}
            queryParams={queryParams}
            onPageChange={onPageChange}
            onFilterPeriodChange={onFilterPeriodChange}
            onFilterProjectChange={onFilterProjectChange}
          />
        )}
        {isWorkerLoaded && currentTab === WorkerModel.WorkerDetailsTabs.INFORMATION && (
          <Review model={currentWorker} edit={true} isFCAdmin={isFCAdmin} onPageChange={navigate} />
        )}
      </div>
    </Container>
  );
};

export default memo(WorkerDetail);
