import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import PersonalInformation from './PersonalInformation';
import HomeAddress from './HomeAddress';
import EmergencyContact from './EmergencyContact';
import IDInformation from './IDInformation';
import WorkerTrades from './WorkerTrades';
import RequiredInformation from './RequiredInformation';

import { ClientModel, GeneralModel, WorkerModel } from '../../../../models';
import { IFormRules } from '../../../../../utils/useValidator';
import { getConditionalDefaultValue, getFormattedOptionList, isEmpty } from '../../../../../utils/generalUtils';
import { useStyles } from '../styles';

export interface IWorkerFormProps {
  isFcaUser: boolean;
  company: ClientModel.IClient;
  model: WorkerModel.IWorker;
  formRules: IFormRules;
  errors: any;
  ethnicityList: WorkerModel.IEthnicity[];
  languageList: WorkerModel.ILanguage[];
  skilledTradeList: WorkerModel.ISkilledTrade[];
  uiRelationMap: GeneralModel.IRelationUiMap;
  searchLoading: GeneralModel.ILoadingStatus;
  identificationTypeList: WorkerModel.IIdentificationType[];
  isEdit: boolean;
  onChange: (model: any) => void;
  updateRules: (s: IFormRules | ((p: IFormRules) => IFormRules)) => void;
  fetchCompany: () => void;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId) => void;
  countryList?: GeneralModel.INamedEntity[];
  geographicLocationsList: WorkerModel.IGeographicLocation[];
}

const WorkerForm = ({
  isFcaUser,
  company,
  model,
  formRules,
  errors,
  ethnicityList,
  languageList,
  skilledTradeList,
  identificationTypeList,
  uiRelationMap,
  searchLoading,
  isEdit,
  onChange,
  updateRules,
  fetchCompany,
  searchCompanies,
  countryList,
  geographicLocationsList,
}: IWorkerFormProps) => {
  const classes = useStyles();
  const ethnicityListOptions = useMemo(() => ethnicityList.map(getFormattedOptionList), [ethnicityList]);
  const languageListOptions = useMemo(() => languageList.map(getFormattedOptionList), [languageList]);
  const identificationTypeOptions = useMemo(() => identificationTypeList.map(getFormattedOptionList), [identificationTypeList]);
  const geographicLocationsOptions = useMemo(() => {
    if (identificationTypeList.length > 0 && geographicLocationsList.length > 0 && model.identificationTypeId) {
      const identificationsFiltered = identificationTypeList.filter(type => type.id === model.identificationTypeId)[0];
      const locationsFiltered = geographicLocationsList.filter(type => identificationsFiltered.geographicLocationsIds.includes(type.id));
      if (locationsFiltered.length !== 0) {
        return locationsFiltered.map(getFormattedOptionList);
      }
    }
    return [];
  }, [identificationTypeList, geographicLocationsList, model.identificationTypeId]);
  const [emailHasChanges, setEmailHasChanges] = useState(false);

  const hasCustomPrimaryLanguage = useMemo<boolean>(() => languageList.find(item => item.id === model.primaryLanguageId)?.name === 'Other', [
    languageList,
    model.primaryLanguageId,
  ]);

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      if (event.target.name === 'email') setEmailHasChanges(true);
      if (event.target.name === 'primaryLanguageId' && hasCustomPrimaryLanguage) {
        onChange(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value,
          otherPrimaryLanguage: null,
        }));
      } else if (event.target.name === 'identificationTypeId') {
        onChange(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value,
          identificationGeographicLocationId: '',
        }));
      } else {
        onChange(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }
    },
    [onChange, hasCustomPrimaryLanguage]
  );

  useEffect(() => updateRules(rules => ({ ...rules, otherPrimaryLanguage: { required: model?.id && hasCustomPrimaryLanguage } })), [
    hasCustomPrimaryLanguage,
    model,
    updateRules,
  ]);

  const onBooleanChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: getConditionalDefaultValue(isEmpty(event.target.value), null, !!Number(event.target.value)),
      }));
    },
    [onChange]
  );

  return (
    <div className={classes.workerFormWrapper}>
      <RequiredInformation
        model={model}
        company={company}
        isFcaUser={isFcaUser}
        errors={errors}
        uiRelationMap={uiRelationMap}
        loading={searchLoading}
        onChange={onChange}
        searchCompanies={searchCompanies}
        formRules={formRules}
        isEdit={isEdit}
        fetchCompany={fetchCompany}
        onChangeHandler={onChangeHandler}
        emailHasChanges={emailHasChanges}
        countryList={countryList}
        updateRules={updateRules}
      />
      <PersonalInformation
        model={model}
        errors={errors}
        formRules={formRules}
        ethnicityListOptions={ethnicityListOptions}
        languageListOptions={languageListOptions}
        onChangeHandler={onChangeHandler}
        onBooleanChangeHandler={onBooleanChangeHandler}
        hasCustomPrimaryLanguage={hasCustomPrimaryLanguage}
      />
      <HomeAddress model={model} errors={errors} onChangeHandler={onChange} formRules={formRules} />
      <EmergencyContact countryList={countryList} model={model} errors={errors} formRules={formRules} onChangeHandler={onChangeHandler} />
      <IDInformation
        model={model}
        errors={errors}
        formRules={formRules}
        identificationTypeOptions={identificationTypeOptions}
        onChangeHandler={onChangeHandler}
        geographicLocationsOptions={geographicLocationsOptions}
      />
      <WorkerTrades
        model={model}
        errors={errors}
        formRules={formRules}
        tradeList={skilledTradeList}
        onChange={onChange}
        onChangeHandler={onChangeHandler}
        onBooleanChangeHandler={onBooleanChangeHandler}
        updateRules={updateRules}
      />
    </div>
  );
};

export default memo(WorkerForm);
