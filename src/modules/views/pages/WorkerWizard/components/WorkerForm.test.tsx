import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import WorkerForm, { IWorkerFormProps } from './WorkerForm';
import {
  getClient_1,
  getEthnicity_1,
  getIdentificationType_1,
  getPrimaryLanguage_1,
  getProjectCompany_1,
  getSkilledTrade_1,
  getWorker_1,
} from '../../../../../test/entities';

import { getAdminInitialState } from '../../../../../test/rootState';
import { UserModel } from '../../../../models';

describe('Required Information', () => {
  let props: IWorkerFormProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      company: getClient_1(),
      model: getWorker_1(),
      formRules: {},
      errors: {},

      ethnicityList: [getEthnicity_1()],
      languageList: [getPrimaryLanguage_1()],
      skilledTradeList: [getSkilledTrade_1()],

      uiRelationMap: {
        'worker-company': {
          searchResult: [getProjectCompany_1()],
        },
      },

      searchLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      identificationTypeList: [getIdentificationType_1()],
      isEdit: false,
      onChange: jest.fn(),
      updateRules: jest.fn(),
      fetchCompany: jest.fn(),
      searchCompanies: jest.fn(),
      countryList: [{ id: 'dda6b99c-e294-40f1-ba1b-2058b5e24082', name: 'United States', code: 'US' }],
      geographicLocationsList: [{ id: 'd43dbc1e-adab-4262-940f-281cce6daa8d', name: 'name', type: 1 }],
    };
  });

  it('should have empty geographicLocationOption', () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    props.model.identificationGeographicLocationId = 'd43dbc1e-adab-4262-940f-281cce6daa8d';
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <WorkerForm {...props} />
        </MemoryRouter>
      </Provider>
    );
  });
});
