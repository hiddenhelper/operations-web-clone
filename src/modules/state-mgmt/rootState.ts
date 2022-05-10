import { History } from 'history';

import { IState as IAuthState } from './auth/state';
import { IState as IGeneralState } from './general/state';
import { IState as IClientState } from './client/state';
import { IState as IProjectState } from './project/state';
import { IState as IUserState } from './user/state';
import { IState as IAccessControlSystemState } from './access-control-system/state';
import { IState as IBadgePrintingSystemState } from './badge-printer-system/state';
import { IState as IWorkerState } from './worker/state';
import { IState as ICertificationState } from './certification/state';
import { IState as IFileState } from './file/state';
import { IState as IBadgeState } from './badge/state';
import { IState as IStatisticsState } from './statistics/state';
import { IState as ITrainingState } from './training/state';
import { IState as IPaymentState } from './payment/state';
import { IState as IInvoiceState } from './invoice/state';
import { ApiService } from '../services/ApiService';
import { AuthService } from '../services/AuthService';
import { PrinterService } from '../services/PrinterService';
import { FileService } from '../services/FileService';
import { Logger } from '../services/Logger';
import { IProcoreState } from './procore/state';
import { IState as IProjectNewState } from './project-new/state';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
  user: IUserState;
  client: IClientState;
  project: IProjectState;
  accessControlSystem: IAccessControlSystemState;
  badgePrinterSystem: IBadgePrintingSystemState;
  worker: IWorkerState;
  certification: ICertificationState;
  training: ITrainingState;
  invoice: IInvoiceState;
  file: IFileState;
  badge: IBadgeState;
  statistics: IStatisticsState;
  payment: IPaymentState;
  general: IGeneralState;
  router?: { location: { pathname: string; search: string; hard: string; key: string }; action: string };
  procore: IProcoreState;
  projectNew: IProjectNewState;
}

export interface IEpicDependencies {
  history: History;
  apiService: ApiService;
  authService: AuthService;
  printerService: PrinterService;
  fileService: FileService;
  logger: typeof Logger;
}
