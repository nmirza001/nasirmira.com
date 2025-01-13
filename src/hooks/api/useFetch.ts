import { useState, useEffect, useCallback } from 'react';

import { useMounted } from '../utility/useMounted';

// --- Export the necessary types ---
export interface UseFetchOptions<T> {
  initialData?: T;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  headers?: HeadersInit;
}

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

// Return type of the useFetch hook
export type UseFetchReturn<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void; // Function to manually trigger a refetch
};

export function useFetch<T>(url: string, options: UseFetchOptions<T> = {}): UseFetchReturn<T> {
  const { initialData = null, dependencies = [], onSuccess, onError, headers = {} } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    error: null,
    isLoading: true,
  });

  const isMounted = useMounted();

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (isMounted()) {
        setState({ data, error: null, isLoading: false });
        onSuccess?.(data);
      }
    } catch (error) {
      if (isMounted()) {
        const fetchError = error instanceof Error ? error : new Error('An error occurred');
        setState({ data: null, error: fetchError, isLoading: false });
        onError?.(fetchError);
      }
    }
  }, [url, isMounted, onSuccess, onError, headers]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch };
}
