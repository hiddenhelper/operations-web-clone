import { IEpicDependencies } from '../modules/state-mgmt/rootState';

import { ApiServiceMock } from './ApiServiceMock';
import { AuthServiceMock } from './AuthServiceMock';
import { PrinterServiceMock } from './PrinterServiceMock';
import { FileServiceMock } from './FileServiceMock';
import { LoggerMock } from './LoggerMock';

export const getDeps = (): IEpicDependencies => ({
  history: { push: jest.fn() } as any,
  apiService: new ApiServiceMock() as any,
  authService: new AuthServiceMock() as any,
  printerService: new PrinterServiceMock() as any,
  fileService: new FileServiceMock() as any,
  logger: LoggerMock as any,
});
