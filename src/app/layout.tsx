import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar';
import { FloatingParticles } from "@/components/FloatingParticles";
import { LiquidBackground } from '@/components/LiquidBackground';

export const metadata = {
  title: 'PhysX.Fun',
  description: 'Explore the universe through equations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white font-sans overflow-x-hidden">
        <Navbar />
        <FloatingParticles />
        <LiquidBackground />
        <main>{children}</main>
      </body>
    </html>
  );
}
