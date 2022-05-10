import { IRootState } from '../modules/state-mgmt/rootState';
import { authState } from '../modules/state-mgmt/auth';
import { userState } from '../modules/state-mgmt/user';
import { generalState } from '../modules/state-mgmt/general';
import { clientState } from '../modules/state-mgmt/client';
import { projectState } from '../modules/state-mgmt/project';
import { workerState } from '../modules/state-mgmt/worker';
import { certificationState } from '../modules/state-mgmt/certification';
import { accessControlSystemState } from '../modules/state-mgmt/access-control-system';
import { badgePrinterSystemState } from '../modules/state-mgmt/badge-printer-system';
import { fileState } from '../modules/state-mgmt/file';
import { badgeState } from '../modules/state-mgmt/badge';
import { statisticsState } from '../modules/state-mgmt/statistics';
import { paymentState } from '../modules/state-mgmt/payment';
import { trainingState } from '../modules/state-mgmt/training';
import { invoiceState } from '../modules/state-mgmt/invoice';
import { UserModel } from '../modules/models';
import { procoreState } from '../modules/state-mgmt/procore';
import { projectNewState } from '../modules/state-mgmt/project-new';

export const getInitialState = (): IRootState => ({
  auth: { ...authState.initialState },
  user: { ...userState.initialState },
  general: { ...generalState.initialState },
  client: { ...clientState.initialState },
  project: { ...projectState.initialState },
  worker: { ...workerState.initialState },
  certification: { ...certificationState.initialState },
  training: { ...trainingState.initialState },
  invoice: { ...invoiceState.initialState },
  accessControlSystem: { ...accessControlSystemState.initialState },
  badgePrinterSystem: { ...badgePrinterSystemState.initialState },
  file: { ...fileState.initialState },
  badge: { ...badgeState.initialState },
  statistics: { ...statisticsState.initialState },
  payment: { ...paymentState.initialState },
  router: { location: { pathname: '', search: '', key: '', hard: '' }, action: '' },
  procore: { ...procoreState.initialState },
  projectNew: { ...projectNewState.initialState },
});

export const getAdminInitialState = (): IRootState => ({
  ...getInitialState(),
  auth: { ...authState.initialState, role: UserModel.Role.FCA_ADMIN, companyId: 'company-id' },
});

export const getClientAdminInitialState = (): IRootState => ({
  ...getInitialState(),
  auth: { ...authState.initialState, role: UserModel.Role.CLIENT_ADMIN, companyId: 'company-id' },
});

export const getRegularUserInitialState = (): IRootState => ({
  ...getInitialState(),
  auth: { ...authState.initialState, role: UserModel.Role.REGULAR_USER, companyId: 'company-id' },
});
