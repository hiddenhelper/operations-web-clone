import { hasValidPermissions } from 'modules/models/user';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { BadgeModel, GeneralModel, ProjectModel, UserModel } from '../../../../../../../models';

import BadgeSummaryModal from '../../../../../../shared/ResourceManagement/BadgeSummaryModal';

export interface IProjectBadgeSummaryModalProps {
  badgeMap: GeneralModel.IEntityMap<BadgeModel.IBadge>;
  projectWorker: ProjectModel.IWorkerProject;
  badgeLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  updateBadgeDataLoading: GeneralModel.ILoadingStatus;
  printLoading: GeneralModel.ILoadingStatus;
  currentUserPermissions: UserModel.IPermission[];
  clearUpdateLoading: () => void;
  clearUpdateBadgeLoading: () => void;
  closeModal: () => void;
  clearBadge: () => void;
  fetchBadge: (id: string) => void;
  activateBadge: (id: string, tagId: string) => void;
  deactivateBadge: (id: string, reason: string) => void;
  revokeBadge: (id: string, reason: string) => void;
  updateBadge: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => void;
  printWorkerBadge: (badgeId: string) => void;
}

interface IModalState {
  open: boolean;
  status: BadgeModel.BadgeStatus;
  currentBadgeForm: BadgeModel.IBadgeUpdateRequest;
  callback: (id: string, reason?: string) => void;
}

