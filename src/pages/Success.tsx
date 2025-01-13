import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Home, Mail } from 'lucide-react';

import { PageProps } from '../types/common'; // Import PageProps

interface SuccessProps {
  title?: string;
  message?: string;
  type?: 'contact' | 'submission' | 'general';
}

const Success: React.FC<SuccessProps & PageProps> = ({
  title = 'Thank You!',
  message = 'Your message has been successfully sent.',
  type = 'contact',
}) => {
  const navigate = useNavigate();

  const nextSteps = {
    contact: [
      {
        text: 'I typically respond within 24-48 hours during weekdays.',
        icon: Mail,
      },
      {
        text: 'Feel free to explore my projects while you wait.',
        icon: Home,
      },
    ],
    submission: [
      {
        text: 'Your submission has been received and is being reviewed.',
        icon: CheckCircle,
      },
      {
        text: 'You will receive a confirmation email shortly.',
        icon: Mail,
      },
    ],
    general: [
      {
        text: 'Your request has been processed successfully.',
        icon: CheckCircle,
      },
      {
        text: 'You can now continue browsing the website.',
        icon: Home,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="w-20 h-20 mx-auto mb-6 text-green-500"
          >
            <CheckCircle className="w-full h-full" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl font-medium text-stone-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {title}
          </motion.h1>

          {/* Message */}
          <motion.p
            className="text-stone-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {message}
          </motion.p>

          {/* Next Steps */}
          <motion.div
            className="bg-white p-6 rounded-lg border border-stone-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-lg font-medium text-stone-800 mb-4">Next Steps</h2>
            <div className="space-y-4">
              {nextSteps[type].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center text-stone-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <p className="text-sm">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-6 py-3 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 transition-colors duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
