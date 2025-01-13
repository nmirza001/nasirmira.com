// src/utils/validation.ts
import { ValidationResult } from '../types/common';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export interface FormField {
  value: any;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export interface FormFields {
  [key: string]: FormField;
}

export const validateForm = (fields: FormFields): ValidationResult => {
  const errors: Record<string, string> = {};

  Object.entries(fields).forEach(([fieldName, field]) => {
    const { value, required, minLength, maxLength, pattern, custom } = field;

    // Required check
    if (required && !value) {
      errors[fieldName] = 'This field is required';
      return;
    }

    // Skip other validations if field is empty and not required
    if (!value && !required) return;

    // String-specific validations
    if (typeof value === 'string') {
      // MinLength check
      if (minLength && value.length < minLength) {
        errors[fieldName] = `Must be at least ${minLength} characters`;
        return;
      }

      // MaxLength check
      if (maxLength && value.length > maxLength) {
        errors[fieldName] = `Must be no more than ${maxLength} characters`;
        return;
      }

      // Pattern check
      if (pattern && !pattern.test(value)) {
        errors[fieldName] = 'Invalid format';
        return;
      }
    }

    // Custom validation
    if (custom && !custom(value)) {
      errors[fieldName] = 'Invalid value';
      return;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateProjectData = (project: any): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!project.title) {
    errors.title = 'Project title is required';
  }

  if (!project.description) {
    errors.description = 'Project description is required';
  }

  if (!project.category) {
    errors.category = 'Project category is required';
  }

  if (project.githubUrl && !validateUrl(project.githubUrl)) {
    errors.githubUrl = 'Invalid GitHub URL';
  }

  if (project.liveUrl && !validateUrl(project.liveUrl)) {
    errors.liveUrl = 'Invalid live URL';
  }

  if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
    errors.technologies = 'At least one technology is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateContactForm = (data: any): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!data.message || data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  if (data.phone && !validatePhoneNumber(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
