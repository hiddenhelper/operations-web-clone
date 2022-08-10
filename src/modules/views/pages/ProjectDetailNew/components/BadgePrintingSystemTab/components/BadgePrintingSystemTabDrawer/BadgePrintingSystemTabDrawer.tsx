import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Modal from '../../../../../../shared/Modal';
import Confirm from '../../../../../../shared/Modal/components/Confirm';
import Drawer from '../../../../../../shared/ResourceManagement/Drawer';
import ControlledButton from '../../../../../../shared/FormHandler/ControlledButton';
import ControlledDatePicker from '../../../../../../shared/FormHandler/ControlledDatePicker';
import BadgePrintingSystemSummary from '../../../../../../shared/BadgePrintingSystemSummary';
import PermissionGuard from '../../../../../../shared/PermissionGuard';

import { GeneralModel, BadgePrintingSystemModel, UserModel } from '../../../../../../../models';
import { getDefaultValue } from '../../../../../../../../utils/generalUtils';
import { useStyles } from '../../../../styles';
import { listGlobalStyles } from '../../../../../../../../assets/styles';
import { useStyles as buttonStyles } from '../../../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles as datePickerStyles } from '../../../../../../shared/FormHandler/ControlledDatePicker/styles';

export interface IBadgePrintingSystemDrawerProps {
  projectId: string;
  badgePrintingSystem: BadgePrintingSystemModel.IBadgePrintingSystem;
  isLoading: GeneralModel.ILoadingStatus;
  isOpen: boolean;
  height: number;
  onCloseDrawer: () => void;
  unAssign: (id: string) => void;
  updateBadgePrintingSystemDate: (projectId: string, acsId: string, shippingDate: string) => void;
}

const BadgePrintingSystemTabDrawer = ({
  projectId,
  badgePrintingSystem,
  isLoading,
  isOpen,
  height,
  onCloseDrawer,
  unAssign,
  updateBadgePrintingSystemDate,
}: IBadgePrintingSystemDrawerProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const datePickerClasses = datePickerStyles();
  const listClasses = listGlobalStyles();
  const [isModalOpen, setModal] = useState<boolean>(false);
  const [date, setDate] = useState(null);
  const isSaveDisabled = useMemo(() => !date, [date]);

  const onChange = useCallback(event => setDate(event.target.value), [setDate]);

  const onUnAssign = useCallback(() => {
    unAssign(badgePrintingSystem.id);
  }, [unAssign, badgePrintingSystem]);

  const onUpdateDate = useCallback(() => {
    updateBadgePrintingSystemDate(projectId, badgePrintingSystem.id, date);
    setModal(false);
  }, [projectId, badgePrintingSystem.id, date, updateBadgePrintingSystemDate, setModal]);

  const onOpenEdition = useCallback(() => {
    setModal(true);
  }, []);

  const onCloseEdition = useCallback(() => {
    setModal(false);
  }, []);

  useEffect(() => {
    if (isLoading && !isLoading.isLoading) setDate(getDefaultValue(badgePrintingSystem.shippingDate, null));
  }, [badgePrintingSystem, isLoading, setDate]);
  return (
    <>
      <Drawer
        title="Device Information"
        height={height}
        isOpen={isOpen}
        isLoading={isLoading && isLoading.isLoading}
        render={() => (
          <>
            <BadgePrintingSystemSummary device={badgePrintingSystem} />
            <>
              <Divider className={classes.drawerDivider} />
              <div className={listClasses.ctaWrapper}>
                <PermissionGuard permissionsExpression={UserModel.BadgePrintingSystemsPermission.MANAGE}>
                  <ControlledButton>
                    <Button
                      data-testid="bps-edition-modal-open-btn"
                      onClick={onOpenEdition}
                      disableRipple={true}
                      className={`${buttonClasses.drawerCTA} ${buttonClasses.borderPrimaryButton}`}
                      variant="outlined"
                    >
                      Edit Date
                    </Button>
                  </ControlledButton>
                </PermissionGuard>
                <PermissionGuard permissionsExpression={UserModel.BadgePrintingSystemsPermission.MANAGE}>
                  <ControlledButton>
                    <Button
                      disableRipple={true}
                      className={`${buttonClasses.drawerCTA} ${buttonClasses.warningButton}`}
                      variant="outlined"
                      onClick={onUnAssign}
                      data-testid="unassign-btn"
                    >
                      Unassign
                    </Button>
                  </ControlledButton>
                </PermissionGuard>
              </div>
            </>
          </>
        )}
        onClose={onCloseDrawer}
      />
      <Modal
        show={isModalOpen}
        onClose={onCloseEdition}
        styleClass={`${classes.modalEditLocation}`}
        render={() => (
          <Confirm
            title="Edit Shipping Date"
            content={
              <ControlledDatePicker
                placeholder="Select Date"
                variant="outlined"
                name="date"
                styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput} ${datePickerClasses.adornmentEnd} ${datePickerClasses.baseInput}`}
                value={date}
                error={false}
                onChange={onChange}
              />
            }
            closeLabel="Close"
            confirmLabel="Save"
            onClose={onCloseEdition}
            onConfirm={onUpdateDate}
            disableConfirm={isSaveDisabled}
          />
        )}
      />
    </>
  );
};

export default memo(BadgePrintingSystemTabDrawer);
