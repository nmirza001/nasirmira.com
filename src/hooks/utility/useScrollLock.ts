// src/hooks/utility/useScrollLock.ts
import { useCallback } from 'react';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--scrollbar-width)';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  return { lockScroll, unlockScroll };
};
