import { type RefObject } from 'react';

// Animation & Intersection Hooks
export { useIntersectionObserver } from './utility/useIntersectionObserver';
export type { UseIntersectionObserverProps } from './utility/useIntersectionObserver';

// Media Hooks
export { useMediaQuery } from './media/useMediaQuery';
export { useBreakpoint } from './media/useBreakpoint';
export { useResponsiveValue } from './media/useResponsiveValue';
export { useWindowSize } from './media/useWindowSize';
export type { WindowSize } from './media/useWindowSize';

// Form Hooks
export { useForm } from './form/useForm';
export { useInput } from './form/useInput';
export type { UseFormProps, UseFormReturn, ValidationRules } from './form/useForm';
export type { UseInputProps, UseInputReturn } from './form/useInput';

// API Hooks
export { useAsync } from './api/useAsync';
export { useFetch } from './api/useFetch';
export { useQuery } from './api/useQuery';
export { useMutation } from './api/useMutation';
export { useCache } from './api/useCache';
export type { UseAsyncOptions, UseAsyncReturn } from './api/useAsync';
export type { UseFetchOptions, UseFetchReturn } from './api/useFetch';
export type { UseQueryOptions, UseQueryReturn } from './api/useQuery';
export type { UseMutationOptions, UseMutationReturn } from './api/useMutation';
export type { CacheOptions, UseCacheReturn } from './api/useCache';

// Storage Hooks
export { useLocalStorage } from './storage/useLocalStorage';
export { useSessionStorage } from './storage/useSessionStorage';

// Utility Hooks
export { useMounted } from './utility/useMounted';
export { useDebounce } from './utility/useDebounce';
export { useThrottle } from './utility/useThrottle';
export { useEventListener } from './utility/useEventListener';
export { useTimeout } from './utility/useTimeout';
export { usePrevious } from './utility/usePrevious';

// Add RefIntersectionObserverReturn type
export type RefIntersectionObserverReturn<T extends Element> = [RefObject<T>, boolean];
