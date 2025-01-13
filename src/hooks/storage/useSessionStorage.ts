// src/hooks/storage/useSessionStorage.ts
import { useState, useEffect, useCallback } from 'react';

import { StorageOptions } from './useLocalStorage';

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = console.error,
  } = options;

  // Initialize state with value from sessionStorage if it exists,
  // otherwise use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Failed to get stored value'));
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, serializer(valueToStore));
        }
      } catch (error) {
        onError(error instanceof Error ? error : new Error('Failed to set stored value'));
      }
    },
    [key, serializer, onError, storedValue]
  );

  // Subscribe to changes in sessionStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserializer(e.newValue));
        } catch (error) {
          onError(error instanceof Error ? error : new Error('Failed to parse stored value'));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserializer, onError]);

  return [storedValue, setValue] as const;
}
