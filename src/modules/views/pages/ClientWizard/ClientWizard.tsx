import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Wizard from '../../shared/Wizard';
import NavigationTop from '../../shared/ResourceManagement/NavigationTop';
import ClientForm from './ClientWizardForm';

import { ClientModel, GeneralModel, AddressModel, UserModel, ResourceModel } from '../../../models';
import { ROUTES, FormRules } from '../../../../constants';
import { useNavigator } from '../../../../utils/useNavigator';
import { sanitizeClient } from '../../../../utils/clientUtils';
import { getCompletedStepFields, getConditionalDefaultValue } from '../../../../utils/generalUtils';

export interface IWizardProps {
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  mwbeList: GeneralModel.INamedEntity[];
  tradeList: GeneralModel.INamedEntity[];
  loading: GeneralModel.ILoadingStatus;
  sendForApprovalLoading: GeneralModel.ILoadingStatus;
  approveLoading: GeneralModel.ILoadingStatus;
  navigate: (path: string) => void;
  fetchClient: (id: string) => void;
  saveClient: (client: ClientModel.IClient, step: GeneralModel.IStep) => void;
  updateClient: (client: ClientModel.IClient) => void;
  sendClientForApproval: (id: string) => void;
  approveClient: (id: string) => void;
  fetchMwbe: () => void;
  fetchTradeList: () => void;
  clearErrors: () => void;
  clearClientMap: () => void;
  countryList?: GeneralModel.INamedEntity[];
  fetchGroupSearch: (searchRequest: any) => void;
  groupList: any;
  currentUserRole: UserModel.Role;
}

