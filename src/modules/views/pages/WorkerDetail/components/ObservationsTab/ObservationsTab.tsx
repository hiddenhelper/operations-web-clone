import React, { useEffect, memo, useMemo, useState, useCallback } from 'react';
import {
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Divider,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  withStyles,
} from '@material-ui/core';

import EmptyList from 'modules/views/shared/EmptyList';
import Pagination from 'modules/views/shared/Pagination';
import SelectFilter from 'modules/views/shared/SelectFilter';
import FileRow from 'modules/views/shared/FormHandler/FileUpload/FileRow';
import TableCellLink from 'modules/views/shared/TableCellLink';
import Modal from 'modules/views/shared/Modal';
import WorkerProjectFilter from '../WorkerProjectFilter';

import { WorkerModel, ProjectModel, GeneralModel, FileModel } from 'modules/models';
import { WorkersIcon } from 'constants/index';
import { getDefaultValue, getFormattedDate } from 'utils';
import { listTableRowStyles, tableGlobalStyles } from 'assets/styles';
import { useStyles as modalStyles } from '../../../../shared/Modal/style';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';

export interface IObservationsTabProps {
  worker: WorkerModel.IWorker;
  workerObservationList: WorkerModel.IWorkerObservation[];
  projectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IWorkerProject>>;
  queryParams: GeneralModel.IQueryParams;
  workerObservationCount: number;
  observationDetail: WorkerModel.IWorkerObservation;
  detailLoading: GeneralModel.ILoadingStatus;
  fetchWorkerObservations: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchObservationDetail: (workerId: string, id: string) => void;
  onPageChange: (page: number) => void;
  onFilterPeriodChange: (period: number) => void;
  onFilterProjectChange: (projectId: string) => void;
}
const StyledTableRow = withStyles(listTableRowStyles)(TableRow);

const ObservationsTab = ({
  worker,
  queryParams,
  workerObservationList,
  projectMap,
  workerObservationCount,
  observationDetail,
  detailLoading,
  fetchWorkerProjectList,
  fetchWorkerObservations,
  fetchObservationDetail,
  onPageChange,
  onFilterPeriodChange,
  onFilterProjectChange,
}: IObservationsTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();
  const pageCount = useMemo(() => Math.ceil(workerObservationCount / queryParams.limit), [workerObservationCount, queryParams.limit]);
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: null });

  const handleCloseModal = useCallback(() => {
    setDetailModal({ isOpen: false, id: null });
  }, [setDetailModal]);

  const handleSelectObservation = useCallback(
    (id: string) => {
      setDetailModal({ isOpen: true, id });
    },
    [setDetailModal]
  );

  useEffect(() => {
    fetchWorkerObservations(worker?.id, queryParams);
  }, [worker, queryParams, fetchWorkerObservations]);

  useEffect(() => {
    if (detailModal.id) fetchObservationDetail(worker?.id, detailModal.id);
  }, [detailModal.id, fetchObservationDetail, worker]);

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
      {!workerObservationList.length && <EmptyList icon={<WorkersIcon />} text="There are no Observations" />}
      {!!workerObservationList.length && (
        <>
          <Table aria-label="project-list">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Standard Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workerObservationList.map((observation, index) => (
                <StyledTableRow data-testid="observation-list-row" key={index}>
                  <TableCell
                    data-testid="observation-row-type"
                    className={tableGlobalClasses.buttonCell}
                    onClick={() => handleSelectObservation(observation.id)}
                  >
                    {observation.type?.name}
                  </TableCell>
                  <TableCell>{getFormattedDate(observation.date, GeneralModel.DateFormat.DATE_TIME)}</TableCell>
                  <TableCell>
                    {observation?.project?.id ? (
                      <TableCellLink href={`/projects/detail/${observation.project.id}`} text={observation.project.name} title="View Project detail" />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{observation.standardDescription?.name}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination data-testid="pagination" page={queryParams.page} count={pageCount} onChange={onPageChange} />
        </>
      )}
      <Modal
        show={detailModal.isOpen}
        onClose={handleCloseModal}
        styleClass={`${modalClasses.dialogContainer} ${modalClasses.detailModal}`}
        render={() =>
          detailLoading && detailLoading.isLoading ? (
            'Loading...'
          ) : (
            <>
              <DialogTitle data-testid="alert-dialog" id="alert-dialog-title">
                Worker Observation
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1">{`${getFormattedDate(observationDetail?.date, GeneralModel.DateFormat.DATE)}. ${
                  observationDetail?.company?.name
                }. ${observationDetail?.project?.name}`}</Typography>
                <Typography variant="h6" className={modalClasses.modalSubtitle}>{`Reported by: ${getDefaultValue(observationDetail?.owner?.name)}`}</Typography>
                <Typography variant="h6" className={modalClasses.modalSubtitle}>
                  {`${observationDetail?.type?.name}: ${observationDetail?.standardDescription?.name}`}
                </Typography>
                <Typography variant="body1" className={modalClasses.modalDescription}>
                  {getDefaultValue(observationDetail?.comments, '')}
                </Typography>
                {observationDetail?.files.length > 0 && (
                  <div className={modalClasses.fileListWrapper}>
                    {observationDetail?.files.map((file, index) => (
                      <div key={index} style={{ marginBottom: '5px' }}>
                        <FileRow
                          file={FileModel.getFallbackFile({ name: file.displayName, size: file.fileSize, url: file.url })}
                          showProgress={false}
                          showDelete={false}
                          showInModal={true}
                          allowDownload={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  className={`${buttonClasses.closeButtonWidth} ${buttonClasses.saveButton}`}
                  color="primary"
                  variant="contained"
                  autoFocus={true}
                  onClick={handleCloseModal}
                  data-testid="detail-modal-close-btn"
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )
        }
      />
    </>
  );
};

export default memo(ObservationsTab);
