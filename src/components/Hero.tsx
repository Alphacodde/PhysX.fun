'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Atom, Sparkles, Zap } from 'lucide-react';
import Link from "next/link";

const SYMBOL_POSITIONS = [
  { x: 10, y: 20, symbol: '∆', size: 'text-3xl' },
  { x: 85, y: 15, symbol: '∑', size: 'text-2xl' },
  { x: 45, y: 75, symbol: '∞', size: 'text-4xl' },
  { x: 90, y: 25, symbol: 'π', size: 'text-2xl' },
  { x: 15, y: 60, symbol: '∂', size: 'text-3xl' },
  { x: 75, y: 80, symbol: '∫', size: 'text-2xl' },
  { x: 5, y: 45, symbol: 'Ψ', size: 'text-3xl' },
  { x: 80, y: 55, symbol: 'λ', size: 'text-3xl' },
  { x: 40, y: 25, symbol: '⟨⟩', size: 'text-2xl' },
  { x: 25, y: 85, symbol: '≈', size: 'text-3xl' },
  { x: 60, y: 10, symbol: 'φ', size: 'text-2xl' },
  { x: 95, y: 70, symbol: 'θ', size: 'text-3xl' },
];

const FLOATING_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
}));

export const Hero = () => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-violet-900/20 to-fuchsia-900/30" />
        
        {/* Radial Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Floating Mathematical Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SYMBOL_POSITIONS.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} font-bold text-cyan-400/50 select-none`}
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
              delay: i * 0.5,
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        {/* Logo Section */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-cyan-400/30 rounded-full"
            />
            
            {/* Inner Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-2 border-violet-400/40 rounded-full"
            />
            
            {/* Innermost Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border border-fuchsia-400/50 rounded-full"
            />
            
            {/* Central Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Atom className="w-12 h-12 text-cyan-400 drop-shadow-2xl" />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-8xl md:text-9xl font-black mb-8 leading-none tracking-tight"
        >
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text animate-gradient-x">
              PhysX
            </span>
          </span>
          <span className="text-white drop-shadow-2xl">.Fun</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Where{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-medium">
            mathematics
          </span>{' '}
          meets{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium">
            quantum physics
          </span>{' '}
          in perfect harmony
        </motion.p>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/all_posts">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(6, 182, 212, 0.4)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-2xl text-white font-bold text-xl overflow-hidden transition-all duration-300"
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative flex items-center gap-3">
                <span>Explore Universe</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(6, 182, 212, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 border-2 border-slate-700 hover:border-cyan-400 rounded-2xl text-slate-300 hover:text-white font-semibold text-xl transition-all duration-300 backdrop-blur-sm bg-slate-900/30"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <span><a href='/About'>Learn More</a></span>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};