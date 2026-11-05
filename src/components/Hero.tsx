import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProfileImage } from './ProfileImage';
import { SocialLinks } from './SocialLinks';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  // Role rotator animation
  useEffect(() => {
    const roles = data.profile.introRoles;
    if (!roles || roles.length === 0) return;

    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFadeState('in');
      }, 250);
    }, 2800);

    return () => clearInterval(interval);
  }, [data.profile.introRoles]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-tech-grid"
    >
      {/* Subtle background ambient gradients - strict palette only */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#412D15]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-[#1F150C]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN: Introduction & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 w-full">
          {/* Status & Identity Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#412D15] bg-[#1F150C]/70 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-[#E1DCC9]/90 tracking-wide">
              {data.profile.availability}
            </span>
          </div>

          {/* Main Greeting and Name */}
          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
              <span className="headline-gradient-glint">
                {data.profile.headline}
              </span>
            </h1>

            {/* Dynamic Role Animator */}
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-base sm:text-xl md:text-2xl font-semibold text-[#E1DCC9]/80 mr-2">
                Specializing in
              </span>
              <span
                className={`font-heading text-lg sm:text-2xl md:text-3xl font-bold text-[#E1DCC9] border-b-2 border-[#412D15] pb-0.5 transition-all duration-200 ${
                  fadeState === 'in'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
              >
                {data.profile.introRoles[currentRoleIndex]}
              </span>
            </div>
          </div>

          {/* Static Sub-headline */}
          <p className="text-xs sm:text-base font-medium tracking-wide text-[#E1DCC9]/90 uppercase font-mono">
            {data.profile.subHeadline}
          </p>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#E1DCC9]/75 max-w-2xl leading-relaxed text-balance">
            {data.profile.supportingText}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('projects')}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#412D15] bg-[#1F150C] hover:bg-[#2A1E11] text-[#E1DCC9] text-sm font-semibold tracking-wide shadow-lg hover:border-[#E1DCC9]/50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>View My Projects</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#412D15]/80 bg-black/60 hover:bg-[#1F150C] text-[#E1DCC9] text-sm font-semibold tracking-wide hover:border-[#E1DCC9]/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Contact Me</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>

          {/* Social Media in Hero */}
          <div className="pt-4 border-t border-[#412D15]/40 w-full max-w-xl">
            <span className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/50 mb-3">
              Official Channels & Profiles
            </span>
            <SocialLinks size="md" />
          </div>
        </div>

        {/* RIGHT COLUMN: Professional Profile Image Area */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <ProfileImage />
        </div>
      </div>
    </section>
  );
};
