import { useState, useCallback, useEffect, useRef } from 'react';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

interface TransitionOptions {
  timeout?: number;
  onEnter?: () => void;
  onExit?: () => void;
}

export const useTransition = (
  initialIn: boolean = false,
  { timeout = 300, onEnter, onExit }: TransitionOptions = {}
) => {
  const [state, setState] = useState<TransitionState>(initialIn ? 'entered' : 'exited');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup function to clear timeout
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Use an effect to clear any existing timeouts when component unmounts or dependencies change
  useEffect(() => {
    return () => clearTimer();
  }, [timeout, onEnter, onExit]);

  const enter = useCallback(() => {
    clearTimer(); // Clear any pending exit timer
    setState('entering');
    onEnter?.();

    timerRef.current = setTimeout(() => {
      setState('entered');
    }, timeout);
  }, [timeout, onEnter]);

  const exit = useCallback(() => {
    clearTimer(); // Clear any pending enter timer
    setState('exiting');
    onExit?.();

    timerRef.current = setTimeout(() => {
      setState('exited');
    }, timeout);
  }, [timeout, onExit]);

  return {
    state,
    enter,
    exit,
    isTransitioning: state === 'entering' || state === 'exiting',
  };
};
