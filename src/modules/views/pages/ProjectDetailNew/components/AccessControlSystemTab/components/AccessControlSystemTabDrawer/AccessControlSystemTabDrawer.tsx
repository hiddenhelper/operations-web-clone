import React, { memo, useCallback } from 'react';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Drawer from '../../../../../../shared/ResourceManagement/Drawer';
import ControlledButton from '../../../../../../shared/FormHandler/ControlledButton';
import AccessControlSystemSummary from '../../../../../../shared/AccessControlSystemSummary';

import { useStyles } from '../../../../styles';
import { useStyles as buttonStyles } from '../../../../../../shared/FormHandler/ControlledButton/styles';
import { listGlobalStyles } from '../../../../../../../../assets/styles';
import { GeneralModel, AccessControlSystemModel, UserModel } from '../../../../../../../models';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IAccessControlSystemTabDrawer {
  accessControlSystem: AccessControlSystemModel.IAccessControlSystem;
  isLoading: GeneralModel.ILoadingStatus;
  isOpen: boolean;
  height: number;
  onEdit: (id: string) => void;
  onCloseDrawer: () => void;
  unAssign: (id: string) => void;
}

const AccessControlSystemTabDrawer = ({ accessControlSystem, isLoading, isOpen, height, onCloseDrawer, onEdit, unAssign }: IAccessControlSystemTabDrawer) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const listClasses = listGlobalStyles();

  const onUnAssign = useCallback(() => {
    unAssign(accessControlSystem.id);
  }, [unAssign, accessControlSystem]);

  const onOpenEdition = useCallback(() => {
    onEdit(accessControlSystem.id);
  }, [accessControlSystem.id, onEdit]);
  return (
    <>
      <Drawer
        title="Device Information"
        height={height}
        isOpen={isOpen}
        isLoading={isLoading && isLoading.isLoading}
        render={() => (
          <>
            <AccessControlSystemSummary device={accessControlSystem} />
            <>
              <Divider className={classes.drawerDivider} />
              <div className={listClasses.ctaWrapper} style={{ padding: 0 }}>
                <PermissionGuard permissionsExpression={UserModel.AccessControlSystemsPermission.MANAGE}>
                  <ControlledButton>
                    <Button
                      data-testid="acs-edition-modal-open-btn"
                      onClick={onOpenEdition}
                      disableRipple={true}
                      style={{ maxWidth: '100%', width: '125px', padding: '6px 0' }}
                      className={`${buttonClasses.drawerCTA} ${buttonClasses.borderPrimaryButton}`}
                      variant="outlined"
                    >
                      Edit Assignment
                    </Button>
                  </ControlledButton>
                </PermissionGuard>

                <PermissionGuard permissionsExpression={UserModel.AccessControlSystemsPermission.MANAGE}>
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
    </>
  );
};

export default memo(AccessControlSystemTabDrawer);
