// src/types/project.ts

export interface Technology {
  name: string;
  icon?: string;
  color?: string;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'docs' | 'blog';
  url: string;
  title?: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: Technology[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'data' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  showcase: boolean;
  links: ProjectLink[];
  images: ProjectImage[];
  startDate: string;
  endDate?: string;
  highlights?: string[];
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  order?: number;
}

export interface ProjectFilter {
  category?: Project['category'];
  status?: Project['status'];
  technology?: string;
  search?: string;
  featured?: boolean;
}

export interface ProjectSort {
  field: keyof Project;
  direction: 'asc' | 'desc';
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
