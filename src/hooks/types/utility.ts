// src/hooks/types/utility.ts

export interface UseEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

export interface UseTimeoutReturn {
  reset: () => void;
  clear: () => void;
}

export interface UseDebounceOptions {
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface PerformanceMetrics {
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
  cumulativeLayoutShift: number | null;
}
