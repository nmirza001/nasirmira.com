// src/hooks/media/useResponsiveValue.ts
import { useMemo } from 'react';

import { useBreakpoint } from './useBreakpoint';

type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

/**
 * A hook that returns a responsive value based on the current breakpoint.
 * @param values - An object containing values for different breakpoints.
 * @returns The value corresponding to the current breakpoint.
 */
export const useResponsiveValue = <T>(values: ResponsiveValue<T>): T => {
  const isSm = useBreakpoint('sm');
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');
  const isXl = useBreakpoint('xl');
  const is2Xl = useBreakpoint('2xl');

  return useMemo(() => {
    if (is2Xl && values['2xl'] !== undefined) return values['2xl'];
    if (isXl && values.xl !== undefined) return values.xl;
    if (isLg && values.lg !== undefined) return values.lg;
    if (isMd && values.md !== undefined) return values.md;
    if (isSm && values.sm !== undefined) return values.sm;
    return values.base;
  }, [values, isSm, isMd, isLg, isXl, is2Xl]);
};
