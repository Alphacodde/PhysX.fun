'use client';
import { useEffect } from 'react';

export const FloatingParticles = () => {
  useEffect(() => {
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.animationDelay = Math.random() * 6 + 's';
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 6000);
    }
    setInterval(createParticle, 500);
  }, []);

  return null;
};
