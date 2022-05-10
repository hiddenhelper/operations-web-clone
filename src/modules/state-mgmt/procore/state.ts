import { ProcoreModel } from '../../models';
import { IProcoreClient } from '../../models/procore';

export interface IProcoreState {
  clients: IProcoreClient[];
  status: { isConnected: boolean };
  procoreProjects?: {
    clientId: string;
    projects: ProcoreModel.IProcoreProjects;
  };
  procoreProjectMappings?: {
    clientId: string;
    mappings: ProcoreModel.IProcoreProjectMappings;
  };
  procoreVendors?: {
    clientId: string;
    vendors: ProcoreModel.IProcoreVendors;
  };
  procoreVendorMappings?: {
    clientId: string;
    mappings: ProcoreModel.IProcoreVendorMappings;
  };
  procoreReportFrequency?: ProcoreModel.ProcoreReportFrequency;
}

export const initialState: IProcoreState = {
  clients: [],
  status: { isConnected: false },
};
