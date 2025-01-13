import { useState, useCallback, useEffect } from 'react';

import { useMounted } from '../utility/useMounted';

// --- Exported Types ---
export interface UseAsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

export interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  immediate?: boolean; // If true, executes the async function immediately on mount
}

// Return type of the useAsync hook
export type UseAsyncReturn<T> = {
  execute: (...args: any[]) => Promise<T>; // Function to manually trigger execution
  status: UseAsyncState<T>['status'];
  data: T | null;
  error: Error | null;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
};

// --- useAsync Hook ---
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T> {
  const { onSuccess, onError, immediate = false } = options;
  const isMounted = useMounted();

  const [state, setState] = useState<UseAsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      // Change: Return a rejected promise if not mounted
      if (!isMounted()) {
        return Promise.reject(new Error('Component unmounted before async operation completed.'));
      }

      setState({ status: 'pending', data: null, error: null });

      try {
        const data = await asyncFunction(...args);
        if (isMounted()) {
          setState({ status: 'success', data, error: null });
          onSuccess?.(data);
        }
        return data;
      } catch (error) {
        const asyncError = error instanceof Error ? error : new Error('An error occurred');
        if (isMounted()) {
          setState({ status: 'error', data: null, error: asyncError });
          onError?.(asyncError);
        }
        throw asyncError;
      }
    },
    [asyncFunction, isMounted, onSuccess, onError]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    execute,
    status: state.status,
    data: state.data,
    error: state.error,
    isIdle: state.status === 'idle',
    isPending: state.status === 'pending',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}
