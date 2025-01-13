// src/types/common.ts

// Basic Types
export interface Meta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

export type Theme = 'light' | 'dark' | 'system';

// Navigation Types
export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  children?: NavigationItem[];
}

// Social Media Types
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  username: string;
  icon: string;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
  message?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface FilterParams {
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  [key: string]: any;
}

// User Preferences Types
export interface UserPreferences {
  theme: Theme;
  reduceMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';
  value: any;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps extends BaseComponentProps {
  reduceMotion: boolean;
  meta?: Meta;
}

export interface LoadingProps extends BaseComponentProps {
  reduceMotion: boolean;
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface NavigationProps extends BaseComponentProps {
  reduceMotion: boolean;
  items?: NavigationItem[];
}

export interface ProjectCardProps extends BaseComponentProps {
  reduceMotion: boolean;
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
  };
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

// Alert Types
export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps extends BaseComponentProps {
  type: AlertType;
  message: string;
  title?: string;
  duration?: number;
  closeable?: boolean;
}

// Responsive Types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Theme Context Types
export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme;
  resolvedTheme: Theme;
}

// Hook Types
export interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  immediate?: boolean;
}

export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => ValidationResult;
}

// Event Types
export type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;
export type ChangeHandler = EventHandler<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>;
export type SubmitHandler = EventHandler<React.FormEvent>;
