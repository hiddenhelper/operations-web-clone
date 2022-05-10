import React, { useCallback, useEffect, useMemo } from 'react';

import Wizard from 'modules/views/shared/Wizard';
import WizardHeader from 'modules/views/shared/ResourceManagement/WizardHeader';

import ClientInviteForm from './ClientInviteForm';

import { GeneralModel, ClientModel } from '../../../models';
import { inviteClientRules } from 'constants/form/clientRules';
import { useNavigator } from 'utils/useNavigator';
import { useStyles } from 'modules/views/shared/Wizard/styles';
import { getFallbackUser } from 'modules/models/user';
import { sanitizeClient } from 'utils/clientUtils';

const fallbackClient = () => ({ ...ClientModel.getFallbackClient(), users: [getFallbackUser()] });

export interface IProps {
  clearErrors: () => void;
  countryList?: GeneralModel.INamedEntity[];
  fetchCountries: () => void;
  inviteClient: (client: ClientModel.IClient) => void;
  loading: GeneralModel.ILoadingStatus;
}

const ClientInvite = ({ clearErrors, countryList, fetchCountries, inviteClient, loading }: IProps) => {
  const classes = useStyles();

  const { id, step, entityId, currentEntity } = useNavigator<ClientModel.IClient>({ entityMap: {}, fallback: fallbackClient });

  const loadedSuccessful: boolean = useMemo(() => loading && !loading.isLoading && !loading.hasError, [loading]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);
  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading), [loading]);
  const onLoadDeps = useMemo(() => ({ currentEntity }), [currentEntity]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const onSaveHandler = useCallback(
    (clientData: ClientModel.IClient) => {
      inviteClient(sanitizeClient(clientData, null));
    },
    [inviteClient]
  );

  const onLoadHandler = useCallback(onChange => currentEntity && onChange(currentEntity), [currentEntity]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
    };
  }, [clearErrors]);

  return (
    <Wizard
      isStepper={false}
      formRuleMap={inviteClientRules}
      navigationProps={{ id, step, entityId, currentEntity }}
      fallback={ClientModel.getFallbackClient()}
      loading={loading}
      isLoadSuccess={false}
      isValidForNavigation={isValidForNavigation}
      styles={{ formContainer: classes.formContainerPadding }}
      deps={onLoadDeps}
      onLoad={onLoadHandler}
      onSave={onSaveHandler}
      clearErrors={clearErrors}
      renderNavigator={({ toggleClass, hasChanged, onDiscard, onSave }) => (
        <WizardHeader
          isFixed={toggleClass}
          fullWidth={true}
          title="Client Information"
          subtitle="Invite Client"
          breadCrumb={{ route: '/clients/invite', title: 'Invite', pluralTitle: 'Client List' }}
          entityName={currentEntity.name}
          hasChanges={hasChanged}
          onDiscard={onDiscard}
          onSave={onSave}
          isSaveLoading={isLoading}
          loadSuccess={loadedSuccessful}
          stepped={false}
          customLabel="Invite Client"
          customLoadingLabel="Inviting..."
        />
      )}
      renderForm={({ model, formRules, errors, onChange, updateRules }) => (
        <ClientInviteForm
          countryList={countryList}
          edit={!!entityId}
          errors={errors}
          formRules={formRules}
          model={model}
          onChange={onChange}
          updateRules={updateRules}
        />
      )}
    />
  );
};

export default ClientInvite;
