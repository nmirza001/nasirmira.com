import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

// --- Exported Types and Interfaces ---

// Rules for validating individual form fields
export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => boolean;
  errorMessage?: string; // Custom error message for this rule
}

// A collection of validation rules, keyed by field name
export interface ValidationRules {
  [key: string]: ValidationRule;
}

// Type for form errors, keyed by field name
interface FormErrors {
  [key: string]: string;
}

// Props for the useForm hook
export interface UseFormProps<T> {
  initialValues: T; // Initial values of the form fields
  validationRules?: ValidationRules; // Optional validation rules
  onSubmit: (values: T) => void | Promise<void>; // Function to call when the form is submitted
}

// The shape of the object returned by the useForm hook
export type UseFormReturn<T> = {
  values: T; // Current form values
  errors: FormErrors; // Current form errors
  touched: Partial<Record<keyof T, boolean>>; // Tracks which fields have been interacted with
  isSubmitting: boolean; // Indicates if the form is currently being submitted
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void; // Function to handle input changes
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; // Function to handle input blur events
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void; // Function to handle form submission
  resetForm: () => void; // Function to reset the form to initial values
  setFieldValue: (name: keyof T, value: any) => void; // Function to set the value of a specific field
  setValues: (values: T) => void; // Function to set all form values
};

// --- useForm Hook Implementation ---

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validationRules = {}, // Default to no validation rules
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> => {
  // State for form values, errors, touched fields, and submission status
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({}); // Tracks touched fields
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Validation Function (validateField) ---
  const validateField = useCallback(
    (name: string, value: any): string => {
      const rules = validationRules[name];
      if (!rules) return ''; // No rules for this field

      // Check each validation rule
      if (rules.required && !value) {
        return rules.errorMessage || 'This field is required';
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return rules.errorMessage || 'Invalid format';
      }

      if (rules.minLength && value.length < rules.minLength) {
        return rules.errorMessage || `Minimum length is ${rules.minLength}`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return rules.errorMessage || `Maximum length is ${rules.maxLength}`;
      }

      if (rules.custom && !rules.custom(value)) {
        return rules.errorMessage || 'Invalid value';
      }

      return ''; // No error
    },
    [validationRules] // Dependency on validationRules
  );

  // --- Event Handlers (handleChange, handleBlur, handleSubmit) ---
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Validate only if the field has been touched before
      if (touched[name as keyof T]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField, touched]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true })); // Mark field as touched

      // Validate on blur
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (validateForm()) {
        try {
          await onSubmit(values); // Call the onSubmit function provided in props
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }

      setIsSubmitting(false);
    },
    [onSubmit, values, validateForm]
  );

  // --- Other Functions (resetForm, setFieldValue) ---
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Validate only if the field has been touched before
      if (touched[name]) {
        const error = validateField(name as string, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField, touched]
  );

  // --- Return the useForm Object ---
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues,
  };
};
