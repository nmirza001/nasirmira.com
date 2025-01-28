import React from 'react';

import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <motion.div
        className="container mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-medium text-stone-800 mb-8">Privacy Policy</h1>

        <div className="prose prose-stone max-w-none">
          <p className="text-stone-600 mb-6">Last updated: January 10, 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-800 mb-4">Introduction</h2>
            <p className="text-stone-600">
              This Privacy Policy explains how I collect, use, and protect any information you may
              provide while using my personal portfolio website. I respect your privacy and am
              committed to protecting your personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-800 mb-4">Information Collection</h2>
            <p className="text-stone-600 mb-4">
              I may collect the following information when you use the contact form:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Message content</li>
              <li>Timestamp of submission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-800 mb-4">Use of Information</h2>
            <p className="text-stone-600 mb-4">The information collected is used solely for:</p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Responding to your inquiries</li>
              <li>Improving website functionality</li>
              <li>Maintaining communication records</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-800 mb-4">Data Protection</h2>
            <p className="text-stone-600">
              I implement appropriate security measures to protect your personal information. Your
              data is never shared with third parties without your explicit consent, except where
              required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-800 mb-4">Your Rights</h2>
            <p className="text-stone-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-800 mb-4">Contact Information</h2>
            <p className="text-stone-600">
              If you have any questions about this Privacy Policy, please contact me through the
              contact form on this website or via email at:
              <a
                href="nmirza001@csbsju.edu"
                className="text-stone-800 hover:text-stone-600 ml-2 transition-colors duration-300"
              >
                nmirza001@csbsju.edu
              </a>
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
};

export default PrivacyPolicy;
