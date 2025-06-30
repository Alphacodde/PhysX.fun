// src/components/ArticlesGrid.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ArticlesGridProps {
  id: number; // Used for stagger delay based on 'order' from Sanity
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode; // This will be the LucideReact component
  color: string; // Tailwind gradient classes, e.g., "from-cyan-500 to-blue-600"
  stats: string;
  onHoverStart: (id: number) => void; // Fixed: Changed to number to match usage
  onHoverEnd: () => void;
  isHovered: boolean;
}

export const ArticlesGrid: React.FC<ArticlesGridProps> = ({ // Fixed: Renamed component to ArticlesGrid
  id,
  title,
  subtitle,
  description,
  icon,
  color,
  stats,
  onHoverStart,
  onHoverEnd,
  isHovered,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 * (id - 1) }} // Adjusted delay based on id (order) for staggered effect
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => onHoverStart(id)} // Fixed: Pass id directly
      onHoverEnd={onHoverEnd}
      className="group relative"
    >
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden h-full">
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        
        {/* Icon */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6`}
        >
          {icon}
        </motion.div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-cyan-400 font-medium">{subtitle}</p>
          </div>
          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
            {stats}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed mb-6">
          {description}
        </p>

        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors"
        >
          Explore More
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};