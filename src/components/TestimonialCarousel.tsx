import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { TestimonialItem } from '../data/portfolioData';

export const TestimonialCarousel: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = data.testimonials || [];
  const activeItem = testimonials[selectedIndex] || testimonials[0];

  // Automatically cycle to the next avatar and card with smooth 1s transition
  useEffect(() => {
    if (!isAutoPlay || isHovered || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, testimonials.length]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Split active testimonial text into paragraphs
  const paragraphs = useMemo(() => {
    return activeItem?.testimonial ? activeItem.testimonial.split('\n\n') : [];
  }, [activeItem?.testimonial]);

  // Intelligent text highlighter that emphasizes context phrases
  const renderHighlightedContent = (rawText: string) => {
    if (!highlightEnabled || !activeItem.highlightPhrases || activeItem.highlightPhrases.length === 0) {
      return <span>{rawText}</span>;
    }

    const phrases = activeItem.highlightPhrases;
    const escapedPhrases = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedPhrases.join('|')})`, 'gi');
    const parts = rawText.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const isMatch = phrases.some((p) => p.toLowerCase() === part.toLowerCase());
          if (isMatch) {
            return (
              <mark
                key={i}
                className="bg-[#412D15]/90 text-[#FFF5DF] font-semibold px-2 py-0.5 rounded border border-[#E1DCC9]/40 shadow-[0_0_14px_rgba(225,220,201,0.2)] inline my-0.5 transition-all duration-500"
              >
                {part}
              </mark>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonial"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#412D15]/15 rounded-full blur-3xl pointer-events-none" />

      <div
        className="relative z-10 max-w-5xl mx-auto space-y-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              05. Endorsements & Feedback
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              What Collaborators Say
            </h2>
          </div>

          {/* Interactive Options Header */}
          <div className="flex items-center gap-3">
            {/* Auto-cycle indicator & toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              title={isAutoPlay ? 'Auto-cycle active (click to pause)' : 'Click to enable auto-cycle'}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#412D15] bg-[#1F150C]/60 text-xs font-mono text-[#E1DCC9]/80 hover:text-[#E1DCC9] transition-all"
            >
              <span className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
              <span>Auto-Play: {isAutoPlay ? 'ON' : 'PAUSED'}</span>
            </button>

            {/* Smart Highlight Toggle */}
            <button
              onClick={() => setHighlightEnabled(!highlightEnabled)}
              title="Intelligently highlight high-impact phrases and time-saving metrics"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                highlightEnabled
                  ? 'border-[#E1DCC9]/50 bg-[#412D15] text-[#E1DCC9] shadow-sm'
                  : 'border-[#412D15] bg-[#1F150C]/60 text-[#E1DCC9]/60 hover:text-[#E1DCC9]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${highlightEnabled ? 'bg-amber-400 animate-pulse' : 'bg-stone-500'}`} />
              <span>Context Highlights: {highlightEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Prev / Next Nav */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous quote"
                className="w-8 h-8 rounded-lg border border-[#412D15] bg-black/60 flex items-center justify-center text-[#E1DCC9] hover:bg-[#1F150C] hover:border-[#E1DCC9]/40 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next quote"
                className="w-8 h-8 rounded-lg border border-[#412D15] bg-black/60 flex items-center justify-center text-[#E1DCC9] hover:bg-[#1F150C] hover:border-[#E1DCC9]/40 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED QUOTE CARD WITH 1-SECOND (1000ms) TRANSITION */}
        <div className="relative min-h-[300px] rounded-3xl border border-[#412D15] bg-gradient-to-b from-[#1F150C]/95 via-[#180F08]/90 to-[#0D0804]/98 p-8 sm:p-12 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Subtle quotation background glyph */}
          <div className="absolute top-6 right-8 text-8xl font-serif text-[#412D15]/20 select-none pointer-events-none leading-none">
            “
          </div>

          {/* Technical Target / Crosshair Marker (top left) */}
          <div className="absolute top-5 left-5 flex items-center justify-center w-6 h-6 rounded-full border border-[#412D15] bg-[#140B05] text-[#E1DCC9]/60 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>

          {/* Crossfading Quote Container (1000ms / 1.0s transition) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
              transition={{ duration: 1.0, ease: [0.25, 1, 0.35, 1] }}
              className="relative z-10 flex flex-col justify-between space-y-6 pt-2"
            >
              {/* Impact Badge Pill */}
              {activeItem.impactBadge && (
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#412D15] bg-[#2A1E11]/90 text-xs font-mono font-medium text-[#E1DCC9] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>{activeItem.impactBadge}</span>
                  </span>
                </div>
              )}

              {/* Quote Body */}
              <blockquote className="space-y-4">
                {paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg md:text-xl text-[#E1DCC9] font-normal leading-relaxed tracking-wide text-balance"
                  >
                    “{renderHighlightedContent(para)}”
                  </p>
                ))}
              </blockquote>

              {/* Author Details Lockup */}
              <div className="pt-6 border-t border-[#412D15]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {/* Round initial badge */}
                  <div className="w-12 h-12 rounded-full border border-[#412D15] bg-[#2A1E11] flex items-center justify-center font-heading font-bold text-sm text-[#E1DCC9] shadow-md">
                    {activeItem.avatarText || activeItem.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold text-[#E1DCC9] flex items-center gap-2">
                      <span>{activeItem.name}</span>
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]" title="Verified Endorsement">
                        ✓
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#E1DCC9]/70">
                      {activeItem.position} · <span className="text-[#E1DCC9]/90 font-semibold">{activeItem.company}</span>
                    </div>
                  </div>
                </div>

                {/* Counter / Index indicator */}
                <div className="text-xs font-mono text-[#E1DCC9]/50 tracking-wider">
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ROW OF FIVE ROUND AVATARS WITH 1-SECOND SMOOTH TRANSITION */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/50">
              Select collaborator to view endorsement
            </span>
          </div>

          {/* 5 Avatars Flex Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {testimonials.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View endorsement from ${item.name}`}
                  className="group relative flex flex-col items-center focus:outline-none transition-transform duration-1000 ease-in-out"
                >
                  {/* Round Avatar Container with 1-second transition highlight */}
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out ${
                      isSelected
                        ? 'scale-115 ring-2 ring-[#E1DCC9] ring-offset-4 ring-offset-black bg-[#412D15] shadow-[0_0_26px_rgba(225,220,201,0.5)]'
                        : 'opacity-70 hover:opacity-100 hover:scale-105 border border-[#412D15] bg-[#1F150C]/90 hover:border-[#E1DCC9]/50'
                    }`}
                  >
                    {/* Inner Initials / Icon */}
                    <span
                      className={`font-heading font-bold text-xs sm:text-sm tracking-wider transition-colors duration-1000 ease-in-out ${
                        isSelected ? 'text-[#FFF]' : 'text-[#E1DCC9]'
                      }`}
                    >
                      {item.avatarText || item.name.charAt(0)}
                    </span>

                    {/* Active Pulsing Indicator Dot */}
                    {isSelected && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black shadow-[0_0_8px_#34d399] transition-all duration-1000" />
                    )}
                  </div>

                  {/* Name Label Under Avatar with 1-second transition */}
                  <div className="pt-2 text-center max-w-[85px] sm:max-w-[100px]">
                    <span
                      className={`block text-[11px] sm:text-xs font-mono truncate transition-all duration-1000 ease-in-out ${
                        isSelected
                          ? 'text-[#E1DCC9] font-bold underline decoration-[#E1DCC9]/60 underline-offset-4'
                          : 'text-[#E1DCC9]/60 group-hover:text-[#E1DCC9]'
                      }`}
                    >
                      {item.name.split(' ')[0]}
                    </span>
                    <span className="block text-[9px] font-mono text-[#E1DCC9]/40 truncate">
                      {item.company.includes('Prince') ? 'Prince Retail' : item.company.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
