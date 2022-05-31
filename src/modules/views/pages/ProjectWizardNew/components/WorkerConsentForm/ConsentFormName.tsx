import React, { memo, useCallback, useMemo, useState } from 'react';
import { TextField } from '@material-ui/core';

import { ConsentFormModel } from 'modules/models';
import { IFormRules } from 'utils/useValidator';
import { tableGlobalStyles } from 'assets/styles/Tables/styles';

import ButtonTab from 'modules/views/shared/ButtonTab';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';

const allowedLanguages = Object.values(ConsentFormModel.ConsentFormLanguages);

export interface IConsentFormNameProps {
  errors: any;
  formRules: IFormRules;
  formLabels: IFormRules;
  onChange: (model: any) => void;
  model: ConsentFormModel.IConsentFormLegal[];
}

const ConsentFormName = ({ errors, formRules, formLabels, onChange, model }: IConsentFormNameProps) => {
  const tableGlobalClasses = tableGlobalStyles();

  const [language, setLanguage] = useState(allowedLanguages[0]);
  const changeActiveLanguage = useCallback(newLang => setLanguage(newLang), [setLanguage]);

  const tabLanguageList = useMemo(() => allowedLanguages.map(lang => ({ id: lang, key: lang, title: ConsentFormModel.ConsentFormLanguageNames[lang] })), []);
  const currentNameIndex = useMemo(() => model.findIndex(name => name.languageCode === language), [language, model]);
  const currentName = useMemo(() => model[currentNameIndex], [currentNameIndex, model]);

  const onChangeHandler = useCallback(
    event => {
      event?.persist();
      onChange(prevVal => {
        const consentFormNamesCopy = [...prevVal.consentFormLegals];
        consentFormNamesCopy[currentNameIndex] = { ...currentName, name: event.target.value };
        return { ...prevVal, consentFormLegals: consentFormNamesCopy };
      });
    },
    [currentName, currentNameIndex, onChange]
  );

  const langError = errors?.[`consentFormLegals[${currentNameIndex}].name`];

  return (
    <>
      <div className={tableGlobalClasses.filterContainer}>
        <div className={tableGlobalClasses.statusFilter}>
          {tabLanguageList.map(item => (
            <ButtonTab key={item.key} optFilter={item} isActive={item.key === language} setFilter={changeActiveLanguage} />
          ))}
        </div>
      </div>
      {currentName?.languageId && (
        <ControlledError show={!!langError} error={langError}>
          <ControlledInput label="Consent Form Name" required={formLabels.name.required} showMark={formLabels.name.required}>
            <TextField
              autoComplete="off"
              inputProps={{
                'data-testid': `consent-form-names-input-${language}`,
              }}
              error={!!langError}
              fullWidth={true}
              name="consentFormLegals"
              onChange={onChangeHandler}
              placeholder="Type consent form name"
              required={formRules.consentFormLegals?.required}
              value={currentName?.name}
              variant="outlined"
            />
          </ControlledInput>
        </ControlledError>
      )}
    </>
  );
};

export default memo(ConsentFormName);
