// src/hooks/utility/useDocumentTitle.ts
import { useEffect, useRef } from 'react';

export const useDocumentTitle = (title: string, restoreOnUnmount = false) => {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle.current;
      }
    };
  }, [title, restoreOnUnmount]);
};
