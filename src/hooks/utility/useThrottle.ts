// src/hooks/utility/useThrottle.ts
import { useState, useEffect, useRef } from 'react';

/**
 * A hook that throttles updates to a value.
 * @param value - The value to throttle.
 * @param interval - The throttle interval in milliseconds (default: 500).
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastUpdated.current;

    const handleUpdate = () => {
      setThrottledValue(value);
      lastUpdated.current = now;
    };

    if (timeElapsed >= interval) {
      handleUpdate();
    } else {
      const timeoutId = setTimeout(handleUpdate, interval - timeElapsed);
      return () => clearTimeout(timeoutId);
    }

    return undefined; // Explicitly return undefined when no cleanup needed
  }, [value, interval]);

  return throttledValue;
}
