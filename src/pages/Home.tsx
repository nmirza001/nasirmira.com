// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Database, LineChart } from 'lucide-react';

import { PageProps } from '@/types/common';

import DeveloperScene from '../components/DeveloperScene';
import Loading from '../components/Loading';
import { useIntersectionObserver } from '../hooks';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={`feature-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
      transition={{ duration: 0.3 }}
      className="bg-stone-50 p-6 rounded-lg border border-stone-200 hover:border-stone-300 transition-all duration-300"
    >
      <div className="w-12 h-12 mb-4 text-stone-700">{icon}</div>
      <h3 className="text-xl font-medium text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-600">{description}</p>
    </motion.div>
  );
};

const HomePage: React.FC<PageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const features = [
    {
      title: 'Full Stack Development',
      description:
        'Building scalable web applications with modern technologies and clean architecture.',
      icon: <Code className="w-full h-full" />,
    },
    {
      title: 'Data Engineering',
      description:
        'Creating robust data pipelines and analytics solutions for business intelligence.',
      icon: <Database className="w-full h-full" />,
    },
    {
      title: 'Financial Analysis',
      description: 'Leveraging technology for quantitative analysis and financial modeling.',
      icon: <LineChart className="w-full h-full" />,
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen bg-white">
        {/* Add Developer Scene */}
        <DeveloperScene />

        {/* Hero Section */}
        <motion.section
          role="banner"
          aria-label="Introduction"
          className="relative py-20 lg:py-32 px-6 bg-gradient-to-b from-stone-50 to-white overflow-hidden"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div className="text-center max-w-3xl mx-auto" variants={heroVariants}>
              <motion.h1
                className="text-4xl md:text-6xl font-medium text-stone-800 mb-6"
                variants={heroVariants}
              >
                Bridging Technology <br className="hidden md:block" />& Finance
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed"
                variants={heroVariants}
              >
                Software Engineering Student passionate about creating elegant solutions at the
                intersection of technology and finance.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                variants={heroVariants}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 transition-colors duration-300"
                  role="button"
                  aria-label="View my projects"
                >
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors duration-300"
                  role="button"
                  aria-label="Contact me"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 grid grid-cols-6 gap-2">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full bg-stone-800"
                  style={{
                    opacity: Math.random() * 0.3 + 0.1,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20 px-6" aria-label="Key features">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-6 bg-stone-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          aria-label="Call to action"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-medium text-stone-800 mb-6">Ready to Collaborate?</h2>
              <p className="text-stone-600 mb-8">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 transition-colors duration-300"
                role="button"
                aria-label="Start a conversation"
              >
                Start a Conversation
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
};

export default HomePage;
