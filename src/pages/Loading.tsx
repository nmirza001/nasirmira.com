import React from 'react';

import { motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', fullScreen = true }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const dotVariants = {
    animate: {
      y: [-8, 0, -8],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const progressVariants = {
    initial: {
      scaleX: 0.1,
      opacity: 0.8,
    },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-sm
        ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[400px]'}`}
    >
      <div className="text-center px-4">
        {/* Modern loading animation */}
        <div className="flex items-center justify-center space-x-2 mb-8 h-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-stone-800 rounded-full"
              variants={dotVariants}
              animate="animate"
              transition={{
                delay: index * 0.15,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-stone-800 mb-2">{message}</h2>
          <p className="text-sm text-stone-600">Please wait while we prepare your content</p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="mt-8 w-48 mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="h-0.5 w-full bg-stone-200 overflow-hidden">
            <motion.div
              className="h-full bg-stone-800 origin-left"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
