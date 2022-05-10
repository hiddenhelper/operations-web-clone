import { IDevice } from './device';
import { INamedEntity } from './general';

export enum PrinterType {
  ZEBRA = 0,
  DATA_CARD = 1,
  BROTHER = 2,
}

export interface IBadgePrintingDevice extends IDevice {
  price: number;
  vendor: string;
  orderDate: string;
  invoice: string;
  model: string;
  inServiceDate: string;
  warrantyExpirationDate: string;
}

export interface ILaptop extends IBadgePrintingDevice {
  osVersion: string;
}

export interface IPrinter extends IBadgePrintingDevice {
  type: PrinterType;
  lastMaintenanceDate: string;
}

export interface IProjectBadgePrintingSystem extends IDevice {
  badgePrintingSystem?: INamedEntity;
  laptopSerialNumber?: string;
  printerSerialNumber?: string;
  scannerSerialNumber?: string;
  project?: {
    id: string;
    name: string;
  };
  shippingDate?: string;
}

export interface IBadgePrintingSystem extends IProjectBadgePrintingSystem {
  name: string;
  laptop: ILaptop;
  printer: IPrinter;
  scanner: IBadgePrintingDevice;
  date?: string;
  index?: number;
}

export interface IBadgePrintingSystemUpdateDate {
  badgePrintingSystemId: string;
  shippingDate: string;
}

export const printerMap = {
  [PrinterType.ZEBRA]: 'Zebra',
  [PrinterType.DATA_CARD]: 'Data Card',
  [PrinterType.BROTHER]: 'Brother',
};

export const getFallbackPrinter = (): IPrinter => ({
  id: null,
  price: null,
  vendor: null,
  orderDate: null,
  invoice: null,
  model: null,
  inServiceDate: null,
  warrantyExpirationDate: null,
  serialNumber: null,
  notes: null,
  lastMaintenanceDate: null,
  type: null,
});

export const getFallbackLaptop = (): ILaptop => ({
  id: null,
  price: null,
  vendor: null,
  orderDate: null,
  invoice: null,
  model: null,
  inServiceDate: null,
  warrantyExpirationDate: null,
  serialNumber: null,
  notes: null,
  osVersion: null,
});

export const getFallbackScanner = (): IBadgePrintingDevice => ({
  id: null,
  price: null,
  vendor: null,
  orderDate: null,
  invoice: null,
  model: null,
  inServiceDate: null,
  warrantyExpirationDate: null,
  serialNumber: null,
  notes: null,
});

export const getFallbackBadgePrinterSystem = (): IBadgePrintingSystem => ({
  id: null,
  notes: null,
  name: null,
  shippingDate: null,
  project: null,
  laptop: getFallbackLaptop(),
  printer: getFallbackPrinter(),
  scanner: getFallbackScanner(),
});
