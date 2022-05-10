import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';

export interface IBreadcrumb {
  label: string;
  link?: string;
  title?: string;
}

export interface IBreadcrumbsProps {
  breadcrumbs: IBreadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: IBreadcrumbsProps) => {
  const classes = useStyles();
  const last = breadcrumbs.length - 1;
  return (
    <Typography className={classes.stepWrapper} color="primary" align="left">
      {breadcrumbs.map((bread, index) => (
        <span className={classes.step} key={`breadcrumb-${index}`}>
          {bread.link && <Link to={bread.link}>{bread.label}</Link>}
          {!bread.link && bread.label}
          {index !== last && <span>{'>'}</span>}
        </span>
      ))}
    </Typography>
  );
};

export default memo(Breadcrumbs);
