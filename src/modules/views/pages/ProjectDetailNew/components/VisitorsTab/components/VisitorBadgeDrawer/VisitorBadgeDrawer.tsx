import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import ControlledButton from '../../../../../../shared/FormHandler/ControlledButton';
import BadgeSynchronizingLabel from '../../../../../../shared/BadgeSynchronizingLabel';
import Drawer from '../../../../../../shared/ResourceManagement/Drawer';
import Modal from '../../../../../../shared/Modal';
import Confirm from '../../../../../../shared/Modal/components/Confirm';

import { BadgeModel, GeneralModel, UserModel } from '../../../../../../../models';
import { NotesIcon, CalendarIcon, EBadgeIcon, BadgeVip } from '../../../../../../../../constants';
import { getDefaultValue, getFormattedDate, formatBadgeCode, getConditionalDefaultValue } from '../../../../../../../../utils/generalUtils';
import { useStyles as modalStyles } from '../../../../../../shared/Modal/style';
import { useStyles as buttonStyles } from '../../../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles as drawerStyles } from '../../../../../../shared/ResourceManagement/Drawer/styles';
import { listGlobalStyles } from '../../../../../../../../assets/styles';
import { drawerBadgeStyles } from '../../../../styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IVisitorBadgeDrawerProps {
  badgeVisitor: BadgeModel.IBadgeVisitor;
  height: number;
  isOpen: boolean;
  isLoading: boolean;
  updateLoading: GeneralModel.ILoadingStatus;
  onOpenAssign?: (id: string) => void;
  onUnassign?: (id: string) => void;
  onClose: () => void;
}

