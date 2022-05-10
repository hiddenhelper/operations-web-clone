import React, { memo, useMemo, useCallback } from 'react';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Edit from '@material-ui/icons/Edit';

import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface ISearchLocation {
  id?: string;
  value: any;
  placeholder: string;
  optionList: any[];
  outlined?: boolean;
  hasIcon?: boolean;
  disabled?: boolean;
  onChange: (data) => void;
}

const SearchLocation = ({ id, value, optionList, placeholder, outlined = true, hasIcon = false, disabled = false, onChange }: ISearchLocation) => {
  const classes = useStyles({ outlined: outlined });

  const filter = useMemo(() => createFilterOptions(), []);
  const onChangeLocation = useCallback(
    (event, data) => {
      onChange({ name: data.name.replace('Add ', '') });
    },
    [onChange]
  );
  const onFilterOptions = useCallback(
    (options, params) => {
      const filtered = filter(options, params);
      /* istanbul ignore else */
      if (params.inputValue !== '') {
        filtered.push({
          name: `Add ${params.inputValue}`,
        });
      }
      return filtered;
    },
    [filter]
  );
  const getOptionLabel = useCallback(option => option.name, []);
  const onRenderInput = useCallback(
    params => (
      <div ref={params.InputProps.ref}>
        <TextField
          {...params.inputProps}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            endAdornment: hasIcon && (
              <InputAdornment position="end">
                <Edit />
              </InputAdornment>
            ),
          }}
        />
      </div>
    ),
    [placeholder, hasIcon]
  );
  return (
    <Autocomplete
      id={`search-autocomplete-${id}`}
      data-testid="search-autocomplete"
      className={`${classes.root} ${getConditionalDefaultValue(outlined, classes.outlined, classes.base)} ${getConditionalDefaultValue(
        disabled,
        classes.disabled,
        ''
      )}`}
      value={value}
      options={optionList}
      autoHighlight={true}
      freeSolo={true}
      disableClearable={true}
      clearOnBlur={true}
      selectOnFocus={true}
      getOptionLabel={getOptionLabel}
      renderInput={onRenderInput}
      onChange={onChangeLocation}
      filterOptions={onFilterOptions}
      disabled={disabled}
      disablePortal={true}
    />
  );
};

export default memo(SearchLocation);
