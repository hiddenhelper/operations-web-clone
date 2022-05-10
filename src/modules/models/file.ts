export enum FileStatus {
  INACTIVE = 0,
  PROGRESS = 1,
  SUCCESS = 2,
  FAIL = 3,
}

export interface IS3FileResponse {
  fileId: string;
  url: string;
  fileName: string;
}

export interface IFile {
  id: string;
  uploadId: string;
  file: Partial<File & IS3FileResponse>;
  progress: number;
  status: FileStatus;
  error: any;
}

export interface IUploadFileListStartPayload {
  list: IS3FileResponse[];
  fileList: IFile[];
  traceId?: string;
}

export interface IDownloadFile {
  newFile?: Blob;
  status: FileStatus;
  error?: any;
}

export const getFallbackFile = (
  file: Partial<File & IS3FileResponse>,
  uploadId: string = null,
  status: FileStatus = FileStatus.INACTIVE,
  error: any = null
): IFile => ({
  id: `${Date.now()}-${file.name}`,
  uploadId,
  file: file,
  progress: 0,
  status,
  error,
});

export interface IFilePreview {
  displayName: string;
  url: string;
  fileSize: number;
}
