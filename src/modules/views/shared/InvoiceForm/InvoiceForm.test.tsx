import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import { getProject_1, getClient_1, getProjectInvoiceServiceList_1 } from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';
import { InvoiceModel } from '../../../models';

import InvoiceForm, { IInvoiceFormProps } from './InvoiceForm';

jest.useFakeTimers();

describe('InvoiceForm', () => {
  let props: IInvoiceFormProps;

  beforeEach(() => {
    props = {
      model: { company: null, notes: '', items: [], convenienceFeeAmount: 22.3 },
      errors: {},
      formRules: {},
      uiRelationMap: {},
      projectId: getProject_1().id,
      serviceList: getProjectInvoiceServiceList_1(),
      onChange: jest.fn(),
      searchCompanies: jest.fn(),
      searchProjects: jest.fn(),
      fetchServices: jest.fn(),
      clearRelationMap: jest.fn(),
      resetErrors: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with convenience fee', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetchServices', () => {
    props.serviceList = [];
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchServices).toHaveBeenCalled();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.onChange).toHaveBeenCalled();
    expect(props.clearRelationMap).toHaveBeenCalled();
    expect(props.resetErrors).toHaveBeenCalled();
  });

  it('should change values', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    const notesInput = wrapper.getByTestId('invoice-notes');
    const addEntityBtn = wrapper.getByTestId('add-item-button');

    act(() => {
      fireEvent.change(notesInput, { target: { name: 'notes', value: 'test' } });
    });

    act(() => {
      fireEvent.click(addEntityBtn);
    });

    props.model = {
      ...props.model,
      company: null,
      notes: '',
      items: [{ ...InvoiceModel.getFallbackInvoiceService(), amount: 10 }, InvoiceModel.getFallbackInvoiceService()],
    };

    wrapper.rerender(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceServiceInput = wrapper.getAllByText('Select Option');

    act(() => {
      fireEvent.mouseDown(invoiceServiceInput[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Handheld Equipment'));
    });

    const detailInput = wrapper.getAllByTestId('service-detail');

    act(() => {
      fireEvent.change(detailInput[0], { target: { name: 'detail', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('delete-entity-button')[0]);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should add invoice', () => {
    props.projectId = null;
    props.model = {
      ...props.model,
      company: null,
      project: null,
      notes: '',
      items: [InvoiceModel.getFallbackInvoiceService()],
    };
    props.uiRelationMap = {
      'invoice-project-id': { searchResult: [getProject_1()] },
      'invoice-company-id': { searchResult: [getClient_1()] },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectSelectInput = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(projectSelectInput, { target: { value: 'Project' } });
    });

    act(() => {
      fireEvent.mouseDown(projectSelectInput);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.searchProjects).toHaveBeenCalledWith(
      {
        activeForCompanyId: undefined,
        isDeveloper: false,
        maxItems: 30,
        nameContains: 'Project',
        projectStatuses: [2],
      },
      'invoice-project-id'
    );

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const clientSelectInput = wrapper.getAllByTestId('autocomplete-wrapper')[1].querySelector('input');

    act(() => {
      fireEvent.change(clientSelectInput, { target: { value: 'Robert' } });
    });

    act(() => {
      fireEvent.mouseDown(clientSelectInput);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const invoiceServiceInput = wrapper.getAllByText('Select Option');

    act(() => {
      fireEvent.mouseDown(invoiceServiceInput[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Handheld Equipment'));
    });

    const detailInput = wrapper.getAllByTestId('service-amount');

    act(() => {
      fireEvent.change(detailInput[0], {
        persist: () => {
          /** */
        },
        target: { name: 'amount', value: '120' },
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const notesInput = wrapper.getByTestId('invoice-notes');
    const addEntityBtn = wrapper.getByTestId('add-item-button');

    act(() => {
      fireEvent.change(notesInput, { target: { name: 'notes', value: 'test' } });
    });

    act(() => {
      fireEvent.click(addEntityBtn);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should validations', () => {
    props.projectId = null;
    props.model = { ...props.model, company: null, project: null, notes: '', items: [] };
    props.errors = {
      company: 'is required',
      project: 'is required',
      items: 'is required',
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    const addEntityBtn = wrapper.getByTestId('add-item-button');

    act(() => {
      fireEvent.click(addEntityBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should delete service item', () => {
    props.model = {
      ...props.model,
      company: null,
      notes: '',
      items: [{ ...InvoiceModel.getFallbackInvoiceService(), amount: 10 }, InvoiceModel.getFallbackInvoiceService()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <InvoiceForm {...props} />
        </MemoryRouter>
      </Provider>
    );

    const invoiceServiceInput = wrapper.getAllByText('Select Option');

    act(() => {
      fireEvent.mouseDown(invoiceServiceInput[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Handheld Equipment'));
    });

    const detailInput = wrapper.getAllByTestId('service-detail');

    act(() => {
      fireEvent.change(detailInput[0], { target: { name: 'detail', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('delete-entity-button')[0]);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('delete-entity-button')[1]);
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
