// src/hooks/utility/useClipboard.ts
import { useState, useCallback } from 'react';

interface UseClipboardOptions {
  timeout?: number;
}

export const useClipboard = (options: UseClipboardOptions = {}) => {
  const { timeout = 2000 } = options;
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard API not available');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);

        setTimeout(() => {
          setHasCopied(false);
        }, timeout);

        return true;
      } catch (error) {
        console.error('Failed to copy:', error);
        setHasCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copyToClipboard, hasCopied };
};