const VisitorBadgeDrawer = ({ isOpen, isLoading, updateLoading, badgeVisitor, height, onClose, onOpenAssign, onUnassign }: IVisitorBadgeDrawerProps) => {
  const drawerBadgeClasses = drawerBadgeStyles();
  const drawerClasses = drawerStyles();
  const listClasses = listGlobalStyles();
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();
  const [unassignModal, setUnassignModal] = useState(false);
  const onUnassignHandler = useCallback(() => {
    setUnassignModal(true);
  }, []);
  const isPending = useMemo(() => badgeVisitor.availability === BadgeModel.VisitorAvailability.PENDING, [badgeVisitor]);

  const closeModal = useCallback(/* istanbul ignore next */ () => setUnassignModal(false), [setUnassignModal]);

  const handleUnassignConfirm = useCallback(() => {
    onUnassign(badgeVisitor.id);
  }, [onUnassign, badgeVisitor.id]);

  const onOpenAssignHandler = useCallback(() => {
    onOpenAssign(badgeVisitor.id);
  }, [onOpenAssign, badgeVisitor.id]);

  useEffect(() => {
    if (updateLoading && !updateLoading.isLoading && !updateLoading.hasError) {
      setUnassignModal(false);
      onClose();
    }
  }, [updateLoading, onClose, setUnassignModal]);
  return (
    <>
      <Drawer
        title="Badge Information"
        dataTestId="badge-drawer-detail"
        height={height}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        render={() => (
          <div className={listClasses.listDetail}>
            <div className={listClasses.company}>
              <div className={drawerClasses.drawerText}>
                <Typography className={`${listClasses.listAccent} ${listClasses.entityTitle}`}>Badge ID</Typography>
                <div className={drawerClasses.drawerMainText}>
                  <span>#{badgeVisitor.number}</span>
                </div>
              </div>

              <div className={drawerClasses.drawerSection}>
                {badgeVisitor.visitorType === BadgeModel.VisitorType.REGULAR && <EBadgeIcon />}
                {badgeVisitor.visitorType === BadgeModel.VisitorType.VIP && (
                  <span className={drawerBadgeClasses.badgeVip}>
                    <BadgeVip />
                  </span>
                )}
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span className={listClasses.listAccent}>Badge Code</span>
                  <span>{badgeVisitor?.code ? formatBadgeCode(badgeVisitor?.code) : '-'}</span>
                </div>
              </div>

              {badgeVisitor.availability === BadgeModel.VisitorAvailability.ASSIGNED && (
                <>
                  <div className={drawerClasses.drawerSection}>
                    <PersonIcon />
                    <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                      <span className={listClasses.listAccent}>
                        {badgeVisitor.firstName} {badgeVisitor.lastName} ({BadgeModel.visitorTypeMap[badgeVisitor.visitorType]})
                      </span>
                      <span>
                        {getDefaultValue(badgeVisitor.entityName, '')}
                        {getDefaultValue(badgeVisitor?.company?.name, '')}
                      </span>
                    </div>
                  </div>
                  <div className={drawerClasses.drawerSection}>
                    <CalendarIcon />
                    <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                      <span className={listClasses.listAccent}>Badge Period</span>
                      <span>From {getDefaultValue(getFormattedDate(badgeVisitor.validFrom, GeneralModel.DateFormat.NUMERIC_DATE))}</span>
                      <span>To {getDefaultValue(getFormattedDate(badgeVisitor.validTo, GeneralModel.DateFormat.NUMERIC_DATE))}</span>
                    </div>
                  </div>
                  <div className={drawerClasses.drawerSection}>
                    <NotesIcon />
                    <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                      <span>{badgeVisitor.description}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Divider className={drawerClasses.drawerDivider} />
            <div className={listClasses.ctaWrapper}>
              {(badgeVisitor.availability === BadgeModel.VisitorAvailability.AVAILABLE || isPending) && (
                <PermissionGuard permissionsExpression={`${UserModel.VisitorsPermission.MANAGE} AND ${UserModel.BadgesPermission.MANAGE}`}>
                  <ControlledButton>
                    <Button
                      disableRipple={true}
                      className={`${buttonClasses.drawerCTA} ${getConditionalDefaultValue(
                        !isPending && !badgeVisitor.isSynchronizing,
                        buttonClasses.borderPrimaryButton,
                        ''
                      )} ${getConditionalDefaultValue(!isPending && !badgeVisitor.isSynchronizing, buttonClasses.primaryButtonPadding, '')}`}
                      variant="outlined"
                      disabled={isPending || badgeVisitor.isSynchronizing}
                      onClick={onOpenAssignHandler}
                      data-testid="assign-badgevisitor-btn"
                    >
                      Assign Badge
                    </Button>
                  </ControlledButton>
                </PermissionGuard>
              )}
              {badgeVisitor.availability === BadgeModel.VisitorAvailability.ASSIGNED && (
                <>
                  <PermissionGuard permissionsExpression={`${UserModel.VisitorsPermission.MANAGE} AND ${UserModel.BadgesPermission.MANAGE}`}>
                    <ControlledButton>
                      <Button
                        disableRipple={true}
                        className={`${buttonClasses.drawerCTA} ${getConditionalDefaultValue(
                          !badgeVisitor.isSynchronizing,
                          buttonClasses.borderPrimaryButton,
                          ''
                        )}`}
                        disabled={badgeVisitor.isSynchronizing}
                        variant="outlined"
                        data-testid="edit-badgevisitor-btn"
                        onClick={onOpenAssignHandler}
                      >
                        Edit visitor
                      </Button>
                    </ControlledButton>
                  </PermissionGuard>
                  <PermissionGuard permissionsExpression={`${UserModel.VisitorsPermission.MANAGE} AND ${UserModel.BadgesPermission.MANAGE}`}>
                    <ControlledButton>
                      <Button
                        disableRipple={true}
                        className={`${buttonClasses.drawerCTA} ${getConditionalDefaultValue(!badgeVisitor.isSynchronizing, buttonClasses.warningButton, '')}`}
                        disabled={badgeVisitor.isSynchronizing}
                        variant="outlined"
                        data-testid="unassign-badgevisitor-btn"
                        onClick={onUnassignHandler}
                      >
                        Unassign
                      </Button>
                    </ControlledButton>
                  </PermissionGuard>
                </>
              )}
            </div>
            {badgeVisitor.isSynchronizing && <BadgeSynchronizingLabel />}
          </div>
        )}
      />
      <Modal
        show={unassignModal}
        styleClass={modalClasses.dialogContainer}
        render={() => (
          <Confirm
            title={`Unassign ${badgeVisitor.firstName} ${badgeVisitor.lastName}?`}
            content={<span style={{ color: '#999999' }}>If you do it, Visitor will no longer be able to use the Badge in the Job Site.</span>}
            closeLabel="Cancel"
            confirmLabel="Yes, Unassign"
            confirmLoadingText="Unassigning..."
            isLoading={updateLoading && updateLoading.isLoading}
            onClose={closeModal}
            onConfirm={handleUnassignConfirm}
          />
        )}
      />
    </>
  );
};

export default memo(VisitorBadgeDrawer);
