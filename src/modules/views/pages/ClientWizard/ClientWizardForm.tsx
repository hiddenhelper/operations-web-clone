import React, { memo } from 'react';

import { GeneralModel, ClientModel } from '../../../models';
import { IFormRules } from '../../../../utils/useValidator';

import GeneralInformation from '../../shared/ClientForm/GeneralInformation';
import Addresses from '../../shared/ClientForm/Addresses';
import Users from '../../shared/ClientForm/Users';
import Review from '../../shared/ClientForm/Review';

export interface IClientFormProps {
  model: ClientModel.IClient;
  formRules: IFormRules;
  completedFields: any;
  currentStep: GeneralModel.IStep;
  errors: any;
  tradeList: GeneralModel.INamedEntity[];
  mwbeList: GeneralModel.INamedEntity[];
  invalidUserList: boolean;
  onChangeStep: (key: string) => void;
  onChange: (event: any) => void;
  updateRules: (rules: IFormRules) => void;
  countryList?: GeneralModel.INamedEntity[];
}

const ClientForm = ({
  currentStep,
  model,
  errors,
  formRules,
  completedFields,
  mwbeList,
  tradeList,
  invalidUserList,
  onChange,
  onChangeStep,
  updateRules,
  countryList,
}: IClientFormProps) => {
  return (
    <>
      {currentStep.key === ClientModel.ClientStep.GENERAL_INFORMATION && (
        <GeneralInformation
          mwbeList={mwbeList}
          tradeList={tradeList}
          formRules={formRules}
          model={model}
          errors={errors}
          onChange={onChange}
          updateRules={updateRules}
        />
      )}
      {currentStep.key === ClientModel.ClientStep.ADDRESSES && <Addresses model={model} onChange={onChange} errors={errors} />}
      {currentStep.key === ClientModel.ClientStep.USERS && <Users countryList={countryList} userList={model.users} onChange={onChange} errors={errors} />}
      {currentStep.key === ClientModel.ClientStep.REVIEW && (
        <Review
          model={model}
          userList={model.users}
          mwbeList={mwbeList}
          completedFields={completedFields}
          onChangeStep={onChangeStep}
          invalidUserList={invalidUserList}
        />
      )}
    </>
  );
};

export default memo(ClientForm);
