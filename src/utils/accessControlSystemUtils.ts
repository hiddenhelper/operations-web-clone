import { AccessControlSystemModel } from '../modules/models';
import { getConditionalDefaultValue, isEmpty } from './generalUtils';

export const sanitizeReader = (reader: AccessControlSystemModel.IReader): any => {
  let modifiedReader = { ...reader };
  if (reader?.serialNumber) {
    modifiedReader.serialNumber = reader.serialNumber.toLowerCase().trim();
  }
  return {
    ...modifiedReader,
    directionType: getConditionalDefaultValue(!isEmpty(reader?.directionType), Number(reader?.directionType), null),
    sshConnectionPort: getConditionalDefaultValue(reader?.sshConnectionPort, Number(reader?.sshConnectionPort), 0),
    telnetConnectionPort: getConditionalDefaultValue(reader?.telnetConnectionPort, Number(reader?.telnetConnectionPort), 0),
    httpConnectionPort: getConditionalDefaultValue(reader?.httpConnectionPort, Number(reader?.httpConnectionPort), 0),
    tcpConnectionPort: getConditionalDefaultValue(reader?.tcpConnectionPort, Number(reader?.tcpConnectionPort), 0),
  };
};

export const sanitizeACS = (acs: AccessControlSystemModel.IAccessControlSystem) => {
  let modifiedACS = { ...acs };
  if (acs?.reader1SerialNumber) {
    modifiedACS.reader1SerialNumber = acs.reader1SerialNumber.toLowerCase().trim();
  }
  if (acs?.reader2SerialNumber) {
    modifiedACS.reader2SerialNumber = acs.reader2SerialNumber.toLowerCase().trim();
  }
  return {
    ...modifiedACS,
    serialNumber: acs.serialNumber?.trim().toLowerCase() || null,
    reader1: sanitizeReader(acs.reader1),
    reader2: acs.reader2 ? sanitizeReader(acs.reader2) : null,
  };
};

export const sanitizeAssignAcs = (acs: AccessControlSystemModel.IProjectAccessControlSystem) => ({
  ...acs,
  hasReverseInstallation: getConditionalDefaultValue(acs?.hasReverseInstallation, acs?.hasReverseInstallation, false),
  reader1: sanitizeReader(acs.reader1),
  reader2: getConditionalDefaultValue(acs.reader2, sanitizeReader(acs.reader2), null),
});
