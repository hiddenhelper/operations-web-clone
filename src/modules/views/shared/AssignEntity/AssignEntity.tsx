import React, { memo, useEffect, useMemo, useCallback, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ControlledInput from '../FormHandler/ControlledInput';

import { GeneralModel } from '../../../models';
import { useDebounce } from '../../../../utils/useDebounce';
import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IAssignEntityProps {
  index: number;
  tempId: string;
  result: any[];
  params?: GeneralModel.IQueryParams;
  optionLabel: string;
  assignValue: any;
  isLoading: boolean;
  existRelation: boolean;
  showCreateNew?: boolean;
  placeholder?: string;
  inputLabel?: string;
  showError?: boolean;
  disableClearable?: boolean;
  styleClass?: string;
  disabled?: boolean;
  isRequired?: boolean;
  renderOption: (option: any, inputValue: string) => React.ReactNode;
  search: (params: GeneralModel.IQueryParams, tempId: string) => void;
  onCreate?: (searchText: string, tempId: string) => void;
  onSelect: (index: number, item: any, tempId: string) => void;
  onReset: (index: number, tempId: string) => void;
}

const AssignEntity = ({
  index,
  tempId,
  assignValue,
  result,
  params = {},
  disabled = false,
  optionLabel,
  isLoading,
  placeholder = '',
  showCreateNew = false,
  existRelation,
  showError,
  disableClearable = true,
  inputLabel = 'Client Name',
  styleClass = '',
  isRequired,
  search,
  onSelect,
  onCreate,
  renderOption,
  onReset,
}: IAssignEntityProps) => {
  const classes = useStyles();
  const [searchText, setSearch] = useState<string>('');
  const [currentRelation, setRelation] = useState<boolean>(existRelation);
  const debouncedSearch = useDebounce(searchText, 350);

  const query = useMemo(() => ({ isDeveloper: false, maxItems: 30, ...params }), [params]);
  const showPopper = useMemo(() => debouncedSearch.length >= 3, [debouncedSearch]);
  const resultList = useMemo(() => (showCreateNew && debouncedSearch.length >= 3 ? [...result, { [optionLabel]: '', isCreateNew: true }] : result), [
    showCreateNew,
    result,
    optionLabel,
    debouncedSearch,
  ]);

  const getOptionLabel = useCallback(option => (option && option[optionLabel] ? option[optionLabel] : ''), [optionLabel]);

  const onSearchChange = useCallback(
    event => {
      event.persist();
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const filterOptionListWithCreate = useCallback(
    (optionList, value) => {
      return optionList.filter(opt => opt[optionLabel].toLowerCase().indexOf(value.inputValue.toLowerCase()) !== -1 || opt.isCreateNew);
    },
    [optionLabel]
  );

  const filterOptionList = useCallback(
    (optionList, value) => {
      return optionList.filter(opt => opt[optionLabel].toLowerCase().indexOf(value.inputValue.toLowerCase()) !== -1);
    },
    [optionLabel]
  );

  const filterOptions = useMemo(() => (showCreateNew ? filterOptionListWithCreate : filterOptionList), [
    showCreateNew,
    filterOptionListWithCreate,
    filterOptionList,
  ]);

  const onCreateHandler = useCallback(() => {
    onCreate(debouncedSearch, tempId);
  }, [onCreate, debouncedSearch, tempId]);

  const autocompleteInput = useCallback(
    inputParams => (
      <TextField
        onChange={onSearchChange}
        variant="outlined"
        autoComplete="off"
        placeholder={placeholder}
        fullWidth={true}
        inputProps={{
          'data-testid': 'assign-entity-input',
        }}
        {...inputParams}
      />
    ),
    [onSearchChange, placeholder]
  );

  const onCloseHandler = useCallback(
    (event, reason) => {
      if (reason === 'blur' && assignValue && assignValue.id === null) {
        onReset(index, tempId);
      }
    },
    [onReset, assignValue, index, tempId]
  );

  const onSelectItem = useCallback(
    (item, value) => {
      onSelect(index, value, tempId);
    },
    [tempId, index, onSelect]
  );

  const onRenderOption = useCallback(
    (opt, { inputValue }) => {
      if (opt.isCreateNew && showPopper) {
        return (
          <div className={classes.createButtonWrapper}>
            <Button data-testid="create-entity" className={classes.createButton} disableTouchRipple={true} onClick={onCreateHandler}>
              + Create New Client {debouncedSearch}
            </Button>
          </div>
        );
      }
      return renderOption(opt, inputValue);
    },
    [debouncedSearch, renderOption, onCreateHandler, showPopper, classes]
  );

  useEffect(() => {
    setRelation(existRelation);
  }, [existRelation]);

  useEffect(() => {
    if (currentRelation && !existRelation) setSearch('');
  }, [currentRelation, existRelation, setSearch]);

  useEffect(() => {
    if (debouncedSearch.length >= 3) search({ ...query, nameContains: debouncedSearch }, tempId);
  }, [search, debouncedSearch, tempId]); // eslint-disable-line

  return (
    <ControlledInput styleClass={`${classes.autoCompleteWrapper} ${styleClass}`} label={inputLabel} required={isRequired} showMark={isRequired}>
      <Autocomplete
        id="autocomplete-assign"
        data-testid="autocomplete-wrapper"
        disableClearable={disableClearable}
        options={resultList}
        value={assignValue}
        loading={isLoading}
        disabled={disabled}
        className={getConditionalDefaultValue(showError, classes.errorInput, '')}
        PopperComponent={props =>
          showPopper && (
            <Popper
              disablePortal={true}
              placement={'bottom-start'}
              {...props}
              style={{
                display: 'block',
                position: 'absolute',
                width: '100%',
                left: '0px',
              }}
            />
          )
        }
        onClose={onCloseHandler}
        freeSolo={true}
        onChange={onSelectItem}
        filterOptions={filterOptions}
        getOptionLabel={getOptionLabel}
        renderInput={autocompleteInput}
        renderOption={onRenderOption}
      />
    </ControlledInput>
  );
};

export default memo(AssignEntity);
