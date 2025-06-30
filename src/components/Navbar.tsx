'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Search, Atom, Calculator, BookOpen, Code, Menu, X } from 'lucide-react';
import { SearchOverlay } from '@/components/SearchOverlay'; // Assuming this component exists

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setMobileOpen(false); // Close mobile menu on ESC
      }
    };
    window.addEventListener('keydown', escHandler);
    return () => window.removeEventListener('keydown', escHandler);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  // Define navigation items
  const navItems = [
    { label: 'Physics', href: '/physics', icon: <Atom size={16} /> },
    { label: 'Mathematics', href: '/mathematics', icon: <Calculator size={16} /> },
    { label: 'C.Sc', href: '/ComputerSciencePage', icon: <Code size={18}/>},
    { label: 'About', href: '/About', icon: <BookOpen size={16} /> }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-gray-900/80 border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/5' : 'backdrop-blur-md bg-white/5 border-b border-cyan-500/10'}`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo and Navigation Links */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            {/* Re-added the rotating blur effect for the logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <a href="/" className="relative flex items-center gap-3 text-2xl font-black">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full" />
                <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center">
                  <Atom className="w-4 h-4 text-cyan-400" />
                </div>
              </motion.div>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">PhysX.Fun</span>
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.label} 
                href={item.href} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }} 
                className="relative px-4 py-2 rounded-xl text-white/80 hover:text-white transition-all duration-300 group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" layoutId="navHover" />
                <div className="relative flex items-center gap-2 font-medium">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-cyan-400/60 group-hover:text-cyan-400"
                  >
                    {item.icon}
                  </motion.div>
                  {item.label}
                </div>
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.a>
            ))}

            {/* Search Button */}
            <motion.button
              onClick={() => setShowSearch(true)} 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="relative ml-4 p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group"
            >
              <Search className="w-5 h-5 text-cyan-400 group-hover:text-white" />
              <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          {/* Mobile Toggle (Hamburger/X button) */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden backdrop-blur-xl bg-gray-900/95 border-t border-cyan-500/20"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)} // Close menu on item click
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      className="text-cyan-400"
                    >
                      {item.icon}
                    </motion.div>
                    {item.label}
                  </motion.a>
                ))}
                {/* Search button in mobile menu */}
                <motion.button
                  onClick={() => { setMobileOpen(false); setShowSearch(true); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all duration-300 w-full text-left"
                >
                  <Search className="w-4 h-4 text-cyan-400" />
                  Search
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
      </AnimatePresence>
    </>
  );
};
export default Navbar;