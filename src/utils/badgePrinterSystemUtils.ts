import { BadgePrintingSystemModel } from '../modules/models';
import { isEmpty, sanitizeNumber } from './generalUtils';

export const sanitizeDevice = device => ({
  ...device,
  price: !isEmpty(device.price) ? sanitizeNumber(device.price) : null,
});

export const sanitizePrinter = (printer: BadgePrintingSystemModel.IPrinter) => ({
  ...sanitizeDevice(printer),
  type: parseInt(printer.type as any, 10),
});

export const sanitize = (badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem) => ({
  ...badgePrinterSystem,
  printer: sanitizePrinter(badgePrinterSystem.printer),
  laptop: sanitizeDevice(badgePrinterSystem.laptop),
  scanner: sanitizeDevice(badgePrinterSystem.scanner),
});
