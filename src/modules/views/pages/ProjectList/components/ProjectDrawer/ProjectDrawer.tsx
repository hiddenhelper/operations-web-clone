import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Drawer from '../../../../shared/ResourceManagement/Drawer';
import ControlledButton from '../../../../shared/FormHandler/ControlledButton';
import Modal from '../../../../shared/Modal';
import DeleteModal from '../../../../shared/Modal/components/Delete';
import ProjectClient from './components/ProjectClient';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

import { GeneralModel, ProjectModel, ResourceModel, UserModel } from '../../../../../models';
import { MonetizationIcon } from '../../../../../../constants';
import { getDrawerButton, formatNumberWithCommas, getConditionalDefaultValue, getDefaultValue } from '../../../../../../utils/generalUtils';
import { getTotalPrice } from '../../../../../../utils/projectUtils';
import { useStyles as modalStyles } from '../../../../shared/Modal/style';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles as drawerStyles } from '../../../../shared/ResourceManagement/Drawer/styles';
import { listGlobalStyles } from '../../../../../../assets/styles';

export interface IProjectDrawerProps {
  project: ProjectModel.IProject;
  userRole?: UserModel.Role;
  projectListElement?: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  deleteLoading?: GeneralModel.ILoadingStatus;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

const ProjectDrawer = ({ isOpen, isLoading, deleteLoading, userRole, project, projectListElement, onClose, onDelete }: IProjectDrawerProps) => {
  const projectListHeight = (projectListElement as any)?.offsetHeight;
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();
  const drawerClasses = drawerStyles();
  const listClasses = listGlobalStyles();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onDeleteOpen = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const devList = useMemo(() => (project?.relatedCompanies || []).filter(company => company.role === ProjectModel.CompanyRole.DEVELOPER), [project]);
  const projectOwnerList = useMemo(
    () => (project?.relatedCompanies || []).filter(company => company.role === ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER),
    [project]
  );
  const gcList = useMemo(() => (project?.relatedCompanies || []).filter(company => company.role === ProjectModel.CompanyRole.GENERAL_CONTRACTOR), [project]);

  const { buttonText, linkTo } = useMemo(() => getDrawerButton(project.status, project.id, ResourceModel.Type.PROJECT), [project.status, project.id]);

  const totalPrice = useMemo(() => getTotalPrice(project.seatBillingModel?.estimatedWorkersNumber || 0, project.seatBillingModel?.seatPrice || 0), [
    project.seatBillingModel,
  ]);

  const closeModal = useCallback(/* istanbul ignore next */ () => setShowDeleteModal(false), [setShowDeleteModal]);

  const handleDeleteAccepted = useCallback(() => {
    onDelete(project.id);
  }, [onDelete, project.id]);

  useEffect(() => {
    if (deleteLoading && !deleteLoading.isLoading) {
      setShowDeleteModal(false);
    }
  }, [deleteLoading]);
  return (
    <>
      <Drawer
        title="Project Information"
        dataTestId="project-drawer-detail"
        height={projectListHeight}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        render={() => (
          <div className={listClasses.listDetail}>
            <div className={listClasses.company}>
              <div className={drawerClasses.drawerText}>
                <Typography className={`${listClasses.listAccent} ${listClasses.entityTitle}`}>{getDefaultValue(project?.name)}</Typography>
                <div className={drawerClasses.drawerMainText}>
                  <span>{getDefaultValue(project?.category?.name)}</span>
                  <span>{getConditionalDefaultValue(project.ccv, `$ ${formatNumberWithCommas(project.ccv)}`)}</span>
                  <span>{getDefaultValue(project?.region?.name)}</span>
                </div>
              </div>
              <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
                {projectOwnerList.length > 0 ? (
                  projectOwnerList.map(projectOwnerItem => <ProjectClient dataTestId="projectOwnerList" key={projectOwnerItem.id} client={projectOwnerItem} />)
                ) : (
                  <ProjectClient client={null} />
                )}
              </div>
              <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
                {devList.length > 0 ? (
                  devList.map(devItem => <ProjectClient dataTestId="devList" key={devItem.id} client={devItem} />)
                ) : (
                  <ProjectClient client={null} />
                )}
              </div>
              <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
                {gcList.length > 0 ? (
                  gcList.map(gcItem => <ProjectClient dataTestId="gcList" key={gcItem.id} client={gcItem} />)
                ) : (
                  <ProjectClient client={null} />
                )}
              </div>
              <div className={drawerClasses.drawerSection}>
                <div className={drawerClasses.drawerColumnDirection}>
                  {project.billingModelType === ProjectModel.BillingModelType.BADGES ? (
                    <div className={drawerClasses.drawerRowDirection}>
                      <MonetizationIcon />
                      <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                        <span className={listClasses.listAccent}>Badge Model</span>
                        <span>
                          {`Worker Badge Price $ ${getConditionalDefaultValue(
                            project?.badgeBillingModel?.badgePrice,
                            formatNumberWithCommas(project.badgeBillingModel?.badgePrice)
                          )}`}
                        </span>
                        <span>
                          {`Worker Badge Reprint Price $
                          ${getConditionalDefaultValue(
                            project?.badgeBillingModel?.reprintingCost,
                            formatNumberWithCommas(project?.badgeBillingModel?.reprintingCost)
                          )}`}
                        </span>
                        <span>
                          {`Visitor Badge Price $ ${getConditionalDefaultValue(
                            project?.badgeBillingModel?.visitorBadgePrice,
                            formatNumberWithCommas(project.badgeBillingModel?.visitorBadgePrice)
                          )}`}
                        </span>
                        <span>
                          {`Visitor Badge Reprint Price $
                          ${getConditionalDefaultValue(
                            project?.badgeBillingModel?.visitorReprintingCost,
                            formatNumberWithCommas(project?.badgeBillingModel?.visitorReprintingCost)
                          )}`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div data-testid="seats-billing-type" className={drawerClasses.drawerRowDirection}>
                      <MonetizationIcon />
                      <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                        <span className={listClasses.listAccent}>Seat Model</span>
                        <span>
                          {`Estimated Number of Seats
                          ${getConditionalDefaultValue(
                            project?.seatBillingModel?.estimatedWorkersNumber,
                            formatNumberWithCommas(project?.seatBillingModel?.estimatedWorkersNumber)
                          )}`}
                        </span>
                        <span>
                          {`Price Per Seat $
                          ${getConditionalDefaultValue(project?.seatBillingModel?.seatPrice, formatNumberWithCommas(project?.seatBillingModel?.seatPrice))}`}
                        </span>
                        <span>Total Price $ {getConditionalDefaultValue(totalPrice, formatNumberWithCommas(totalPrice))}</span>
                        <span>
                          {`Worker Badge Reprint Price $
                          ${getConditionalDefaultValue(
                            project?.seatBillingModel?.reprintingCost,
                            formatNumberWithCommas(project?.seatBillingModel?.reprintingCost)
                          )}`}
                        </span>
                        <span>
                          {`Visitor Badge Price $ ${getConditionalDefaultValue(
                            project?.seatBillingModel?.visitorBadgePrice,
                            formatNumberWithCommas(project.seatBillingModel?.visitorBadgePrice)
                          )}`}
                        </span>
                        <span>
                          {`Visitor Badge Reprint Price $
                          ${getConditionalDefaultValue(
                            project?.seatBillingModel?.visitorReprintingCost,
                            formatNumberWithCommas(project?.seatBillingModel?.visitorReprintingCost)
                          )}`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Divider className={drawerClasses.drawerDivider} />
            <div className={listClasses.ctaWrapper}>
              <PermissionGuard
                permissionsExpression={
                  project.status === ResourceModel.Status.ACTIVE ? UserModel.ProjectsPermission.VIEWACCESS : UserModel.DraftProjectsPermission.MANAGE
                }
              >
                <>
                  <ControlledButton>
                    <Button
                      disableRipple={true}
                      className={`${buttonClasses.drawerCTA} ${buttonClasses.borderPrimaryButton} ${buttonClasses.primaryButtonPadding}`}
                      variant="outlined"
                      href={linkTo}
                      data-testid="drawerProjectButton"
                    >
                      {buttonText}
                    </Button>
                  </ControlledButton>

                  {onDelete && userRole && (
                    <>
                      {project.status !== ResourceModel.Status.ACTIVE && project.status !== ResourceModel.Status.ARCHIVED && (
                        <ControlledButton>
                          <Button
                            disableRipple={true}
                            className={`${buttonClasses.drawerCTA} ${buttonClasses.warningButton}`}
                            variant="outlined"
                            onClick={onDeleteOpen}
                            data-testid="deleteProjectButton"
                          >
                            Delete
                          </Button>
                        </ControlledButton>
                      )}
                    </>
                  )}
                </>
              </PermissionGuard>
            </div>
          </div>
        )}
      />
      <Modal
        show={showDeleteModal}
        styleClass={`${modalClasses.dialogContainer} ${modalClasses.deleteModal}`}
        render={() => <DeleteModal title={`Delete ${project.name}?`} onCancel={closeModal} onConfirm={handleDeleteAccepted} />}
      />
    </>
  );
};

export default memo(ProjectDrawer);
