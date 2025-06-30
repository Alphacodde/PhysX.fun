'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Lightbulb, BookOpen, Users, Globe, ArrowRight, Sparkles, Atom, Zap, Calculator } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

// Mathematical symbols for floating animation
const FLOATING_SYMBOLS = [
  { symbol: '∆', x: 15, y: 20, delay: 0 },
  { symbol: '∑', x: 80, y: 15, delay: 1 },
  { symbol: '∞', x: 25, y: 80, delay: 2 },
  { symbol: 'π', x: 90, y: 75, delay: 3 },
  { symbol: '∂', x: 10, y: 50, delay: 4 },
  { symbol: 'Ψ', x: 75, y: 25, delay: 5 },
  { symbol: '∫', x: 45, y: 90, delay: 6 },
  { symbol: 'λ', x: 85, y: 45, delay: 7 },
];

const AboutUs = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const controls = useAnimation();

  const values = [
    {
      id: 1,
      title: "Accessibility",
      subtitle: "Knowledge for All",
      description: "Breaking down barriers to knowledge, ensuring complex topics are understandable for everyone who seeks to learn.",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-cyan-400 via-blue-500 to-violet-600",
      bgGradient: "from-cyan-500/20 via-blue-500/10 to-violet-600/20",
      borderGradient: "from-cyan-400/50 via-blue-500/30 to-violet-600/50",
    },
    {
      id: 2,
      title: "Curiosity",
      subtitle: "Wonder & Discovery",
      description: "Fostering a spirit of inquiry and lifelong learning that transforms questions into profound understanding.",
      icon: <Lightbulb className="w-8 h-8" />,
      gradient: "from-violet-400 via-fuchsia-500 to-pink-600",
      bgGradient: "from-violet-500/20 via-fuchsia-500/10 to-pink-600/20",
      borderGradient: "from-violet-400/50 via-fuchsia-500/30 to-pink-600/50",
    },
    {
      id: 3,
      title: "Community",
      subtitle: "Minds Together",
      description: "Building a vibrant space where enthusiasts connect, share ideas, and collectively push the boundaries of knowledge.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      bgGradient: "from-emerald-500/20 via-teal-500/10 to-cyan-600/20",
      borderGradient: "from-emerald-400/50 via-teal-500/30 to-cyan-600/50",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <Navbar />

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-violet-900/15 to-fuchsia-900/20" />
        
        {/* Multiple Radial Glow Effects */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-3xl" />
        
        {/* Animated Grid Pattern */}
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {FLOATING_SYMBOLS.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl font-bold text-cyan-400/50 select-none"
            style={{ 
              left: `${item.x}%`, 
              top: `${item.y}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
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
                  <Sparkles className="w-12 h-12 text-fuchsia-400 drop-shadow-2xl" />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-fuchsia-400/20 rounded-full blur-xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-8 leading-none tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              Where Curiosity
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Meets Discovery</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Dedicated to exploring the depths of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-medium">
              science and mathematics
            </span>{' '}
            one fascinating concept at a time
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl backdrop-blur-xl border border-slate-700/50 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
            }}
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-fuchsia-500/10 opacity-0 hover:opacity-100 transition-opacity duration-700"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Large Background Symbol */}
            <motion.div
              className="absolute top-8 right-8 text-8xl font-bold text-white/5 select-none"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ∞
            </motion.div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-6 relative"
                >
                  <div className="absolute inset-0 border-2 border-violet-400/30 rounded-full" />
                  <div className="absolute inset-2 border border-cyan-400/40 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-emerald-400" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
                    Our Mission
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    Our core mission is to demystify complex scientific and mathematical concepts, making them accessible and engaging for everyone. We believe that knowledge is power, and understanding the universe around us should be an exciting journey, not a daunting task.
                  </p>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Through insightful articles, detailed explanations, and thought-provoking discussions, we strive to ignite curiosity and foster a deeper appreciation for the beauty and logic of the natural world.
                  </p>
                </div>

                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-64 h-64 mx-auto relative"
                  >
                    <div className="absolute inset-0 border-4 border-gradient-to-br from-cyan-400/30 to-violet-400/30 rounded-full" />
                    <div className="absolute inset-8 border-2 border-gradient-to-br from-violet-400/40 to-fuchsia-400/40 rounded-full" />
                    <div className="absolute inset-16 border border-gradient-to-br from-fuchsia-400/50 to-pink-400/50 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calculator className="w-16 h-16 text-cyan-400" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full" />
              <div className="absolute inset-2 border border-teal-400/40 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-transparent bg-clip-text">
                Our Guiding
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Values</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              The principles that drive our passion for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-medium">
                knowledge sharing
              </span>
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredValue(value.id)}
                onHoverEnd={() => setHoveredValue(null)}
                className="group relative perspective-1000"
              >
                <div className="relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden h-full transform-gpu transition-all duration-500 hover:shadow-2xl"
                     style={{
                       background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
                       borderImage: `linear-gradient(135deg, ${value.borderGradient.replace('from-', '').replace('via-', '').replace('to-', '').replace(/\/\d+/g, '')}) 1`
                     }}>
                  
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    animate={hoveredValue === value.id ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Enhanced Icon */}
                  <motion.div
                    animate={hoveredValue === value.id ? { 
                      rotate: [0, 360], 
                      scale: [1, 1.1, 1] 
                    } : {
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: hoveredValue === value.id ? 1 : 3,
                      repeat: 2,
                      ease: "easeInOut"
                    }}
                    className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white mb-8 shadow-2xl`}
                  >
                    {value.icon}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-3xl blur-xl opacity-50`}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-6">
                      <motion.h3
                        animate={hoveredValue === value.id ? {
                          scale: [1, 1.02, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl font-black text-white mb-3 leading-tight"
                      >
                        {value.title}
                      </motion.h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${value.gradient} text-transparent bg-clip-text`}>
                        {value.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-lg">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl backdrop-blur-xl border border-slate-700/50 overflow-hidden text-center"
            style={{
              background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
            }}
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Large Background Symbol */}
            <motion.div
              className="absolute top-8 right-8 text-8xl font-bold text-white/5 select-none"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ∑
            </motion.div>

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full" />
                <div className="absolute inset-2 border border-cyan-400/40 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Atom className="w-8 h-8 text-emerald-400" />
                </div>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
                  Ready to Dive Deeper?
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                Explore our vast collection of articles on physics, mathematics, and more. Your next discovery awaits in the quantum realm of knowledge!
              </p>
              
              <Link href="/all_posts">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span>Explore All Articles</span>
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;