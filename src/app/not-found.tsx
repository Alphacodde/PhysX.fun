'use client'; // This directive indicates that this component should be rendered on the client side

import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Search, Home } from 'lucide-react'; // Icons for the 404 page
import Link from 'next/link'; // For navigation

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Background elements for aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-orange-900/10 to-gray-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]" />

      {/* Animated Ghost Icon */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0], // Float up and down
            rotate: [0, 5, -5, 0], // Gentle wobble
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Ghost className="w-24 h-24 sm:w-32 sm:h-32 text-orange-500" />
        </motion.div>
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl" /> {/* Light glow */}
      </motion.div>

      {/* Main 404 Heading */}
      <motion.h1
        className="text-7xl sm:text-8xl md:text-9xl font-black mb-4 leading-tight bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        404
      </motion.h1>

      {/* Page Not Found Message */}
      <motion.p
        className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Oops! It looks like you've wandered into uncharted territory. The page you're looking for doesn't exist.
      </motion.p>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" passHref>
          <motion.a
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="mr-2" size={20} />
            Go to Homepage
          </motion.a>
        </Link>
        {/* You could add a search link here if you have a search functionality */}
        {/* <Link href="/search" passHref>
          <motion.a
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-700 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="mr-2" size={20} />
            Search Articles
          </motion.a>
        </Link> */}
      </div>
    </div>
  );
};

export default NotFound;