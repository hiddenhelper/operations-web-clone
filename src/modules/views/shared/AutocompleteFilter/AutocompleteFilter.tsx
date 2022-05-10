import React, { memo, useCallback, useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ButtonFilter from '../ButtonFilter';

import { GeneralModel } from '../../../models';
import { useDebounce } from '../../../../utils/useDebounce';
import { noop } from '../../../../utils/generalUtils';
import { useStyles } from './styles';
import { generalGlobalStyles } from '../../../../assets/styles';

export interface IAutocompleteFilterProps {
  value: string;
  label: string;
  optionList: GeneralModel.INamedEntity[];
  isLoading?: boolean;
  autocompleteWidth?: number;
  onChange: (id: string) => void;
  onSearch?: (text: string) => void;
}

const AutocompleteFilter = ({ value, label, optionList, isLoading, autocompleteWidth = 300, onChange, onSearch = noop }: IAutocompleteFilterProps) => {
  const classes = useStyles();
  const generalStyles = generalGlobalStyles();
  const [optionValue, setValue] = useState<GeneralModel.INamedEntity>(null);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 350);

  const onChangeFilter = useCallback(
    (event, option) => {
      onChange(option?.id);
    },
    [onChange]
  );

  const onChangeSearch = useCallback(
    event => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  useEffect(() => {
    if (debouncedSearch.length >= 3) onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  useEffect(() => {
    setValue(optionList.filter(option => option.id !== '').find(option => option.id === value) || null);
  }, [optionList, value]);
  return (
    <ButtonFilter
      text={label}
      transparentButton={true}
      containerStyleClass={classes.buttonContainer}
      render={({ isOpen, handleClose }) =>
        isOpen && (
          <ClickAwayListener onClickAway={handleClose}>
            <Autocomplete
              id="autocomplete-filter"
              data-testid="autocomplete-filter-wrapper"
              style={{ width: autocompleteWidth }}
              value={optionValue}
              disableClearable={true}
              options={optionList}
              getOptionLabel={option => option.name}
              renderOption={option => <span className={generalStyles.textEllipsis}>{option.name}</span>}
              loading={isLoading}
              renderInput={params => (
                <div>
                  <TextField
                    className={classes.container}
                    autoFocus={true}
                    {...params}
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    placeholder="Search"
                    onChange={onChangeSearch}
                  />
                </div>
              )}
              onChange={onChangeFilter}
              openOnFocus={true}
              open={true}
              disablePortal={true}
            />
          </ClickAwayListener>
        )
      }
    />
  );
};

export default memo(AutocompleteFilter);
