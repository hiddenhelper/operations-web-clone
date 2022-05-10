import React, { memo, useCallback } from 'react';
import { Checkbox, TextField } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';

import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput/ControlledInput';

import { CertificationModel, GeneralModel, TrainingModel } from 'modules/models';
import { inputGlobalStyles } from 'assets/styles/Inputs/styles';
import { useStyles as projectStyles } from '../../../styles';
import { useStyles } from './styles';

const isOptionSelected = (option, value) => value.id === option.id;
const getOptionLabel = option => option.name;
const noRender = () => null;
const renderOption = (option, { selected }) => (
  <>
    <Checkbox checked={selected} color="primary" />
    {option.name}
  </>
);

interface IAutocompleteProps {
  handleChanges: (event: any, selectedItems: any) => void;
  label: string;
  noOptionsText: string;
  options: GeneralModel.INamedEntity[];
  selectedItems: CertificationModel.IProjectCertification[] | TrainingModel.IProjectTraining[];
}

const Autocomplete = ({ handleChanges, label, noOptionsText, options, selectedItems }: IAutocompleteProps) => {
  const classes = useStyles();
  const projectClasses = projectStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const renderInput = useCallback(
    params => (
      <TextField
        {...params}
        className={`${inputGlobalClasses.selectInput} ${classes.autocompleteTextInput}`}
        data-testid="autocomplete-input-wrapper"
        placeholder="Select Options"
        variant="outlined"
      />
    ),
    [inputGlobalClasses.selectInput, classes.autocompleteTextInput]
  );

  return (
    <ControlledInput styleClass={classes.autocompleteWrapper} label={label}>
      <MuiAutocomplete
        classes={{
          root: classes.autocomplete,
          popper: projectClasses.popperWrapper,
          groupLabel: classes.autocompleteGroupLabel,
        }}
        disablePortal={true}
        disableClearable={true}
        disableCloseOnSelect={true}
        getOptionLabel={getOptionLabel}
        getOptionSelected={isOptionSelected}
        multiple={true}
        noOptionsText={noOptionsText}
        onChange={handleChanges}
        options={options}
        renderInput={renderInput}
        renderOption={renderOption}
        renderTags={noRender}
        value={selectedItems}
      />
    </ControlledInput>
  );
};

export default memo(Autocomplete);
