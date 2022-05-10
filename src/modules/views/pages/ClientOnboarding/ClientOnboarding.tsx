import React, { memo, useEffect, useMemo } from 'react';

import TextField from '@material-ui/core/TextField';

import Container from 'modules/views/shared/Container';
import { useResize } from '../../../../utils/useResize';
import { ClientModel, GeneralModel, UserModel } from '../../../models';
import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';

export interface IClientOnboardingProps {
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  user: UserModel.IUser;
  fetchClient: (id: string) => void;
}

const ClientOnboarding = ({ clientMap, fetchClient, user }: IClientOnboardingProps) => {
  useResize();

  const clientId = user['custom:companyid'];
  const currentClient = useMemo(() => (clientMap[clientId] ? clientMap[clientId] : ClientModel.getFallbackClient()), [clientMap, clientId]);

  useEffect(() => {
    if (!clientMap[clientId]) fetchClient(clientId);
  }, [fetchClient, clientId, clientMap]);

  return (
    <>
      <Container>
        <Card title="Company Name">
          <ControlledError show={false} error={'test'}>
            <ControlledInput label="Company Name">
              <TextField
                variant="outlined"
                data-testid="client-name-wrapper"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="name"
                value={currentClient.name || ''}
                disabled={true}
                inputProps={{
                  'data-testid': 'client-onboarding-name',
                }}
              />
            </ControlledInput>
          </ControlledError>
        </Card>
      </Container>
    </>
  );
};

export default memo(ClientOnboarding);
