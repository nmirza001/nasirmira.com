// src/hooks/utility/useIdle.ts
import { useState, useEffect, useCallback } from 'react';

interface UseIdleOptions {
  timeout?: number;
  events?: string[];
}

export const useIdle = ({
  timeout = 1000 * 60 * 5, // 5 minutes
  events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'],
}: UseIdleOptions = {}) => {
  const [isIdle, setIsIdle] = useState(false);
  const [lastActive, setLastActive] = useState(Date.now());

  const handleActivity = useCallback(() => {
    setIsIdle(false);
    setLastActive(Date.now());
  }, []);

  useEffect(() => {
    let timeoutId: number;

    const setup = () => {
      timeoutId = window.setTimeout(() => {
        if (Date.now() - lastActive >= timeout) {
          setIsIdle(true);
        }
      }, timeout);
    };

    setup();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [timeout, events, handleActivity, lastActive]);

  return { isIdle, lastActive };
};
