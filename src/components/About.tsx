import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const defaultPillarVideos: Record<
  number,
  {
    video: string;
    preview: string;
    poster: string;
    fallback: string;
    badge: string;
    tag: string;
    title: string;
    quote: string;
    note: string;
  }
> = {
  0: {
    video: '/video/vibe-coding-portfolio.mp4',
    preview: '/video/vibe-coding-preview.mp4',
    poster: '/video/vibe-coding-portfolio-poster.webp',
    fallback: '/video/vibe-coding-portfolio.mp4',
    badge: 'VIBE CODING · HD',
    tag: 'AI-POWERED NO-CODE BUILDING',
    title: 'VIBE Coding (No Code) — Digital Innovation Showcase',
    quote: '“From a thought to a working product — Building web apps and digital solutions with minimal manual coding.”',
    note: '1440 × 1080 HD · 4:3 Master',
  },
  1: {
    video: '/video/it-professional-systems-infrastructure.mp4',
    preview: '/video/it-professional-preview.mp4',
    poster: '/video/it-professional-poster.webp',
    fallback: '/video/it-professional-systems-infrastructure.mp4',
    badge: 'IT INFRASTRUCTURE · HD',
    tag: 'ENTERPRISE SYSTEMS & INFRASTRUCTURE',
    title: 'IT Professional — Systems & Infrastructure Showcase',
    quote: '“Hands-on troubleshooting of hardware, networking, POS systems, enterprise devices, security configurations, and operational continuity across 27 retail branches.”',
    note: 'HD Video · Enterprise Operations',
  },
  2: {
    video: '/video/problem-solver.mp4',
    preview: '/video/problem-solver-preview.mp4',
    poster: '/video/problem-solver-poster.webp',
    fallback: '/video/problem-solver.mp4',
    badge: 'AUTOMATION LOGIC · HD',
    tag: 'SYSTEM & AUTOMATION LOGIC',
    title: 'Problem Solver — System & Automation Logic Showcase',
    quote: '“Make busywork run itself. Streamlining repetitive manual operations through custom batch scripts, API integrations, database workflows, and fault-tolerant system design.”',
    note: '1440 × 1080 HD · 4:3 Master',
  },
  3: {
    video: '/video/content-creator.mp4',
    preview: '/video/content-creator-preview.mp4',
    poster: '/video/content-creator-poster.webp',
    fallback: '/video/content-creator.mp4',
    badge: 'STUDIO MEDIA · HD',
    tag: 'DIGITAL CONTENT & STUDIO MEDIA',
    title: 'Content Creator — Digital Content & Studio Media Showcase',
    quote: '“Ideas into experiences. Technology, made visual. Producing engaging technology content, visual media, technical tutorials, and creative brand experiences across YouTube, TikTok, and digital channels.”',
    note: '1440 × 1080 HD · 4:3 Master',
  },
};

interface PillarVideoPlayerProps {
  videoUrl: string;
  previewUrl?: string;
  posterUrl?: string;
  badgeLabel?: string;
  fallbackUrl?: string;
  onExpand: () => void;
}

