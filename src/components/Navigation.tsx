import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

// Define the props interface
interface NavigationProps {
  reduceMotion: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ reduceMotion }) => {
  // Destructure with type
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      className="py-4 px-6 bg-stone-50 sticky top-0 z-50 border-b border-stone-200"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <NavLink
            to="/"
            className="text-lg font-medium text-stone-800 hover:text-stone-600 transition-colors duration-300"
          >
            Nasir Mirza
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-stone-800 hover:text-stone-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <motion.ul
            className="hidden md:flex space-x-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.2 }}
          >
            {navLinks.map(({ path, label }) => (
              <motion.li
                key={path}
                whileHover={{ scale: reduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: reduceMotion ? 1 : 0.95 }}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-stone-800 border-b-2 border-stone-800'
                        : 'text-stone-600 hover:text-stone-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Navigation */}
          <motion.div
            className={`md:hidden absolute top-full left-0 right-0 bg-stone-50 border-b border-stone-200 ${
              isOpen ? 'block' : 'hidden'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-4 px-6 space-y-4">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-stone-800' : 'text-stone-600 hover:text-stone-800'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
