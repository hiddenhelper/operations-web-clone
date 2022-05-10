import React, { memo, useCallback } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { useStyles } from './styles';

export interface IPaginationProps {
  page: number;
  count: number;
  styleClass?: string;
  onChange: (page: number) => void;
}

const ControlledPagination = ({ page, count, styleClass = '', onChange }: IPaginationProps) => {
  const classes = useStyles();
  const onPageChange = useCallback((event, newPage) => onChange(newPage), [onChange]);
  return <Pagination data-testid="pagination" className={`${styleClass} ${classes.pagination}`} page={page} count={count} onChange={onPageChange} />;
};

export default memo(ControlledPagination);
