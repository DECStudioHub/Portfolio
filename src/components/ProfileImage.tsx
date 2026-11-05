import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ppWebp from '../assets/images/PP.webp';
import ppJpg from '../assets/images/PP.jpg';
import decWebp from '../assets/images/dec.webp';
import decJpg from '../assets/images/dec.jpg';

const AVATAR_FALLBACKS = [ppWebp, ppJpg, decWebp, decJpg];

export const ProfileImage: React.FC = () => {
  const { data } = usePortfolio();
  // If data.profile.avatarUrl is an absolute path string like '/PP.jpg', prefer the imported WebP asset
  const initialSource =
    data.profile.avatarUrl && !data.profile.avatarUrl.startsWith('/')
      ? data.profile.avatarUrl
      : ppWebp;

  const [imgSrc, setImgSrc] = useState<string>(initialSource);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);

  const handleImageError = () => {
    const nextIdx = fallbackIndex + 1;
    if (nextIdx < AVATAR_FALLBACKS.length) {
      setFallbackIndex(nextIdx);
      setImgSrc(AVATAR_FALLBACKS[nextIdx]);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md mx-auto gap-5 sm:gap-6">
      {/* Outer Enhanced Glow Halo */}
      <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#412D15]/30 via-[#E1DCC9]/15 to-[#412D15]/40 blur-2xl sm:blur-3xl pointer-events-none" />

      {/* Main Avatar Container with Technical Rotating Rings */}
      <div className="group relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center shrink-0">
        {/* Outer Slow Rotating Technical Ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-[#412D15] animate-spin-slow pointer-events-none"
          style={{ animationDuration: '32s' }}
        />

        {/* Middle Counter-Rotating Technical Accent Ring */}
        <div
          className="absolute inset-2 sm:inset-3 rounded-full border border-dotted border-[#E1DCC9]/30 animate-spin-reverse pointer-events-none"
          style={{ animationDuration: '40s' }}
        />

        {/* Orbiting technical accents */}
        <div
          className="absolute inset-0 animate-spin-slow pointer-events-none"
          style={{ animationDuration: '24s' }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E1DCC9] shadow-[0_0_10px_#E1DCC9]" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#412D15]" />
        </div>

        {/* Inner Solid Border & Fixed Profile Photo Frame */}
        <div className="relative w-[84%] h-[84%] rounded-full overflow-hidden border-2 border-[#412D15] bg-[#1F150C] shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-[#E1DCC9]/80 group-hover:shadow-[0_10px_45px_rgba(225,220,201,0.15)]">
          <picture className="w-full h-full block">
            <source type="image/webp" srcSet={ppWebp} />
            <source type="image/jpeg" srcSet={ppJpg} />
            <img
              src={imgSrc}
              alt={`${data.profile.name} - DECStudio`}
              loading="eager"
              decoding="sync"
              onError={handleImageError}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </picture>

          {/* Subtle vignette rim inside the frame */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/30 pointer-events-none" />
        </div>
      </div>

      {/* Profile Details & Professional Disclaimer */}
      <div className="flex flex-col items-center text-center w-full max-w-sm sm:max-w-md px-2 sm:px-4 gap-2.5 sm:gap-3">
        {/* Role & Company Tag */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#412D15] bg-[#1F150C]/90 shadow-md backdrop-blur-sm max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34d399]" />
          <span className="font-mono text-[11px] sm:text-xs text-[#E1DCC9] font-medium tracking-wide truncate">
            {data.profile.roleTag || "IT Client Support Supervisor - Team Lead"}
          </span>
        </div>

        {/* Professional Philosophy Disclaimer */}
        <div className="relative px-2">
          <p className="text-xs sm:text-sm text-[#E1DCC9]/80 font-sans italic leading-relaxed text-balance">
            {data.profile.disclaimer || "“I’m not a programmer. I’m a human with a bold imagination—and AI is the tool that brings my ideas to life.”"}
          </p>
        </div>
      </div>
    </div>
  );
};
