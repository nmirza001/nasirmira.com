import React from 'react';

import { motion } from 'framer-motion';
import { Database, Server, LineChart, Wrench, Monitor } from 'lucide-react';

import { useIntersectionObserver } from '../hooks';
import { PageProps } from '../types/common';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  icon: React.ReactNode;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon, index }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg border border-stone-200"
    >
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 text-stone-700 mr-4">{icon}</div>
        <h3 className="text-xl font-medium text-stone-800">{title}</h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-stone-600">{skill.name}</span>
              <span className="text-stone-500">{skill.level}%</span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-stone-800 rounded-full"
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsPage: React.FC<PageProps> = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Monitor className="w-full h-full" />,
      skills: [
        { name: 'React', level: 90, category: 'frontend' },
        { name: 'TypeScript', level: 85, category: 'frontend' },
        { name: 'CSS/Tailwind', level: 90, category: 'frontend' },
        { name: 'Next.js', level: 80, category: 'frontend' },
      ],
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-full h-full" />,
      skills: [
        { name: 'Node.js', level: 85, category: 'backend' },
        { name: 'Python', level: 90, category: 'backend' },
        { name: 'FastAPI', level: 80, category: 'backend' },
        { name: 'Java', level: 75, category: 'backend' },
      ],
    },
    {
      title: 'Database & Cloud',
      icon: <Database className="w-full h-full" />,
      skills: [
        { name: 'PostgreSQL', level: 85, category: 'database' },
        { name: 'MongoDB', level: 80, category: 'database' },
        { name: 'AWS', level: 75, category: 'cloud' },
        { name: 'Redis', level: 70, category: 'database' },
      ],
    },
    {
      title: 'Data Science',
      icon: <LineChart className="w-full h-full" />,
      skills: [
        { name: 'Pandas', level: 90, category: 'data' },
        { name: 'TensorFlow', level: 75, category: 'data' },
        { name: 'Scikit-learn', level: 80, category: 'data' },
        { name: 'Data Visualization', level: 85, category: 'data' },
      ],
    },
  ];

  const toolsAndTechnologies = [
    'Git',
    'Docker',
    'CI/CD',
    'RESTful APIs',
    'GraphQL',
    'Agile',
    'Testing',
    'System Design',
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-medium text-stone-800 mb-4">Technical Skills</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities in software development, data
            science, and financial technology.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} {...category} index={index} />
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-lg border border-stone-200"
        >
          <div className="flex items-center mb-6">
            <Wrench className="w-6 h-6 text-stone-700 mr-3" />
            <h2 className="text-2xl font-medium text-stone-800">Tools & Technologies</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {toolsAndTechnologies.map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg text-sm"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Learning & Growth */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-medium text-stone-800 mb-4">Currently Learning</h2>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
            I'm always expanding my skill set. Here are some technologies I'm currently exploring:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Rust', 'WebAssembly', 'Machine Learning Ops', 'Blockchain Development'].map(
              (skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-4 py-2 bg-stone-800 text-stone-50 rounded-lg text-sm"
                >
                  {skill}
                </motion.div>
              )
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SkillsPage;
