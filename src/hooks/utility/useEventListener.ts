// src/hooks/utility/useEventListener.ts
import { useEffect, useRef, RefObject } from 'react';

interface WindowEventMap {
  // Add any window-specific events you need
  resize: UIEvent;
  scroll: Event;
}

type EventType = keyof WindowEventMap | keyof HTMLElementEventMap | keyof DocumentEventMap;

export function useEventListener<K extends EventType>(
  eventName: K,
  handler: (event: Event) => void,
  element?: RefObject<HTMLElement | Window | Document> | null,
  options?: boolean | AddEventListenerOptions
): void {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the target element that will listen to the event
    const targetElement = element?.current || window;

    if (!(targetElement && targetElement.addEventListener)) return;

    // Create event listener that calls handler function stored in ref
    const listener: EventListener = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, listener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
