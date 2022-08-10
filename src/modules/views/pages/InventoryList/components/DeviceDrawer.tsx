import React, { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Drawer from '../../../shared/ResourceManagement/Drawer/Drawer';
import Modal from '../../../shared/Modal/Modal';
import DeleteModal from '../../../shared/Modal/components/Delete/Delete';
import ControlledButton from '../../../shared/FormHandler/ControlledButton/ControlledButton';

import { useStyles } from '../styles';
import { useStyles as modalStyles } from '../../../shared/Modal/style';
import { useStyles as buttonStyles } from '../../../shared/FormHandler/ControlledButton/styles';
import { listGlobalStyles } from '../../../../../assets/styles';
import { DeviceModel, GeneralModel, UserModel } from '../../../../models';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IDeviceDrawerProps {
  title: string;
  device: DeviceModel.IDevice;
  deviceKey: string;
  nameField: string;
  isOpen: boolean;
  isLoading: boolean;
  deleteBtnTestId: string;
  deviceListElement: React.ReactNode;
  deleteLoading: GeneralModel.ILoadingStatus;
  dataTestId: string;
  type: string;
  onDelete: (id: string) => void;
  onClose: () => void;
  renderSummary: () => React.ReactNode;
}

const DeviceDrawer = ({
  title,
  nameField,
  deviceKey,
  deleteBtnTestId,
  isOpen,
  isLoading,
  device,
  deviceListElement,
  deleteLoading,
  dataTestId,
  type,
  onDelete,
  onClose,
  renderSummary,
}: IDeviceDrawerProps) => {
  const deviceListHeight = (deviceListElement as any)?.offsetHeight;
  const classes = useStyles({ deviceListHeight: deviceListHeight ?? '100%' });
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();
  const listClasses = listGlobalStyles();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const onDeleteOpen = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const closeModal = useCallback(/* istanbul ignore next */ () => setShowDeleteModal(false), [setShowDeleteModal]);

  const handleDeleteAccepted = useCallback(() => {
    onDelete(device.id);
  }, [onDelete, device.id]);

  useEffect(() => {
    /* istanbul ignore else */
    if (deleteLoading && !deleteLoading.isLoading) setShowDeleteModal(false);
  }, [deleteLoading, device.id]);

  return (
    <>
      <Drawer
        title={title}
        dataTestId={dataTestId}
        height={deviceListHeight}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        render={() => (
          <div className={listClasses.listDetail}>
            {renderSummary()}
            <Divider className={classes.drawerDivider} />
            <div className={listClasses.ctaWrapper}>
              <PermissionGuard
                permissionsExpression={type === 'ACS' ? UserModel.AccessControlSystemsPermission.MANAGE : UserModel.BadgePrintingSystemsPermission.MANAGE}
              >
                <>
                  <Link to={`/inventory/${deviceKey}/wizard/${device.id}`}>
                    <ControlledButton>
                      <Button disableRipple={true} className={`${buttonClasses.drawerCTA} ${buttonClasses.borderPrimaryButton}`} variant="outlined">
                        Edit
                      </Button>
                    </ControlledButton>
                  </Link>
                  {device.status === DeviceModel.DeviceStatus.AVAILABLE && (
                    <ControlledButton>
                      <Button
                        disableRipple={true}
                        className={`${buttonClasses.drawerCTA} ${buttonClasses.warningButton}`}
                        variant="outlined"
                        onClick={onDeleteOpen}
                        data-testid={deleteBtnTestId}
                      >
                        Delete
                      </Button>
                    </ControlledButton>
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
        render={() => <DeleteModal title={`Delete ${device[nameField]}?`} onCancel={closeModal} onConfirm={handleDeleteAccepted} />}
      />
    </>
  );
};

export default memo(DeviceDrawer);
