import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import TextField from '@material-ui/core/TextField';

import ControlledInput from '../FormHandler/ControlledInput';
import ControlledError from '../FormHandler/ControlledError';

import { AutocompleteService, IAutocompletedAddress, IGeometry } from '../../../services/AutocompleteService';
// import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IAutocompleteAddressProps {
  mapInputRef: React.RefObject<any>;
  location?: {
    lat: number;
    lng: number;
  };
  inputRef: React.RefObject<any>;
  valueToShow: string;
  forcedQuery?: string;
  error?: string;
  customLabel?: string;
  customPlaceholder?: string;
  showRequiredMark?: boolean;
  onAddressResponse: (address: IAutocompletedAddress, geometry: IGeometry) => void;
  required?: boolean;
  name?: string;
  handleSetStringAdd?: (event: any) => void;
}

const AutocompleteAddress = ({
  valueToShow,
  mapInputRef,
  location,
  inputRef,
  forcedQuery,
  customLabel,
  customPlaceholder,
  error,
  showRequiredMark,
  onAddressResponse,
  required,
  name,
  handleSetStringAdd,
}: IAutocompleteAddressProps) => {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState(valueToShow);
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLng, setCurrentLng] = useState(null);
  const [map, setMap] = useState(null);
  const enableSearch = useCallback(() => setSearching(true), [setSearching]);
  const disableSearch = useCallback(() => setSearching(false), [setSearching]);
  const handleQueryChange = useCallback(
    e => {
      handleSetStringAdd(e);
      setQuery(e.target.value);
      setSearching(true);
    },
    // eslint-disable-next-line
    [setQuery, setSearching]
  );
  const classes: any = useStyles();
  const autocompleteService = useMemo(() => new AutocompleteService(), []);

  const forceAutocompleteUpdate = useCallback(
    /* istanbul ignore next */ newQuery => {
      autocompleteService.replaceResponse(newQuery, mapInputRef);
    },
    [autocompleteService, mapInputRef]
  );

  useEffect(() => setQuery(valueToShow), [valueToShow]);

  useEffect(() => {
    /* istanbul ignore else */
    if (forcedQuery) forceAutocompleteUpdate(forcedQuery);
  }, [forcedQuery, forceAutocompleteUpdate]);

  useEffect(() => {
    autocompleteService.init({}).then(() => {
      autocompleteService.initializeInput({ inputRef, onResponse: onAddressResponse, map: mapInputRef });
      if (location && (location.lat !== currentLat || location.lng !== currentLng || mapInputRef !== map)) {
        setCurrentLat(location.lat);
        setCurrentLng(location.lng);
        return autocompleteService.initMap(mapInputRef.current, location.lat, location.lng);
      }
      /* istanbul ignore else */
      if (mapInputRef !== map) {
        setMap(mapInputRef);
        return autocompleteService.initMap(mapInputRef.current);
      }
    });
  }, []); // eslint-disable-line

  return (
    <div className={classes.errorInputWrapper}>
      <ControlledError show={!!error} error={error} styleClass={classes.errorPosition}>
        <ControlledInput label={customLabel || 'Address Line 1'} required={showRequiredMark} showMark={showRequiredMark}>
          <TextField
            variant="outlined"
            data-testid="addr-line1-wrapper"
            placeholder={customPlaceholder ? customPlaceholder : 'Address'}
            type="text"
            value={searching ? query : valueToShow}
            inputRef={inputRef}
            autoComplete="off"
            name={name || 'name'}
            fullWidth={true}
            onFocus={enableSearch}
            onBlur={disableSearch}
            onChange={handleQueryChange}
            inputProps={{
              'data-testid': 'addr-line1',
            }}
            required={required}
          />
        </ControlledInput>
      </ControlledError>
    </div>
  );
};

export default memo(AutocompleteAddress);
