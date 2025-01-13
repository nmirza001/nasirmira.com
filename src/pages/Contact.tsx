import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle, Clock, Loader2 } from 'lucide-react';

import { useForm } from '../hooks';
import { PageProps } from '../types/common';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC<PageProps> = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationRules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        errorMessage: 'Please enter a valid name between 2 and 50 characters',
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Please enter a valid email address',
      },
      subject: {
        required: true,
        minLength: 2,
        maxLength: 100,
        errorMessage: 'Please enter a subject between 2 and 100 characters',
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 1000,
        errorMessage: 'Please enter a message between 10 and 1000 characters',
      },
    },
    onSubmit: async (formValues) => {
      try {
        // Create a form and submit it to FormSubmit.co
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://formsubmit.co/nmirza54321@gmail.com';

        // Add form fields
        Object.entries(formValues).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        // Add FormSubmit.co configuration
        const configs = {
          _subject: 'New Contact Form Submission',
          _template: 'table',
          _captcha: 'true',
          _next: window.location.href,
        };

        Object.entries(configs).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        });

        // Submit the form
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        // Reset form and show success message
        resetForm();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        console.error('Form submission error:', error);
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    },
  });

  const availabilityTypes = [
    'Full-time positions',
    'Contract work',
    'Research collaborations',
    'Open source projects',
  ];

  const contactMethods = [
    {
      icon: Mail,
      platform: 'Email',
      value: 'nmirza54321@gmail.com',
      href: 'mailto:nmirza54321@gmail.com',
    },
    {
      icon: Github,
      platform: 'GitHub',
      value: 'nmirza001',
      href: 'https://github.com/nmirza001',
    },
    {
      icon: Linkedin,
      platform: 'LinkedIn',
      value: 'Nasir Mirza',
      href: 'https://linkedin.com/in/nasir-mirzacs',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800">
                Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          </div>
        )}

        {showError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Failed to send message. Please try again.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-stone-800 mb-4">Get in Touch</h1>
              <p className="text-stone-600">
                Let's discuss your project or potential collaborations.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-white rounded-lg border ${
                    touched.name && errors.name
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-stone-200 focus:ring-stone-500'
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-white rounded-lg border ${
                    touched.email && errors.email
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-stone-200 focus:ring-stone-500'
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-white rounded-lg border ${
                    touched.subject && errors.subject
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-stone-200 focus:ring-stone-500'
                  } focus:outline-none focus:ring-2 transition-colors duration-300`}
                />
                {touched.subject && errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 bg-white rounded-lg border ${
                    touched.message && errors.message
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-stone-200 focus:ring-stone-500'
                  } focus:outline-none focus:ring-2 transition-colors duration-300 resize-none`}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-stone-800 text-stone-50 rounded-lg hover:bg-stone-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info & Availability */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <h2 className="text-xl font-medium text-stone-800 mb-6">Contact Methods</h2>
              <div className="space-y-4">
                {contactMethods.map(({ icon: Icon, platform, value, href }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-stone-600 hover:text-stone-800 transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{platform}</p>
                      <p className="text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <h2 className="text-xl font-medium text-stone-800 mb-4">Availability</h2>
              <div className="space-y-4">
                <p className="text-stone-600">Currently available for:</p>
                <ul className="space-y-3">
                  {availabilityTypes.map((item) => (
                    <li key={item} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-stone-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <p className="text-stone-600 text-sm">
                    Looking forward to potentially working together on innovative projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <h2 className="text-xl font-medium text-stone-800 mb-4">Response Time</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-stone-600" />
                  <p className="text-stone-600">24-48 hours response time during weekdays</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-800 rounded-full transition-all duration-500"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <span className="text-sm text-stone-500 whitespace-nowrap">24h avg.</span>
                </div>
                <p className="text-stone-600 text-sm">
                  For urgent matters, please reach out via LinkedIn for faster response.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
