import { FileService } from './FileService';

describe('FileService', () => {
  let fileService: FileService;

  beforeAll(() => {
    URL.createObjectURL = jest.fn().mockReturnValue('url');
    URL.revokeObjectURL = jest.fn();
    document.createElement = jest.fn().mockReturnValue(document.createElement('a'));
    fileService = new FileService();
  });

  it('should download', () => {
    const blobFile = new Blob();
    fileService.download('text.pdf', blobFile);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(URL.createObjectURL).toHaveBeenCalledWith(blobFile);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('url');
  });
});
