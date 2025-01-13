// src/hooks/storage/useStorageListener.ts
import { useEffect, useCallback } from 'react';

interface StorageListenerOptions {
  onSet?: (key: string, newValue: string | null) => void;
  onRemove?: (key: string) => void;
  onClear?: () => void;
}

export function useStorageListener(
  storage: 'local' | 'session',
  options: StorageListenerOptions = {}
) {
  const handleStorage = useCallback(
    (event: StorageEvent) => {
      // Ignore events from other storage types
      if (
        (storage === 'local' && event.storageArea !== window.localStorage) ||
        (storage === 'session' && event.storageArea !== window.sessionStorage)
      ) {
        return;
      }

      if (event.key === null) {
        // storage.clear() was called
        options.onClear?.();
      } else if (event.newValue === null) {
        // Key was removed
        options.onRemove?.(event.key);
      } else {
        // Key was added/modified
        options.onSet?.(event.key, event.newValue);
      }
    },
    [storage, options]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);
}
