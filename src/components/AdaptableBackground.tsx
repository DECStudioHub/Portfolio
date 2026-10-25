import React from 'react';
import decBackground from '../assets/images/dec.jpg';
import { usePortfolio } from '../context/PortfolioContext';

export const AdaptableBackground: React.FC = () => {
  const { data } = usePortfolio();
  const opacity = (data.background?.opacity ?? 65) / 100;
  const blur = data.background?.blur ?? 0;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* The dec.jpg Background Photo Layer (Adaptive Opacity & Blur) */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat will-change-transform transition-all duration-300"
        style={{
          backgroundImage: `url(${decBackground})`,
          backgroundPosition: '56% 18%',
          opacity: opacity,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      />

      {/* Cinematic Scrim & Dark Gradient: Guarantees text and layout remain 100% crisp and readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70" />

      {/* Subtle DECStudio brand dark brown undertone */}
      <div className="absolute inset-0 bg-[#1F150C]/25 mix-blend-color" />

      {/* Fine technical grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-15" />
    </div>
  );
};
