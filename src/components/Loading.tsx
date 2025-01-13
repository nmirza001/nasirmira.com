// src/components/Loading.tsx
import React from 'react';

import { motion } from 'framer-motion';

export interface LoadingProps {
  reduceMotion?: boolean;
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({
  reduceMotion = false,
  fullScreen = true,
  message = 'Loading...',
  size = 'medium',
}) => {
  const sizes = {
    small: {
      outer: 'w-8 h-8',
      inner: 'w-6 h-6',
      text: 'text-sm',
    },
    medium: {
      outer: 'w-12 h-12',
      inner: 'w-10 h-10',
      text: 'text-base',
    },
    large: {
      outer: 'w-16 h-16',
      inner: 'w-14 h-14',
      text: 'text-lg',
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center
        ${fullScreen ? 'fixed inset-0 bg-stone-50 z-50' : 'w-full h-full min-h-[200px]'}`}
    >
      <div className="relative">
        <div className={`relative ${sizes[size].outer}`}>
          <motion.div
            className="absolute inset-0 border-2 border-stone-200 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: reduceMotion ? 0.3 : [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />

          <motion.div
            className="absolute inset-0 border-t-2 border-stone-800 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {message && (
        <motion.p
          className={`mt-4 text-stone-600 ${sizes[size].text}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loading;
