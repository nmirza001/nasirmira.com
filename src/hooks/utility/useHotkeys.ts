// src/hooks/utility/useHotkeys.ts
import { useEffect, useCallback } from 'react';

type KeyCombo = string;
type Handler = (event: KeyboardEvent) => void;
type Options = {
  enabled?: boolean;
  preventDefault?: boolean;
};

const parseKeyCombo = (combo: KeyCombo): string[] =>
  combo.toLowerCase().replace(/\s/g, '').split('+');

export const useHotkeys = (keyCombo: KeyCombo, handler: Handler, options: Options = {}) => {
  const { enabled = true, preventDefault = true } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const keys = parseKeyCombo(keyCombo);
      const mainKey = keys[keys.length - 1];
      const modifiers = keys.slice(0, -1);

      const hasModifiers = modifiers.every((modifier) => {
        if (modifier === 'ctrl') return event.ctrlKey;
        if (modifier === 'alt') return event.altKey;
        if (modifier === 'shift') return event.shiftKey;
        if (modifier === 'meta') return event.metaKey;
        return false;
      });

      if (hasModifiers && event.key.toLowerCase() === mainKey) {
        if (preventDefault) {
          event.preventDefault();
        }
        handler(event);
      }
    },
    [keyCombo, handler, enabled, preventDefault]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
