'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Atom, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
  onClose: () => void;
}

const FLOATING_SYMBOLS = [
  { symbol: '∆', x: 5, y: 15, delay: 0 },
  { symbol: '∑', x: 85, y: 20, delay: 1 },
  { symbol: '∞', x: 10, y: 75, delay: 2 },
  { symbol: 'π', x: 90, y: 80, delay: 3 },
  { symbol: '∂', x: 20, y: 45, delay: 4 },
  { symbol: 'Ψ', x: 80, y: 55, delay: 5 },
];

const popular = [
  { term: 'Quantum Entanglement', icon: '⚛️' },
  { term: 'Mathematical Beauty', icon: '∑' },
  { term: 'Black Holes', icon: '🌌' },
  { term: 'Wave Functions', icon: '~' },
  { term: 'Euler\'s Identity', icon: 'e' },
  { term: 'String Theory', icon: '∿' }
];

export const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePopularClick = (term: string) => {
    setSearchQuery(term);
    setTimeout(() => {
      window.location.href = `/search?q=${encodeURIComponent(term)}`;
    }, 100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-violet-900/15 to-fuchsia-900/20" />
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-3xl" />
          
          <motion.div 
            animate={{ 
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" 
          />
        </div>

        {/* Floating Mathematical Symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {FLOATING_SYMBOLS.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl font-bold text-cyan-400/20 select-none"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + (i % 3) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              {item.symbol}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl relative z-10"
        >
          <div className="relative p-10 rounded-3xl backdrop-blur-xl border border-slate-700/50 overflow-hidden"
               style={{
                 background: `linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.7) 100%)`,
               }}>
            
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-fuchsia-500/10 opacity-50"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 p-3 rounded-2xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-violet-500/20 transition-all duration-300 border border-slate-700/50 hover:border-cyan-400/50"
            >
              <X size={24} />
            </motion.button>

            {/* Header with Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-6 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative w-16 h-16"
              >
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full" />
                <div className="absolute inset-2 border border-violet-400/40 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-fuchsia-400" />
                </div>
              </motion.div>
              
              <div>
                <h2 className="text-4xl font-black text-white mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
                    Discover
                  </span>
                </h2>
                <p className="text-slate-300 text-lg font-light">
                  Search the universe of knowledge
                </p>
              </div>
            </motion.div>

            {/* Search Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20"
                >
                  <Search className="text-cyan-400" size={24} />
                </motion.div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search quantum physics, mathematics, equations..."
                  className="w-full bg-slate-800/50 backdrop-blur-sm text-white text-2xl placeholder-slate-400 outline-none border-2 border-slate-700/50 focus:border-cyan-400/50 rounded-2xl pl-20 pr-6 py-6 transition-all duration-300 hover:bg-slate-800/70 focus:bg-slate-800/70"
                />
                
                {/* Input glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 opacity-0 transition-opacity duration-300"
                  animate={searchQuery ? { opacity: 0.3 } : { opacity: 0 }}
                />
              </div>
            </motion.div>

            {/* Keyboard shortcuts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 text-sm text-slate-400 mb-10"
            >
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1 bg-slate-800/50 rounded-lg text-cyan-400 font-mono border border-slate-700/50">Enter</kbd>
                <span>to search</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1 bg-slate-800/50 rounded-lg text-violet-400 font-mono border border-slate-700/50">Esc</kbd>
                <span>to close</span>
              </div>
            </motion.div>

            {/* Search Button */}
            {searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-10"
              >
                <motion.button
                  onClick={handleSearch}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <div className="relative flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6" />
                    <span>Search for "{searchQuery}"</span>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-slate-400 font-semibold text-lg mb-6 flex items-center gap-3">
                <Atom className="w-5 h-5 text-cyan-400" />
                Popular Explorations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popular.map((item, index) => (
                  <motion.button
                    key={item.term}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => handlePopularClick(item.term)}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative p-4 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden backdrop-blur-sm"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/5 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-white group-hover:text-cyan-300 text-lg font-medium transition-colors duration-200">
                          {item.term}
                        </span>
                      </div>
                      <motion.div
                        className="text-cyan-400 group-hover:text-cyan-300"
                        whileHover={{ x: 3 }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};