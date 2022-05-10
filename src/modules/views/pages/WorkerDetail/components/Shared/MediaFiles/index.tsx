import React, { memo } from 'react';
import FileUpload from 'modules/views/shared/FormHandler/FileUpload';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import { IWorkerCertificationFile } from 'modules/models/certification';
import { IWorkerTrainingFile } from 'modules/models/training';
import { getFallbackFile } from 'modules/models/file';

export interface IMediaFiles {
  uploadId: string;
  assignLoading: boolean;
  files: Array<IWorkerTrainingFile | IWorkerCertificationFile>;
}

const MediaFiles = ({ uploadId, assignLoading, files }: IMediaFiles) => {
  return (
    <ControlledInput label="Media (Optional)">
      <FileUpload
        defaultFiles={files?.map(file => ({
          ...getFallbackFile(file),
          id: file.id,
          file: {
            name: file.displayName,
            size: file.fileSize,
            url: file.url,
          },
        }))}
        uploadId={uploadId}
        showProgress={true}
        maxFileSize={5242880} // 5Mb
        showDelete={!assignLoading}
        placeholder="Upload file (Only pdf, jpg, png and gif formats) Max Size: 5 MB"
        supportedExtensionList={['png', 'jpg', 'gif', 'pdf']}
        inputProps={{
          multiple: true,
          'data-testid': 'certification-media',
        }}
      />
    </ControlledInput>
  );
};

export default memo(MediaFiles);
