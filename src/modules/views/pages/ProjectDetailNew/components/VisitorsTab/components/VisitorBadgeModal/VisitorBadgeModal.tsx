import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { BadgeModel, GeneralModel, ProjectModel } from '../../../../../../../models';

import BadgeSummaryModal from '../../../../../../shared/ResourceManagement/BadgeSummaryModal';
import { getVisitorBadgeText, noop } from '../../../../../../../../utils/generalUtils';

export interface IVisitorBadgeModalProps {
  project: ProjectModel.IProject;
  badgeVisitor: BadgeModel.IBadgeVisitor;
  badgeMap: GeneralModel.IEntityMap<BadgeModel.IBadge>;
  badgeLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  updateBadgeDataLoading: GeneralModel.ILoadingStatus;
  clearUpdateLoading: () => void;
  closeModal: () => void;
  clearBadge: () => void;
  fetchBadge: (id: string) => void;
  revokeBadge: (id: string, reason: string) => void;
  printVisitorBadge: (id: string) => void;
  updateBadge: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => void;
  clearUpdateBadgeLoading: () => void;
}

const VisitorBadgeModal = ({
  project,
  badgeVisitor,
  badgeMap,
  badgeLoading,
  updateLoading,
  updateBadgeDataLoading,
  closeModal,
  fetchBadge,
  clearBadge,
  printVisitorBadge,
  updateBadge,
  clearUpdateLoading,
  clearUpdateBadgeLoading,
}: IVisitorBadgeModalProps) => {
  const modal = useMemo(() => ({ open: false, status: badgeVisitor.status, callback: null, currentBadgeForm: null }), [badgeVisitor.status]);
  const currentBadge = useMemo(
    () =>
      Object.values(badgeMap).length && badgeMap[badgeVisitor?.id]
        ? {
            ...badgeMap[badgeVisitor?.id],
            badgeTemplate: { ...badgeMap[badgeVisitor?.id].badgeTemplate, text: getVisitorBadgeText(badgeVisitor.number) },
          }
        : BadgeModel.getFallbackBadge(),
    [badgeMap, badgeVisitor]
  );

  const isBadgePending = useMemo(() => badgeVisitor.availability === BadgeModel.VisitorAvailability.PENDING, [badgeVisitor]);

  const isDeactivated = useMemo(() => badgeVisitor.availability === BadgeModel.VisitorAvailability.ASSIGNED, [badgeVisitor]);

  const handlePrint = useCallback(() => {
    printVisitorBadge(badgeVisitor.id);
  }, [printVisitorBadge, badgeVisitor.id]);

  useEffect(() => {
    /* istanbul ignore else */
    fetchBadge(badgeVisitor.id);
  }, [badgeVisitor, fetchBadge]);
  return (
    <BadgeSummaryModal
      title={`Visitor Badge (${project.name})`}
      modal={modal}
      currentBadge={currentBadge}
      currentBadgeForm={modal.currentBadgeForm}
      badgeLoading={badgeLoading}
      updateLoading={updateLoading}
      printLoading={undefined}
      badgeModalContent={null}
      isDeactivated={isDeactivated}
      isBadgePending={isBadgePending}
      isVisitor={true}
      onResetModal={noop}
      onModalClose={noop}
      closeModal={closeModal}
      clearUpdateLoading={clearUpdateLoading}
      clearBadge={clearBadge}
      updateBadge={updateBadge}
      updateBadgeDataLoading={updateBadgeDataLoading}
      clearUpdateBadgeLoading={clearUpdateBadgeLoading}
      onPrint={handlePrint}
    />
  );
};

export default memo(VisitorBadgeModal);
