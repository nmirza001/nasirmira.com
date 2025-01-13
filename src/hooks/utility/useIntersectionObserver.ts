// src/hooks/utility/useIntersectionObserver.ts
import { useState, useEffect, useRef, RefObject } from 'react';

// **Export the interface so it can be used in other files**
export interface UseIntersectionObserverProps {
  threshold?: number | number[]; // Array of values or single value for intersection thresholds
  rootMargin?: string; // Margin around the root. Similar to CSS margin.
  root?: Element | null; // The element used as the viewport. Defaults to browser viewport if null.
  triggerOnce?: boolean; // If true, only trigger the intersection callback once.
}

// Type parameter <T extends Element> ensures the ref is for an HTML element.
export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverProps = {} // Optional options with defaults
): [RefObject<T>, boolean] {
  // Returns a tuple: [ref to element, isIntersecting]

  // Destructure options, providing default values:
  const {
    threshold = 0, // Default threshold is 0 (fully visible when even 1px is visible)
    rootMargin = '0px', // Default rootMargin is '0px'
    root = null, // Default root is the browser viewport
    triggerOnce = false, // Default is to trigger the callback multiple times
  } = options;

  // State to track if the element is intersecting
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Ref to the element being observed
  const elementRef = useRef<T>(null);

  // Ref to keep track of whether the intersection has already been triggered (used with triggerOnce)
  const frozen = useRef(false);

  useEffect(() => {
    // Get the current element from the ref
    const element = elementRef.current;

    // If no element or if triggerOnce is true and already triggered, do nothing
    if (!element || (triggerOnce && frozen.current)) return;

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Callback function, receives an array of IntersectionObserverEntry objects
        // Update the isIntersecting state with the current intersection status
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        // If triggerOnce is true and the element is intersecting,
        // set frozen to true and unobserve the element to stop further callbacks.
        if (triggerOnce && isElementIntersecting) {
          frozen.current = true; // Mark as triggered
          observer.unobserve(element); // Stop observing
        }
      },
      { threshold, rootMargin, root } // Options for the observer
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function: Stop observing the element when the component unmounts or dependencies change.
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, root, triggerOnce]); // Dependencies for the useEffect hook

  // Return the ref and the isIntersecting state
  return [elementRef, isIntersecting];
}
