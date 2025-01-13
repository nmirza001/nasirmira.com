import { useState, useCallback } from 'react';

import { useMounted } from '../utility/useMounted';

// --- Export the necessary types ---
interface MutationState<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

export interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void | Promise<void>;
  onError?: (error: Error, variables: V) => void | Promise<void>;
  onSettled?: (data: T | null, error: Error | null, variables: V) => void | Promise<void>;
}

// Return type of the useMutation hook
export type UseMutationReturn<T, V> = {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  reset: () => void;
};

export function useMutation<T = unknown, V = unknown>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseMutationOptions<T, V> = {}
): UseMutationReturn<T, V> {
  const [state, setState] = useState<MutationState<T>>({
    isLoading: false,
    error: null,
    data: null,
  });

  const isMounted = useMounted();

  const mutate = useCallback(
    async (variables: V) => {
      setState({ isLoading: true, error: null, data: null });

      try {
        const data = await mutationFn(variables);

        if (isMounted()) {
          setState({ isLoading: false, error: null, data });
          await options.onSuccess?.(data, variables);
        }

        return data;
      } catch (error) {
        const mutationError = error instanceof Error ? error : new Error('Mutation failed');

        if (isMounted()) {
          setState({ isLoading: false, error: mutationError, data: null });
          await options.onError?.(mutationError, variables);
        }

        throw mutationError;
      } finally {
        if (isMounted()) {
          await options.onSettled?.(state.data, state.error, variables);
        }
      }
    },
    [mutationFn, options, isMounted]
  );

  return {
    mutate,
    ...state,
    reset: () => setState({ isLoading: false, error: null, data: null }),
  };
}
