// src/hooks/types/media.ts

export interface UseWindowSizeReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface UseMediaQueryOptions {
  defaultMatches?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

export interface UseBreakpointOptions {
  defaultValue?: boolean;
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}
