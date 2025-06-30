import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Zap, Calculator, BookOpen, ArrowRight, Sparkles, Atom } from 'lucide-react';

// Mathematical symbols for floating animation
const FLOATING_SYMBOLS = [
  { symbol: '∆', x: 15, y: 20, delay: 0 },
  { symbol: '∑', x: 80, y: 15, delay: 1 },
  { symbol: '∞', x: 25, y: 80, delay: 2 },
  { symbol: 'π', x: 90, y: 75, delay: 3 },
  { symbol: '∂', x: 10, y: 50, delay: 4 },
  { symbol: 'Ψ', x: 75, y: 25, delay: 5 },
];

export const FeaturedCarousel = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      id: 1,
      title: "Quantum Entanglement",
      subtitle: "The Spooky Connection",
      description: "Dive into the mysterious world where particles remain connected across vast distances, defying classical physics and our understanding of reality.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-cyan-400 via-blue-500 to-violet-600",
      bgGradient: "from-cyan-500/20 via-blue-500/10 to-violet-600/20",
      borderGradient: "from-cyan-400/50 via-blue-500/30 to-violet-600/50",
      symbol: "Ψ"
    },
    {
      id: 2,
      title: "Mathematical Beauty",
      subtitle: "Euler's Identity",
      description: "Discover the most beautiful equation in mathematics: e^(iπ) + 1 = 0, connecting five fundamental constants in perfect harmony.",
      icon: <Calculator className="w-8 h-8" />,
      gradient: "from-violet-400 via-fuchsia-500 to-pink-600",
      bgGradient: "from-violet-500/20 via-fuchsia-500/10 to-pink-600/20",
      borderGradient: "from-violet-400/50 via-fuchsia-500/30 to-pink-600/50",
      symbol: "∑"
    },
    {
      id: 3,
      title: "Wave Functions",
      subtitle: "Schrödinger's World",
      description: "Explore how probability waves collapse into reality and the fundamental nature of quantum measurement in our universe.",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      bgGradient: "from-emerald-500/20 via-teal-500/10 to-cyan-600/20",
      borderGradient: "from-emerald-400/50 via-teal-500/30 to-cyan-600/50",
      symbol: "∞"
    }
  ];

  const handleHoverStart = (id: number) => {
    setHoveredCard(id);
  };

  const handleHoverEnd = () => {
    setHoveredCard(null);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_SYMBOLS.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl font-bold text-cyan-400/20 select-none"
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Decorative Element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full" />
            <div className="absolute inset-2 border border-violet-400/40 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-black mb-8 leading-none"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              Featured
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Explorations</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Journey through our most captivating topics where{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-medium">
              science meets wonder
            </span>
          </motion.p>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
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
              onHoverStart={() => handleHoverStart(feature.id)}
              onHoverEnd={handleHoverEnd}
              className="group relative perspective-1000"
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden h-full transform-gpu transition-all duration-500 hover:shadow-2xl"
                   style={{
                     background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
                     borderImage: `linear-gradient(135deg, ${feature.borderGradient.replace('from-', '').replace('via-', '').replace('to-', '').replace(/\/\d+/g, '')}) 1`
                   }}>
                
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  animate={hoveredCard === feature.id ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Large Background Symbol */}
                <motion.div
                  className="absolute top-4 right-4 text-8xl font-bold text-white/5 select-none"
                  animate={hoveredCard === feature.id ? {
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  } : { rotate: [0, 5, 0] }}
                  transition={{ 
                    duration: hoveredCard === feature.id ? 2 : 4,
                    repeat: 2,
                    ease: "easeInOut"
                  }}
                >
                  {feature.symbol}
                </motion.div>

                {/* Enhanced Icon */}
                <motion.div
                  animate={hoveredCard === feature.id ? { 
                    rotate: [0, 360], 
                    scale: [1, 1.1, 1] 
                  } : {
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: hoveredCard === feature.id ? 1 : 3,
                    repeat: 2,
                    ease: "easeInOut"
                  }}
                  className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-8 shadow-2xl`}
                >
                  {feature.icon}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-50`}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <motion.h3
                        animate={hoveredCard === feature.id ? {
                          scale: [1, 1.02, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl font-black text-white mb-3 leading-tight"
                      >
                        {feature.title}
                      </motion.h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                    {feature.description}
                  </p>

                  <motion.button
                    whileHover={{ 
                      x: 10,
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`group/btn flex items-center gap-3 text-lg font-bold bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text hover:text-white transition-all duration-300`}
                  >
                    <span>Explore More</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`p-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Atom className="w-6 h-6" />
              <span>Discover All Topics</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};