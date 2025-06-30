// components/LiquidBackground.jsx
'use client';

export const LiquidBackground = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(64, 224, 255, 0.1)" />
              <stop offset="100%" stopColor="rgba(138, 43, 226, 0.1)" />
            </linearGradient>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="gooey" />
            </filter>
          </defs>
          
          <circle
            r="150"
            fill="url(#gradient1)"
            filter="url(#gooey)"
            className="animate-liquid-1"
          />
          
          <circle
            r="200"
            fill="url(#gradient1)"
            filter="url(#gooey)"
            className="animate-liquid-2"
          />
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes liquid-1 {
          0%, 100% { 
            transform: translate(200px, 300px); 
          }
          50% { 
            transform: translate(800px, 700px); 
          }
        }
        
        @keyframes liquid-2 {
          0%, 100% { 
            transform: translate(800px, 200px); 
          }
          50% { 
            transform: translate(200px, 800px); 
          }
        }
        
        .animate-liquid-1 {
          animation: liquid-1 20s ease-in-out infinite;
        }
        
        .animate-liquid-2 {
          animation: liquid-2 25s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};