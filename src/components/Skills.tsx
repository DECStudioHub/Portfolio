import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              03. Technical Capabilities
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              Skills & Technical Stack
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1DCC9]/70 max-w-md font-mono">
            Practical competencies acquired through production delivery, system support, and continuous development.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {data.skills.map((category, index) => {
            const isActive = activeCategoryIndex === index;
            return (
              <button
                key={category.title}
                onClick={() => setActiveCategoryIndex(index)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  isActive
                    ? 'border-[#E1DCC9]/50 bg-[#1F150C] shadow-lg -translate-y-0.5'
                    : 'border-[#412D15] bg-[#1F150C]/40 hover:bg-[#1F150C]/70 text-[#E1DCC9]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-[#E1DCC9]/50">0{index + 1}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E1DCC9]" />}
                </div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-[#E1DCC9]">
                  {category.title}
                </h3>
                <span className="text-[11px] font-mono text-[#E1DCC9]/60 line-clamp-1 mt-0.5">
                  {category.skills.length} Competencies
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#E1DCC9]/70 border-b border-[#412D15]/40 pb-3">
            <span>{data.skills[activeCategoryIndex].description}</span>
            <span className="hidden sm:inline">Verification: Production Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.skills[activeCategoryIndex].skills.map((skill, sIdx) => (
              <div
                key={skill.name}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-[#412D15] bg-[#1F150C]/40 hover:bg-[#1F150C] transition-all duration-200 hover:border-[#E1DCC9]/40"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm sm:text-base font-semibold text-[#E1DCC9] group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#E1DCC9]/50">
                      #{sIdx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-[#E1DCC9]/70 leading-relaxed">
                    {skill.experience}
                  </p>
                </div>

                {/* Level Tag (Unboxed text with status indicator) */}
                <div className="mt-4 pt-3 border-t border-[#412D15]/30 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#E1DCC9]/50">Proficiency</span>
                  <span className="flex items-center gap-1.5 text-[#E1DCC9]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{skill.level}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
