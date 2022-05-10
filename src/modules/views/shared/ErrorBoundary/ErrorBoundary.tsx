import React from 'react';

export interface IErrorBoundaryProps {
  Logger: { error: (...args) => void };
  fallback?: React.ReactElement;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  public static defaultProps = {
    Logger: null,
    children: null,
    fallback: null,
  };

  public state = { hasError: false };

  public static getDerivedStateFromError = (error: Error): IErrorBoundaryState => ({ hasError: true });

  public componentDidCatch(error, info) {
    const { Logger } = this.props;
    /* istanbul ignore else */
    if (Logger.error) Logger.error('ErrorBoundary: ', error, info);
  }

  public render() {
    const { children, fallback } = this.props;
    const { hasError } = this.state;

    return hasError ? fallback : children;
  }
}
