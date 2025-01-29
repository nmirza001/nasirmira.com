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
      dot: 'w-1.5 h-1.5',
      container: 'gap-1',
      text: 'text-sm',
    },
    medium: {
      dot: 'w-2 h-2',
      container: 'gap-1.5',
      text: 'text-base',
    },
    large: {
      dot: 'w-2.5 h-2.5',
      container: 'gap-2',
      text: 'text-lg',
    },
  };

  const bounceTransition = {
    y: {
      duration: 0.4,
      repeat: Infinity,
      ease: 'easeOut',
      repeatType: 'reverse',
    },
    opacity: {
      duration: 0.2,
      repeat: Infinity,
      ease: 'easeOut',
      repeatType: 'reverse',
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center
        ${
          fullScreen
            ? 'fixed inset-0 bg-stone-50/90 backdrop-blur-sm z-50'
            : 'w-full h-full min-h-[200px]'
        }`}
    >
      <div className="flex flex-col items-center">
        {/* Dots animation */}
        <div className={`flex items-center justify-center ${sizes[size].container} mb-4`}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${sizes[size].dot} bg-stone-800 rounded-full`}
              animate={
                reduceMotion
                  ? { opacity: 0.5 }
                  : {
                      y: ['0%', '-50%'],
                      opacity: [0.5, 1],
                    }
              }
              transition={{
                ...bounceTransition,
                delay: index * 0.1,
              }}
            />
          ))}
        </div>

        {/* Message */}
        {message && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className={`text-stone-600 ${sizes[size].text}`}>{message}</p>
          </motion.div>
        )}

        {/* Progress bar - subtle loading indicator */}
        <motion.div
          className="mt-4 w-24 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-px bg-stone-200 overflow-hidden">
            <motion.div
              className="h-full bg-stone-800 origin-left"
              initial={{ scaleX: 0 }}
              animate={reduceMotion ? { scaleX: 0.5 } : { scaleX: [0, 1] }}
              transition={{
                duration: 1,
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
