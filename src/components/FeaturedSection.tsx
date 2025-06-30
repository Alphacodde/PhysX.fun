// src/components/FeaturedSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Atom, Calculator, BookOpen, Zap } from 'lucide-react'; // Import all possible Lucide icons
import { ArticlesGrid } from '@/components/ArticleCards';
import { client } from '@/lib/sanity'; // Import your Sanity client

// Define a type for your Sanity data to ensure type safety
interface SanityFeaturedArticle {
  _id: string; // Sanity document ID
  title: string;
  subtitle: string;
  description: string;
  iconType: 'atom' | 'calculator' | 'bookOpen' | 'zap'; // Match iconType from Sanity schema
  colorGradient: string; // Tailwind class string
  stats: string;
  order: number; // For controlling display order and stagger delay
}

export const FeaturedSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null); // State holds the _id of the hovered card
  const [features, setFeatures] = useState<SanityFeaturedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error on new fetch
        // GROQ query to fetch all documents of type "featuredArticle"
        // and order them by the 'order' field in ascending order.
        const query = `*[_type == "featuredArticle"] | order(order asc) {
          _id,
          title,
          subtitle,
          description,
          iconType,
          colorGradient,
          stats,
          order
        }`;
        const data: SanityFeaturedArticle[] = await client.fetch(query);
        setFeatures(data);
      } catch (err) {
        console.error("Failed to fetch featured articles:", err);
        setError("Failed to load featured content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Helper function to map Sanity's iconType string to a LucideReact component
  const getIconComponent = (iconType: string): React.ReactNode => {
    switch (iconType) {
      case 'atom': return <Atom className="w-8 h-8" />;
      case 'calculator': return <Calculator className="w-8 h-8" />;
      case 'bookOpen': return <BookOpen className="w-8 h-8" />;
      case 'zap': return <Zap className="w-8 h-8" />;
      default: return null; // Return null or a default icon if type is not recognized
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-6 text-center text-white">
        <p>Loading featured explorations...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 px-6 text-center text-red-400">
        <p>{error}</p>
      </section>
    );
  }

  if (features.length === 0) {
    return (
      <section className="py-24 px-6 text-center text-gray-400">
        <p>No featured articles found. Please add some in Sanity Studio!</p>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Featured Explorations
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Journey through our most captivating topics where science meets wonder
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <ArticlesGrid
              key={feature._id} // Essential for React list rendering
              sanityId={feature._id} // Pass Sanity's _id to ArticleCard for hover management
              id={feature.order} // Pass 'order' for staggered entry animation calculation
              title={feature.title}
              subtitle={feature.subtitle}
              description={feature.description}
              icon={getIconComponent(feature.iconType)} // Render the correct Lucide icon
              color={feature.colorGradient}
              stats={feature.stats}
              onHoverStart={setHoveredCard} // Set the _id of the hovered card
              onHoverEnd={() => setHoveredCard(null)} // Clear on hover end
              isHovered={hoveredCard === feature._id} // Check if this card is currently hovered
            />
          ))}
        </div>
      </div>
    </section>
  );
};