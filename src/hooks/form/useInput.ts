import { useState, useCallback } from 'react';

// --- Export the necessary types and interfaces ---

// Props for the useInput hook
export interface UseInputProps<T> {
  initialValue: T;
  validator?: (value: T) => string | undefined; // Optional validator function
}

// Return type of the useInput hook
export type UseInputReturn<T> = {
  value: T; // Current value
  error: string | undefined; // Error message, if any
  touched: boolean; // Whether the input has been interacted with
  handleChange: (newValue: T) => void; // Function to update the value
  handleBlur: () => void; // Function to mark the input as touched
  reset: () => void; // Function to reset to initial value
  setValue: (value: T) => void; // Function to manually set value
  setError: (error: string | undefined) => void; // Function to manually set error
};

// --- useInput Hook Implementation ---
export const useInput = <T>({ initialValue, validator }: UseInputProps<T>): UseInputReturn<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);
  const [touched, setTouched] = useState(false);

  // Handle change (update value and validate if touched)
  const handleChange = useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (touched && validator) {
        setError(validator(newValue));
      }
    },
    [validator, touched]
  );

  // Handle blur (mark as touched and validate)
  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
  }, [validator, value]);

  // Reset to initial values
  const reset = useCallback(() => {
    setValue(initialValue);
    setError(undefined);
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    reset,
    setValue, // Expose setValue function
    setError, // Expose setError function
  };
};
