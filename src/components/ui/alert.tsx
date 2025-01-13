import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-stone-50 text-stone-800 border-stone-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 max-w-md rounded-lg border p-4 shadow-lg ${styles[type]}`}
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>

            <div className="ml-3">
              {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
              <p className="text-sm">{message}</p>
            </div>

            {onClose && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose();
                }}
                className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-black/10 transition-colors duration-200"
                aria-label="Close alert"
              >
                <span className="sr-only">Close</span>
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
