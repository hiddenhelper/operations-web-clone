import React from 'react';
import { render } from '@testing-library/react';
import AdminSettings from './Settings';
import { MemoryRouter } from 'react-router';

describe('Sidebar', () => {
  it('should render admin tab', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminSettings />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
