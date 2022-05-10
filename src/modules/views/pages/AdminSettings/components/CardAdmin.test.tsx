import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardAdmin } from './CardAdmin';
import { MemoryRouter, useHistory } from 'react-router-dom';
import { logoProcore } from '../constants';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('Sidebar', () => {
  let props = {
    title: 'title',
    bodyFirstLine: 'first line',
    bodySecondLine: 'second line',
    linkDescription: 'link description',
    logo: logoProcore,
  };
  it('should render CardItem', () => {
    const { container } = render(
      <MemoryRouter>
        <CardAdmin {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it('should click all the card', () => {
    const wrapper = render(
      <MemoryRouter>
        <CardAdmin {...props} />
      </MemoryRouter>
    );
    act(() => {
      fireEvent.click(wrapper.getByTestId('procoreCard'));
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('/procore-clients');
  });
});