const ClientWizard = ({
  clientMap,
  mwbeList,
  tradeList,
  loading,
  sendForApprovalLoading,
  approveLoading,
  fetchClient,
  fetchMwbe,
  fetchTradeList,
  saveClient,
  updateClient,
  sendClientForApproval,
  approveClient,
  clearErrors,
  clearClientMap,
  countryList,
  fetchGroupSearch,
  groupList,
  currentUserRole,
}: IWizardProps) => {
  const { id, step, entityId, currentEntity, currentStepKey, currentStep, setStep } = useNavigator<ClientModel.IClient>({
    entityMap: clientMap,
    stepMap: ClientModel.clientStepMap,
    defaultStep: ClientModel.ClientStep.GENERAL_INFORMATION,
    fallback: ClientModel.getFallbackClient,
  });

  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading), [loading]);
  const loadedSuccessful: boolean = useMemo(() => loading && !loading.isLoading && !loading.hasError, [loading]);
  const noneOption = useMemo(
    () =>
      getConditionalDefaultValue(
        mwbeList,
        mwbeList.find(option => option.name === 'None'),
        { id: '' }
      ),
    [mwbeList]
  );
  const onLoadDeps = useMemo(() => ({ currentEntity, noneOption }), [currentEntity, noneOption]);

  const isNavigationTopLoading = useMemo(
    () =>
      getConditionalDefaultValue(sendForApprovalLoading, sendForApprovalLoading?.isLoading, false) ||
      getConditionalDefaultValue(approveLoading, approveLoading?.isLoading, false),
    [approveLoading, sendForApprovalLoading]
  );

  const onSaveHandler = useCallback(
    (data: ClientModel.IClient) => {
      const client = sanitizeClient(data, noneOption.id);
      if (!entityId) saveClient(client, currentStep);
      if (entityId) updateClient(client);
    },
    [saveClient, updateClient, currentStep, noneOption, entityId]
  );

  const onSendForApprovalHandler = useCallback(() => {
    if (currentEntity.status === ResourceModel.CompanyStatus.DRAFT) {
      sendClientForApproval(currentEntity.id);
    } else {
      approveClient(currentEntity.id);
    }
  }, [sendClientForApproval, approveClient, currentEntity]);

  const onLoadHandler = useCallback(
    /* istanbul ignore next */ onChange => {
      if (currentEntity) onChange(currentEntity);
      if (!currentEntity.id && noneOption && mwbeList.length) onChange({ ...currentEntity, mwbeTypeId: noneOption.id });
    },
    [currentEntity, noneOption, mwbeList]
  );

  const completedFields = useMemo(() => {
    const updatedStepMap = currentEntity.isDeveloper
      ? ClientModel.developerStepMap
      : {
          ...ClientModel.clientStepMap,
          [ClientModel.ClientStep.GENERAL_INFORMATION]: {
            ...ClientModel.clientStepMap[ClientModel.ClientStep.GENERAL_INFORMATION],
            fields: [
              ...ClientModel.clientStepMap[ClientModel.ClientStep.GENERAL_INFORMATION].fields,
              { name: ClientModel.ClientFields.UNIVERSAL_BADGE_PRICE, required: currentEntity.hasUniversalBadge },
            ],
          },
          [ClientModel.ClientStep.ADDRESSES]: {
            ...ClientModel.clientStepMap[ClientModel.ClientStep.ADDRESSES],
            fields: [
              ClientModel.clientStepMap[ClientModel.ClientStep.ADDRESSES].fields[0],
              {
                name: ClientModel.ClientFields.MAILING_ADDRESS,
                required: false,
                fields: [
                  { name: AddressModel.AddressFields.LINE_1, required: !currentEntity.mailingAddressMatchesBillingAddress },
                  { name: AddressModel.AddressFields.LINE_2, required: false },
                  { name: AddressModel.AddressFields.COUNTRY_ID, required: !currentEntity.mailingAddressMatchesBillingAddress, computePositive: true },
                  { name: AddressModel.AddressFields.STATE, required: !currentEntity.mailingAddressMatchesBillingAddress },
                  { name: AddressModel.AddressFields.ZIP_CODE, required: !currentEntity.mailingAddressMatchesBillingAddress },
                  { name: AddressModel.AddressFields.CITY, required: !currentEntity.mailingAddressMatchesBillingAddress },
                ],
              },
            ],
          },
          [ClientModel.ClientStep.USERS]: {
            ...ClientModel.clientStepMap[ClientModel.ClientStep.USERS],
            fields: [
              {
                ...ClientModel.clientStepMap[ClientModel.ClientStep.USERS].fields[0],
                fields: ClientModel.clientStepMap[ClientModel.ClientStep.USERS].fields[0].fields.map(field => {
                  if (field.name === UserModel.UserFields.MOBILE_PHONE_NUMBER) {
                    const user0PreferredContactMethod = Number(currentEntity.users?.[0]?.preferredContactMethod);
                    field.required = user0PreferredContactMethod === UserModel.PreferredContactMethod.PHONE;
                  } else if (field.name === UserModel.UserFields.GROUP_IDS) {
                    const idObject = groupList?.find((list) => {
                      return list.code === 'Admin';
                    });
                    const isAdmin = currentEntity.users?.[0]?.groupIds?.some(id => id === idObject?.id);
                    field.required = !isAdmin;
                  }
                  return field;
                }),
              },
            ],
          },
        };
    const updatedClient = {
      ...currentEntity,
      trades: [...currentEntity.trades, currentEntity.otherTrade].filter(Boolean),
    };
    return getCompletedStepFields(updatedStepMap, updatedClient);
  }, [currentEntity, groupList]);

  const readyForApprove = useMemo(() => {
    return (
      !Object.keys(completedFields).some(stepFields => completedFields[stepFields].required > completedFields[stepFields].completed) ||
      currentEntity.isDeveloper
    );
  }, [completedFields, currentEntity]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!mwbeList.length) fetchMwbe();
  }, [mwbeList, fetchMwbe]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!tradeList.length) fetchTradeList();
  }, [tradeList, fetchTradeList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (mwbeList.length && tradeList.length && entityId && (!clientMap[entityId] || !clientMap[entityId].users)) fetchClient(entityId);
  }, [entityId, clientMap, mwbeList, tradeList, fetchClient]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
      clearClientMap();
    };
  }, [clearErrors, clearClientMap]);
  return (
    <Wizard
      route="/clients/wizard"
      stepMap={ClientModel.clientStepMap}
      formRuleMap={FormRules.client.draftFieldRules}
      completedFieldMap={completedFields}
      navigationProps={{ id, step, entityId, currentEntity, currentStepKey, currentStep, setStep }}
      fallback={ClientModel.getFallbackClient()}
      isConfirmEnabled={readyForApprove}
      isLoadSuccess={loadedSuccessful}
      isValidForNavigation={isValidForNavigation}
      loading={loading}
      deps={onLoadDeps}
      onLoad={onLoadHandler}
      onConfirm={onSendForApprovalHandler}
      onSave={onSaveHandler}
      clearErrors={clearErrors}
      renderNavigator={({ toggleClass, activeStep, hasChanged, isConfirmEnabled, onNextStep, onDiscard, onSave, onConfirm }) => (
        <NavigationTop
          isFixed={toggleClass}
          breadCrumb={{
            route: ROUTES.CLIENT_LIST.path,
            title: 'Client',
            pluralTitle: 'Clients',
          }}
          step={currentStep}
          stepIndex={activeStep}
          status={ResourceModel.CompanyStatusMap[currentEntity.status]}
          entityName={currentEntity.name}
          hasChanges={hasChanged || !!loading?.hasError}
          loadSuccess={loadedSuccessful}
          isSaveLoading={loading && loading.isLoading}
          isLoading={isNavigationTopLoading}
          isConfirmEnabled={isConfirmEnabled}
          onNextStep={onNextStep}
          onDiscard={onDiscard}
          onSave={onSave}
          onConfirm={onConfirm}
        />
      )}
      renderForm={({ model, formRules, errors, onChangeStep, onChange, updateRules }) => (
        <ClientForm
          countryList={countryList}
          mwbeList={mwbeList}
          tradeList={tradeList}
          model={model}
          formRules={formRules}
          completedFields={completedFields}
          errors={errors}
          currentStep={currentStep}
          onChangeStep={onChangeStep}
          onChange={onChange}
          updateRules={updateRules}
          fetchGroupSearch={fetchGroupSearch}
          companyId={id}
          groupList={groupList}
          currentUserRole={currentUserRole}
        />
      )}
    />
  );
};

export default memo(ClientWizard);
