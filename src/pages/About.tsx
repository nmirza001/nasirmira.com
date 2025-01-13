import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Code, Briefcase } from 'lucide-react';

import { useIntersectionObserver, useMediaQuery } from '../hooks';
import { PageProps } from '../types/common';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, icon, index }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    <motion.div
      ref={ref}
      className="flex gap-6 items-start relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-sm text-stone-500">{year}</span>
        <h3 className="text-lg font-medium text-stone-800 mt-1 mb-2">{title}</h3>
        <p className="text-stone-600">{description}</p>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC<PageProps> = ({ reduceMotion }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });

  const timeline = [
    {
      year: 'Aug 2024 - Present',
      title: 'Teaching Assistant & Tutor',
      description:
        'Led weekly recitation sessions for 120+ students across 3 Economics courses, improving class performance by 15%. Provided 200+ hours of personalized tutoring using data-driven teaching methodologies. Developed comprehensive study materials and practice problems, resulting in increased student engagement.',
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      year: 'May 2024 - Present',
      title: 'Admissions Ambassador',
      description:
        'Conducted 5+ weekly campus tours for prospective students and families, showcasing campus life. Achieved 95% positive feedback rating from tour participants through engaging presentation skills. Collaborated with admissions team to develop improved tour routes and presentation materials.',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      year: 'Sep 2024 - Present',
      title: 'Vice President, Computer Science Club',
      description:
        'Led 15+ technical workshops on algorithms and ML, growing attendance by 40% semester-over-semester. Organized 3 hackathons with 150+ participants, securing $5,000 in corporate sponsorships. Established mentorship program pairing 30+ underclassmen with senior CS students.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      year: 'Aug 2024 - Present',
      title: 'Photography Editor, The Record',
      description:
        'Managed a team of 5 photographers, coordinating coverage for 30+ campus events per semester. Implemented digital asset management system, reducing image retrieval time by 60%.',
      icon: <Code className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-medium text-stone-800 mb-6">About Me</h1>
              <p className="text-stone-600 mb-6 leading-relaxed">
                I'm a sophomore pursuing a dual degree in Computer Science and Economics, driven by
                a passion for creating innovative solutions at the intersection of technology and
                finance.
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed">
                My journey in software engineering began with a simple calculator app in Python, and
                has since evolved into building complex financial analysis tools and web
                applications.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center text-stone-800 hover:text-stone-600 transition-colors duration-300"
              >
                View My Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-sm mx-auto md:max-w-md"
            >
              <div className="absolute inset-0 bg-stone-200 rounded-lg transform -rotate-3" />
              <img
                src="/profile-image.jpg"
                alt="Nasir Mirza"
                className="relative z-10 w-full h-full object-contain rounded-lg shadow-lg transform rotate-3 transition-transform duration-500 hover:rotate-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            className="text-3xl font-medium text-stone-800 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Journey
          </motion.h2>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-stone-800 mb-4">Technical Skills</h2>
            <p className="text-stone-600">A collection of technologies and tools I work with</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'TensorFlow', 'Git', 'AWS'].map(
              (skill, index) => (
                <motion.div
                  key={skill}
                  className="bg-white p-4 rounded-lg border border-stone-200 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-stone-800">{skill}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
