// src/app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSanity } from '@/hooks/useSanity';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { Search, Sparkles, BookOpen, Calendar, User, ArrowRight, Atom, Zap, AlertCircle, Target } from 'lucide-react';

// Mathematical symbols for floating animation
const FLOATING_SYMBOLS = [
  { symbol: '∆', x: 10, y: 20, delay: 0, size: 'text-2xl' },
  { symbol: '∑', x: 85, y: 15, delay: 1, size: 'text-3xl' },
  { symbol: '∞', x: 25, y: 80, delay: 2, size: 'text-2xl' },
  { symbol: 'π', x: 90, y: 75, delay: 3, size: 'text-3xl' },
  { symbol: '∂', x: 15, y: 50, delay: 4, size: 'text-2xl' },
  { symbol: 'Ψ', x: 75, y: 25, delay: 5, size: 'text-4xl' },
  { symbol: '∫', x: 60, y: 60, delay: 6, size: 'text-2xl' },
  { symbol: 'λ', x: 5, y: 85, delay: 7, size: 'text-3xl' },
];
// Define a type for your post for better type safety
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  category: { title: string };
  mainImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  author: { name: string };
}

// Enhanced loading skeleton with shimmer effect
const SearchResultSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl overflow-hidden"
  >
    {/* Shimmer Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -skew-x-12 transform translate-x-[-100%] animate-shimmer"></div>
    
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-shrink-0 w-full lg:w-48 h-40 bg-slate-700/60 rounded-2xl animate-pulse"></div>
      <div className="flex-grow space-y-6">
        <div className="h-8 bg-slate-700/60 rounded-xl w-3/4 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-700/40 rounded-lg w-full animate-pulse"></div>
          <div className="h-4 bg-slate-700/40 rounded-lg w-5/6 animate-pulse"></div>
          <div className="h-4 bg-slate-700/40 rounded-lg w-4/6 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-6">
          <div className="h-4 bg-cyan-600/40 rounded-full w-24 animate-pulse"></div>
          <div className="h-4 bg-slate-700/40 rounded-full w-28 animate-pulse"></div>
          <div className="h-4 bg-slate-700/40 rounded-full w-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Enhanced search result card with better styling
interface SearchResultCardProps {
  post: Post;
  query: string;
  index: number;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ post, query, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg px-2 py-1 font-bold shadow-lg">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        y: -8, 
        scale: 1.01,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/40 p-8 rounded-3xl shadow-2xl hover:shadow-cyan-500/20 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 rounded-3xl"
        />
        
        {/* Animated border glow */}
        <motion.div
          animate={isHovered ? { 
            scale: [1, 1.02, 1],
            opacity: [0, 0.3, 0]
          } : {}}
          transition={{ duration: 2, repeat: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-xl"
        />
      </div>
      
      <div className="relative flex flex-col lg:flex-row gap-8">
        {post.mainImage && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-full lg:w-48 h-40 relative rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 rounded-2xl"></div>
            <Image
              src={`/path/to/your/image/${post.mainImage.asset._ref}`}
              alt={post.mainImage.alt || post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
            
            {/* Category Badge on Image */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {post.category?.title}
              </span>
            </div>
          </motion.div>
        )}
        
        <div className="flex-grow space-y-6">
          <motion.h2
            animate={isHovered ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1.5, repeat: 2 }}
            className="text-3xl lg:text-4xl font-black text-white leading-tight"
          >
            <Link 
              href={`/blog/${post.slug?.current}`} 
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-violet-400 hover:to-fuchsia-400 transition-all duration-300"
            >
              {highlightText(post.title, query)}
            </Link>
          </motion.h2>
          
          <p className="text-slate-300 text-lg leading-relaxed line-clamp-3">
            {highlightText(post.excerpt, query)}
          </p>
          
          {/* Enhanced Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full animate-pulse"></div>
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400">
              <User className="w-4 h-4" />
              <span>{post.author?.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">3 min read</span>
            </div>
          </div>
          
          <motion.div
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href={`/blog/${post.slug?.current}`} 
              className="inline-flex items-center gap-3 text-lg font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 text-transparent bg-clip-text hover:from-cyan-300 hover:via-violet-300 hover:to-fuchsia-300 transition-all duration-300 group/link"
            >
              <span>Read Full Article</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="p-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white shadow-lg"
              >
                <ArrowRight size={16} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

const SearchPage = () => {
  const params = useSearchParams();
  const initialQuery = params.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { data: allPosts, loading: sanityLoading, error: sanityError } = useSanity<Post[]>(
    `*[_type == "post"]{
      _id, title, slug, excerpt, publishedAt, category->{title}, mainImage, author->{name}
    }`
  );

  const filteredPosts = useCallback(() => {
    if (!allPosts) return [];
    if (!debouncedQuery) return [];

    const lowerCaseQuery = debouncedQuery.toLowerCase();
    return allPosts.filter(post =>
      post.title?.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt?.toLowerCase().includes(lowerCaseQuery) ||
      post.category?.title?.toLowerCase().includes(lowerCaseQuery)
    );
  }, [allPosts, debouncedQuery]);

  const results = filteredPosts();

  useEffect(() => {
    if (sanityLoading) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 200);
      return () => clearTimeout(timer);
    }
  }, [sanityLoading, debouncedQuery]);

  useEffect(() => {
    if (sanityError) {
      setError('Failed to load posts. Please try again later.');
      console.error("Sanity Fetch Error:", sanityError);
    } else {
      setError(null);
    }
  }, [sanityError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
            className={`absolute ${item.size} font-bold text-cyan-400/50 select-none`}
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

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/80 backdrop-blur-sm py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-3 border-cyan-400/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-2 border-violet-400/40 rounded-full"
                />
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
                  >
                    <Search className="w-8 h-8 text-cyan-400 drop-shadow-2xl" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl lg:text-8xl font-black mb-8 leading-none"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
                Search
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Universe</span>
            </motion.h1>
            
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl lg:text-3xl text-slate-300 mb-8"
              >
                Exploring results for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 font-bold">
                  "{searchQuery}"
                </span>
              </motion.div>
            )}
            
            {/* Enhanced Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative max-w-3xl mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-xl"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
                  <motion.div
                    animate={isFocused ? { scale: 1.2, rotate: 360 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search className="h-6 w-6 text-slate-400" />
                  </motion.div>
                </div>
                <input
                  type="text"
                  placeholder="Search the quantum realm..."
                  className="w-full pl-20 pr-8 py-6 text-xl rounded-3xl bg-slate-800/60 backdrop-blur-xl text-white placeholder-slate-400 border border-slate-600/50 focus:border-cyan-500/60 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 shadow-2xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  aria-label="Search articles"
                />
              </div>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <div className="text-xl text-slate-400" aria-live="polite">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Atom className="h-6 w-6 text-cyan-400" />
                    </motion.div>
                    <span>Quantum searching through the universe...</span>
                  </span>
                ) : error ? (
                  <span className="text-red-400 flex items-center justify-center gap-3">
                    <AlertCircle className="w-6 h-6" />
                    {error}
                  </span>
                ) : (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <Target className="w-6 h-6 text-emerald-400" />
                    <span className="font-semibold">
                      Found {results?.length || 0} {results?.length === 1 ? 'result' : 'results'}
                    </span>
                  </motion.span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <SearchResultSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-3xl p-12 max-w-lg mx-auto backdrop-blur-xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-20 h-20 text-red-400 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Quantum Interference Detected</h3>
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          </motion.div>
        ) : results.length === 0 && debouncedQuery ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 border border-slate-700/50 rounded-3xl p-12 max-w-2xl mx-auto backdrop-blur-xl">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Target className="w-24 h-24 text-slate-400 mx-auto mb-8" />
              </motion.div>
              <h3 className="text-3xl font-bold text-slate-300 mb-6">No Quantum Matches Found</h3>
              <p className="text-slate-400 text-xl mb-4">
                We couldn't find any articles matching{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-bold">
                  "{debouncedQuery}"
                </span>
              </p>
              <p className="text-slate-500 text-lg">
                Try different keywords or explore the quantum possibilities with broader terms.
              </p>
            </div>
          </motion.div>
        ) : results.length === 0 && !debouncedQuery ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 border border-slate-700/50 rounded-3xl p-12 max-w-2xl mx-auto backdrop-blur-xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              >
                <Sparkles className="w-24 h-24 text-cyan-400 mx-auto mb-8" />
              </motion.div>
              <h3 className="text-3xl font-bold text-slate-300 mb-6">Begin Your Quantum Journey</h3>
              <p className="text-slate-400 text-xl">
                Enter a search term above to explore the fascinating world of physics and mathematics.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {results?.map((post, index) => (
              <SearchResultCard 
                key={post._id} 
                post={post} 
                query={debouncedQuery} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;