// src/hooks/utility/useLogger.ts
interface LoggerOptions {
  enabled?: boolean;
  level?: 'debug' | 'info' | 'warn' | 'error';
}

export const useLogger = (namespace: string, options: LoggerOptions = {}) => {
  const { enabled = true, level = 'info' } = options;

  const levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  const shouldLog = (messageLevel: keyof typeof levels) => {
    return enabled && levels[messageLevel] >= levels[level];
  };

  return {
    debug: (...args: any[]) => {
      if (shouldLog('debug')) {
        console.debug(`[${namespace}]`, ...args);
      }
    },
    info: (...args: any[]) => {
      if (shouldLog('info')) {
        console.info(`[${namespace}]`, ...args);
      }
    },
    warn: (...args: any[]) => {
      if (shouldLog('warn')) {
        console.warn(`[${namespace}]`, ...args);
      }
    },
    error: (...args: any[]) => {
      if (shouldLog('error')) {
        console.error(`[${namespace}]`, ...args);
      }
    },
  };
};
