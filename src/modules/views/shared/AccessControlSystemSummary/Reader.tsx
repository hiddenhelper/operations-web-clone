import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import { AccessControlSystemModel, GeneralModel } from '../../../models';
import { DeviceStatusIcon, InfoIcon, NotesIcon } from '../../../../constants';
import { getConditionalDefaultValue, getDefaultValue, getFormattedDate, isEmpty } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IAcsReaderProps {
  reader: AccessControlSystemModel.IReader;
  number: number;
}

const AcsReader = ({ reader, number }: IAcsReaderProps) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.summarySection}>
        <div className={classes.summaryText}>
          <Typography className={`${classes.deviceAccent} ${classes.entityTitle}`}>Reader {number}</Typography>
          <div className={classes.summaryMainText}>
            <span>{getDefaultValue(reader.serialNumber)}</span>
            <span>Model {getDefaultValue(reader.model)}</span>
            <span>Hostname {getDefaultValue(reader.hostname)}</span>
            <span>Public IP {getDefaultValue(reader.hostAddress)}</span>
            <span>{getConditionalDefaultValue(!isEmpty(reader.directionType), AccessControlSystemModel.readerTypeMap[reader.directionType])}</span>
          </div>
        </div>
      </div>
      <div className={classes.summarySection}>
        <>
          <InfoIcon />
          <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
            <span>SSH Port Connection: {getConditionalDefaultValue(!!reader.sshConnectionPort, reader.sshConnectionPort)}</span>
            <span>TELNET Port Connection: {getConditionalDefaultValue(!!reader.telnetConnectionPort, reader.telnetConnectionPort)}</span>
            <span>HTTP Port Connection: {getConditionalDefaultValue(!!reader.httpConnectionPort, reader.httpConnectionPort)}</span>
            <span>TCP Port Connection: {getConditionalDefaultValue(!!reader.tcpConnectionPort, reader.tcpConnectionPort)}</span>
          </div>
        </>
      </div>
      <div className={`${classes.summarySection} ${classes.drawerdevices}`}>
        <div className={classes.deviceWrapper}>
          <DeviceStatusIcon />
          <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
            {reader.inServiceDate ? (
              <>
                <span>Last Repair: {getDefaultValue(getFormattedDate(reader.lastMaintenanceDate, GeneralModel.DateFormat.DATE))}</span>
                <span>In Service Date: {getDefaultValue(getFormattedDate(reader.inServiceDate, GeneralModel.DateFormat.DATE))}</span>
              </>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
      <div className={classes.summarySection}>
        {reader.notes ? (
          <div className={classes.summaryRowDirection}>
            <NotesIcon />
            <div className={`${classes.summaryText} ${classes.summaryTextSeparation}`}>
              <span>{reader.notes}</span>
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
    </>
  );
};

export default memo(AcsReader);
