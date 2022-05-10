import React, { memo, useCallback, useEffect, useMemo, useReducer } from 'react';

import { FormControl, InputAdornment, Paper, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ProcoreLogo from 'assets/images/procore.logo.text.png';
import FCALogo from 'assets/images/fca.logo.blue.svg';
import { useStyles } from '../styles';
import { useStyles as buttonStyles } from '../../../shared/FormHandler/ControlledButton/styles';
import { useStyles as formControlStyels } from '../../../shared/FormHandler/ControlledInput/styles';

import ButtonLoader from 'modules/views/shared/ButtonLoader';
import Switch from 'modules/views/shared/Switch';
import { InfoIcon, NextIcon, CheckIcon, SearchIcon } from '../../../../../constants';
import { ProcoreMappingStatus } from 'modules/models/procore';

interface IMappingOption {
  name: string;
  id: any;
  extraId?: string;
}

interface IMappingItem {
  name: string;
  id: string;
  status: ProcoreMappingStatus;
  mapId: string | null;
  extraId?: string | null;
  isDisabled: boolean;
}

export interface INewMapping {
  itemId: string;
  mapId: string;
  disabled: boolean;
}

export interface IMappingProps {
  vendorMode?: boolean;
  options: IMappingOption[];
  items: IMappingItem[];
  saving?: boolean;
  onSave: (mappings: INewMapping[]) => void;
}

export const noOption: IMappingOption = {
  name: 'Select Option',
  id: 'no-value',
};

interface IMapState {
  [key: string]: {
    mapId: null | string;
    initialMapId: null | string;
    disabled: boolean;
    initialDisabled: boolean;
    hasChanges: boolean;
  };
}
interface IMapAction {
  type: 'set-map' | 'clear-map' | 'disable-map';
  payload: {
    id: string;
    mapId?: string;
  };
}
interface IInitializeMappingsAction {
  type: 'initialize-mappings';
  payload: IMapState;
}
const mappingsReducer = (state: IMapState, action: IMapAction | IInitializeMappingsAction): IMapState => {
  if (action.type === 'initialize-mappings') return action.payload;

  let { id, mapId } = action.payload;
  const match = state[id];
  switch (action.type) {
    case 'set-map':
      return { ...state, [id]: { ...match, mapId, disabled: false, hasChanges: mapId !== match.initialMapId } };
    case 'clear-map':
      return { ...state, [action.payload.id]: { ...match, mapId: null, disabled: false, hasChanges: match.initialMapId !== null || match.initialDisabled } };
    case 'disable-map':
      return { ...state, [action.payload.id]: { ...match, mapId: null, disabled: true, hasChanges: !match.initialDisabled } };
    /* istanbul ignore next */
    default:
      throw Error('No action should reach here');
  }
};

const getInitialMappings = (items: IMappingItem[]): IMapState => {
  const initialMatches = {};
  items.forEach(item => {
    if (!item.isDisabled && item.status === ProcoreMappingStatus.SUGGESTED) {
      initialMatches[item.id] = { mapId: item.mapId, disabled: false, initialMapId: null, initialDisabled: false, hasChanges: true };
    } else if (item.isDisabled) {
      initialMatches[item.id] = { mapId: null, disabled: true, initialMapId: null, initialDisabled: true, hasChanges: false };
    } else if (item.mapId) {
      initialMatches[item.id] = { mapId: item.mapId, disabled: false, initialMapId: item.mapId, initialDisabled: false, hasChanges: false };
    } else {
      initialMatches[item.id] = { mapId: null, disabled: false, initialMapId: null, initialDisabled: false, hasChanges: false };
    }
  });
  return initialMatches;
};

const sortMappings = (itemA: IMappingItem, itemB: IMappingItem) =>
  (itemA.isDisabled && !itemB.isDisabled) || (itemA.status === ProcoreMappingStatus.MAPPED && itemB.status !== ProcoreMappingStatus.MAPPED) ? 1 : -1;

const Mapping = ({ vendorMode = false, saving = false, onSave, options, items }: IMappingProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const formControlClasses = formControlStyels();

  // Matches between items and options
  const [matches, dispatch] = useReducer(mappingsReducer, {});

  // Initialize matches and reset saved state after items gets updated on save
  useEffect(() => dispatch({ type: 'initialize-mappings', payload: getInitialMappings(items) }), [items]);

  const saveButtonEnabled = useMemo(() => Object.entries(matches).filter(item => item[1].hasChanges).length, [matches]);

  // Add TPIN number to the name of the option. This is going away when we create the custom search/select component for this view
  const transformedOptions = useMemo(
    () => (!vendorMode ? options : options.map(opt => ({ ...opt, name: `${opt.name}${opt.extraId !== null ? ` - TPIN: ${opt.extraId}` : ''}` }))),
    [options, vendorMode]
  );

  /*
    Remove procoreId from suggested items to appear as changes that needs to be saved
    Sort Items to show first the not mapped, then the saved and then the disabled ones
    why? Suggested items have the same property of properly mappeds items but they need to be saved to change the status to MAPPED
  */
  const transformedItems = useMemo(() => [...items].sort(sortMappings), [items]);

  // Create a list of options whithout the already in use options.
  const optionsList = useMemo(() => {
    const inUse = transformedItems.map(item => (!item.isDisabled ? matches[item.id]?.mapId || item.mapId : null));
    return transformedOptions.filter(opt => !inUse.includes(opt.id));
  }, [transformedOptions, transformedItems, matches]);

  // Map to simplify the insertion of the selected option (removed above) on the row its using it
  const allOptionsMap = useMemo(() => {
    const optionsMap = new Map();
    transformedOptions.forEach(opt => optionsMap.set(opt.id, opt));
    return optionsMap;
  }, [transformedOptions]);

  const getRowStatusIcon = useCallback(
    item => {
      const matchState = matches[item.id];
      if (matchState?.disabled) {
        return <div data-testid="procore-map-status-icon" className={`${classes.iconSaved}`} />;
      } else if (matchState && matchState.mapId && matchState.mapId !== noOption.id) {
        if (matchState.hasChanges) {
          return <CheckIcon data-testid="procore-map-status-icon" className={classes.iconCheck} title="Mapped" />;
        } else {
          return <CheckIcon data-testid="procore-map-status-icon" className={classes.iconSaved} title="Saved" />;
        }
      }
      return <InfoIcon data-testid="procore-map-status-icon" className={classes.iconInfo} title="Not Mapped" />;
    },
    [classes, matches]
  );

  const getRowValue = useCallback(
    item => {
      return matches[item.id]?.mapId || item.mapId || noOption.id;
    },
    [matches]
  );

  const getRowSelectedOption = useCallback(
    item => {
      const selectedItemKey = getRowValue(item);
      let selectedItem = null;
      let i = 0;
      while (selectedItem === null && i < Object.keys(options).length) {
        if (options[i].id === selectedItemKey) {
          selectedItem = options[i];
        }
        i++;
      }
      return selectedItem || noOption;
    },
    [getRowValue, options]
  );

  const getRowOptions = useCallback(
    (item): IMappingOption[] => {
      const val = getRowValue(item);
      const selOption = allOptionsMap.get(val);
      return [noOption].concat(selOption ? [selOption] : [], optionsList);
    },
    [allOptionsMap, optionsList, getRowValue]
  );

  const onChange = (itemId, val) => dispatch({ type: 'set-map', payload: { id: itemId, mapId: val } });

  const toggleDisableMap = (item, isDisabled: boolean) => {
    if (isDisabled) {
      dispatch({ type: 'clear-map', payload: { id: item.id } });
    } else {
      dispatch({ type: 'disable-map', payload: { id: item.id } });
    }
  };

  const saveMatches = () => {
    const newMappings = Object.keys(matches)
      .filter(key => matches[key].hasChanges)
      .map(key => ({
        itemId: key,
        mapId: matches[key].mapId === noOption.id ? null : matches[key].mapId,
        disabled: matches[key].disabled,
      }));
    onSave(newMappings);
  };

  return (
    <Paper variant="outlined" className={classes.mappingContainer}>
      <div className={classes.mappingRowHeader}>
        <div className={classes.mappingRowContent}>
          <img src={FCALogo} className={`${classes.logo}`} alt="logo-fca" />
        </div>
        <div className={classes.mappingRowContent}>
          <img src={ProcoreLogo} className={`${classes.logo}`} alt="logo-procore" />
          <div className={classes.actionButtons}>
            <ButtonLoader
              text="Save Mapping"
              data-testid="save-mapping-btn"
              color="primary"
              disabled={!saveButtonEnabled}
              variant="contained"
              isLoading={saving}
              loadingText="Saving"
              onClick={saveMatches}
              className={`${buttonClasses.primaryButtonLarge} ${classes.mappingButton}`}
            />
          </div>
        </div>
      </div>
      {transformedItems.map(item => {
        const isDisabled = matches[item.id]?.disabled;
        return (
          <div key={`row-${vendorMode ? 'client' : 'project'}-${item.id}`} className={classes.mappingRow} data-testid="procore-map-row">
            <div className={classes.mappingColumn}>
              <Typography align="left" className={classes.mappingRowLabel}>
                {vendorMode && 'Client Name'}
                {!vendorMode && 'Project Name'}
                {vendorMode && <span>TPIN: {item.extraId}</span>}
              </Typography>
              <div className={classes.mappingRowIndicator}>
                <span className={classes.mappingItemName}>{item.name}</span>
                {item.status === ProcoreMappingStatus.SUGGESTED && getRowValue(item) === item.mapId && (
                  <span className={classes.mappingSuggestion}>Suggested Mapping</span>
                )}
                <NextIcon className={classes.mappingItemIcon} />
              </div>
            </div>
            <div className={classes.mappingColumn}>
              <Autocomplete
                value={getRowSelectedOption(item)}
                autoHighlight={true}
                disabled={isDisabled}
                getOptionLabel={option => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                handleHomeEndKeys={true}
                data-testid="procore-map-select"
                selectOnFocus={false}
                onChange={(event, val, reason) => {
                  if (event.type === 'click' && reason === 'clear') {
                    onChange(item.id, noOption.id); // trigger clean
                  } else if (val && val.id) {
                    onChange(item.id, val.id); // only trigger change if a value is selected
                  }
                  // ignore other changes that would clean the value
                }}
                options={getRowOptions(item)}
                renderInput={({ InputProps, ...params }) => (
                  <>
                    <Typography align="left" className={classes.mappingRowLabel}>
                      {vendorMode && 'Vendor ID'}
                      {!vendorMode && 'Project Name'}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FormControl className={`${formControlClasses.formControl} ${isDisabled ? 'disabled' : ''}`}>
                        <div className={classes.mappingInputFilter}>
                          <TextField
                            {...params}
                            autoComplete="off"
                            InputProps={{
                              ...InputProps,
                              autoComplete: 'new-password', // prevents autofill
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                              className: classes.autocompleteInput,
                            }}
                            data-testid="procore-map-select-input"
                            variant="outlined"
                            ref={InputProps.ref}
                          />
                          {getRowStatusIcon(item)}
                        </div>
                      </FormControl>
                      <div className={classes.switchWrapper}>
                        <Switch
                          checked={!isDisabled}
                          data-testid="procore-disable-map-input"
                          onChange={() => toggleDisableMap(item, isDisabled)}
                          color="primary"
                        />
                      </div>
                    </div>
                  </>
                )}
              />
            </div>
          </div>
        );
      })}
    </Paper>
  );
};

export default memo(Mapping);
