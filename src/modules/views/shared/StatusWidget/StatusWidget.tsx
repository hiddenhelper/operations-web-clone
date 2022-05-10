import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';

import { useStyles } from './styles';

export interface IStatusWidgetProps {
  total: number | string;
  status: string;
  content: any;
  loading?: boolean;
}

const StatusWidget = ({ total, status, content, loading = false }: IStatusWidgetProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.widget} elevation={0}>
      {loading && 'Loading...'}
      {!loading && (
        <>
          <span className={classes.totalFont}>{total}</span>
          <div className={classes.contentContainer}>
            <span className={classes.statusFont}>{status}</span>
            <span className={classes.contentFont}>{content}</span>
          </div>
        </>
      )}
    </Paper>
  );
};

export default memo(StatusWidget);
