import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import vibeCodingVideo from '../assets/video/vibe-coding-portfolio.mp4';

interface PillarVideoPlayerProps {
  videoUrl: string;
  onExpand: () => void;
}

const PillarVideoPlayer: React.FC<PillarVideoPlayerProps> = ({ videoUrl, onExpand }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      onClick={onExpand}
      className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#412D15] bg-[#0C0804] cursor-pointer group/vid shadow-md select-none"
      title="Click to expand video in Full HD"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/vid:scale-[1.03]"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src="./video/vibe-coding-portfolio.mp4" type="video/mp4" />
      </video>

      {/* Top subtle HUD badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[8px] font-mono text-[#E1DCC9]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
        <span>VIBE CODING · HD</span>
      </div>

      {/* Scrim vignette: softens edges into coffee theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      {/* Subtle CAD scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[size:100%_4px] opacity-25 pointer-events-none" />

      {/* Bottom video controls */}
      <div className="absolute bottom-2 inset-x-2 z-10 flex items-center justify-between text-[9px] font-mono">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="w-6 h-6 rounded bg-black/85 hover:bg-[#412D15] border border-[#412D15] text-[#E1DCC9] flex items-center justify-center transition-colors shadow-sm"
          >
            {isPlaying ? (
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="w-6 h-6 rounded bg-black/85 hover:bg-[#412D15] border border-[#412D15] text-[#E1DCC9] flex items-center justify-center transition-colors shadow-sm"
          >
            {isMuted ? (
              <svg className="w-2.5 h-2.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          aria-label="Expand video to full view"
          className="px-2 py-1 rounded bg-black/85 hover:bg-[#412D15] border border-[#412D15] text-[#E1DCC9] flex items-center gap-1 transition-colors shadow-sm"
        >
          <span>Expand</span>
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVideoModalOpen(false);
      }
    };
    if (videoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoModalOpen]);

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0: // Developer / Vibe Coding
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 1: // IT Professional
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 2: // Problem Solver
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 3: // Content Creator
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              01. Background & Philosophy
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              About DECStudio
            </h2>
            <p className="text-sm sm:text-base font-mono text-[#E1DCC9]/90 font-medium tracking-wide">
              {data.about.tagline || 'IT Professional • Technology Innovator • Problem Solver'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#E1DCC9]/60">
            <span>27 Retail Branches</span>
            <span aria-hidden="true">·</span>
            <span>3 Distribution Centers</span>
            <span aria-hidden="true">·</span>
            <span>24 Stores</span>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5 text-base sm:text-lg text-[#E1DCC9]/85 leading-relaxed">
            {data.about.bio.map((paragraph, idx) => (
              <p key={idx} className="text-balance">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-6 rounded-xl border border-[#412D15] bg-[#1F150C]/60 p-6 backdrop-blur-sm space-y-4">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-[#E1DCC9] uppercase">
              Operational Scope & Technical Focus
            </h3>
            <div className="space-y-3.5 text-sm text-[#E1DCC9]/80">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-[#E1DCC9]/50 mt-0.5">01</span>
                <div>
                  <strong className="text-[#E1DCC9] font-medium">Enterprise Retail Infrastructure:</strong> IT operations, systems continuity, and network administration across 27 branches (3 DCs & 24 stores) in Negros and Panay.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-[#E1DCC9]/50 mt-0.5">02</span>
                <div>
                  <strong className="text-[#E1DCC9] font-medium">Team Leadership & Support:</strong> Leading technical support personnel, managing escalations, POS terminal operations, hardware troubleshooting, and store rollouts.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-[#E1DCC9]/50 mt-0.5">03</span>
                <div>
                  <strong className="text-[#E1DCC9] font-medium">AI & Modern Tooling:</strong> Leveraging modern AI frameworks and automation tools to rapidly conceptualize, prototype, and build practical solutions.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-[#E1DCC9]/50 mt-0.5">04</span>
                <div>
                  <strong className="text-[#E1DCC9] font-medium">System Innovation:</strong> Transforming real-world business challenges into smart digital applications, automated workflows, and efficient operational tools.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Minimalist Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {data.about.pillars.map((pillar, idx) => {
            const hasVideo = Boolean(pillar.videoUrl || idx === 0 || pillar.title.includes('VIBE Coding'));
            const videoSource = pillar.videoUrl || vibeCodingVideo;

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 rounded-xl border border-[#412D15] bg-[#1F150C]/40 hover:bg-[#1F150C] transition-all duration-200 hover:-translate-y-1 hover:border-[#E1DCC9]/40 overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Card Header: Icon & Index */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg border border-[#412D15] bg-[#2A1E11] flex items-center justify-center group-hover:border-[#E1DCC9]/40 transition-colors">
                      {getPillarIcon(idx)}
                    </div>
                    <span className="font-mono text-xs text-[#E1DCC9]/40">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Card Title & Subtitle */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#E1DCC9]">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-[#E1DCC9]/60 block mt-0.5">
                      {pillar.subtitle}
                    </span>
                  </div>

                  {/* Card Body: Replaced with 4:3 Video for VIBE Coding */}
                  {hasVideo ? (
                    <div className="pt-1">
                      <PillarVideoPlayer
                        videoUrl={videoSource}
                        onExpand={() => setVideoModalOpen(true)}
                      />
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#E1DCC9]/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  )}
                </div>

                {/* Card Footer */}
                {hasVideo ? (
                  <div className="mt-4 pt-3 border-t border-[#412D15]/40 flex items-center justify-between text-[11px] font-mono text-[#E1DCC9]/70">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                      Motion Showcase
                    </span>
                    <button
                      type="button"
                      onClick={() => setVideoModalOpen(true)}
                      className="group-hover:text-[#E1DCC9] transition-colors flex items-center gap-1 hover:underline text-[#E1DCC9]/80"
                    >
                      <span>Watch Full HD</span>
                      <span>↗</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-[#412D15]/40 flex items-center justify-between text-[11px] font-mono text-[#E1DCC9]/50">
                    <span>Practiced</span>
                    <span className="group-hover:text-[#E1DCC9] transition-colors">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Video Modal for Full-Screen HD Viewing */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="vibe-video-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-[#412D15] bg-[#160E08] p-4 sm:p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#412D15]/70 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  <span>AI-POWERED NO-CODE BUILDING</span>
                </div>
                <h3 id="vibe-video-title" className="font-heading text-lg sm:text-xl font-bold text-[#E1DCC9]">
                  VIBE Coding (No Code) — Digital Innovation Showcase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg border border-[#412D15] flex items-center justify-center text-[#E1DCC9]/70 hover:text-white hover:bg-[#2A1E11] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video Viewport (4:3 Native Aspect) */}
            <div className="relative aspect-[4/3] w-full max-h-[70vh] rounded-xl overflow-hidden border border-[#412D15] bg-black shadow-inner flex items-center justify-center">
              <video
                src={vibeCodingVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                <source src={vibeCodingVideo} type="video/mp4" />
                <source src="./video/vibe-coding-portfolio.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs font-mono text-[#E1DCC9]/70 border-t border-[#412D15]/40">
              <p>“From a thought to a working product — Building web apps and digital solutions with minimal manual coding.”</p>
              <span className="text-emerald-400 font-semibold shrink-0">1440 × 1080 HD · 4:3 Master</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
