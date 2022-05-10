import React, { ReactNode, ReactNodeArray } from 'react';
import { Box, Typography } from '@material-ui/core';

import Breadcrumbs from 'modules/views/shared/Breadcrumbs';
import { IBreadcrumb } from 'modules/views/shared/Breadcrumbs/Breadcrumbs';

import styles from './style';

const BREADCRUMB_HEIGHT = 22;

export interface IPageTitle {
  breadcrumb?: IBreadcrumb[];
  title: string;
  subtitle?: string;
  right?: ReactNode | ReactNodeArray;
  styles?: {};
}

export default function PageTitle({ breadcrumb, title, subtitle, right, styles: customStyles = {} }: IPageTitle) {
  return (
    <Box style={{ ...styles.wrapper, ...(breadcrumb ? { height: styles.wrapper.height + BREADCRUMB_HEIGHT } : {}), ...customStyles }}>
      <Box style={styles.container}>
        <div>
          {breadcrumb && <Breadcrumbs breadcrumbs={breadcrumb} />}
          <Box style={styles.titleWrapper}>
            <Typography component="h2" style={styles.title} variant="h1">
              {title}
            </Typography>
            {subtitle && <Typography style={styles.subtitle}>{subtitle}</Typography>}
          </Box>
        </div>
        {right}
      </Box>
    </Box>
  );
}
