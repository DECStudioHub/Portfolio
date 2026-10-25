import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DevicesGallery } from './DevicesGallery';
import { Briefcase, Cpu, Layers } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { data } = usePortfolio();
  // Subsection view: 'all' (both), 'timeline' (roles only), or 'devices' (hardware gallery only)
  const [activeSubsection, setActiveSubsection] = useState<'all' | 'timeline' | 'devices'>('all');

  // Keep the current leadership role expanded by default, and allow individual toggling
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-prince-supervisor': true,
    'exp-prince-lead': true,
  });

  // Handle direct anchor links to #devices
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#devices' || window.location.hash === '#devices-gallery') {
        setActiveSubsection('devices');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    data.experience.forEach((item) => {
      allExpanded[item.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              04. Career & Roles
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              Professional Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1DCC9]/70 max-w-md font-mono">
            Proven leadership in retail IT operations, service management, infrastructure continuity, and field support across 27 branches and distribution centers.
          </p>
        </div>

        {/* Subsection Switcher Tab Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl border border-[#412D15] bg-[#140D07]/90 backdrop-blur-md">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveSubsection('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeSubsection === 'all'
                  ? 'bg-[#412D15] text-[#E1DCC9] border border-[#E1DCC9]/50 shadow-md font-semibold'
                  : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#1F150C]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Complete Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubsection('timeline')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeSubsection === 'timeline'
                  ? 'bg-[#412D15] text-[#E1DCC9] border border-[#E1DCC9]/50 shadow-md font-semibold'
                  : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#1F150C]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Career Timeline</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/50 text-[#E1DCC9]/70">
                {data.experience.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubsection('devices')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeSubsection === 'devices'
                  ? 'bg-[#412D15] text-[#E1DCC9] border border-[#E1DCC9]/50 shadow-md font-semibold'
                  : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#1F150C]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Devices Gallery</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                New
              </span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#E1DCC9]/50 px-2 hidden sm:flex items-center gap-1.5">
            <span>Active View:</span>
            <span className="text-[#E1DCC9] font-medium">
              {activeSubsection === 'all'
                ? 'Timeline & Hardware Devices'
                : activeSubsection === 'timeline'
                ? 'Career Timeline'
                : 'Devices Gallery'}
            </span>
          </div>
        </div>

        {/* SUBSECTION 1: Career Progression & Work History */}
        {activeSubsection !== 'devices' && (
          <div className="space-y-12">
            {/* Professional Focus Bar */}
            {data.professionalFocus && (
              <div className="rounded-xl border border-[#412D15] bg-[#160E08]/80 p-5 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-[#E1DCC9]">Professional Focus</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#E1DCC9]/80">
              {data.professionalFocus.map((focus, idx) => (
                <React.Fragment key={focus}>
                  <span className="hover:text-white transition-colors">{focus}</span>
                  {idx < (data.professionalFocus?.length || 0) - 1 && (
                    <span className="text-[#412D15]" aria-hidden="true">
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Career Progression Flow */}
        {data.careerProgression && (
          <div className="rounded-xl border border-[#412D15]/70 bg-[#140D07]/60 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#412D15]/50 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-heading text-sm font-semibold tracking-wider text-[#E1DCC9] uppercase">
                  Career Progression
                </h3>
                <p className="text-xs font-mono text-[#E1DCC9]/60">
                  Ascension through enterprise technical operations, team leadership, and IT supervisory roles
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  onClick={expandAll}
                  className="px-2.5 py-1 rounded border border-[#412D15] bg-[#1F150C] text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#2A1E11] transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1 rounded border border-[#412D15] bg-[#1F150C] text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#2A1E11] transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Visual Stepped Career Path */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
              {data.careerProgression.map((step, idx) => {
                const isCurrent = idx === 0;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-lg p-3 border transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-emerald-500/50 bg-[#1F150C] shadow-md shadow-emerald-950/20'
                        : 'border-[#412D15]/60 bg-[#120D08]/80'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                        <span className={isCurrent ? 'text-emerald-400 font-bold' : 'text-[#E1DCC9]/50'}>
                          {step.period}
                        </span>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <div className="font-heading text-xs font-bold text-[#E1DCC9] leading-tight">
                        {step.role}
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] text-[#E1DCC9]/60 font-sans truncate">
                      {step.company}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-[#412D15] space-y-10">
          {data.experience.map((item, idx) => {
            const isExpanded = !!expandedIds[item.id];
            const isCurrent = idx === 0;
            return (
              <div key={item.id} className="relative group">
                {/* Circular Marker */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    isCurrent
                      ? 'border-emerald-400 bg-emerald-400 shadow-[0_0_12px_#34d399]'
                      : 'border-[#412D15] bg-[#1F150C] group-hover:border-[#E1DCC9]'
                  }`}
                />

                {/* Card Container */}
                <div
                  className={`rounded-xl border transition-all duration-200 p-6 sm:p-7 space-y-5 ${
                    isCurrent
                      ? 'border-[#E1DCC9]/40 bg-[#1F150C] shadow-xl'
                      : 'border-[#412D15] bg-[#1F150C]/50 hover:bg-[#1F150C] hover:border-[#E1DCC9]/30'
                  }`}
                >
                  {/* Top Bar: Period & Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-[#E1DCC9] font-bold tracking-wider">
                        {item.period}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-[10px] text-emerald-300 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Current Role
                        </span>
                      )}
                    </div>
                    <span className="text-[#E1DCC9]/60">
                      {item.type} · {item.location}
                    </span>
                  </div>

                  {/* Role & Company Header */}
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#E1DCC9]">
                      {item.position}
                    </h3>
                    <span className="text-sm sm:text-base font-medium text-[#E1DCC9]/80 block mt-0.5">
                      {item.company}
                    </span>
                  </div>

                  {/* Role Overview */}
                  {item.overview && (
                    <p className="text-xs sm:text-sm text-[#E1DCC9]/85 leading-relaxed bg-[#120D08]/60 p-3.5 rounded-lg border border-[#412D15]/50">
                      {item.overview}
                    </p>
                  )}

                  {/* Core Responsibilities Section */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/60 font-semibold">
                        Key Responsibilities & Contributions ({item.responsibilities.length})
                      </h4>
                      {item.responsibilities.length > 5 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-xs font-mono text-[#E1DCC9]/70 hover:text-[#E1DCC9] underline decoration-dotted transition-colors"
                        >
                          {isExpanded ? 'Show Summary' : 'Show All Responsibilities'}
                        </button>
                      )}
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-[#E1DCC9]/80">
                      {(isExpanded
                        ? item.responsibilities
                        : item.responsibilities.slice(0, 5)
                      ).map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <span className="text-[#E1DCC9]/60 font-mono mt-0.5 shrink-0">•</span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {!isExpanded && item.responsibilities.length > 5 && (
                      <div className="pt-1">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-xs font-mono text-[#E1DCC9]/60 hover:text-[#E1DCC9] transition-colors"
                        >
                          + {item.responsibilities.length - 5} more responsibilities...
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Core Areas / Technologies Footer */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-3 border-t border-[#412D15]/40 space-y-2">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#E1DCC9]/50">
                        Core Competencies & Technologies
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-mono text-[#E1DCC9]/70">
                        {item.technologies.map((tech, tIdx) => (
                          <React.Fragment key={tech}>
                            <span className="hover:text-[#E1DCC9] transition-colors">
                              {tech}
                            </span>
                            {tIdx < item.technologies.length - 1 && (
                              <span className="text-[#412D15]" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accordion Toggle */}
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E1DCC9]/70 hover:text-[#E1DCC9] transition-colors"
                    >
                      <span>{isExpanded ? 'Collapse View' : 'Expand Full Details'}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* Quick transition footer when only timeline is active */}
    {activeSubsection === 'timeline' && (
      <div className="p-6 rounded-2xl border border-[#412D15] bg-[#160E08]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
            Hardware & Infrastructure Experience
          </span>
          <h4 className="font-heading text-base font-bold text-[#E1DCC9]">
            Explore IT Devices & Equipment Gallery
          </h4>
          <p className="text-xs text-[#E1DCC9]/70 font-mono">
            Inspect POS terminals, barcode scanners, servers, and networking hardware deployed across these branches.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setActiveSubsection('devices');
            window.scrollTo({ top: document.getElementById('experience')?.offsetTop || 0, behavior: 'smooth' });
          }}
          className="px-4 py-2 rounded-xl bg-[#412D15] hover:bg-[#573d1e] border border-[#E1DCC9]/40 text-xs font-mono text-[#E1DCC9] transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Open Devices Gallery</span>
          <span>→</span>
        </button>
      </div>
    )}

    {/* SUBSECTION 2: IT Devices & Hardware Gallery */}
    {activeSubsection !== 'timeline' && (
      <div id="devices" className="space-y-8">
        {activeSubsection === 'all' && (
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#412D15]/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0E0A06] px-4 text-xs font-mono text-[#E1DCC9]/70 uppercase tracking-widest border border-[#412D15] rounded-full py-1 shadow-md">
                Subsection 04.2 • Hardware Systems
              </span>
            </div>
          </div>
        )}

        <DevicesGallery />

        {activeSubsection === 'devices' && (
          <div className="p-5 rounded-2xl border border-[#412D15]/70 bg-[#140D07]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span className="text-[#E1DCC9]/70">
              Want to review managerial, supervisory, and operational roles?
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveSubsection('timeline');
                window.scrollTo({ top: document.getElementById('experience')?.offsetTop || 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-lg border border-[#412D15] bg-[#1F150C] hover:bg-[#2A1E11] text-[#E1DCC9] transition-colors"
            >
              ← Switch to Career Timeline
            </button>
          </div>
        )}
      </div>
    )}
  </div>
</section>
  );
};
