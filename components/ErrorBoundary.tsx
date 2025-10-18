"use client";

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error | undefined; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error | undefined; resetError: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/5 p-6 text-center">
        <h2 className="mb-4 text-xl font-bold text-white">Something went wrong</h2>
        <p className="mb-4 text-white/70">
          The Corg-verse encountered an error. Don&apos;t worry, our corgis are working on it!
        </p>
        {error && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm text-white/60">Error details</summary>
            <pre className="mt-2 text-xs text-red-400">{error.message}</pre>
          </details>
        )}
        <button
          onClick={resetError}
          className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
