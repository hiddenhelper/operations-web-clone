import { PrinterService } from './PrinterService';

describe('PrinterService', () => {
  global.console.error = () => {
    /** */
  };
  let printerService: PrinterService;

  beforeAll(() => {
    URL.createObjectURL = jest.fn();
    URL.revokeObjectURL = jest.fn();
    printerService = new PrinterService();
  });

  it('should print', () => {
    printerService.print(new Blob());
    (printerService as any).iframe.contentWindow.print = jest.fn();
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
    expect(document.querySelector('iframe')).toBeTruthy();
  });

  it('should destroy', () => {
    printerService.destroy();
    expect(document.querySelector('iframe')).toBeFalsy();
  });
});