const ProjectBadgeModal = ({
  projectWorker,
  badgeMap,
  badgeLoading,
  updateLoading,
  updateBadgeDataLoading,
  printLoading,
  currentUserPermissions,
  updateBadge,
  clearUpdateLoading,
  clearUpdateBadgeLoading,
  closeModal,
  fetchBadge,
  activateBadge,
  deactivateBadge,
  revokeBadge,
  clearBadge,
  printWorkerBadge,
}: IProjectBadgeSummaryModalProps) => {
  const [modal, setModal] = useState<IModalState>({ open: false, status: projectWorker.badgeStatus, callback: null, currentBadgeForm: null });

  const currentBadge = useMemo(
    () => (Object.values(badgeMap).length && badgeMap[projectWorker?.badgeId] ? badgeMap[projectWorker?.badgeId] : BadgeModel.getFallbackBadge()),
    [badgeMap, projectWorker]
  );
  const badgeModalContent = useMemo(() => BadgeModel.modalStatusMap[modal.status](projectWorker?.project?.name), [modal.status, projectWorker]);

  const onResetModal = useCallback(() => setModal(prevModal => ({ ...prevModal, currentBadgeForm: null })), []);

  const openConfirmationModal = useCallback(
    (status: BadgeModel.BadgeStatus, callback: (id: string, reason?: string) => void) =>
      setModal(prevModal => ({ ...prevModal, open: true, status, callback })),
    [setModal]
  );
  const closeConfirmationModal = useCallback(() => {
    setModal(prevState => ({ ...prevState, open: false }));
  }, [setModal]);

  const onActivate = useCallback(() => {
    openConfirmationModal(BadgeModel.BadgeStatus.ACTIVE, activateBadge);
  }, [openConfirmationModal, activateBadge]);

  const onDeactivate = useCallback(() => {
    openConfirmationModal(BadgeModel.BadgeStatus.DEACTIVATE, deactivateBadge);
  }, [openConfirmationModal, deactivateBadge]);

  const onRevoke = useCallback(() => {
    openConfirmationModal(BadgeModel.BadgeStatus.REVOKED, revokeBadge);
  }, [openConfirmationModal, revokeBadge]);

  const onModalConfirm = useCallback(
    (data: string, currentBadgeForm: any) => {
      modal.callback(currentBadge.id, data);
      setModal(prevModal => ({ ...prevModal, currentBadgeForm }));
    },
    [modal, currentBadge, setModal]
  );

  const isReactivateAllowed = useMemo(
    () =>
      projectWorker.badgeStatus !== BadgeModel.BadgeStatus.REVOKED &&
      hasValidPermissions(`${UserModel.BadgesPermission.ACTIVATE} AND ${UserModel.BadgesPermission.VIEWACCESS}`, currentUserPermissions),
    [projectWorker.badgeStatus, currentUserPermissions]
  );
  const isDeactivateAllowed = useMemo(
    () =>
      projectWorker.badgeStatus !== BadgeModel.BadgeStatus.REVOKED &&
      projectWorker.badgeStatus !== BadgeModel.BadgeStatus.EXPIRED &&
      hasValidPermissions(`${UserModel.BadgesPermission.DEACTIVATE} AND ${UserModel.BadgesPermission.VIEWACCESS}`, currentUserPermissions),
    [projectWorker.badgeStatus, currentUserPermissions]
  );
  const isRevokeAllowed = useMemo(
    () =>
      projectWorker.badgeStatus !== BadgeModel.BadgeStatus.EXPIRED &&
      hasValidPermissions(`${UserModel.BadgesPermission.REVOKE} AND ${UserModel.BadgesPermission.VIEWACCESS}`, currentUserPermissions),
    [projectWorker.badgeStatus, currentUserPermissions]
  );

  const badgeStatusOptionList = useMemo(
    () =>
      [
        isReactivateAllowed && { key: BadgeModel.BadgeStatus.ACTIVE, title: 'Activate', callback: onActivate },
        isDeactivateAllowed && { key: BadgeModel.BadgeStatus.DEACTIVATE, title: 'Deactivate', callback: onDeactivate },
        isRevokeAllowed && { key: BadgeModel.BadgeStatus.REVOKED, title: 'Revoke', callback: onRevoke },
      ]
        .filter(Boolean)
        .filter(item => item.key !== projectWorker.badgeStatus),
    [projectWorker.badgeStatus, onActivate, onDeactivate, onRevoke, isReactivateAllowed, isDeactivateAllowed, isRevokeAllowed]
  );

  const isBadgePending = useMemo(() => projectWorker.workerProjectStatus === ProjectModel.WorkerProjectStatus.PENDING, [projectWorker]);

  const isDeactivated = useMemo(
    () => projectWorker.workerProjectStatus === ProjectModel.WorkerProjectStatus.ACCEPTED && projectWorker.badgeStatus === BadgeModel.BadgeStatus.DEACTIVATE,
    [projectWorker]
  );

  const handlePrint = useCallback(() => {
    printWorkerBadge(projectWorker.badgeId);
  }, [printWorkerBadge, projectWorker.badgeId]);

  useEffect(() => {
    /* istanbul ignore else */
    if (hasValidPermissions(UserModel.BadgesPermission.VIEWACCESS, currentUserPermissions)) fetchBadge(projectWorker.badgeId);
  }, [projectWorker, fetchBadge, currentUserPermissions]);
  return (
    <BadgeSummaryModal
      title={`Project Badge (${projectWorker.project.name})`}
      modal={modal}
      currentBadge={currentBadge}
      currentBadgeForm={modal.currentBadgeForm}
      badgeLoading={badgeLoading}
      updateLoading={updateLoading}
      updateBadgeDataLoading={updateBadgeDataLoading}
      printLoading={printLoading}
      badgeStatusOptionList={badgeStatusOptionList}
      badgeModalContent={badgeModalContent}
      isDeactivated={isDeactivated}
      isBadgePending={isBadgePending}
      isVisitor={false}
      isReactivateAllowed={isReactivateAllowed}
      onModalConfirm={onModalConfirm}
      onResetModal={onResetModal}
      onModalClose={closeConfirmationModal}
      closeModal={closeModal}
      clearUpdateLoading={clearUpdateLoading}
      clearUpdateBadgeLoading={clearUpdateBadgeLoading}
      clearBadge={clearBadge}
      updateBadge={updateBadge}
      onPrint={handlePrint}
    />
  );
};

export default memo(ProjectBadgeModal);
