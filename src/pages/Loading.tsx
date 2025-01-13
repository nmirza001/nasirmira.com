// src/pages/Loading.tsx
import React from 'react';

import { motion } from 'framer-motion';

import { useMediaQuery } from '../hooks';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', fullScreen = true }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const spinTransition = {
    repeat: Infinity,
    duration: 1,
    ease: 'easeInOut',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center bg-stone-50
        ${fullScreen ? 'fixed inset-0' : 'w-full h-full min-h-[400px]'}`}
    >
      <div className="text-center">
        {/* Animated Logo or Spinner */}
        <motion.div
          className="relative w-16 h-16 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer circle */}
          <motion.div
            className="absolute inset-0 border-2 border-stone-200 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={spinTransition}
          />

          {/* Inner spinning circle */}
          <motion.div
            className="absolute inset-0 border-t-2 border-stone-800 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute inset-0 m-auto w-2 h-2 bg-stone-800 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-stone-800 mb-2">{message}</h2>
          <p className="text-sm text-stone-600">Please wait while we prepare your content</p>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          className="mt-8 w-48 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-stone-800 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
