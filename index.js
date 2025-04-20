import React from 'react';

import { ParallaxProvider } from 'react-scroll-parallax';

import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </React.StrictMode>
);
