'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, Atom, Zap, BookOpen, Calculator } from 'lucide-react';
import { client } from '@/lib/sanity'; // Adjust path based on your setup

// Types
interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
  estimatedReadingTime?: number;
}

// Sanity query
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author->{
    name,
    image{
      asset->{
        url
      }
    }
  },
  mainImage{
    asset->{
      url
    },
    alt
  },
  categories[]->{
    title,
    slug
  },
  estimatedReadingTime
}`;

// Icon mapping for different categories
const getCategoryIcon = (category?: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'quantum': <Atom className="w-6 h-6" />,
    'mathematics': <Calculator className="w-6 h-6" />,
    'physics': <Zap className="w-6 h-6" />,
    'default': <BookOpen className="w-6 h-6" />
  };
  
  const normalizedCategory = category?.toLowerCase() || 'default';
  return iconMap[normalizedCategory] || iconMap['default'];
};

// Color gradients for different categories
const getCategoryGradient = (category?: string) => {
  const gradientMap: { [key: string]: string } = {
    'quantum': 'from-cyan-500 to-blue-600',
    'mathematics': 'from-purple-500 to-pink-600',
    'physics': 'from-green-500 to-teal-600',
    'default': 'from-orange-500 to-red-600'
  };
  
  const normalizedCategory = category?.toLowerCase() || 'default';
  return gradientMap[normalizedCategory] || gradientMap['default'];
};

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Loading skeleton component
const PostCardSkeleton = () => (
  <div className="group relative animate-pulse">
    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden h-full">
      <div className="w-16 h-16 rounded-2xl bg-gray-700 mb-6"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-8 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
      <div className="h-6 bg-gray-700 rounded w-1/3"></div>
    </div>
  </div>
);

// Empty state component
const EmptyState = () => {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, scale: 1.02 }}
        onHoverStart={() => setHoveredCard(true)}
        onHoverEnd={() => setHoveredCard(false)}
        className="group relative max-w-md"
      >
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden h-full">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          />

          {/* Icon */}
          <motion.div
            animate={{ rotate: hoveredCard ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-6 mx-auto"
          >
            <Atom className="w-8 h-8" />
          </motion.div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">We're Working On It</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Our quantum physicists and mathematicians are crafting mind-bending content. 
              Check back soon for fascinating explorations into the universe's deepest mysteries.
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-center gap-2 text-purple-400 font-semibold group-hover:text-purple-300 transition-colors"
            >
              Coming Soon
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Post card component
const PostCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);
  const primaryCategory = post.categories?.[0]?.title;
  const categoryGradient = getCategoryGradient(primaryCategory);
  const categoryIcon = getCategoryIcon(primaryCategory);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setHoveredCard(true)}
      onHoverEnd={() => setHoveredCard(false)}
      className="group relative"
    >
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden h-full">
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${categoryGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Main Image */}
        {post.mainImage && (
          <div className="relative mb-6 rounded-2xl overflow-hidden">
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        {/* Category Icon */}
        <motion.div
          animate={{ rotate: hoveredCard ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center text-white mb-6`}
        >
          {categoryIcon}
        </motion.div>

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
            {primaryCategory && (
              <p className="text-cyan-400 font-medium">{primaryCategory}</p>
            )}
          </div>
          {post.estimatedReadingTime && (
            <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.estimatedReadingTime} min
            </span>
          )}
        </div>

        {post.excerpt && (
          <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt)}
          </div>
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
          )}
        </div>

        <motion.a
          href={`/blog/${post.slug.current}`}
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors"
        >
          Read More
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.article>
  );
};

// Main blog page component
const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await client.fetch(POSTS_QUERY);
        setPosts(fetchedPosts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-cyan-400/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-purple-400/40 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Quantum Chronicles
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Dive deep into the mysteries of quantum physics, elegant mathematics, 
            and the fundamental forces that shape our universe
          </motion.p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;