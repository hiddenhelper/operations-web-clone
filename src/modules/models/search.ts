import { UserModel } from '.';
import { IAddress } from './address';
import { Status } from './resource';
import { WorkerStatus } from './worker';

export enum SearchType {
  NotSet = 0 /* Used for mixed search between different entities */,
  Company = 1,
  Worker = 2,
  Project = 3,
  Users = 4,
  Inventory = 5,
}

type FilterLabel = 'Projects' | 'Clients' | 'Users' | 'Workers' | 'Inventory';

export const filterLabelsMap: { [key: number]: FilterLabel } = {
  [SearchType.Project]: 'Projects',
  [SearchType.Company]: 'Clients',
  [SearchType.Worker]: 'Workers',
  [SearchType.Users]: 'Users',
  [SearchType.Inventory]: 'Inventory',
};

export interface IFilterConfig {
  active: boolean;
  label: FilterLabel;
  onlyAdmin: boolean;
  value: SearchType;
  permissionsExpression?: string;
}

export const searchFiltersConfig: IFilterConfig[] = [
  {
    value: SearchType.Project,
    label: filterLabelsMap[SearchType.Project],
    onlyAdmin: false,
    active: true,
    permissionsExpression: UserModel.ProjectsPermission.VIEWACCESS,
  },
  {
    value: SearchType.Company,
    label: filterLabelsMap[SearchType.Company],
    onlyAdmin: true,
    active: true,
    permissionsExpression: UserModel.ClientsPermission.VIEWACCESS,
  },
  {
    value: SearchType.Worker,
    label: filterLabelsMap[SearchType.Worker],
    onlyAdmin: false,
    active: true,
    permissionsExpression: UserModel.WorkersPermission.VIEWACCESS,
  },
  {
    value: SearchType.Users,
    label: filterLabelsMap[SearchType.Users],
    onlyAdmin: false,
    active: false,
    permissionsExpression: UserModel.UsersPermission.VIEWACCESS,
  },
  {
    value: SearchType.Inventory,
    label: filterLabelsMap[SearchType.Inventory],
    onlyAdmin: true,
    active: false,
    permissionsExpression: UserModel.InventoryPermission.STATISTICS,
  },
];

export interface ISearchParams {
  nameContains: string;
  pageNumber?: number;
  pageSize?: number;
  searchType: SearchType;
}

export interface IResponse {
  id: string;
  name: string;
  address?: IAddress;
  status: Status;
  entityType: SearchType;
  pictureUrl?: string;
  lastUpdatedAt?: string;
}

export interface IWorker extends IResponse {
  entityType: SearchType.Worker;
  status: undefined; // For worker will always be null
  invitationStatus: WorkerStatus;
  company?: {
    id: string;
    name: string;
  };
}
