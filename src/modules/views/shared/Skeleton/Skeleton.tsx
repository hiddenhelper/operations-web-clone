import React, { memo } from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

import { getDefaultValue } from '../../../../utils/generalUtils';

export interface ISkeleton {
  animation?: 'pulse' | 'wave' | false;
  children?: React.ReactNode;
  height?: number | string;
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  isLoading: boolean;
  styleClass?: string;
}

const SkeletonComponent = ({ children, isLoading, styleClass, ...props }: ISkeleton) => {
  return <>{isLoading ? <Skeleton component="div" className={getDefaultValue(styleClass, '')} {...props} /> : children}</>;
};

export default memo(SkeletonComponent);
