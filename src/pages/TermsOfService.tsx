// src/pages/TermsOfService.tsx
import React from 'react';

import { motion } from 'framer-motion';
import { Shield, FileText, Scale, AlertCircle } from 'lucide-react';

interface TermsSection {
  title: string;
  content: string;
  icon: React.FC<{ className?: string }>;
}

const TermsOfService: React.FC = () => {
  const sections: TermsSection[] = [
    {
      title: 'Terms of Use',
      content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website.`,
      icon: FileText,
    },
    {
      title: 'Intellectual Property Rights',
      content: `All content included on this website, such as text, graphics, logos, images, source code, and software, is the property of Nasir Mirza or its content suppliers and protected by international copyright laws.`,
      icon: Shield,
    },
    {
      title: 'License',
      content: `Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.`,
      icon: Scale,
    },
    {
      title: 'Disclaimer',
      content: `The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.`,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-medium text-stone-800 mb-4">Terms of Service</h1>
          <p className="text-stone-600">Last updated: January 10, 2025</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg border border-stone-200"
            >
              <div className="flex items-center mb-4">
                <section.icon className="w-6 h-6 text-stone-700 mr-3" />
                <h2 className="text-xl font-medium text-stone-800">{section.title}</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-white p-6 rounded-lg border border-stone-200"
        >
          <h2 className="text-xl font-medium text-stone-800 mb-4">Contact Information</h2>
          <p className="text-stone-600">
            If you have any questions about these Terms of Service, please contact me at:
          </p>
          <div className="mt-4">
            <a
              href="nmirza001@csbsju.edu"
              className="text-stone-800 hover:text-stone-600 transition-colors duration-300"
            >
              nmirza001@csbsju.edu
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center text-sm text-stone-500"
        >
          <p>
            By using this website, you acknowledge that you have read and understand these terms.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
