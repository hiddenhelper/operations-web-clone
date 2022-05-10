import React, { memo, useState, useMemo, useCallback, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import Pagination from '../../../../shared/Pagination';
import EmptyList from '../../../../shared/EmptyList';
import Modal from '../../../../shared/Modal';
import Confirm from '../../../../shared/Modal/components/Confirm';
import BadgePrintingSystemModal from './components/BadgePrintingControlSystemModal';
import BadgePrintingSystemDrawer from './components/BadgePrintingSystemTabDrawer';
import BadgePrintingSystemRow from './BadgePrintingSystemRow';
import RoleGuard from '../../../../shared/RoleGuard';

import { GeneralModel, BadgePrintingSystemModel, ProjectModel, UserModel } from '../../../../../models';
import { InventoryIcon } from '../../../../../../constants';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useStyles as modalStyles } from '../../../../shared/Modal/style';
import { useStyles } from '../../styles';

export interface IBadgePrintingSystemTabProps {
  queryParams: GeneralModel.IQueryParams;
  currentProject: ProjectModel.IProject;
  badgePrintingSystemMap: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  modalMap: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  badgePrintingSystemCount: number;
  badgePrintingSystemSummaryLoading: GeneralModel.ILoadingStatus;
  loadBadgePrintingSystemModalLoading: GeneralModel.ILoadingStatus;
  unassignBadgePrintingSystemLoading: GeneralModel.ILoadingStatus;
  assignBadgePrintingSystemLoading: GeneralModel.ILoadingStatus;
  badgePrintingSystemProjectLoading: GeneralModel.ILoadingStatus;
  badgePrintingSystemLoading: GeneralModel.ILoadingStatus;
  modalCount: number;
  projectListElement: React.ReactNode;
  isModalOpen: boolean;
  ctaDisabled: boolean;
  drawer: { open: boolean; id: string };
  onPageChange: (page: number) => void;
  openModal: () => void;
  closeModal: () => void;
  fetchBadgePrintingSystemList: (query: GeneralModel.IQueryParams) => void;
  fetchBadgePrintingSystemSummary: (bpsId: string) => void;
  assignBadgePrintingSystem: (id: string, list: BadgePrintingSystemModel.IBadgePrintingSystemUpdateDate[]) => void;
  updateBadgePrintingSystemDate: (projectId: string, bpsId: string, shippingDate: string) => void;
  unAssignBadgePrintingSystem: (projectId: string, bpsId: string) => void;
  setDrawer: ({ open: boolean, id: string }) => void;
  fetchProjectBadgePrintingSystemList: (id: string, pageNumber: number, pageSize: number) => void;
}

