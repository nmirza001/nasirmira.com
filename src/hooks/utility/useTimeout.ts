// src/hooks/utility/useTimeout.ts
import { useEffect, useRef, useCallback } from 'react';

/**
 * A hook that provides a declarative way to set and clear timeouts.
 * @param callback - The function to be executed after the delay.
 * @param delay - The delay in milliseconds, or null to clear the timeout.
 * @returns An object containing functions to reset and clear the timeout.
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  const set = useCallback(() => {
    timeoutId.current = setTimeout(() => savedCallback.current(), delay || 0);
  }, [delay]);

  // Clear the timeout.
  const clear = useCallback(() => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  // Reset the timeout.
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  // Set or clear the timeout when the delay changes.
  useEffect(() => {
    if (delay !== null) {
      set();
      return clear;
    }
    return undefined; // Explicitly return undefined when delay is null
  }, [delay, set, clear]);

  return { reset, clear };
}
