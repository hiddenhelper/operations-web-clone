import React, { memo } from 'react';

import Card from 'modules/views/shared/ResourceManagement/Card';

import Mappings from './Mappings';
import Legal from './Legal';
import ConsentFormName from './ConsentFormName';

import { ProjectModel, ConsentFormModel } from 'modules/models';
import { IFormRules } from 'utils/useValidator';
import { formGlobalStyles } from 'assets/styles';
import { useStyles } from '../../styles';
import { ConsentFormLabelRules } from 'constants/form/projectNewRules';

type SetStateCb = (prevVal: ProjectModel.IProject) => ProjectModel.IProject;

export interface IWorkerConsentFormProps {
  consentFormFields: ConsentFormModel.IConsentFormField[];
  errors: any;
  formRules: IFormRules;
  model: ProjectModel.IProject;
  onChange: (SetStateCb) => void;
}

const WorkerConsentForm = ({ consentFormFields, errors, formRules, model, onChange }: IWorkerConsentFormProps) => {
  const formClasses = formGlobalStyles();
  const classes = useStyles();

  const formLabels = ConsentFormLabelRules;

  return (
    <>
      <Card title="Consent Form Name">
        <ConsentFormName
          errors={errors?.consentFormLegals || errors}
          formLabels={formLabels}
          formRules={formRules}
          model={model.consentFormLegals}
          onChange={onChange}
        />
      </Card>

      <Card title="Predefined Inputs">
        <div className={`${classes.workerConsentFormPosition} ${formClasses.tradesWrapper}`}>
          <Mappings items={consentFormFields} name="consentFormFields" value={model.consentFormFields} onChange={onChange} />
        </div>
      </Card>

      <Card title="Legal">
        <Legal errors={errors?.consentFormLegals || errors} formRules={formRules} model={model.consentFormLegals} onChange={onChange} formLabels={formLabels} />
      </Card>
    </>
  );
};

export default memo(WorkerConsentForm);
