import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import AutocompleteAddress from '../../AutocompleteAddress';
import ControlledInput from '../../FormHandler/ControlledInput';
import ControlledSelect from '../../FormHandler/ControlledSelect';
import ControlledError from '../../FormHandler/ControlledError';
import ControlledMaskInput from '../../FormHandler/ControlledMaskInput';

import { AddressModel, GeneralModel } from '../../../../models';
import { stateMap, CountryCode } from '../../../../../constants';
import { getConditionalDefaultValue, getDefaultValue, isEmpty } from '../../../../../utils/generalUtils';
import { isNYCity, isNYState, formatZipCode, getZipCodeMaskByCountry } from '../../../../../utils/addressUtils';
import { formGlobalStyles, generalGlobalStyles } from '../../../../../assets/styles';
import { useStyles } from './styles';
import { IFormRules } from 'utils';
export interface IAddressFormProps {
  addressModel: AddressModel.IAddress;
  modelProperty: string;
  errors: any;
  optional?: boolean;
  line1Placeholder?: string;
  line2Placeholder?: string;
  includeCounty?: boolean;
  includeAttentionField?: boolean;
  showAttentionHint?: boolean;
  countryList: GeneralModel.INamedEntity[];
  labelRules?: IFormRules;
  fetchCountryList: () => void;
  onChange: (event: any) => void;
}

