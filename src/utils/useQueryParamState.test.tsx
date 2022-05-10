import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { render, fireEvent } from '@testing-library/react';

import { useQueryParamState } from './useQueryParamState';

describe('useQueryParamState', () => {
  const Component = props => {
    const [state, setState] = useQueryParamState({ value: props.initialValue || '' });
    return (
      <div>
        <input data-testid="text-input" value={state.value} onChange={event => setState({ value: event.target.value })} />
        <span>{state.value}</span>
      </div>
    );
  };
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );
  });

  it('should render with initial state', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with state from url', () => {
    wrapper = render(
      <MemoryRouter initialEntries={['?value="value-from-query-param%26"']}>
        <Component />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should set state', () => {
    fireEvent.change(wrapper.getByTestId('text-input'), { target: { value: 'value typed in &' } });
    expect(wrapper.container).toMatchSnapshot();
  });
});
