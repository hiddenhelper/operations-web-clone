import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import { DeviceStatusIcon, NotesIcon, MonetizationIcon } from '../../../../constants';
import { BadgePrintingSystemModel, DeviceModel, GeneralModel } from '../../../models';
import { getConditionalDefaultValue, getFormattedDate, getDefaultValue } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IDeviceDrawerProps {
  device: BadgePrintingSystemModel.IBadgePrintingSystem;
  deviceListElement?: React.ReactNode;
}

const BadgePrintingSystemSummary = ({ deviceListElement, device }: IDeviceDrawerProps) => {
  const deviceListHeight = (deviceListElement as any)?.offsetHeight;
  const classes = useStyles({ deviceListHeight: deviceListHeight ?? '100%' });

  return (
    <div className={classes.summaryDeviceDetail}>
      <div className={classes.company}>
        <div className={classes.drawerOverflowWrapper}>
          <div className={classes.drawerText}>
            <Typography className={`${classes.deviceAccent} ${classes.entityTitle}`}>{device.name}</Typography>
            <div className={classes.drawerMainText}>
              <span>{getDefaultValue(device.project?.name, 'No project assigned')}</span>
              <span>{DeviceModel.deviceStatusMap[device.status]}</span>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <NotesIcon className={classes.drawerNotesIcon} />
            <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
              <span>{getDefaultValue(device.notes)}</span>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerText}>
              <Typography className={`${classes.deviceAccent} ${classes.entityTitle}`}>Laptop</Typography>
              <div className={classes.drawerMainText}>
                <span>{getDefaultValue(device?.laptop?.serialNumber)}</span>
                <span>{getDefaultValue(device?.laptop?.model)}</span>
                <span>{getDefaultValue(device?.laptop?.osVersion)}</span>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerColumnDirection}>
              <div className={classes.drawerRowDirection}>
                <MonetizationIcon className={`${classes.drawerMonetizationIcon} ${classes.bpsIconSize}`} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>${getDefaultValue(device?.laptop?.price)}</span>
                  <span>{getDefaultValue(device?.laptop?.vendor)}</span>
                  <span>Invoiced {getDefaultValue(device?.laptop?.invoice)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerRowDirection}>
              <DeviceStatusIcon className={classes.bpsIconSize} />
              <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                <span>
                  Order/Purchase Date:{' '}
                  {getConditionalDefaultValue(device?.laptop?.orderDate, getFormattedDate(device?.laptop?.orderDate, GeneralModel.DateFormat.DATE), '')}
                </span>
                <span>
                  Warranty Expiration Date:{' '}
                  {getConditionalDefaultValue(
                    device?.laptop?.warrantyExpirationDate,
                    getFormattedDate(device?.laptop?.warrantyExpirationDate, GeneralModel.DateFormat.DATE),
                    ''
                  )}
                </span>
                <span>
                  In Service Date:{' '}
                  {getConditionalDefaultValue(device?.laptop?.inServiceDate, getFormattedDate(device?.laptop?.inServiceDate, GeneralModel.DateFormat.DATE), '')}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            {device?.laptop?.notes ? (
              <div className={classes.drawerRowDirection}>
                <NotesIcon className={classes.drawerSecondaryNotesIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>{device?.laptop?.notes}</span>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <NotesIcon className={classes.drawerSecondaryNotesIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>-</span>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerText}>
              <Typography className={`${classes.deviceAccent} ${classes.entityTitle}`}>Printer</Typography>
              <div className={classes.drawerMainText}>
                <span>{getDefaultValue(BadgePrintingSystemModel.printerMap[device?.printer?.type])}</span>
                <span>{getDefaultValue(device?.printer?.serialNumber)}</span>
                <span>{getDefaultValue(device?.printer?.model)}</span>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerColumnDirection}>
              <div className={classes.drawerRowDirection}>
                <MonetizationIcon className={classes.drawerMonetizationIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>${getDefaultValue(device?.printer?.price)}</span>
                  <span>{getDefaultValue(device?.printer?.vendor)}</span>
                  <span>Invoiced {getDefaultValue(device?.printer?.invoice)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerRowDirection}>
              <DeviceStatusIcon className={classes.bpsIconSize} />
              <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                <span>
                  Order/Purchase Date:{' '}
                  {getConditionalDefaultValue(device?.printer?.orderDate, getFormattedDate(device?.printer?.orderDate, GeneralModel.DateFormat.DATE), '')}
                </span>
                <span>
                  Warranty Expiration Date:{' '}
                  {getConditionalDefaultValue(
                    device?.printer?.warrantyExpirationDate,
                    getFormattedDate(device?.printer?.warrantyExpirationDate, GeneralModel.DateFormat.DATE),
                    ''
                  )}
                </span>
                <span>
                  Last Maintenance Date:{' '}
                  {getConditionalDefaultValue(
                    device?.printer?.lastMaintenanceDate,
                    getFormattedDate(device?.printer?.lastMaintenanceDate, GeneralModel.DateFormat.DATE),
                    ''
                  )}
                </span>
                <span>
                  In Service Date:{' '}
                  {getConditionalDefaultValue(
                    device?.printer?.inServiceDate,
                    getFormattedDate(device?.printer?.inServiceDate, GeneralModel.DateFormat.DATE),
                    ''
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            {device?.printer?.notes ? (
              <div className={classes.drawerRowDirection}>
                <NotesIcon className={classes.drawerSecondaryNotesIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>{device?.printer?.notes}</span>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <NotesIcon className={classes.drawerSecondaryNotesIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>-</span>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerText}>
              <Typography className={`${classes.deviceAccent} ${classes.entityTitle}`}>Scanner</Typography>
              <div className={classes.drawerMainText}>
                <span>{getDefaultValue(device?.scanner?.serialNumber)}</span>
                <span>{getDefaultValue(device?.scanner?.model)}</span>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerColumnDirection}>
              <div className={classes.drawerRowDirection}>
                <MonetizationIcon className={classes.drawerMonetizationIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>${getDefaultValue(device?.scanner?.price)}</span>
                  <span>{getDefaultValue(device?.scanner?.vendor)}</span>
                  <span>Invoiced {getDefaultValue(device?.scanner?.invoice)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            <div className={classes.drawerRowDirection}>
              <DeviceStatusIcon className={classes.bpsIconSize} />
              <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                <span>
                  Order/Purchase Date:{' '}
                  {getConditionalDefaultValue(device?.scanner?.orderDate, getFormattedDate(device?.scanner?.orderDate, GeneralModel.DateFormat.DATE), '')}
                </span>
                <span>
                  Warranty Expiration Date:{' '}
                  {getConditionalDefaultValue(
                    device?.scanner?.warrantyExpirationDate,
                    getFormattedDate(device?.scanner?.warrantyExpirationDate, GeneralModel.DateFormat.DATE),
                    ''
                  )}
                </span>
                <span>
                  In Service Date:{' '}
                  {getConditionalDefaultValue(
                    device?.scanner?.inServiceDate,
                    getFormattedDate(device?.scanner?.inServiceDate, GeneralModel.DateFormat.DATE),
                    ''
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.drawerSection}>
            {device?.scanner?.notes ? (
              <div className={classes.drawerRowDirection}>
                <NotesIcon className={classes.drawerSecondaryNotesIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>{device?.scanner?.notes}</span>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <NotesIcon className={classes.drawerSecondaryNotesIcon} />
                <div className={`${classes.drawerText} ${classes.drawerTextSeparation}`}>
                  <span>-</span>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BadgePrintingSystemSummary);
