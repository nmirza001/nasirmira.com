import React, { useState, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code, Database, LineChart, Search } from 'lucide-react';

import { useDebounce, useIntersectionObserver } from '../hooks/';
import { PageProps } from '../types/common';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'data';
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-300"
    >
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-medium text-stone-800 mb-2">{project.title}</h3>
        <p className="text-stone-600 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm bg-stone-100 text-stone-600 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-stone-800 transition-colors duration-300"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-stone-800 transition-colors duration-300"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage: React.FC<PageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Sample projects data - in production, this would come from an API
  const projects: Project[] = [
    {
      id: '1',
      title: 'Finance Analytics Dashboard',
      description:
        'A real-time dashboard for tracking financial metrics and market trends using React and D3.js.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
      category: 'frontend',
      githubUrl: 'https://github.com/username/finance-dashboard',
      liveUrl: 'https://finance-dashboard.demo',
      image: '/projects/finance-dashboard.jpg',
    },
    {
      id: '2',
      title: 'Trading Algorithm Backend',
      description:
        'High-performance backend system for algorithmic trading with real-time market data processing.',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      category: 'backend',
      githubUrl: 'https://github.com/username/trading-algorithm',
    },
    // Add more projects...
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'data', label: 'Data Science', icon: LineChart },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, debouncedSearch, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-medium text-stone-800 mb-4">My Projects</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            A collection of my work in software development, focusing on financial technology and
            data analysis.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                    selectedCategory === id
                      ? 'bg-stone-800 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-stone-600">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
