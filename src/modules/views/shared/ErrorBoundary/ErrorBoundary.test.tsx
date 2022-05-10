import React from 'react';
import { create } from 'react-test-renderer';

import ErrorBoundary from './ErrorBoundary';

class HandGranade extends React.Component {
  public render() {
    const a: any = null;
    a.b.c = 10;
    return <div>This should not work</div>;
  }
}

const Logger = { error: jest.fn() };

describe('ErrorBoundaryTest', () => {
  global.console.error = () => null;
  it('renders child', () => {
    expect(
      create(
        <ErrorBoundary>
          <div>Render test</div>
        </ErrorBoundary>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('renders placeholder when child render fails', () => {
    expect(
      create(
        <ErrorBoundary Logger={Logger} fallback={<h1>Error!</h1>}>
          <HandGranade>Render test</HandGranade>
        </ErrorBoundary>
      ).toJSON()
    ).toMatchSnapshot();
    expect(Logger.error).toHaveBeenCalled();
  });
});
