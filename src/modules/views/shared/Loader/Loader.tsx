import React, { memo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

const Loader = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
};

export default memo(Loader);
