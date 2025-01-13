// src/hooks/utility/useMounted.ts
import { useEffect, useRef, useCallback } from 'react';

export const useMounted = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
};
