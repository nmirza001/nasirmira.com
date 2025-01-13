// src/hooks/media/useBreakpoint.ts
import { useMediaQuery } from './useMediaQuery';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
};
