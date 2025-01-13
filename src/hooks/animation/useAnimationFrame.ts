import { useEffect, useRef, useCallback } from 'react';

interface UseAnimationFrameProps {
  callback: (deltaTime: number) => void;
  isActive?: boolean;
}

export const useAnimationFrame = ({ callback, isActive = true }: UseAnimationFrameProps) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const callbackRef = useRef(callback); // Keep a ref for the callback

  // Update the callback ref whenever the callback prop changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callbackRef.current(deltaTime); // Call the updated callback
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []); // Remove dependencies: callbackRef is stable

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
    return undefined;
  }, [isActive, animate]);
};
