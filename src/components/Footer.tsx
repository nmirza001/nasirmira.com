import { Link } from 'react-router-dom';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/yourusername', // Replace with your GitHub URL
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/yourusername', // Replace with your LinkedIn URL
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:your.email@example.com', // Replace with your email address
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/yourusername', // Replace with your Twitter URL
    },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-lg font-medium text-stone-800">
              Nasir Mirza
            </Link>
            <p className="text-stone-600 text-sm">
              Software Engineering Student bridging technology and economics.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-800 transition-colors duration-300"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-medium text-stone-800 mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-600 hover:text-stone-800 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-medium text-stone-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-600 hover:text-stone-800 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-600 text-center">
            © {currentYear} Nasir Mirza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
