// src/hooks/media/useWindowSize.ts
import { useState, useEffect } from 'react';

import { useDebounce } from '../utility/useDebounce';

// Interface for the window size information.
export interface WindowSize {
  // Export the interface
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// **No need to export UseWindowSizeReturn separately.**
// We'll use WindowSize as the return type directly.

export function useWindowSize(debounceMs: number = 100): WindowSize {
  // Return type is WindowSize
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet:
      typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  });

  // Debounce the window size update
  const debouncedSize = useDebounce(windowSize, debounceMs);

  useEffect(() => {
    // Only run on the client-side
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);

    // Call handleResize immediately to get the initial size
    handleResize();

    // Cleanup: remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array: only run on mount and unmount

  return debouncedSize;
}
