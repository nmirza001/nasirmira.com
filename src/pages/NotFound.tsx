// src/pages/NotFound.tsx
import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-9xl font-medium text-stone-800 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-2xl font-medium text-stone-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-stone-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            The page you're looking for doesn't seem to exist or has been moved.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 transition-colors duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.05, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-96 h-96 border-4 border-stone-800 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
