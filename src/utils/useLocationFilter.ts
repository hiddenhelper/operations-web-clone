import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GeneralModel } from '../modules/models';
import { generalState } from '../modules/state-mgmt/general';
import { IRootState } from '../modules/state-mgmt/rootState';
import { getLocationList, getConditionalDefaultValue, deleteObjectItem } from './generalUtils';
import { stateMap } from '../constants';

export interface IUseLocationFilterProps {
  queryParams: GeneralModel.IQueryParams;
  setQueryParams?: (params: GeneralModel.IQueryParams) => void;
}

export const useLocationFilter = ({ queryParams, setQueryParams }: IUseLocationFilterProps) => {
  const dispatch = useDispatch();
  const countryList = useSelector((state: IRootState) => state.general.countryList);

  const getCountryCodeFromParam = useCallback(
    (countryCode: string) => {
      return countryList
        .find(country => country.code === countryCode)
        ?.name.replace(' ', '')
        .toUpperCase();
    },
    [countryList]
  );

  const [locationCode, setLocationCode] = useState('');

  const countryMap: { [key: string]: GeneralModel.INamedEntity } = useMemo(
    () => ({
      ...Object.values(countryList).reduce((acc, country) => {
        return { ...acc, [country.name.replace(' ', '').toUpperCase()]: country };
      }, {}),
    }),
    [countryList]
  );

  const locationOptionList = useMemo(() => [...getLocationList(), ...Object.entries(countryMap).map(([key, value]) => ({ id: key, name: value?.name }))], [
    countryMap,
  ]);

  const isLocationSelected = useMemo(() => queryParams.stateCode || queryParams.countryCode, [queryParams.stateCode, queryParams.countryCode]);

  const getLocationName = useCallback(
    (params: GeneralModel.IQueryParams) => {
      /* istanbul ignore else */
      if (params.stateCode?.length) return stateMap[params.stateCode];
      /* istanbul ignore else */
      if (params.countryCode && countryMap[locationCode]) return countryMap[locationCode].name;
    },
    [countryMap, locationCode]
  );

  const locationLabel = useMemo(() => getConditionalDefaultValue(isLocationSelected, getLocationName(queryParams), 'All Locations'), [
    isLocationSelected,
    queryParams,
    getLocationName,
  ]);

  const getLocationCode = useCallback(
    (code: string): { stateCode: string; countryCode: string } => {
      let stateCode = code;
      let countryCode = undefined;
      if (code.length > 2) {
        stateCode = undefined;
        countryCode = countryMap[code].code;
      }
      return { stateCode, countryCode };
    },
    [countryMap]
  );

  const onLocationChange = useCallback(
    (stateCode: string, params: GeneralModel.IQueryParams = {}) => {
      setLocationCode(stateCode);
      setQueryParams({ ...deleteObjectItem(queryParams, 'stateCode'), ...getLocationCode(stateCode), ...params });
    },
    [queryParams, setQueryParams, getLocationCode]
  );

  useEffect(() => {
    dispatch(generalState.actions.fetchCountryListStart());
  }, []); // eslint-disable-line

  useEffect(() => {
    if (countryList.length) {
      const initialLocationCode = queryParams.stateCode?.length ? queryParams.stateCode : getCountryCodeFromParam(queryParams.countryCode);
      setLocationCode(initialLocationCode);
    }
  }, [countryList, queryParams, getCountryCodeFromParam]);

  return [locationOptionList, locationLabel, onLocationChange, getLocationName, getLocationCode, locationCode];
};