const BadgePrintingSystemTab = ({
  queryParams,
  currentProject,
  badgePrintingSystemCount,
  badgePrintingSystemMap,
  projectListElement,
  modalCount,
  modalMap,
  isModalOpen,
  ctaDisabled,
  drawer,
  badgePrintingSystemSummaryLoading,
  loadBadgePrintingSystemModalLoading,
  unassignBadgePrintingSystemLoading,
  badgePrintingSystemProjectLoading,
  assignBadgePrintingSystemLoading,
  badgePrintingSystemLoading,
  assignBadgePrintingSystem,
  openModal,
  closeModal,
  fetchBadgePrintingSystemList,
  fetchBadgePrintingSystemSummary,
  updateBadgePrintingSystemDate,
  unAssignBadgePrintingSystem,
  fetchProjectBadgePrintingSystemList,
  onPageChange,
  setDrawer,
}: IBadgePrintingSystemTabProps) => {
  const modalClasses = modalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const classes = useStyles();

  const projectListHeight = (projectListElement as any)?.offsetHeight;
  const [unAssignModal, setUnAssignModal] = useState({ open: false, id: null, name: null });

  const count = useMemo(() => Math.ceil(badgePrintingSystemCount / queryParams.limit), [badgePrintingSystemCount, queryParams.limit]);
  const list = useMemo(() => (currentProject.bpsIdList ? currentProject.bpsIdList.map(bpsId => badgePrintingSystemMap[bpsId]).filter(Boolean) : []), [
    badgePrintingSystemMap,
    currentProject,
  ]);

  const onOpenDrawer = useCallback(
    (bpsId: string) => {
      fetchBadgePrintingSystemSummary(bpsId);
      setDrawer({ open: true, id: bpsId });
    },
    [setDrawer, fetchBadgePrintingSystemSummary]
  );
  const onCloseDrawer = useCallback(/* istanbul ignore next */ () => setDrawer({ open: false, id: null }), [setDrawer]);

  const onCloseUnAssignModal = useCallback(() => {
    setUnAssignModal(prevState => ({ ...prevState, open: false, id: null }));
  }, [setUnAssignModal]);

  const onUnAssign = useCallback(
    (id: string) => {
      setUnAssignModal({ open: true, id, name: badgePrintingSystemMap[id].name });
    },
    [badgePrintingSystemMap, setUnAssignModal]
  );

  const onUnAssignConfirm = useCallback(() => unAssignBadgePrintingSystem(currentProject.id, unAssignModal.id), [
    currentProject.id,
    unAssignModal.id,
    unAssignBadgePrintingSystem,
  ]);

  useEffect(() => {
    /* istanbul ignore else */
    if (unassignBadgePrintingSystemLoading && !unassignBadgePrintingSystemLoading.isLoading) {
      onCloseUnAssignModal();
      onCloseDrawer();
    }
  }, [unassignBadgePrintingSystemLoading, onCloseUnAssignModal, onCloseDrawer]);

  useEffect(() => {
    /* istanbul ignore else */
    if (assignBadgePrintingSystemLoading && !assignBadgePrintingSystemLoading.isLoading) {
      closeModal();
      fetchProjectBadgePrintingSystemList(currentProject.id, queryParams.page, queryParams.limit);
    }
  }, [assignBadgePrintingSystemLoading, currentProject.id, queryParams, closeModal, fetchProjectBadgePrintingSystemList]);

  useEffect(() => {
    fetchProjectBadgePrintingSystemList(currentProject.id, queryParams.page, queryParams.limit);
  }, [currentProject.id, queryParams, fetchProjectBadgePrintingSystemList]);

  useEffect(() => {
    return function unMount() {
      onCloseDrawer();
    };
  }, [onCloseDrawer]);

  if (badgePrintingSystemLoading && badgePrintingSystemLoading.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding} ${classes.buttonWithoutFilter}`}>
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
            <Button
              className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonExtraLarge}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              size="large"
              data-testid="open-bps-modal-btn"
              onClick={openModal}
              disabled={ctaDisabled}
            >
              Assign BPS
            </Button>
          </RoleGuard>
        </div>
        {badgePrintingSystemProjectLoading && !badgePrintingSystemProjectLoading.isLoading && list.length === 0 ? (
          <EmptyList icon={<InventoryIcon />} text="There are no BPS assigned" />
        ) : (
          <>
            <Table aria-label="client-list">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Laptop Serial Number</TableCell>
                  <TableCell>Printer Serial Number</TableCell>
                  <TableCell>Scanner Serial Number</TableCell>
                  <TableCell>Shipping Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(bps => (
                  <BadgePrintingSystemRow key={bps.id} badgePrinterSystem={bps} openDrawer={onOpenDrawer} />
                ))}
              </TableBody>
            </Table>
            <Pagination page={queryParams.page} count={count} onChange={onPageChange} />
          </>
        )}
        <BadgePrintingSystemDrawer
          isOpen={drawer?.open}
          projectId={currentProject.id}
          badgePrintingSystem={badgePrintingSystemMap[drawer?.id] || ({} as any)}
          isLoading={badgePrintingSystemSummaryLoading}
          unAssign={onUnAssign}
          onCloseDrawer={onCloseDrawer}
          updateBadgePrintingSystemDate={updateBadgePrintingSystemDate}
          height={projectListHeight}
        />
        {isModalOpen && (
          <BadgePrintingSystemModal
            id={currentProject.id}
            count={modalCount}
            loading={loadBadgePrintingSystemModalLoading}
            assignLoading={assignBadgePrintingSystemLoading}
            badgePrintingSystemMap={modalMap}
            fetchBadgePrintingSystemList={fetchBadgePrintingSystemList}
            assignBadgePrintingSystem={assignBadgePrintingSystem}
            closeModal={closeModal}
          />
        )}
      </div>
      <Modal
        show={unAssignModal.open}
        styleClass={`${modalClasses.dialogContainer} ${unAssignModal.open ? 'open' : 'closed'}`}
        onClose={onCloseUnAssignModal}
        render={() => (
          <Confirm
            title={`Unassign ${unAssignModal.name}?`}
            content={<>If you do it, the device will be removed from {currentProject.name}.</>}
            closeLabel="Close"
            confirmLabel="Yes, Unassign"
            onClose={onCloseUnAssignModal}
            onConfirm={onUnAssignConfirm}
          />
        )}
      />
    </>
  );
};

export default memo(BadgePrintingSystemTab);
