import React from 'react';
import { render, act, fireEvent, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import AssignRow, { IAssignClientRowProps } from './AssignRow';

jest.mock('@material-ui/lab/Autocomplete', () => {
  return (() => ({ value, onChange }) => {
    return (
      <div>
        <input data-testid="assign-entity-item" value={value} onChange={onChange} />
      </div>
    );
  })();
});

describe('AssignRow', () => {
  let wrapper: RenderResult;
  let props: IAssignClientRowProps;

  beforeEach(() => {
    props = {
      index: 0,
      isNew: false,
      duplicity: null,
      error: null,
      assignEntityProps: {
        index: 0,
        tempId: 'temp-id-0',
        result: [],
        params: { isDeveloper: false },
        optionLabel: 'name',
        assignValue: { name: 'value' },
        isLoading: false,
        existRelation: false,
        showCreateNew: true,
        placeholder: '',
        renderOption: jest.fn(),
        search: jest.fn(),
        onCreate: jest.fn(),
        onReset: jest.fn(),
        onSelect: jest.fn(),
      },
      entityResponse: {} as any,
      onDelete: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(<AssignRow {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should delete row', () => {
    wrapper = render(<AssignRow {...props} />);
    const deleteBtn = wrapper.getByTestId('delete-entity-button');
    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(props.onDelete).toHaveBeenCalledWith(0, 'temp-id-0');
  });

  it('should show row label', () => {
    props.entityResponse = { id: 'id', name: 'row name', status: 0 };
    wrapper = render(
      <MemoryRouter>
        <AssignRow {...props} />
      </MemoryRouter>
    );
    const deleteBtn = wrapper.getByTestId('delete-entity-button');
    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(props.onDelete).toHaveBeenCalledWith(0, 'temp-id-0');
  });

  it('should show duplicity message', () => {
    props.duplicity = 'is duplicated';
    wrapper = render(
      <MemoryRouter>
        <AssignRow {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show error message', () => {
    props.error = 'error message';
    props.assignEntityProps.assignValue = { name: '' };
    wrapper = render(
      <MemoryRouter>
        <AssignRow {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should set entity as selected', () => {
    props.isNew = true;
    props.entityResponse = { id: 'id', name: 'row name', status: 0 };
    wrapper = render(
      <MemoryRouter>
        <AssignRow {...props} />
      </MemoryRouter>
    );
    expect(props.assignEntityProps.onSelect).toHaveBeenCalledWith(0, props.entityResponse, 'temp-id-0');
  });
});
