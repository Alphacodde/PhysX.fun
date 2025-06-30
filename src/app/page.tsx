'use client';
import { Hero } from '@/components/Hero';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { ArticlesGrid } from '@/components/ArticleCards';
import { ContactForm } from '@/components/ContactForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCarousel />
      <ContactForm />
    </>
  );
}

