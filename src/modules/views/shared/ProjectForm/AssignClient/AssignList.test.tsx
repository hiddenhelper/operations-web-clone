import React from 'react';
import { render, act, fireEvent, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import AssignList, { IAssignClientProps } from './AssignList';
import { ProjectModel } from '../../../../models';
import { getProjectCompany_1, getProjectCompany_2, getProjectCompany_3 } from '../../../../../test/entities';

jest.useFakeTimers();

describe('AssignList', () => {
  global.console.error = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IAssignClientProps;

  beforeEach(() => {
    props = {
      title: 'title',
      type: ProjectModel.CompanyRole.DEVELOPER,
      list: [getProjectCompany_1(), getProjectCompany_2(), getProjectCompany_3()],
      relatedList: [],
      clientMap: {},
      uiRelationMap: {},
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      params: {
        isDeveloper: false,
      },
      update: jest.fn(),
      onChange: jest.fn(),
      setRelationUiId: jest.fn(),
      searchCompanies: jest.fn(),
      createCompany: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should select item', () => {
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const input = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should add item', () => {
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const addBtn = wrapper.getByTestId('add-item-button');

    act(() => {
      fireEvent.click(addBtn);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should delete item', () => {
    props.uiRelationMap = [{ clientId: getProjectCompany_1().id }];
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const deleteBtn = wrapper.getAllByTestId('delete-entity-button')[0];

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should render option', () => {
    props.list = [getProjectCompany_1()];
    props.showCreateNew = false;
    props.uiRelationMap = {
      [getProjectCompany_1().tempId]: {
        searchResult: [getProjectCompany_1()],
      },
    };
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const allInputs = wrapper.getAllByTestId('autocomplete-wrapper');
    const input = allInputs[0].querySelector('input');

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render highlighted option', () => {
    props.list = [getProjectCompany_1()];
    props.showCreateNew = false;
    props.uiRelationMap = {
      [getProjectCompany_1().tempId]: {
        searchResult: [getProjectCompany_1()],
      },
    };
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const input = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'pan' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(wrapper.getByTestId('search-option-item').children.length).toBe(3);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should reset', () => {
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const input = wrapper.getAllByTestId('autocomplete-wrapper')[1].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(props.update).toHaveBeenCalled();
    expect(props.setRelationUiId).toHaveBeenCalled();
  });

  it('should createCompany', () => {
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );
    const input = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test value search' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const createButton = wrapper.getByTestId('create-entity');

    act(() => {
      fireEvent.click(createButton);
    });

    expect(props.createCompany).toHaveBeenCalledWith('test value search', 'temp-dev-search-id-0', false);
  });

  it('should validate duplicity', () => {
    props.list = [getProjectCompany_1(), getProjectCompany_3()];
    props.uiRelationMap = {
      [getProjectCompany_1().tempId]: {
        searchResult: [{ id: getProjectCompany_3().id, name: 'test' }, { name: 'test 2' }, { name: 'test 3' }],
      },
    };

    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const input = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    expect(wrapper.getByText('Client is already selected'));
    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('should show error', () => {
    props.list = [getProjectCompany_1()];
    props.uiRelationMap = {
      [getProjectCompany_1().tempId]: {
        error: 'error message',
      },
    };

    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    expect(wrapper.getByText('error message'));
  });

  it('should load client', () => {
    props.list = [getProjectCompany_1()];
    props.clientMap = {
      [getProjectCompany_1().id]: getProjectCompany_1() as any,
    };
    props.uiRelationMap = {
      [getProjectCompany_1().tempId]: {
        clientId: getProjectCompany_1().id,
      },
    };

    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    expect(wrapper.getByTestId('entity-row').textContent).toEqual('"company 1" is Active.');
  });

  it('should disable Add', () => {
    props.list = [{ ...getProjectCompany_1(), name: '' }];

    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change tax id', () => {
    props.uiRelationMap = [{ clientId: getProjectCompany_1().id }];
    props.showTaxExempt = true;
    wrapper = render(
      <MemoryRouter>
        <AssignList {...props} />
      </MemoryRouter>
    );

    const taxIdBtn = wrapper.getAllByTestId('client-isTaxExempt')[0];

    act(() => {
      fireEvent.click(taxIdBtn);
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
