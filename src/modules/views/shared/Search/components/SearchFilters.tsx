import React from 'react';
import { Box, Chip, Typography } from '@material-ui/core';

import { useStyles } from '../styles';
import { SearchModel } from 'modules/models';

interface ISearchFilter extends SearchModel.IFilterConfig {
  onClick: () => void;
}

interface IProps {
  filters: ISearchFilter[];
  selected: SearchModel.SearchType;
}

const SearchFilters = ({ filters, selected }: IProps) => {
  const classes = useStyles({});
  return (
    <Box className={classes.filterWrapper}>
      <Typography className={classes.filterTitle}>Looking for…</Typography>
      <Box className={classes.pills}>
        {filters.map((filter, index) => (
          <Chip
            className={classes.filterChip}
            clickable={true}
            color={filter.value === selected ? 'primary' : undefined}
            disabled={!filter.active}
            key={index}
            label={filter.label}
            onClick={filter.onClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchFilters;
