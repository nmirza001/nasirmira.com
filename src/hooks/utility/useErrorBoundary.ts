// src/hooks/utility/useErrorBoundary.ts
import { useState, useCallback } from 'react';

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export const useErrorBoundary = (onError?: (error: Error, errorInfo: React.ErrorInfo) => void) => {
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({
    error: null,
    errorInfo: null,
  });

  const handleCatch = useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
      setErrorState({ error, errorInfo });
      onError?.(error, errorInfo);
    },
    [onError]
  );

  const reset = useCallback(() => {
    setErrorState({ error: null, errorInfo: null });
  }, []);

  return {
    error: errorState.error,
    errorInfo: errorState.errorInfo,
    handleCatch,
    reset,
  };
};
