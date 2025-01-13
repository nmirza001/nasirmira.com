import React from 'react';

import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      errorInfo: errorInfo,
    });

    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
          <motion.div
            className="max-w-lg w-full bg-white p-8 rounded-lg border border-stone-200 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-medium text-stone-800 mb-4">Something Went Wrong</h1>

            <p className="text-stone-600 mb-6">
              An unexpected error has occurred. Please try refreshing the page or contact me if the
              problem persists.
            </p>

            {typeof process !== 'undefined' &&
              process.env.NODE_ENV === 'development' &&
              this.state.errorInfo && (
                <div className="mb-6 text-left">
                  <details className="bg-stone-50 p-4 rounded-lg">
                    <summary className="text-stone-800 font-medium cursor-pointer">
                      Error Details
                    </summary>
                    <pre className="mt-2 text-sm text-stone-600 overflow-auto p-2">
                      {/* Display error message from errorInfo if available */}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                </div>
              )}

            <button
              onClick={this.handleRefresh}
              className="inline-flex items-center px-6 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 transition-colors duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
