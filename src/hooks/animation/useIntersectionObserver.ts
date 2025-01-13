import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = <T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [RefObject<T>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (freezeOnceVisible && frozen.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        setIsVisible(isElementVisible);

        if (freezeOnceVisible && isElementVisible) {
          frozen.current = true;
          observer.disconnect(); // Disconnect observer when frozen
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // Add element to dependencies to handle edge case
  }, [threshold, root, rootMargin, freezeOnceVisible, elementRef.current]);

  return [elementRef, isVisible];
};
