import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

// Define the Project type
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string; // Optional
  technologies: string[];
  githubUrl?: string; // Optional
  liveUrl?: string; // Optional
}

// Define the ProjectCard props type
interface ProjectCardProps {
  project: Project;
  reduceMotion: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, reduceMotion }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-stone-50 rounded-lg border border-stone-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => !reduceMotion && setIsHovered(true)}
      onHoverEnd={() => !reduceMotion && setIsHovered(false)}
    >
      {project.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-stone-800 mb-2">{project.title}</h3>
            <p className="text-stone-600 text-sm mb-4">{project.description}</p>
          </div>
          <Folder className="w-6 h-6 text-stone-400" />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs text-stone-600 bg-stone-100 rounded-full">
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
              aria-label="View source on GitHub"
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
              aria-label="View live project"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Define the Projects props type
interface ProjectsProps {
  reduceMotion: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ reduceMotion }) => {
  // Example projects data - replace with your actual projects
  const projects: Project[] = [
    // Now projects is an array of Project objects
    {
      id: 1,
      title: 'FinTech Dashboard',
      description:
        'A modern dashboard for tracking financial metrics and analyzing market trends using React and D3.js.',
      imageUrl: '/projects/fintech-dashboard.jpg',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/nmirza001/economicdata',
      liveUrl: 'https://nasirmirza.com',
    },
    {
      id: 2,
      title: 'AI Trading Algorithm',
      description:
        'Machine learning-based trading algorithm that analyzes historical data to predict market movements.',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
      githubUrl: 'https://github.com/yourusername/ai-trading',
    },
    {
      id: 3,
      title: 'Personal Finance Manager',
      description:
        'A web application for personal finance management with budget tracking and investment portfolio analysis.',
      imageUrl: '/projects/finance-manager.jpg',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/finance-manager',
      liveUrl: 'https://finance-manager.demo',
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium text-stone-800 mb-4">Featured Projects</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            A selection of my recent work in software development and financial technology. Each
            project reflects my commitment to clean code and elegant solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
