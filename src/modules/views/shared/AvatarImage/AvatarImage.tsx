import React, { memo } from 'react';

import PersonIcon from '@material-ui/icons/Person';

import { getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';

export interface IAvatarImageProps {
  url: string;
  title?: string;
}

const AvatarImage = ({ url, title }: IAvatarImageProps) => {
  return getConditionalDefaultValue(url, <img alt="" style={{ width: '100%' }} src={url} />, <PersonIcon titleAccess={getDefaultValue(title, '')} />);
};

export default memo(AvatarImage);
