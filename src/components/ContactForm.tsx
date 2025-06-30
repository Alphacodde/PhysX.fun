import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Atom, CheckCircle, User, Mail, MessageSquare } from 'lucide-react';

// Mathematical symbols for floating animation
const FLOATING_SYMBOLS = [
  { symbol: '∆', x: 5, y: 15, delay: 0 },
  { symbol: '∑', x: 90, y: 20, delay: 1.5 },
  { symbol: '∞', x: 15, y: 75, delay: 3 },
  { symbol: 'π', x: 85, y: 80, delay: 4.5 },
  { symbol: '∂', x: 8, y: 45, delay: 2 },
  { symbol: 'Ψ', x: 92, y: 55, delay: 6 },
];

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call with a longer delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setSubmitted(true);
      setFormData({ name: '', email: '', interest: '' });
    } catch (err) {
      setError(err.message || 'Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
    exit: { 
      opacity: 0, 
      y: -40, 
      scale: 0.95,
      transition: { duration: 0.4 } 
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 }
    },
    hover: { 
      scale: 1.02, 
      y: -3,
      boxShadow: "0 25px 50px rgba(6, 182, 212, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.7, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.15,
      },
    },
  };

  const successItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 }
    },
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
            className="absolute text-4xl font-bold text-cyan-400/50 select-none"
            style={{ 
              left: `${item.x}%`, 
              top: `${item.y}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 12 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          {/* Decorative Element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full" />
            <div className="absolute inset-2 border border-violet-400/40 rounded-full" />
            <div className="absolute inset-4 border border-fuchsia-400/50 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-8 h-8 text-fuchsia-400" />
              </motion.div>
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
              Connect
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">with Us</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Ready to embark on a journey through the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-medium">
              quantum realm
            </span>
            ? Let's explore together.
          </motion.p>
        </motion.div>

        {/* Enhanced Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group perspective-1000"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-fuchsia-500/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Main Form Container */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden">
            {/* Animated Border */}
            <motion.div
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-violet-500/20 to-fuchsia-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, rgba(6,182,212,0.3), rgba(139,92,246,0.2), rgba(236,72,153,0.3))',
                backgroundSize: '400% 400%'
              }}
            />
            
            <div className="relative p-12">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {/* Name Field */}
                    <motion.div variants={inputVariants} className="relative group">
                      <div className="relative">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-5 bg-slate-800/60 border-2 border-slate-600/60 rounded-2xl text-white placeholder-slate-400 text-lg font-medium transition-all duration-300 focus:border-cyan-400 focus:bg-slate-800/80 focus:outline-none focus:ring-0"
                        />
                        <motion.div
                          className="absolute inset-0 border-2 border-cyan-400/0 rounded-2xl pointer-events-none"
                          animate={focusedField === 'name' ? {
                            borderColor: 'rgba(6, 182, 212, 0.6)',
                            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
                          } : {}}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={inputVariants} className="relative group">
                      <div className="relative">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-violet-400' : 'text-slate-500'}`} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-5 bg-slate-800/60 border-2 border-slate-600/60 rounded-2xl text-white placeholder-slate-400 text-lg font-medium transition-all duration-300 focus:border-violet-400 focus:bg-slate-800/80 focus:outline-none focus:ring-0"
                        />
                        <motion.div
                          className="absolute inset-0 border-2 border-violet-400/0 rounded-2xl pointer-events-none"
                          animate={focusedField === 'email' ? {
                            borderColor: 'rgba(139, 92, 246, 0.6)',
                            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                          } : {}}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Message Field */}
                    <motion.div variants={inputVariants} className="relative group">
                      <div className="relative">
                        <MessageSquare className={`absolute left-4 top-5 w-5 h-5 transition-colors duration-300 ${focusedField === 'interest' ? 'text-fuchsia-400' : 'text-slate-500'}`} />
                        <textarea
                          id="interest"
                          name="interest"
                          placeholder="Tell us about your interest in quantum physics or mathematics..."
                          rows={6}
                          value={formData.interest}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('interest')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-5 bg-slate-800/60 border-2 border-slate-600/60 rounded-2xl text-white placeholder-slate-400 resize-none text-lg font-medium transition-all duration-300 focus:border-fuchsia-400 focus:bg-slate-800/80 focus:outline-none focus:ring-0"
                        />
                        <motion.div
                          className="absolute inset-0 border-2 border-fuchsia-400/0 rounded-2xl pointer-events-none"
                          animate={focusedField === 'interest' ? {
                            borderColor: 'rgba(236, 72, 153, 0.6)',
                            boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
                          } : {}}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Error Message */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-center text-lg font-semibold bg-red-400/10 border border-red-400/20 rounded-xl p-4"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      className="w-full px-8 py-6 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-2xl text-white font-bold text-xl transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4 relative overflow-hidden group"
                      disabled={isSubmitting}
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
                      
                      <div className="relative flex items-center space-x-4">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Transmitting Data...</span>
                          </>
                        ) : (
                          <>
                            <span>Begin Quantum Journey</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Send className="w-6 h-6" />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-20"
                  >
                    <motion.div
                      variants={successItemVariants}
                      className="relative w-32 h-32 mx-auto mb-10"
                    >
                      {/* Outer Ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-green-400/30 rounded-full"
                      />
                      
                      {/* Inner Ring */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-2 border-cyan-400/40 rounded-full"
                      />
                      
                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
                        >
                          <CheckCircle className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>
                      
                      {/* Glow Effect */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-xl"
                      />
                    </motion.div>
                    
                    <motion.h3 
                      variants={successItemVariants} 
                      className="text-5xl font-black text-white mb-6 leading-tight"
                    >
                      <span className="bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text">
                        Quantum
                      </span>{' '}
                      Entanglement Complete!
                    </motion.h3>
                    
                    <motion.p 
                      variants={successItemVariants} 
                      className="text-xl text-slate-300 max-w-2xl mx-auto font-light mb-12 leading-relaxed"
                    >
                      Your message has been successfully transmitted through the quantum field. 
                      Our team will connect with you across the dimensions of space-time shortly!
                    </motion.p>
                    
                    <motion.button
                      variants={successItemVariants}
                      onClick={() => setSubmitted(false)}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 20px 40px rgba(71, 85, 105, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/60 text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Atom className="w-5 h-5 text-cyan-400" />
                        <span>Explore Another Dimension</span>
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};