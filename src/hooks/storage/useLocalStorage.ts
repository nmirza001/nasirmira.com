// src/hooks/storage/useLocalStorage.ts
import { useState, useEffect, useCallback } from 'react';

export interface StorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: Error) => void;
}

const defaultSerializer = JSON.stringify;
const defaultDeserializer = JSON.parse;

export function useLocalStorage<T>(key: string, initialValue: T, options: StorageOptions<T> = {}) {
  const {
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
    onError = console.error,
  } = options;

  // Initialize state with value from localStorage if it exists,
  // otherwise use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Failed to get stored value'));
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists
  // the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore));
        }
      } catch (error) {
        onError(error instanceof Error ? error : new Error('Failed to set stored value'));
      }
    },
    [key, serializer, onError, storedValue]
  );

  // Subscribe to changes in localStorage
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
