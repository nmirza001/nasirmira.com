import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, LineChart } from 'lucide-react';

import { useIntersectionObserver } from '../hooks';
import { PageProps } from '../types/common';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
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
      className="bg-stone-50 p-6 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors duration-300"
    >
      <div className="w-12 h-12 mb-4 text-stone-700">{icon}</div>
      <h3 className="text-xl font-medium text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-600">{description}</p>
    </motion.div>
  );
};

const HomePage: React.FC<PageProps> = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2,
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
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
              >
                View Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors duration-300"
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
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-medium text-stone-800 mb-6">Ready to Collaborate?</h2>
            <p className="text-stone-600 mb-8">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 transition-colors duration-300"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
