import React, { memo } from 'react';

import AccessControlSystemSummary from '../../../../shared/AccessControlSystemSummary/AccessControlSystemSummary';
import DeviceDrawer from '../DeviceDrawer';

import { GeneralModel, AccessControlSystemModel } from '../../../../../models';

export interface IDeviceDrawerProps {
  device: AccessControlSystemModel.IAccessControlSystem;
  deviceListElement: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  deleteLoading: GeneralModel.ILoadingStatus;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const AccessControlSystemDrawer = ({ isOpen, isLoading, deleteLoading, deviceListElement, device, onClose, onDelete }: IDeviceDrawerProps) => {
  return (
    <>
      <DeviceDrawer
        title="Device Information"
        dataTestId="acs-drawer-detail"
        deviceKey="access-control-system"
        nameField="serialNumber"
        deleteBtnTestId="deleteAcsBtn"
        deviceListElement={deviceListElement}
        device={device}
        isOpen={isOpen}
        deleteLoading={deleteLoading}
        isLoading={isLoading}
        type="ACS"
        onDelete={onDelete}
        onClose={onClose}
        renderSummary={() => <AccessControlSystemSummary device={device} deviceListElement={deviceListElement} />}
      />
    </>
  );
};

export default memo(AccessControlSystemDrawer);
