import { sanitizeACS, sanitizeAssignAcs } from './accessControlSystemUtils';

describe('addressUtils', () => {
  const basicACS = {
    type: 0,
    version: 3,
    projectName: 'project demo',
    status: 0,
    location: 'south portal',
    reader1SerialNumber: '11aa ss',
    serialNumber: '',
  };

  it('should sanitizeACS without readers', () => {
    const sanitizedACS = sanitizeACS(basicACS);
    expect(sanitizedACS).toEqual({
      ...basicACS,
      reader1: {
        directionType: null,
        httpConnectionPort: 0,
        sshConnectionPort: 0,
        tcpConnectionPort: 0,
        telnetConnectionPort: 0,
      },
      reader2: null,
      serialNumber: null,
    });
  });

  it('should sanitizeAssignAcs', () => {
    const sanitizedAssignACS = sanitizeAssignAcs({
      deviceName: null,
      hasReverseInstallation: true,
      location: 'corner',
      reader1: {
        serialNumber: '123',
        inServiceDate: '2021-01-15T00:00:00-03:00',
        model: '123',
      },
      reader2: null,
      serialNumber: '123',
      type: 0,
      accessControlSystemId: null,
      id: '123123',
      projectId: '123',
    });

    expect(sanitizedAssignACS).toEqual({
      deviceName: null,
      hasReverseInstallation: true,
      location: 'corner',
      reader1: {
        serialNumber: '123',
        inServiceDate: '2021-01-15T00:00:00-03:00',
        model: '123',
        directionType: null,
        sshConnectionPort: 0,
        telnetConnectionPort: 0,
        httpConnectionPort: 0,
        tcpConnectionPort: 0,
      },
      reader2: null,
      serialNumber: '123',
      type: 0,
      accessControlSystemId: null,
      id: '123123',
      projectId: '123',
    });
  });

  it('should sanitizeACS with reader 2', () => {
    const sanitizedACS = sanitizeACS({
      ...basicACS,
      reader1: {
        serialNumber: '123',
        hostname: 'hostname 1',
        sshConnectionPort: '123',
        telnetConnectionPort: '234',
        httpConnectionPort: '123',
        tcpConnectionPort: '1122',
      },
      reader2: {
        serialNumber: '123',
        hostname: 'hostname 1',
        sshConnectionPort: '123',
        telnetConnectionPort: '234',
        httpConnectionPort: '123',
        tcpConnectionPort: '1122',
      },
      serialNumber: null,
    });
    expect(sanitizedACS).toEqual({
      ...basicACS,
      reader1: {
        directionType: null,
        serialNumber: '123',
        hostname: 'hostname 1',
        sshConnectionPort: 123,
        telnetConnectionPort: 234,
        httpConnectionPort: 123,
        tcpConnectionPort: 1122,
      },
      reader2: {
        directionType: null,
        serialNumber: '123',
        hostname: 'hostname 1',
        sshConnectionPort: 123,
        telnetConnectionPort: 234,
        httpConnectionPort: 123,
        tcpConnectionPort: 1122,
      },
      serialNumber: null,
    });
  });

  it('should sanitize ports in reader 2', () => {
    const sanitizedACS = sanitizeACS({
      ...basicACS,
      reader1: {
        serialNumber: '123',
        hostname: 'hostname 1',
        sshConnectionPort: '123',
        telnetConnectionPort: '234',
        httpConnectionPort: '123',
        tcpConnectionPort: '1122',
      },
      reader2: {
        serialNumber: '123',
        hostname: 'hostname 1',
      },
      serialNumber: null,
    });
    expect(sanitizedACS).toEqual({
      ...basicACS,
      reader1: {
        directionType: null,
        hostname: 'hostname 1',
        serialNumber: '123',
        httpConnectionPort: 123,
        sshConnectionPort: 123,
        tcpConnectionPort: 1122,
        telnetConnectionPort: 234,
      },
      reader2: {
        directionType: null,
        hostname: 'hostname 1',
        serialNumber: '123',
        httpConnectionPort: 0,
        sshConnectionPort: 0,
        tcpConnectionPort: 0,
        telnetConnectionPort: 0,
      },
      serialNumber: null,
    });
  });
});
