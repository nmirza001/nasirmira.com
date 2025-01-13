// src/hooks/types/form.ts

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => boolean;
  errorMessage?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface UseFormResult<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  reset: () => void;
  setFieldValue: (name: keyof T, value: any) => void;
}

export interface UseInputResult<T> {
  value: T;
  error: string | undefined;
  touched: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
}
