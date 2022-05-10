import React, { memo, useMemo } from 'react';
import { Button, Divider, Typography } from '@material-ui/core';
import { LocationOn, Phone } from '@material-ui/icons';

import Drawer from 'modules/views/shared/ResourceManagement/Drawer';
import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import Address from 'modules/views/shared/Address';

import { WorkerModel } from 'modules/models';
import { EmergencyContactIcon } from 'constants/index';
import { formatPhoneNumber } from 'utils';
import { getTradesString } from 'utils/tradeUtils';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';
import { useStyles as drawerStyles } from 'modules/views/shared/ResourceManagement/Drawer/styles';
import { listGlobalStyles } from 'assets/styles';

export interface IProps {
  isLoading: boolean;
  isOpen: boolean;
  listElement?: React.ReactNode;
  onClose: () => void;
  worker: WorkerModel.IWorker;
}

const WorkerDrawer = ({ isLoading, isOpen, listElement, onClose, worker }: IProps) => {
  const listHeight = (listElement as any)?.offsetHeight;
  const buttonClasses = buttonStyles();
  const drawerClasses = drawerStyles();
  const listClasses = listGlobalStyles();

  const tradeList = useMemo(() => getTradesString(worker.trades, worker.otherTrade), [worker.trades, worker.otherTrade]);

  return (
    <Drawer
      title="Worker Information"
      dataTestId="worker-drawer-detail"
      height={listHeight}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      render={() => (
        <div className={listClasses.listDetail}>
          <div className={listClasses.company}>
            <div className={drawerClasses.drawerText}>
              <Typography className={`${listClasses.listAccent} ${listClasses.entityTitle}`}>
                {worker.firstName} {worker.lastName}
              </Typography>
              <div className={drawerClasses.drawerMainText}>
                <span>{tradeList}</span>
              </div>
            </div>
            <div className={drawerClasses.drawerSection}>
              <div className={drawerClasses.drawerColumnDirection}>
                <div className={drawerClasses.drawerRowDirection}>
                  <LocationOn />
                  <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                    <Address address={worker?.address} isCountryOnNewLine={true} />
                  </div>
                </div>
              </div>
            </div>
            <div className={drawerClasses.drawerSection}>
              <div className={drawerClasses.drawerColumnDirection}>
                <div className={drawerClasses.drawerRowDirection}>
                  <Phone />
                  <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                    {worker?.phoneNumber && <span>{formatPhoneNumber(worker.phoneNumber)}</span>}
                    {worker?.mobilePhoneNumber && <span>{formatPhoneNumber(worker.mobilePhoneNumber)}</span>}
                    {worker?.email && (
                      <span>
                        <a className={drawerClasses.emailAnchor} href={`mailto:${worker.email}`}>
                          {worker.email}
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={drawerClasses.drawerSection}>
              <div className={drawerClasses.drawerColumnDirection}>
                <div className={drawerClasses.drawerRowDirection}>
                  <EmergencyContactIcon className="MuiSvgIcon-root" />
                  <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                    {worker?.emergencyContactName && <span>{worker.emergencyContactName}</span>}
                    {worker?.emergencyContactRelationship && <span>{worker.emergencyContactRelationship}</span>}
                    {worker?.emergencyContactPhone && <span>{formatPhoneNumber(worker.emergencyContactPhone)}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider className={drawerClasses.drawerDivider} />
          <div className={listClasses.ctaWrapper}>
            <ControlledButton>
              <Button
                data-testid="drawerButton"
                disableRipple={true}
                className={`${buttonClasses.drawerCTA} ${buttonClasses.borderPrimaryButton} ${buttonClasses.primaryButtonPadding}`}
                href={`/workers/detail/${worker?.id}`}
                variant="outlined"
              >
                Worker Detail
              </Button>
            </ControlledButton>
          </div>
        </div>
      )}
    />
  );
};

export default memo(WorkerDrawer);
