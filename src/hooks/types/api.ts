// src/hooks/types/api.ts

export interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  immediate?: boolean;
}

export interface UseFetchOptions<T> extends UseAsyncOptions<T> {
  headers?: HeadersInit;
  method?: string;
  body?: any;
}

export interface UseQueryOptions<T> extends UseAsyncOptions<T> {
  enabled?: boolean;
  retryCount?: number;
  retryDelay?: number;
  cacheTime?: number;
}

export interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void | Promise<void>;
  onError?: (error: Error, variables: V) => void | Promise<void>;
  onSettled?: (data: T | null, error: Error | null, variables: V) => void | Promise<void>;
}

export interface UseMutationResult<T, V> {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  reset: () => void;
}

export interface UseQueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
}

export interface UseCacheOptions {
  maxAge?: number;
}

export interface UseCacheReturn<T> {
  get: (key: string) => T | null;
  set: (key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}
