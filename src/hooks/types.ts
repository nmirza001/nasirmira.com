// src/hooks/types.ts
import { Dispatch, SetStateAction } from 'react';

// Utility Types
export type UseTimeoutReturn = {
  reset: () => void;
  clear: () => void;
};

// Window Size Types
export interface UseWindowSizeReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Media Query Types
export interface UseMediaQueryOptions {
  defaultMatches?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

// Breakpoint Types
export interface UseBreakpointOptions {
  fallback?: boolean;
}

// Event Listener Types
export interface UseEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

// Async Types
export interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  immediate?: boolean;
}

export interface UseAsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

// Form Types
export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Record<string, string>;
}

export interface UseFormResult<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  reset: () => void;
}

// Input Types
export interface UseInputResult<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  error: string | null;
  touched: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
}

// Query Types
export interface UseQueryOptions<T> {
  enabled?: boolean;
  retry?: boolean | number;
  retryDelay?: number;
  staleTime?: number;
  cacheTime?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseQueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
}

// Mutation Types
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

// Cache Types
export interface UseCacheOptions<T> {
  maxAge?: number;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export interface UseCacheReturn<T> {
  get: (key: string) => T | null;
  set: (key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}
