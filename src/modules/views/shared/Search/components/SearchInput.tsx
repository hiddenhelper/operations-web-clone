import React, { ChangeEvent, Ref, SyntheticEvent } from 'react';
import { Button, Chip, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon, Clear } from '@material-ui/icons';

import { inputStyles, useStyles } from '../styles';

export interface IProps {
  chipLabel: string;
  handleClear: () => void;
  inputRef: Ref<HTMLInputElement>;
  isActive: boolean;
  onChange: (search: string) => void;
  onClick: () => void;
  onClose: () => void;
  search: string;
}

const SearchInput = ({ chipLabel, handleClear, isActive, inputRef, onChange, onClick, onClose, search }: IProps) => {
  const classes = useStyles({ isActive });
  const inputClasses = inputStyles({ isActive });
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9À-ú\s]/, '');
    onChange(value);
  };
  const handleClose = (event: SyntheticEvent) => {
    event?.stopPropagation();
    onClose();
  };
  return (
    <TextField
      autoComplete="off"
      className={inputClasses.input}
      fullWidth={true}
      inputProps={{ 'data-testid': 'main-search-input' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isActive && search ? <Chip className={classes.filterChip} label={chipLabel} color="primary" /> : <SearchIcon />}
          </InputAdornment>
        ),
        endAdornment: isActive && (
          <InputAdornment position="end">
            {search && (
              <>
                <Button className={inputClasses.clearInputButton} disableRipple={true} onClick={handleClear} title="Clear">
                  Clear
                </Button>
                <span className={inputClasses.verticalDivider} />
              </>
            )}
            <IconButton className={inputClasses.closeSearchButton} disableRipple={true} onClick={handleClose} title="Close">
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={inputRef}
      name="search"
      onChange={handleChange}
      onClick={onClick}
      placeholder="Find a project, client, worker..."
      value={search || ''}
      variant="outlined"
    />
  );
};

export default SearchInput;
