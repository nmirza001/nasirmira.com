// src/hooks/api/useQuery.ts
import { useCallback, useRef } from 'react';

import { useAsync, UseAsyncReturn } from './useAsync';
import { useCache } from './useCache';

// --- Exported Types ---
export interface UseQueryOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retryCount?: number;
  retryDelay?: number;
  cacheTime?: number;
  cacheKey?: string; // Add cacheKey to options
}

// Return type of the useQuery hook
export type UseQueryReturn<T> = UseAsyncReturn<T> & {
  refetch: () => Promise<T>; // Explicitly define refetch
};

// --- useQuery Hook ---
export function useQuery<T>(
  queryFn: () => Promise<T>,
  options: UseQueryOptions<T> = {}
): UseQueryReturn<T> {
  const {
    onSuccess,
    onError,
    retryCount = 3,
    retryDelay = 1000,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    cacheKey = '', // Provide a default cacheKey
  } = options;

  const retryCountRef = useRef(0);
  const cache = useCache<T>({ maxAge: cacheTime });

  const executeQuery = useCallback(async () => {
    // Use cacheKey in cache logic
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const data = await queryFn();
      // Cache the successful result
      cache.set(cacheKey, data);
      return data;
    } catch (error) {
      if (retryCountRef.current < retryCount) {
        retryCountRef.current += 1;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return executeQuery();
      }
      throw error;
    }
  }, [cache, cacheKey, queryFn, retryCount, retryDelay]);

  // --- Use useAsync and include execute ---
  const { execute, status, data, error, isIdle, isPending, isSuccess, isError } = useAsync(
    executeQuery,
    { onSuccess, onError }
  );

  const refetch = useCallback(() => {
    retryCountRef.current = 0;
    // Remove data from cache on refetch
    cache.remove(cacheKey);
    return execute();
  }, [cache, cacheKey, execute]);

  // --- Fix: Include execute in the returned object ---
  return {
    execute, // Now correctly includes execute
    data,
    error,
    status,
    isIdle,
    isPending,
    isSuccess,
    isError,
    refetch,
  };
}
