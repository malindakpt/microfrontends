import React, { Component, ErrorInfo } from 'react';
import { ErrorStation } from './ErrorStation/ErrorStation';

interface ErrorState {
  hasError: true;
  error: Error;
  errorInfo: ErrorInfo;
}
interface NoErrorState {
  hasError: false;
}

type ErrorBoundaryState = ErrorState | NoErrorState;

/**
 * @deprecated This component is deprecated and will be removed in future versions.
 */
export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorStation {...this.state} />;
    }

    return this.props.children;
  }
}
