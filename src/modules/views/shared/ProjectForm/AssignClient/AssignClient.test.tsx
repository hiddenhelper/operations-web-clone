import React from 'react';
import { render, act, fireEvent, RenderResult } from '@testing-library/react';

import AssignClient, { IAssignClientProps } from './AssignClient';
import { getProjectCompany_1, getProjectCompany_2 } from '../../../../../test/entities';

jest.mock('./AssignList', () => {
  return (() => ({ createCompany }) => {
    const onCreate = () => createCompany('text', 'step', 'tempId');
    return (
      <div>
        <button data-testid="oncreate-btn" onClick={onCreate}>
          create
        </button>
        assign-list
      </div>
    );
  })();
});

describe('AssignClient', () => {
  let wrapper: RenderResult;
  let props: IAssignClientProps;

  beforeEach(() => {
    props = {
      clientMap: {},
      relatedCompanies: [],
      uiRelationMap: {},
      searchLoading: undefined,
      mwbeList: [],
      currentStep: {} as any,
      update: jest.fn(),
      onChange: jest.fn(),
      fetchMwbeList: jest.fn(),
      clearRelationMap: jest.fn(),
      clearClientErrors: jest.fn(),
      setRelationUiId: jest.fn(),
      searchCompanies: jest.fn(),
      createCompany: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(<AssignClient {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetch mwbeList', () => {
    props.mwbeList = [];
    wrapper = render(<AssignClient {...props} />);
    expect(props.fetchMwbeList).toHaveBeenCalled();
  });

  it('should create client', () => {
    props.relatedCompanies = [getProjectCompany_1(), getProjectCompany_2(), { ...getProjectCompany_2(), tempId: null }];
    props.mwbeList = [
      { id: '1', name: 'name 1' },
      { id: '2', name: '2' },
      { name: 'None', id: 'none-id' },
    ];
    wrapper = render(<AssignClient {...props} />);

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('oncreate-btn')[0]);
    });

    expect(props.createCompany).toHaveBeenCalled();
  });
});