const PillarVideoPlayer: React.FC<PillarVideoPlayerProps> = ({
  videoUrl,
  previewUrl,
  posterUrl,
  badgeLabel = 'VIBE CODING · HD',
  fallbackUrl,
  onExpand,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const activeSrc = previewUrl || videoUrl;

  // IntersectionObserver: Only stream and play when card is in viewport (huge mobile optimization)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Attempt play when in view, but gracefully handle mobile autoplay policy
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasLoaded(true);
        })
        .catch(() => {
          // Autoplay blocked by mobile browser - show poster with play button
          setIsPlaying(false);
        });
    }
  }, [isInView, activeSrc]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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
      ref={containerRef}
      onClick={onExpand}
      className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#412D15] bg-[#0C0804] cursor-pointer group/vid shadow-md select-none"
      title="Click to expand video in Full HD"
    >
      {/* Video Element with lightweight source and instant WebP poster */}
      <video
        ref={videoRef}
        poster={posterUrl}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/vid:scale-[1.03]"
      >
        {isInView && <source src={activeSrc} type="video/mp4" />}
        {isInView && fallbackUrl && <source src={fallbackUrl} type="video/mp4" />}
      </video>

      {/* Instant fallback poster background if video not loaded */}
      {!hasLoaded && posterUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-300"
          style={{ backgroundImage: `url(${posterUrl})` }}
        />
      )}

      {/* Top subtle HUD badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[8px] font-mono text-[#E1DCC9]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
        <span>{badgeLabel}</span>
      </div>

      {/* Scrim vignette: softens edges into coffee theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      {/* Subtle CAD scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[size:100%_4px] opacity-25 pointer-events-none" />

      {/* Big Play Glyph overlay if paused (so it's inviting and never looks broken or black) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-black/75 border border-[#E1DCC9]/40 flex items-center justify-center text-[#E1DCC9] shadow-xl backdrop-blur-sm group-hover/vid:scale-110 group-hover/vid:border-[#E1DCC9] transition-all">
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

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

interface ModalVideoData {
  tag: string;
  title: string;
  videoUrl: string;
  posterUrl?: string;
  fallbackUrl?: string;
  quote: string;
  resolutionNote?: string;
}

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const [activeModalVideo, setActiveModalVideo] = useState<ModalVideoData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 1:
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-5 h-5 text-[#E1DCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 3:
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
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              01. Background & Overview
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              About Dante
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1DCC9]/70 max-w-md font-mono">
            {data.about.tagline || 'Supervising regional IT client support operations and crafting digital utilities.'}
          </p>
        </div>

        {/* Narrative & Operational Scope Bento */}
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
            const defaultMeta = defaultPillarVideos[idx];
            const hasVideo = Boolean(pillar.videoUrl || defaultMeta?.video);
            const videoSource = pillar.videoUrl || defaultMeta?.video || '';
            const previewSource = pillar.previewUrl || defaultMeta?.preview || videoSource;
            const posterSource = pillar.posterUrl || defaultMeta?.poster || '';
            const fallbackSource = pillar.videoFallbackUrl || defaultMeta?.fallback;
            const badgeLabel = pillar.badge || defaultMeta?.badge || 'HD VIDEO';

            const handleExpand = () => {
              if (!hasVideo || !videoSource) return;
              setActiveModalVideo({
                tag: pillar.modalTag || defaultMeta?.tag || 'TECHNICAL SHOWCASE',
                title: pillar.modalTitle || defaultMeta?.title || `${pillar.title} — Video Showcase`,
                videoUrl: videoSource,
                posterUrl: posterSource,
                fallbackUrl: fallbackSource,
                quote: pillar.modalQuote || defaultMeta?.quote || pillar.description,
                resolutionNote: pillar.resolutionNote || defaultMeta?.note || 'HD Master Showcase',
              });
            };

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between px-3.5 sm:px-4 py-4 sm:py-5 rounded-xl border border-[#412D15] bg-[#1F150C]/40 hover:bg-[#1F150C] transition-all duration-200 hover:-translate-y-1 hover:border-[#E1DCC9]/40 overflow-hidden"
              >
                <div className="space-y-3">
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

                  {/* Card Body: Replaced with 4:3 Video if hasVideo */}
                  {hasVideo && videoSource ? (
                    <div className="w-full">
                      <PillarVideoPlayer
                        videoUrl={videoSource}
                        previewUrl={previewSource}
                        posterUrl={posterSource}
                        badgeLabel={badgeLabel}
                        fallbackUrl={fallbackSource}
                        onExpand={handleExpand}
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
                  <div className="mt-3.5 pt-2.5 border-t border-[#412D15]/40 flex items-center justify-between text-[11px] font-mono text-[#E1DCC9]/70">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                      Motion Showcase
                    </span>
                    <button
                      type="button"
                      onClick={handleExpand}
                      className="group-hover:text-[#E1DCC9] transition-colors flex items-center gap-1 hover:underline text-[#E1DCC9]/80"
                    >
                      <span>Watch Full HD</span>
                      <span>↗</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-[#412D15]/40 flex items-center justify-between text-xs font-mono text-[#E1DCC9]/60">
                    <span>Practiced</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full HD Video Modal Dialog */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#140D07] border border-[#412D15] rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  {activeModalVideo.tag}
                </span>
                <span className="text-[#E1DCC9]/40">•</span>
                <h3 className="font-heading text-sm sm:text-base font-bold text-[#E1DCC9] line-clamp-1">
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalVideo(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg border border-[#412D15] flex items-center justify-center text-[#E1DCC9]/70 hover:text-white hover:bg-[#2A1E11] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video Viewport (4:3 Native Aspect) */}
            <div className="relative aspect-[4/3] w-full max-h-[70vh] rounded-xl overflow-hidden border border-[#412D15] bg-black shadow-inner flex items-center justify-center">
              <video
                key={activeModalVideo.videoUrl}
                poster={activeModalVideo.posterUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                <source src={activeModalVideo.videoUrl} type="video/mp4" />
                {activeModalVideo.fallbackUrl && (
                  <source src={activeModalVideo.fallbackUrl} type="video/mp4" />
                )}
              </video>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs font-mono text-[#E1DCC9]/70 border-t border-[#412D15]/40">
              <p>{activeModalVideo.quote}</p>
              <span className="text-emerald-400 font-semibold shrink-0">
                {activeModalVideo.resolutionNote || 'HD Master Showcase'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
