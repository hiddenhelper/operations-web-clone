import React, { memo, useMemo } from 'react';

import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import AcsReader from './Reader';

import { AccessControlSystemModel, DeviceModel, GeneralModel } from '../../../models';
import { DeviceStatusIcon, NotesIcon } from '../../../../constants';
import { getDefaultValue, getFormattedDate, getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IDeviceDrawerProps {
  device: AccessControlSystemModel.IAccessControlSystem;
  deviceListElement?: React.ReactNode;
}

const AccessControlSystemSummary = ({ deviceListElement, device }: IDeviceDrawerProps) => {
  const deviceListHeight = (deviceListElement as any)?.offsetHeight;
  const classes = useStyles({ deviceListHeight: deviceListHeight ?? '100%' });
  const typeLabel = useMemo(() => AccessControlSystemModel.accessControlSystemTypeMap[device.type], [device.type]);
  const versionLabel = useMemo(() => AccessControlSystemModel.deviceVersionMap[device.version], [device.version]);
  const lifeCycleLabel = useMemo(() => AccessControlSystemModel.lifeCycleMap[device.lifeCycle], [device.lifeCycle]);
  const isHandHeld = useMemo(() => device.type === AccessControlSystemModel.AccessControlSystemType.HANDHELD, [device.type]);
  const isTurnstile = useMemo(() => device.type === AccessControlSystemModel.AccessControlSystemType.TURNSTILE, [device.type]);
  const isEnclosedTs = useMemo(() => device.type === AccessControlSystemModel.AccessControlSystemType.ENCLOSED_TS, [device.type]);
  const hasDeviceName = !!device?.deviceName;
  return (
    <div className={classes.summaryDeviceDetail}>
      <div className={classes.company}>
        <div className={classes.drawerOverflowWrapper}>
          <div className={classes.summaryText}>
            <Typography className={`${classes.deviceAccent} ${classes.entityTitle}`}>
              {hasDeviceName ? device.deviceName : getDefaultValue(device.serialNumber)}
            </Typography>
            <div className={classes.summaryMainText}>
              <span>{getDefaultValue(typeLabel)}</span>
              {hasDeviceName && <span>{getDefaultValue(device.serialNumber)}</span>}
              {(isTurnstile || isEnclosedTs) && <span>{getDefaultValue(versionLabel)}</span>}
              <span>Reverse Installation {getConditionalDefaultValue(device.hasReverseInstallation, 'Yes', 'No')}</span>
            </div>
          </div>
          {device?.location?.name && (
            <div className={`${classes.summarySection} ${classes.drawerdevices}`}>
              <div className={classes.deviceWrapper}>
                <LocationOnIcon />
                <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
                  <span>{getDefaultValue(device.location.name)}</span>
                </div>
              </div>
            </div>
          )}
          <div className={classes.summarySection}>
            <div className={classes.summaryRowDirection}>
              <DeviceStatusIcon />
              <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
                <span>{DeviceModel.deviceStatusMap[device.status]}</span>
                <span>{getDefaultValue(lifeCycleLabel)}</span>
                {isTurnstile && <span>Last Refurbished: {getDefaultValue(getFormattedDate(device?.lastRefurbishedDate, GeneralModel.DateFormat.DATE))}</span>}
                <span>Last Maintenance Date: {getDefaultValue(getFormattedDate(device?.lastMaintenanceDate, GeneralModel.DateFormat.DATE))}</span>
                <span>In Service Date: {getDefaultValue(getFormattedDate(device?.inServiceDate, GeneralModel.DateFormat.DATE))}</span>
                {(isTurnstile || isHandHeld) && (
                  <span>Warranty Expiration Date: {getDefaultValue(getFormattedDate(device.warrantyExpirationDate, GeneralModel.DateFormat.DATE))}</span>
                )}
              </div>
            </div>
          </div>
          <div className={classes.summarySection}>
            {device.notes ? (
              <div className={classes.summaryRowDirection}>
                <NotesIcon />
                <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
                  <span>{device.notes}</span>
                </div>
              </div>
            ) : (
              <>
                <NotesIcon />
                <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
                  <span>-</span>
                </div>
              </>
            )}
          </div>
          {device.reader1 && <AcsReader reader={device.reader1} number={1} />}
          {device.reader2 && <AcsReader reader={device.reader2} number={2} />}
        </div>
      </div>
    </div>
  );
};

export default memo(AccessControlSystemSummary);
