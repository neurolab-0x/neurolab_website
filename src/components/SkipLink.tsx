import React from 'react';
import { motion } from 'framer-motion';

const SkipLink: React.FC = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipLink; 