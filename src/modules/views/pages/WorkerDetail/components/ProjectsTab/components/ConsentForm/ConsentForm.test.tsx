import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getInitialState } from '../../../../../../../../test/rootState';
import {
  getWorker_1,
  getProject_1,
  getConsentForm_1,
  getConsentForm_2,
  getConsentForm_3,
  getSkilledTrade_1,
  getSkilledTrade_Other,
} from '../../../../../../../../test/entities';

import ConsentForm, { IConsentFormProps } from './ConsentForm';

describe('ConsentForm', () => {
  let props: IConsentFormProps;

  beforeEach(() => {
    props = {
      workerId: getWorker_1().id,
      projectId: getProject_1().id,
      projectName: getProject_1().name,
      consentForm: getConsentForm_1(),
      loading: undefined,
      saveLoading: undefined,
      isEditable: false,
      countryList: [],
      jobTitlesList: [],
      socJobTitlesList: [],
      tradeStatusesList: [],
      languageTurnerProtocolsList: [],
      skilledTradeList: [],
      fetchConsentForm: jest.fn(),
      saveConsentForm: jest.fn(),
      fetchJobTitles: jest.fn(),
      fetchSocJobTitles: jest.fn(),
      fetchTradeStatuses: jest.fn(),
      fetchLanguageTurnerProtocols: jest.fn(),
      fetchSkilledTrades: jest.fn(),
      onClose: jest.fn(),
      clearErrors: jest.fn(),
      downloadConsentForm: jest.fn(),
    };
  });

  it('should fetchConsentForm', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchConsentForm).toHaveBeenCalledWith(getWorker_1().id, getProject_1().id, false);
  });

  it('should render fallback', () => {
    props.consentForm = undefined;
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should close', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('close-consent-form'));
    });

    expect(props.onClose).toHaveBeenCalled();
  });

  it('should render secondary values', () => {
    props.consentForm = getConsentForm_3();
    props.isEditable = true;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-information-edit-btn'));
    });

    expect(wrapper.container).toMatchSnapshot();

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-close'));
    });
  });

  it('should render loading', () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should save', () => {
    props.saveLoading = {
      isLoading: false,
      error: null,
      hasError: false,
    };
    props.isEditable = true;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-information-edit-btn'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-supervisorName'), { target: { name: 'supervisorName', value: 'other name' } });
    });

    act(() => {
      fireEvent.mouseDown(wrapper.getAllByText('No')[1]);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.saveConsentForm).toHaveBeenCalled();
  });

  it('should validate', () => {
    props.consentForm = getConsentForm_2();
    props.isEditable = true;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-information-edit-btn'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-supervisorName'), { target: { name: 'supervisorName', value: '' } });
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-supervisorPhone'), { target: { name: 'supervisorPhone', value: '99128919011' } });
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-hardHatNumber'), { target: { name: 'hardHatNumber', value: '' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.saveConsentForm).not.toHaveBeenCalled();

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-supervisorPhone'), { target: { name: 'supervisorPhone', value: '' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.saveConsentForm).not.toHaveBeenCalled();
  });

  it('should download consent form', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    const downloadBtn = wrapper.getByTestId('download-consent-form');

    act(() => {
      fireEvent.click(downloadBtn);
    });

    expect(props.downloadConsentForm).toHaveBeenCalled();
  });

  it('should validate new fields', async () => {
    props.consentForm = getConsentForm_1();
    props.isEditable = true;
    props.consentForm.hourlyRatePay = 0;
    props.consentForm.jobTitleId = null;
    props.consentForm.projectSkilledTradeId = null;
    props.consentForm.tradeStatusId = null;
    props.consentForm.section3Resident = null;
    props.consentForm.stepStatus = null;
    props.consentForm.eligibleToWorkInUs = null;
    props.consentForm.socJobTitleId = null;
    props.consentForm.yearsOfExperience = null;
    props.consentForm.paymentType = null;
    props.consentForm.languageTurnerProtocolId = null;
    props.consentForm.lgbtq = null;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-information-edit-btn'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-hourlyRatePay'), { target: { name: 'hourlyRatePay', value: null } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.saveConsentForm).not.toHaveBeenCalled();
  });

  it('should validate new fields', async () => {
    props.consentForm = getConsentForm_1();
    props.isEditable = true;
    props.consentForm.yearsOfExperience = 0;
    props.consentForm.paymentType = 0;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-information-edit-btn'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-hourlyRatePay'), { target: { name: 'hourlyRatePay', value: null } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.saveConsentForm).not.toHaveBeenCalled();
  });

  it('should validate other skilled trades', async () => {
    props.skilledTradeList = [getSkilledTrade_1(), getSkilledTrade_Other()];
    props.consentForm = getConsentForm_1();
    props.consentForm.projectSkilledTradeId = getSkilledTrade_Other().id;
    props.isEditable = true;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ConsentForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-information-edit-btn'));
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('consentform-otherProjectSkilledTrade'), {
        target: { name: 'otherProjectSkilledTrade', value: 'Other custom trade' },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-save'));
    });

    expect(props.saveConsentForm).toHaveBeenCalled();
  });
});
