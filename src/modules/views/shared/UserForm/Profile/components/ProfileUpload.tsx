import React, { memo } from 'react';

import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';

import ControlledInput from '../../../FormHandler/ControlledInput';
import ControlledError from '../../../FormHandler/ControlledError';
import FileUpload from '../../../FormHandler/FileUpload';

import { avatarGlobalStyles } from '../../../../../../assets/styles';
import { useStyles } from '../../../../pages/AccountSettings/styles';

export interface IProfileUploadProps {
  profilePictureUrl: string;
  error: string;
}

const ProfileUpload = ({ profilePictureUrl, error }: IProfileUploadProps) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  /* istanbul ignore next line */
  const noCachedUrl = profilePictureUrl && profilePictureUrl.includes('blob') ? profilePictureUrl : `${profilePictureUrl}`;
  return (
    <div className={classes.profileUploadWrapper}>
      <div className={classes.profileUploadAvatarPosition}>
        <Avatar className={`${avatarGlobalClasses.avatarSettings} ${avatarGlobalClasses.avatarWrapper}`} alt="Avatar Image">
          {profilePictureUrl ? <img src={noCachedUrl} alt="Profile" width="100%" /> : <PersonIcon className={avatarGlobalClasses.missingAvatarSettings} />}
        </Avatar>
      </div>
      <div className={classes.profileUploadInput}>
        <ControlledError show={!!error} error={error} styleClass={classes.errorPosition}>
          <ControlledInput label="Profile Image">
            <FileUpload
              uploadId="profilePhoto"
              showProgress={true}
              maxFileSize={5242880}
              showDelete={true}
              placeholder="Upload Photo"
              singleInput={true}
              supportedExtensionList={['png', 'jpg', 'gif']}
              wrapperStyleClass={classes.fileUploadWrapper}
              inputProps={{
                multiple: false,
                'data-testid': 'file-media',
              }}
            />
          </ControlledInput>
        </ControlledError>
      </div>
    </div>
  );
};

export default memo(ProfileUpload);
