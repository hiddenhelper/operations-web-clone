import React, { memo, useCallback } from 'react';

import Button from '@material-ui/core/Button';

import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../assets/styles';

export interface IButtonTabProps {
  optFilter: { id: any; title: string; key: string };
  isActive: boolean;
  setFilter: (filter: any) => void;
}

const ButtonTab = ({ optFilter, isActive, setFilter }: IButtonTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const changeFilter = useCallback(() => setFilter(optFilter.id), [optFilter.id, setFilter]);

  return (
    <Button
      key={optFilter.id}
      data-testid="filter-status-opt"
      className={getConditionalDefaultValue(isActive, tableGlobalClasses.activeFilter, '')}
      onClick={changeFilter}
    >
      {optFilter.title}
    </Button>
  );
};

export default memo(ButtonTab);
