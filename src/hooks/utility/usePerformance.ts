// src/hooks/utility/usePerformance.ts
import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
  cumulativeLayoutShift: number | null;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput?: boolean;
  sources?: Array<{
    node?: Node;
    currentRect: DOMRectReadOnly;
    previousRect: DOMRectReadOnly;
  }>;
}

export const usePerformance = () => {
  const metrics = useRef<PerformanceMetrics>({
    firstContentfulPaint: null,
    largestContentfulPaint: null,
    firstInputDelay: null,
    cumulativeLayoutShift: null,
  });

  useEffect(() => {
    // First Contentful Paint
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find((entry) => entry.name === 'first-contentful-paint');
    if (fcp) {
      metrics.current.firstContentfulPaint = fcp.startTime;
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.current.largestContentfulPaint = lastEntry.startTime;
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observation not supported');
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry instanceof PerformanceEventTiming) {
          metrics.current.firstInputDelay = entry.processingStart - entry.startTime;
        }
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observation not supported');
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let cumulativeLayoutShift = 0;
      list.getEntries().forEach((entry) => {
        const layoutShiftEntry = entry as LayoutShiftEntry;
        // Only count layout shifts without recent user input
        if (!layoutShiftEntry.hadRecentInput) {
          cumulativeLayoutShift += layoutShiftEntry.value;
        }
      });
      metrics.current.cumulativeLayoutShift = cumulativeLayoutShift;
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observation not supported');
    }

    return () => {
      try {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      } catch (e) {
        console.warn('Error disconnecting observers:', e);
      }
    };
  }, []);

  return metrics.current;
};
