// src/App.tsx
import React, { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

// Components
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
// Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import TermsOfService from './pages/TermsOfService';
// Types
import { PageProps } from './types/common';

// Create a separate component for AnimatePresence to access useLocation
interface AnimatedRoutesProps {
  pageProps: PageProps;
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ pageProps }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home {...pageProps} />} />
        <Route path="/about" element={<About {...pageProps} />} />
        <Route path="/projects" element={<Projects {...pageProps} />} />
        <Route path="/skills" element={<Skills {...pageProps} />} />
        <Route path="/contact" element={<Contact {...pageProps} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const prefersReducedMotion = useMediaQuery({
    query: '(prefers-reduced-motion: reduce)',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const pageProps: PageProps = {
    reduceMotion: prefersReducedMotion,
  };

  if (isLoading) {
    return <Loading {...pageProps} />;
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen bg-stone-50">
          <Navigation {...pageProps} />

          <main className="flex-grow">
            <AnimatedRoutes pageProps={pageProps} />
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
