import React, { memo } from 'react';

import BadgePrintingSystemSummary from '../../../../shared/BadgePrintingSystemSummary';
import DeviceDrawer from '../DeviceDrawer';

import { GeneralModel, BadgePrintingSystemModel } from '../../../../../models';

export interface IBadgePrintingSystemDrawerProps {
  device: BadgePrintingSystemModel.IBadgePrintingSystem;
  deviceListElement: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  deleteLoading: GeneralModel.ILoadingStatus;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const BadgePrinterSystemDrawer = ({ isOpen, isLoading, deleteLoading, deviceListElement, device, onClose, onDelete }: IBadgePrintingSystemDrawerProps) => {
  return (
    <>
      <DeviceDrawer
        title="BPS Information"
        dataTestId="bps-drawer-detail"
        nameField="name"
        deviceKey="badge-printing-system"
        deleteBtnTestId="deleteBpsBtn"
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        device={device}
        deviceListElement={deviceListElement}
        deleteLoading={deleteLoading}
        type="BPS"
        onDelete={onDelete}
        renderSummary={() => <BadgePrintingSystemSummary device={device} deviceListElement={deviceListElement} />}
      />
    </>
  );
};

export default memo(BadgePrinterSystemDrawer);
