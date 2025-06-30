// components/HackerText.tsx
'use client';

import { useRef } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HackerText({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  const handleMouseOver = () => {
    let iteration = 0;
    const originalText = text;

    const interval = setInterval(() => {
      if (!ref.current) return;

      ref.current.innerText = ref.current.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      iteration += 1 / 3;

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
    }, 30);
  };

  return (
    <h1
      ref={ref}
      onMouseOver={handleMouseOver}
      data-value={text}
      className="font-mono text-white text-6xl text-center p-4 hover:bg-white hover:text-black transition-colors duration-200 rounded-xl"
    >
      {text}
    </h1>
  );
}
// to run it:
// looks best with Space Mono Font
// app/page.tsx or pages/index.tsx
import { HackerText } from '@/components/HackerText';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <HackerText text="HYPERPLEXED" />
    </main>
  );
}
