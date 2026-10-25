import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Web Development',
    'IT Tools',
    'Software',
    'Automation',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? data.projects
    : data.projects.filter(
        (p) => p.category === selectedCategory || (p.tags && p.tags.includes(selectedCategory))
      );

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              02. Selected Engineering Works
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1DCC9]/70 max-w-md font-mono">
            Practical systems, mobile apps, automation utilities, and responsive web platforms.
          </p>
        </div>

        {/* Filter Bar (Segmented Controls) */}
        <div className="p-1.5 rounded-xl border border-[#412D15]/80 bg-[#160E08]/95 backdrop-blur-md inline-flex items-center overflow-x-auto max-w-full scrollbar-none gap-1.5 shadow-lg">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-xs transition-all ${
                  isActive
                    ? 'bg-[#412D15] text-[#E1DCC9] shadow-sm border border-[#E1DCC9]/40 font-semibold'
                    : 'bg-transparent text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#25180D] border border-transparent font-normal'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#412D15]/60 bg-[#160E08]/70 p-10 text-center space-y-4 max-w-xl mx-auto backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#1F150C] border border-[#412D15] flex items-center justify-center mx-auto text-base text-[#E1DCC9]/60">
              ⚡
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-mono font-medium text-[#E1DCC9]">
                No projects under "{selectedCategory}" currently published
              </h3>
              <p className="text-xs text-[#E1DCC9]/60">
                Additional projects are actively in development and will be published soon.
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory('All')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#412D15] hover:bg-[#52391c] text-xs font-mono text-[#E1DCC9] border border-[#E1DCC9]/20 transition-all shadow-sm"
            >
              <span>View All Published Projects</span>
            </button>
          </div>
        )}

        {/* Project Detail Lightbox Modal */}
        {activeProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#412D15] bg-[#1F150C] p-6 sm:p-8 shadow-2xl text-[#E1DCC9] space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#412D15] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E1DCC9]/60 mb-1">
                    <span>{activeProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">{activeProject.status}</span>
                  </div>
                  <h3 id="project-modal-title" className="font-heading text-2xl font-bold text-[#E1DCC9]">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded-lg border border-[#412D15] p-2 text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#2A1E11] transition-colors"
                  aria-label="Close project modal"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/50">
                  Overview & Problem Solved
                </h4>
                <p className="text-sm sm:text-base text-[#E1DCC9]/85 leading-relaxed">
                  {activeProject.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/50">
                  Core Architectural Capabilities
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#E1DCC9]/80">
                  {activeProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#E1DCC9] font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture & Tech Stack */}
              {activeProject.architectureNotes && (
                <div className="p-4 rounded-lg border border-[#412D15] bg-black/50 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/60">
                    System Architecture
                  </h4>
                  <div className="text-xs text-[#E1DCC9]/90 font-mono leading-relaxed whitespace-pre-line">
                    {activeProject.architectureNotes}
                  </div>
                </div>
              )}

              {/* Tech Stack Metadata */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/50">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#E1DCC9]">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-black/60 border border-[#412D15]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#412D15] gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#412D15] border border-[#E1DCC9]/40 text-xs font-semibold text-[#E1DCC9] hover:bg-[#573d1e] hover:border-[#E1DCC9] transition-all shadow-md"
                    >
                      <span>Open Live Application</span>
                      <span className="text-xs">↗</span>
                    </a>
                  )}

                  {activeProject.githubUrl && activeProject.githubUrl !== activeProject.liveUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#412D15] bg-black text-xs font-semibold text-[#E1DCC9]/80 hover:text-[#E1DCC9] hover:bg-[#2A1E11] transition-colors"
                    >
                      <span>View Repository</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 text-xs font-medium text-[#E1DCC9]/70 hover:text-[#E1DCC9]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
