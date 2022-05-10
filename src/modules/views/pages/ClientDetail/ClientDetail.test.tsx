import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { render, act, fireEvent } from '@testing-library/react';
import { useParams, useHistory } from 'react-router-dom';

import { ResourceModel, UserModel } from '../../../models';
import {
  getAddress_1,
  getClient_1,
  getClient_6,
  getMwbeType_1,
  getTrades_1,
  getUser_6,
  getProject_3,
  getUser_1,
  getClientDetailStatistics_1,
  getDefaultLoading,
  getCountry_1,
  getCountry_2,
} from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';
import ClientDetail, { IClientDetailProps } from './ClientDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('ClientDetail', () => {
  let props: IClientDetailProps;
  const stateWithCountryList = {
    ...getInitialState(),
    general: {
      ...getInitialState().general,
      countryList: [getCountry_1(), getCountry_2()],
    },
  };
  const ClientDetailComponent = currentProps => (
    <Provider store={createMockStore(stateWithCountryList) as any}>
      <MemoryRouter>
        <ClientDetail {...currentProps} />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      clientMap: { [getClient_1().id]: getClient_1() },
      mwbeList: getMwbeType_1(),
      tradeList: getTrades_1(),
      clientStatistics: getClientDetailStatistics_1(),
      updateClientLoading: getDefaultLoading(),
      clientLoading: getDefaultLoading(),
      statisticsLoading: getDefaultLoading(),
      fetchClient: jest.fn(),
      clearClientMap: jest.fn(),
      fetchMwbe: jest.fn(),
      fetchTradeList: jest.fn(),
      saveClient: jest.fn(),
      archiveClient: jest.fn(),
      unarchiveClient: jest.fn(),
      clearErrors: jest.fn(),
      clearLoadingMap: jest.fn(),
      fetchClientStatistics: jest.fn(),
      clearClientStatistics: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: '' }));
  });

  it('should render project tab empty list', () => {
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render workers tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'workers' }));
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render invoices tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'invoices' }));
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render default values', () => {
    (useParams as any).mockImplementation(() => ({ id: '', step: '' }));
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.clientLoading = { isLoading: true, hasError: false, error: null };
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should fetchClientStatistics', () => {
    props.clientStatistics = null;
    render(<ClientDetailComponent {...props} />);
    expect(props.fetchClientStatistics).toHaveBeenCalledWith(getClient_1().id);
  });

  it('should change project page', () => {
    const stateWithData = {
      ...getInitialState(),
      project: {
        ...getInitialState().project,
        count: 17,
        projectClientMap: {
          [getClient_1().id]: {
            [getProject_3().id]: { ...getProject_3() },
          },
        },
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(stateWithData as any)}>
        <MemoryRouter>
          <ClientDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('/?pageNumber=2&pageSize=15');
  });

  it('should fetchClient', () => {
    props.clientMap = {};
    render(<ClientDetailComponent {...props} />);
    expect(props.fetchClient).toHaveBeenCalledWith(getClient_1().id);
  });

  it('should unmount', () => {
    props.clientMap = {};
    const { unmount } = render(<ClientDetailComponent {...props} />);
    unmount();
    expect(props.clearClientMap).toHaveBeenCalled();
    expect(props.clearLoadingMap).toHaveBeenCalled();
  });

  it('should fetchMwbe', () => {
    props.mwbeList = [];
    render(<ClientDetailComponent {...props} />);
    expect(props.fetchMwbe).toHaveBeenCalled();
  });

  it('should fetchTradeList', () => {
    props.tradeList = [];
    render(<ClientDetailComponent {...props} />);
    expect(props.fetchTradeList).toHaveBeenCalled();
  });

  it('should render users tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'users' }));
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render workers tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'workers' }));
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render information tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    const { container } = render(<ClientDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should edit information', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    props.clientMap = {
      [getClient_1().id]: {
        ...getClient_1(),
        billingAddress: getAddress_1(),
        mailingAddress: getAddress_1(),
        mailingAddressMatchesBillingAddress: false,
        users: [getUser_1(), getUser_6()],
      },
    };
    const wrapper = render(<ClientDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    const inputName = wrapper.getByTestId('client-name');

    expect((inputName as any).value).toEqual('Robert C. Martin');

    await act(async () => {
      const nameInput = await wrapper.findByTestId('client-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    const addressesEditBtn = wrapper.getByTestId('addr-edit-button');

    await act(async () => {
      fireEvent.click(addressesEditBtn);
    });

    await act(async () => {
      const line2Inputs = await wrapper.getAllByTestId('addr-line2');

      expect(line2Inputs.length).toEqual(2);

      fireEvent.change(line2Inputs[0], { target: { value: 'some address', name: 'line2' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    // expect(props.saveClient).toHaveBeenCalled();
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show validations', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    props.clientMap = {
      [getClient_1().id]: {
        ...getClient_1(),
        billingAddress: getAddress_1(),
        mailingAddress: getAddress_1(),
        mailingAddressMatchesBillingAddress: false,
        users: [getUser_1(), getUser_6()],
        taxpayerIdentificationNumber: null,
        trades: [],
        otherTrade: null,
        hasUniversalBadge: true,
      },
    };
    const wrapper = render(<ClientDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    await act(async () => {
      const nameInput = await wrapper.findByTestId('client-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.saveClient).not.toHaveBeenCalled();
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show server errors', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    props.clientMap = {
      [getClient_1().id]: {
        ...getClient_1(),
        billingAddress: getAddress_1(),
        mailingAddress: getAddress_1(),
        mailingAddressMatchesBillingAddress: false,
        users: [getUser_1(), getUser_6()],
      },
    };
    props.clientLoading = { isLoading: false, hasError: false, error: { errors: { name: ['Name is in use'] } } };

    const wrapper = render(<ClientDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    const inputName = wrapper.getByTestId('client-name');

    expect((inputName as any).value).toEqual('Robert C. Martin');

    await act(async () => {
      const nameInput = await wrapper.findByTestId('client-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should edit developer information', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_6().id, step: 'information' }));
    props.clientMap = {
      [getClient_6().id]: getClient_6(),
    };
    const wrapper = render(<ClientDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    const inputName = wrapper.getByTestId('client-name');

    expect((inputName as any).value).toEqual('Martin');

    await act(async () => {
      const nameInput = await wrapper.findByTestId('client-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    const addressesEditBtn = wrapper.getByTestId('addr-edit-button');

    await act(async () => {
      fireEvent.click(addressesEditBtn);
    });

    await act(async () => {
      const line2Input = wrapper.getByTestId('addr-line2');

      fireEvent.change(line2Input, { target: { value: 'some address', name: 'line2' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.saveClient).toHaveBeenCalled();
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should archive', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    props.clientMap = {
      [getClient_1().id]: {
        ...getClient_1(),
        status: ResourceModel.CompanyStatus.ACTIVE,
      },
    };
    const wrapper = render(<ClientDetailComponent {...props} />);

    const openArchiveBtn = wrapper.getByTestId('archive-btn');

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    await act(async () => {
      const confirmBtn = wrapper.getByText('Yes, Archive');

      fireEvent.click(confirmBtn);
    });

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    expect(wrapper.getByText(`Archive ${getClient_1().name}?`));
    expect(wrapper.container).toMatchSnapshot();

    await act(async () => {
      fireEvent.click(wrapper.getByTestId('modal-close-btn'));
    });
  });

  it('should un archive', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    props.clientMap = {
      [getClient_1().id]: {
        ...getClient_1(),
        status: ResourceModel.CompanyStatus.ARCHIVED,
      },
    };
    const wrapper = render(<ClientDetailComponent {...props} />);

    const openArchiveBtn = wrapper.getByTestId('archive-btn');

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    await act(async () => {
      const confirmBtn = wrapper.getByText('Yes, Unarchive');

      fireEvent.click(confirmBtn);
    });

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    expect(wrapper.getByText(`Unarchive ${getClient_1().name}?`));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should discard information', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'information' }));
    const wrapper = render(<ClientDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    await act(async () => {
      const nameInput = wrapper.getByTestId('client-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });
    });

    await act(async () => {
      const discardBtn = wrapper.getByTestId('form-dialog-discard');
      const closeBtn = wrapper.getByTestId('form-dialog-close');

      fireEvent.click(discardBtn);
      fireEvent.click(closeBtn);
    });

    const addressesEditBtn = wrapper.getByTestId('addr-edit-button');

    await act(async () => {
      fireEvent.click(addressesEditBtn);
    });

    await act(async () => {
      const line2Input = wrapper.getByTestId('addr-line2');

      fireEvent.change(line2Input, { target: { value: 'some address', name: 'line2' } });
    });

    await act(async () => {
      const discardBtn = wrapper.getByTestId('form-dialog-discard');
      const closeBtn = wrapper.getByTestId('form-dialog-close');

      fireEvent.click(discardBtn);
      fireEvent.click(closeBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