const AddressForm = ({
  addressModel,
  modelProperty,
  errors,
  optional = false,
  line1Placeholder,
  line2Placeholder,
  includeCounty = false,
  includeAttentionField,
  countryList,
  showAttentionHint = true,
  labelRules,
  fetchCountryList,
  onChange,
}: IAddressFormProps) => {
  const classes = useStyles();
  const formClasses = formGlobalStyles();
  const generalGlobalClasses = generalGlobalStyles();

  const [response, setResponse] = useState(null);

  const [query, setQuery] = useState<string>('');
  const [countryCode, setCountryCode] = useState<CountryCode>(CountryCode.UNITED_STATES);
  const [zipCode, setZipCode] = useState<string>(getDefaultValue(addressModel.zipCode, ''));

  const mapInputRef = useMemo(() => React.createRef(), []);
  const inputRef = useMemo(() => React.createRef(), []);

  const zipCodeFormatMask = useMemo(() => getZipCodeMaskByCountry(countryCode, zipCode), [zipCode, countryCode]);
  const stateOptionList = useMemo(() => Object.entries(stateMap).map(([key, value]) => ({ value: key, label: value })), []);

  const countryOptionList = useMemo(() => countryList.map(item => ({ value: item.id, label: item.name })), [countryList]);
  const isNYResident = useMemo(() => isNYState(addressModel.stateCode) && isNYCity(addressModel.city), [addressModel.stateCode, addressModel.city]);
  const nyBoroughList = useMemo(() => AddressModel.boroughOptionList.map(borough => borough.value), []);

  // const getErrors = useCallback(
  //   (field, customError = 'is required') => {
  //     if (errors && errors[modelProperty])
  //       return errors[modelProperty][field] && errors[modelProperty][field] === 'is required' ? customError : errors[modelProperty][field];
  //     if (errors && errors[`${modelProperty}.${field}`]) return errors[`${modelProperty}.${field}`];
  //   },
  //   [errors, modelProperty]
  // );

  const handleStateChange = useCallback(
    /* istanbul ignore next */ e => {
      let newQuery = `${addressModel.line1}, ${stateMap[e.target.value]}`;
      setQuery(newQuery);
    },
    [setQuery, addressModel]
  );

  const handleSecondaryAddressInputChange = useCallback(
    e => {
      e.persist();
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          [e.target.name]: e.target.value,
          [modelProperty]: { ...addressModel, [e.target.name]: e.target.value },
        })
      );
    },
    [onChange, modelProperty, addressModel]
  );

  const getCountryCodeById = useCallback((id: string): CountryCode => countryList.find(item => item.id === id)?.code as any, [countryList]);

  const handleCountryChange = useCallback(
    event => {
      setCountryCode(getCountryCodeById(event.target.value));
      const updatedData = {
        line1: '',
        stateCode: null,
        zipCode: null,
        countryId: event.target.value,
        city: null,
        county: null,
        borough: null,
        stateName: null,
      };

      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          ...updatedData,
          [modelProperty]: {
            ...prevState[modelProperty],
            ...updatedData,
          },
        })
      );
    },
    [modelProperty, setCountryCode, getCountryCodeById, onChange]
  );

  const handleZipCodeChange = useCallback(
    event => {
      setZipCode(event.target.value);
      handleSecondaryAddressInputChange(event);
    },
    [setZipCode, handleSecondaryAddressInputChange]
  );

  const handleAddressResponse = useCallback(
    /* istanbul ignore next */ (address, geometry) => {
      setResponse({ address, geometry });
    },
    [setResponse]
  );

  useEffect(() => {
    /* istanbul ignore next */
    if (response) {
      let countryResponse = null;
      let countryCodeResponse = CountryCode.UNITED_STATES;
      if (response.address.country) {
        countryResponse = countryList.find(item => item.name === response.address.country);
        countryCodeResponse = getCountryCodeById(countryResponse.id);
        setCountryCode(countryCodeResponse);
      }
      const newData = {
        line1: `${getDefaultValue(response.address.street_number, '')} ${getDefaultValue(response.address.route, '')}`,
        zipCode: getConditionalDefaultValue(response.address.postal_code, formatZipCode(response.address.postal_code), null),
        countryId: getDefaultValue(countryResponse?.id, null),
        city:
          isEmpty(response.address.locality) &&
          isNYState(response.address.administrative_area_level_1_short) &&
          nyBoroughList.includes(response.address.sublocality_level_1)
            ? stateMap.NY
            : response.address.locality,
        county: response.address.administrative_area_level_2,
        borough:
          isNYState(response.address.administrative_area_level_1_short) && nyBoroughList.includes(response.address.sublocality_level_1)
            ? response.address.sublocality_level_1
            : undefined,
        latitude: response.geometry.lat,
        longitude: response.geometry.lng,
        stateCode: response.address.administrative_area_level_1_short,
        stateName: response.address?.administrative_area_level_1,
      };
      onChange(prevState => ({
        ...prevState,
        ...newData,
        [modelProperty]: {
          ...prevState[modelProperty],
          ...newData,
        },
      }));
      setResponse(null);
    }
  }, [response, countryList, modelProperty, nyBoroughList, setResponse, onChange, getCountryCodeById, setCountryCode]);

  useEffect(() => {
    setCountryCode(getConditionalDefaultValue(addressModel.countryId, getCountryCodeById(addressModel.countryId), CountryCode.UNITED_STATES));
  }, [addressModel.countryId, setCountryCode, getCountryCodeById]);

  useEffect(() => {
    fetchCountryList();
  }, [fetchCountryList]);
  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Grid container={true} spacing={3} alignItems="center">
          <Grid item={true} xs={12} lg={6}>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12}>
                <AutocompleteAddress
                  mapInputRef={mapInputRef}
                  location={addressModel.latitude && addressModel.longitude ? { lat: addressModel.latitude, lng: addressModel.longitude } : null}
                  inputRef={inputRef}
                  forcedQuery={query}
                  valueToShow={getDefaultValue(addressModel.line1, '')}
                  onAddressResponse={handleAddressResponse}
                  customLabel={optional ? 'Address Line 1 (Optional)' : null}
                  customPlaceholder={getDefaultValue(line1Placeholder, null)}
                  // error={getErrors('line1')}
                  error={!!errors.line1 && errors.line1 === 'is required' ? 'Line 1 is required.' : errors.line1}
                  showRequiredMark={labelRules?.line1?.required}
                  required={labelRules?.line1?.required}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <div className={classes.errorInputWrapper}>
                  {/* <ControlledError show={!!getErrors('line2')} error={getErrors('line2', 'Line 2 is required.')}> */}
                  <ControlledError show={!!errors.line2} error={!!errors.line2 && errors.line2 === 'is required' ? 'Line 2 is required.' : errors.line2}>
                    <ControlledInput
                      // label={optional ? 'Address Line 2 (Optional)' : 'Address Line 2'}
                      label={'Address Line 2 (Optional)'}
                      required={labelRules?.line2?.required}
                      showMark={labelRules?.line2?.required}
                    >
                      <TextField
                        variant="outlined"
                        placeholder={getDefaultValue(
                          line2Placeholder,
                          getConditionalDefaultValue(showAttentionHint, 'Attention, Office, Building, etc', 'Office, Building, etc')
                        )}
                        type="text"
                        autoComplete="off"
                        name="line2"
                        fullWidth={true}
                        value={getDefaultValue(addressModel.line2, '')}
                        onChange={handleSecondaryAddressInputChange}
                        inputProps={{
                          'data-testid': 'addr-line2',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </Grid>
              {includeAttentionField && (
                <Grid item={true} xs={12} spacing={3}>
                  <Grid container={true} spacing={3}>
                    <Grid item={true} xs={12} sm={6}>
                      <ControlledInput label={'Attention 1 (Optional)'} required={labelRules?.attention1?.required} showMark={labelRules?.attention1?.required}>
                        <TextField
                          variant="outlined"
                          placeholder={'Attention 1'}
                          type="text"
                          autoComplete="off"
                          name="attention1"
                          fullWidth={true}
                          value={getDefaultValue(addressModel.attention1, '')}
                          onChange={handleSecondaryAddressInputChange}
                          inputProps={{
                            'data-testid': 'addr-attention1',
                          }}
                        />
                      </ControlledInput>
                    </Grid>
                    <Grid item={true} xs={12} sm={6}>
                      <ControlledInput label={'Attention 2 (Optional)'} required={labelRules?.attention2?.required} showMark={labelRules?.attention2?.required}>
                        <TextField
                          variant="outlined"
                          placeholder={'Attention 2'}
                          type="text"
                          autoComplete="off"
                          name="attention2"
                          fullWidth={true}
                          value={getDefaultValue(addressModel.attention2, '')}
                          onChange={handleSecondaryAddressInputChange}
                          inputProps={{
                            'data-testid': 'addr-attention2',
                          }}
                        />
                      </ControlledInput>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item={true} xs={12}>
                <Grid container={true} spacing={3}>
                  <Grid item={true} xs={12} sm={6}>
                    <div className={classes.errorInputWrapper}>
                      {/* <ControlledError show={!!getErrors('countryId')} error={getErrors('countryId', 'Country is required.')}> */}
                      <ControlledError
                        show={!!errors.countryId}
                        error={!!errors.countryId && errors.countryId === 'is required' ? 'Country is required.' : errors.countryId}
                      >
                        <ControlledSelect
                          label={optional ? 'Country (Optional)' : 'Country'}
                          name="countryId"
                          value={getDefaultValue(addressModel.countryId, '')}
                          options={countryOptionList}
                          includeNone={true}
                          error={null}
                          onChange={handleCountryChange}
                          inputProps={{
                            'data-testid': 'addr-country',
                          }}
                          required={labelRules?.countryId?.required}
                          showMark={labelRules?.countryId?.required}
                        />
                      </ControlledError>
                    </div>
                  </Grid>
                  <Grid item={true} xs={12} sm={6}>
                    <div className={classes.errorInputWrapper}>
                      {/* <ControlledError show={!!getErrors('stateCode')} error={getErrors('stateCode', 'State Code is required.')}> */}
                      <ControlledError
                        show={!!errors.stateCode}
                        error={!!errors.stateCode && errors.stateCode === 'is required' ? 'State Code is required.' : errors.stateCode}
                      >
                        {countryCode !== CountryCode.UNITED_STATES ? (
                          <ControlledInput
                            label={getConditionalDefaultValue(optional, 'State (Optional)', 'State')}
                            required={labelRules?.stateCode?.required}
                            showMark={labelRules?.stateCode?.required}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <div
                                style={{
                                  padding: '12.5px 15px',
                                  color: 'rgba(0, 0, 0, 0.27)',
                                  display: 'inline-flex',
                                  fontSize: '17px',
                                  border: '2px solid rgba(0, 0, 0, 0.23)',
                                }}
                                className="MuiInputBase-root MuiInputBase-input MuiInputBase-fullWidth MuiOutlinedInput-root"
                              >
                                <div className={generalGlobalClasses.textEllipsis}>{addressModel?.stateName}</div>
                              </div>
                            </div>
                          </ControlledInput>
                        ) : (
                          <ControlledSelect
                            label={optional ? 'State (Optional)' : 'State'}
                            name="stateCode"
                            value={getDefaultValue(addressModel.stateCode, '')}
                            options={stateOptionList}
                            includeNone={true}
                            error={null}
                            onChange={handleStateChange}
                            inputProps={{
                              'data-testid': 'addr-state',
                            }}
                            required={labelRules?.stateCode?.required}
                            showMark={labelRules?.stateCode?.required}
                          />
                        )}
                      </ControlledError>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item={true} xs={12}>
                <Grid container={true} spacing={3}>
                  <Grid item={true} xs={12} sm={3}>
                    <div className={classes.errorInputWrapper}>
                      <ControlledError
                        // show={!!getErrors('zipCode')}
                        // error={getErrors('zipCode', 'Zip Code is required.')}
                        show={!!errors.zipCode}
                        error={!!errors.zipCode && errors.zipCode === 'is required' ? 'required.' : errors.zipCode}
                      >
                        <ControlledInput
                          label={optional ? 'Zip Code (Optional)' : 'Zip Code'}
                          required={labelRules?.zipCode?.required}
                          showMark={labelRules?.zipCode?.required}
                        >
                          <TextField
                            variant="outlined"
                            placeholder={zipCodeFormatMask.placeholder}
                            value={getDefaultValue(addressModel.zipCode, '')}
                            type="text"
                            autoComplete="off"
                            name="zipCode"
                            fullWidth={true}
                            inputProps={{
                              'data-testid': 'zip-code',
                              maxLength: 10,
                              mask: zipCodeFormatMask.mask,
                              placeholderChar: '0',
                              showMask: true,
                              guide: false,
                            }}
                            InputProps={{
                              inputComponent: ControlledMaskInput as any,
                            }}
                            onChange={handleZipCodeChange}
                            required={labelRules?.zipCode?.required}
                          />
                        </ControlledInput>
                      </ControlledError>
                    </div>
                  </Grid>
                  <Grid item={true} xs={12} sm={9}>
                    <div className={classes.errorInputWrapper}>
                      {/* <ControlledError show={!!getErrors('city')} error={getErrors('city', 'City is required.')}> */}
                      <ControlledError show={!!errors.city} error={!!errors.city && errors.city === 'is required' ? 'City is required.' : errors.city}>
                        <ControlledInput
                          label={optional ? 'City (Optional)' : 'City'}
                          required={labelRules?.city?.required}
                          showMark={labelRules?.city?.required}
                        >
                          <TextField
                            variant="outlined"
                            placeholder="City"
                            value={getDefaultValue(addressModel.city, '')}
                            type="text"
                            autoComplete="off"
                            name="city"
                            fullWidth={true}
                            onChange={handleSecondaryAddressInputChange}
                            inputProps={{
                              'data-testid': 'addr-city',
                            }}
                            required={labelRules?.city?.required}
                          />
                        </ControlledInput>
                      </ControlledError>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item={true} xs={12} lg={12}>
                {includeCounty && (
                  <Grid container={true} className={classes.middleWrapper}>
                    <Grid item={true} xl={getConditionalDefaultValue(isNYResident, 6, 12)} lg={getConditionalDefaultValue(isNYResident, 6, 12)}>
                      <div className={classes.errorInputWrapper}>
                        {/* <ControlledError show={!!getErrors('county')} error={getErrors('county', 'County is required.')}> */}
                        <ControlledError
                          show={!!errors.county}
                          error={!!errors.county && errors.county === 'is required' ? 'County is required.' : errors.county}
                        >
                          <ControlledInput
                            styleClass={classes.county}
                            label={optional ? 'County (Optional)' : 'County'}
                            required={labelRules?.county?.required}
                            showMark={labelRules?.county?.required}
                          >
                            <TextField
                              variant="outlined"
                              placeholder="County"
                              type="text"
                              autoComplete="off"
                              name="county"
                              fullWidth={true}
                              value={getDefaultValue(addressModel.county, '')}
                              onChange={handleSecondaryAddressInputChange}
                              inputProps={{
                                'data-testid': 'addr-county',
                              }}
                              required={labelRules?.county?.required}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </div>
                    </Grid>
                    {isNYResident && (
                      <Grid item={true} md={6} xl={6} lg={6}>
                        <div className={classes.errorInputWrapper}>
                          {/* <ControlledError show={!!getErrors('borough')} error={getErrors('borough', 'NYC Borough is required.')}> */}
                          <ControlledError
                            show={!!errors.borough}
                            error={!!errors.borough && errors.borough === 'is required' ? 'NYC Borough is required.' : errors.county}
                          >
                            <ControlledSelect
                              label={optional ? 'NYC Borough (Optional)' : 'NYC Borough'}
                              name="borough"
                              value={getDefaultValue(addressModel.borough, '')}
                              options={AddressModel.boroughOptionList}
                              includeNone={true}
                              error={null}
                              onChange={handleSecondaryAddressInputChange}
                              inputProps={{
                                'data-testid': 'addr-nyc-borough',
                              }}
                            />
                          </ControlledError>
                        </div>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} lg={6}>
            <div className={`${formClasses.mapWrapper} ${classes.mapWrapper}`}>
              <div
                id={`${modelProperty}-map`}
                className={`${formClasses.mapWrapper} ${getConditionalDefaultValue(includeCounty, formClasses.mapWithCounty, '')} ${getConditionalDefaultValue(
                  includeAttentionField,
                  formClasses.mapWithAttentionField,
                  ''
                )}`}
                ref={mapInputRef as any}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(AddressForm);
