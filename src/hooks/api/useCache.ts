// src/hooks/api/useCache.ts
import { useRef, useCallback } from 'react';

// Options for the useCache hook
export interface CacheOptions<T> {
  maxAge?: number;
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Return type of the useCache hook
export type UseCacheReturn<T> = {
  set: (key: string, data: T) => void;
  get: (key: string) => T | null;
  remove: (key: string) => void;
  clear: () => void;
};

export function useCache<T>(options: CacheOptions<T> = {}): UseCacheReturn<T> {
  const { maxAge = 5 * 60 * 1000 } = options; // 5 minutes default

  const cache = useRef<Map<string, CacheItem<T>>>(new Map());

  const set = useCallback((key: string, data: T) => {
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  const get = useCallback(
    (key: string): T | null => {
      const item = cache.current.get(key);
      if (!item) return null;

      if (Date.now() - item.timestamp > maxAge) {
        cache.current.delete(key);
        return null;
      }

      return item.data;
    },
    [maxAge]
  );

  const remove = useCallback((key: string) => {
    cache.current.delete(key);
  }, []);

  const clear = useCallback(() => {
    cache.current.clear();
  }, []);

  return { set, get, remove, clear };
}
