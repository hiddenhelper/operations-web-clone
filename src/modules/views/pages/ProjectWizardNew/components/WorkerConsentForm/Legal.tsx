import React, { memo, useCallback, useMemo, useState } from 'react';
import { TextField } from '@material-ui/core';

import ButtonTab from 'modules/views/shared/ButtonTab';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';

import { ConsentFormModel } from 'modules/models';
import { IFormRules } from 'utils/useValidator';
import { tableGlobalStyles } from 'assets/styles/Tables/styles';
import { useStyles } from './styles';

const allowedLanguages = Object.values(ConsentFormModel.ConsentFormLanguages);

export interface ILegalProps {
  errors: any;
  formRules: IFormRules;
  formLabels: IFormRules;
  onChange: (model: any) => void;
  model: ConsentFormModel.IConsentFormLegal[];
}

const ProjectList = ({ errors, formRules, formLabels, onChange, model }: ILegalProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const [language, setLanguage] = useState(allowedLanguages[0]);
  const changeActiveLanguage = useCallback(newLang => setLanguage(newLang), [setLanguage]);

  // Create lang tabs data
  const tabLanguageList = useMemo(() => allowedLanguages.map(lang => ({ id: lang, key: lang, title: ConsentFormModel.ConsentFormLanguageNames[lang] })), []);

  const currentLegalIndex = useMemo(() => model.findIndex(legal => legal.languageCode === language), [language, model]);
  const currentLegal = useMemo(() => model[currentLegalIndex], [currentLegalIndex, model]);

  const onChangeHandler = useCallback(
    event => {
      event?.persist();
      onChange(prevVal => {
        const consentFormLegalsCopy = [...prevVal.consentFormLegals];
        consentFormLegalsCopy[currentLegalIndex] = { ...currentLegal, body: event.target.value };
        return { ...prevVal, consentFormLegals: consentFormLegalsCopy };
      });
    },
    [currentLegal, currentLegalIndex, onChange]
  );

  const langError = errors?.[`consentFormLegals[${currentLegalIndex}].body`];

  return (
    <>
      <div className={tableGlobalClasses.filterContainer}>
        <div className={tableGlobalClasses.statusFilter}>
          {tabLanguageList.map(item => (
            <ButtonTab key={item.key} optFilter={item} isActive={item.key === language} setFilter={changeActiveLanguage} />
          ))}
        </div>
      </div>
      {currentLegal?.languageId && (
        <ControlledError show={!!langError} error={langError}>
          <ControlledInput label="Legal" styleClass={classes.legalInput} required={formLabels.body.required} showMark={formLabels.body.required}>
            <TextField
              autoComplete="off"
              error={!!langError}
              fullWidth={true}
              inputProps={{
                'data-testid': `consent-form-legals-input-${language}`,
              }}
              multiline={true}
              name="consentFormLegals"
              onChange={onChangeHandler}
              required={formRules.consentFormLegals?.required}
              value={currentLegal?.body}
              variant="outlined"
            />
          </ControlledInput>
        </ControlledError>
      )}
    </>
  );
};

export default memo(ProjectList);
