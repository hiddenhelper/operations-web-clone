import React, { memo, ReactNode } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { avatarGlobalStyles } from '../../../../assets/styles/Avatars/styles';
import { useStyles } from './style';
import { getDefaultValue } from '../../../../utils/generalUtils';

export interface IEmptyList {
  icon: ReactNode;
  text: string;
  styleClass?: string;
}

const EmptyList = ({ icon, text, styleClass }: IEmptyList) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  return (
    <div className={`${getDefaultValue(styleClass, '')} ${classes.container}`}>
      <div>
        <Avatar className={`${avatarGlobalClasses.missingAvatarWrapper} ${avatarGlobalClasses.missingAvatarBig}`}>{icon}</Avatar>
      </div>
      <Typography className={classes.missingListText}>{text}</Typography>
    </div>
  );
};

export default memo(EmptyList);
