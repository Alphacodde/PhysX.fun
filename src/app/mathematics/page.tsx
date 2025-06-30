'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sigma, Plus, Divide, Hash, ArrowRight, Link as LinkIcon, Sparkles, Atom } from 'lucide-react'; // Renamed Link to LinkIcon
import  {Navbar } from '@/components/Navbar'; // Assuming Navbar is in components folder
import { useSanity } from '@/hooks/useSanity'; // Your Sanity hook
import Link from 'next/link'; // Import Next.js Link

// Define Post type for better type safety
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage: any; // Or define a more specific type for Sanity image assets
}

// Mathematical symbols for floating animation
const FLOATING_SYMBOLS = [
  { symbol: '∆', x: 15, y: 20, delay: 0, size: 'text-4xl' },
  { symbol: '∑', x: 80, y: 15, delay: 1, size: 'text-3xl' },
  { symbol: '∞', x: 25, y: 80, delay: 2, size: 'text-5xl' },
  { symbol: 'π', x: 90, y: 75, delay: 3, size: 'text-3xl' },
  { symbol: '∂', x: 10, y: 50, delay: 4, size: 'text-4xl' },
  { symbol: 'Ψ', x: 75, y: 25, delay: 5, size: 'text-3xl' },
  { symbol: '∫', x: 5, y: 85, delay: 6, size: 'text-4xl' },
  { symbol: 'λ', x: 85, y: 45, delay: 7, size: 'text-3xl' },
  { symbol: 'φ', x: 45, y: 10, delay: 8, size: 'text-3xl' },
  { symbol: 'θ', x: 60, y: 90, delay: 9, size: 'text-4xl' },
];

const MathematicsPage = () => {
  // Fetch mathematics posts from Sanity
  const posts: Post[] = useSanity(`*[_type == "post" && category->title == "Mathematics"]{
    _id, title, slug, excerpt, publishedAt, mainImage
  }`);

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <Navbar />

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-cyan-900/30" />
        
        {/* Multiple Radial Glow Effects */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
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
          className="absolute inset-0 bg-[linear-gradient(rgba(139,69,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,218,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" 
        />
      </div>

      {/* Floating Mathematical Symbols */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {FLOATING_SYMBOLS.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} font-bold text-violet-400/50 select-none`}
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
      {/* Hero Section: Mathematics Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-32 h-32 mb-12"
        >
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-violet-400/30 rounded-full"
          />
          
          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-2 border-fuchsia-400/40 rounded-full"
          />
          
          {/* Innermost Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 border border-cyan-400/50 rounded-full"
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
              <Calculator className="w-12 h-12 text-violet-400 drop-shadow-2xl" />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-violet-400/20 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-500 text-transparent bg-clip-text">
            Mathematics
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Delve into the elegant structures and{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium">
            abstract logic
          </span>{' '}
          that describe everything
        </motion.p>

        <motion.a
          href="#mathematics-articles"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 25px 50px rgba(139, 69, 218, 0.4)",
            y: -5
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-10 py-5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-2xl text-white font-bold text-xl overflow-hidden transition-all duration-300 inline-flex items-center gap-3"
        >
          {/* Button Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            <span>Discover Mathematical Wonders</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sigma className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.a>
      </motion.section>

      {/* Main Content Area for Articles */}
      <section id="mathematics-articles" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {featuredPost ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative backdrop-blur-xl rounded-3xl overflow-hidden border border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 h-full"
                style={{
                  background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Large Background Symbol */}
                <motion.div
                  className="absolute top-6 right-6 text-8xl font-bold text-white/5 select-none"
                  animate={{ 
                    rotate: [0, 5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ∑
                </motion.div>

                <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full border border-violet-400/30 mb-6"
                  >
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="text-violet-300 font-semibold tracking-widest text-xs uppercase">
                      Featured Insight
                    </span>
                  </motion.div>

                  <Link href={`/blog/${featuredPost.slug?.current}`}>
                    <motion.h2
                      whileHover={{ 
                        scale: 1.02,
                        color: "#c084fc" 
                      }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight cursor-pointer transition-colors duration-300"
                    >
                      {featuredPost.title}
                    </motion.h2>
                  </Link>

                  <div className="flex flex-col sm:flex-row sm:items-center text-slate-400 text-sm mb-6 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full animate-pulse" />
                      <span>Published on</span>
                      <span className="font-semibold text-violet-300">
                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>

                  <motion.div
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center gap-3 text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text"
                  >
                    <span>Read Full Article</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="p-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg"
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative backdrop-blur-xl rounded-3xl p-12 text-center border border-violet-500/20"
                style={{
                  background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6 relative"
                >
                  <div className="absolute inset-0 border-4 border-violet-400/30 rounded-full" />
                  <div className="absolute inset-2 border-2 border-fuchsia-400/40 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-violet-400" />
                  </div>
                </motion.div>
                <p className="text-slate-400 text-lg">Loading featured mathematics article...</p>
              </motion.div>
            )}
          </div>

          {/* Recent Articles Sidebar */}
          {otherPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-violet-500/20"
              style={{
                background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center"
                >
                  <Hash className="w-4 h-4 text-white" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
                  Recent Explorations
                </h3>
              </div>

              <div className="space-y-6">
                {otherPosts.slice(0, 3).map((post: Post, index: number) => (
                  <Link
                    href={`/blog/${post.slug?.current}`}
                    key={post._id}
                    className="block group"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ 
                        scale: 1.02,
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      className="p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-violet-500/20"
                    >
                      <h4 className="text-violet-300 font-semibold mb-3 group-hover:text-violet-200 transition-colors text-base leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-1 h-1 bg-fuchsia-400 rounded-full" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* All Articles Grid */}
        {otherPosts.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16"
          >
            <div className="flex items-center gap-4 mb-12">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center"
              >
                <Atom className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text">
                All Mathematics Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.slice(3).map((post: Post, index: number) => (
                <Link
                  href={`/blog/${post.slug?.current}`}
                  key={post._id}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="relative backdrop-blur-xl rounded-2xl p-6 border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 h-full"
                    style={{
                      background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.4) 100%)`,
                    }}
                  >
                    {/* Hover Background Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    />

                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold mb-3 text-violet-300 group-hover:text-violet-200 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-slate-300 line-clamp-3 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="w-1 h-1 bg-fuchsia-400 rounded-full" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-violet-400 group-hover:text-violet-300 transition-colors"
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default MathematicsPage;