import React from 'react';
import { ProjectItem } from '../data/portfolioData';
import { deviceAssetUrl } from '../data/devicesData';
import decSystemImg from '../assets/images/projects/dec-system.png';
import wifiHeatmapImg from '../assets/images/projects/wifi-heatmap.png';
import decstudiohubImg from '../assets/images/projects/decstudiohub.png';

export const projectImageMap: Record<string, string> = {
  'dec-system': decSystemImg,
  'proj-dec-system': decSystemImg,
  'wifi-hitmap': wifiHeatmapImg,
  'proj-wifi-hitmap': wifiHeatmapImg,
  'decstudiohub-suite': decstudiohubImg,
  'proj-decstudiohub-suite': decstudiohubImg,
  'roving-its-automation': deviceAssetUrl('/assets/aistudio/power_automate_flow_optimized_afb0b287.webp'),
  'proj-roving-its-automation': deviceAssetUrl('/assets/aistudio/power_automate_flow_optimized_afb0b287.webp'),
  'roving-its-email-automation': deviceAssetUrl('/assets/aistudio/improved_workflow_diagram_d620cf79.webp'),
  'proj-roving-its-email-automation': deviceAssetUrl('/assets/aistudio/improved_workflow_diagram_d620cf79.webp'),
};

export const getProjectPreviewImage = (project: { id?: string; imageTheme?: string; imageUrl?: string }): string => {
  if (project.imageUrl && typeof project.imageUrl === 'string' && project.imageUrl.length > 0) {
    return project.imageUrl;
  }
  if (project.imageTheme && projectImageMap[project.imageTheme]) {
    return projectImageMap[project.imageTheme];
  }
  if (project.id && projectImageMap[project.id]) {
    return projectImageMap[project.id];
  }
  return project.imageUrl || '';
};

interface ProjectCardProps {
  project: ProjectItem;
  onViewDetails: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  // Render a clean, stylized technical preview graphic for each project
  const renderPreviewGraphic = (theme: string) => {
    switch (theme) {
      case 'dec-system':
        return (
          <div className="w-full h-full bg-[#0C0905] relative overflow-hidden flex flex-col justify-between font-mono text-[9px] text-[#E1DCC9]/80 select-none">
            {/* Production System Screenshot with UI Blend - 4:3 Aspect Presentation */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={getProjectPreviewImage(project) || decSystemImg}
                alt="DEC — Digital Efficiency & Continuity System"
                className="w-full h-full object-cover object-top scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.06] opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== decSystemImg) {
                    target.src = decSystemImg;
                  }
                }}
              />

              {/* Edge Scrim Vignette: blends the bright white UI panels into the dark coffee theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F150C] via-[#1F150C]/20 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50 pointer-events-none" />

              {/* Subtle Warm Amber Tone Harmonizer */}
              <div className="absolute inset-0 bg-[#412D15]/20 mix-blend-color pointer-events-none" />

              {/* Technical CAD scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[size:100%_4px] opacity-35 pointer-events-none" />
            </div>

            {/* Top HUD Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between p-2 border-b border-[#412D15]/70 bg-[#0E0905]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                <span className="text-[9px] font-bold text-[#E1DCC9] tracking-wider uppercase font-mono">
                  DEC SYSTEM v2.1.3
                </span>
              </div>
              <span className="text-[8px] text-amber-300 bg-amber-950/70 px-1.5 py-0.5 rounded border border-amber-700/50 font-mono tracking-wide">
                PRINCE RETAIL BCP
              </span>
            </div>

            {/* Center Viewfinder / Corner Reticles */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-2 pointer-events-none">
              <div className="w-full h-full rounded border border-[#E1DCC9]/15 flex items-center justify-between p-1.5 relative">
                {/* Corner crosshairs */}
                <span className="absolute -top-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -top-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>

                {/* Floating Module Badge */}
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[7.5px] sm:text-[8px] text-amber-300 font-mono flex items-center gap-1 shadow-md">
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  <span>PCOUNT W2W · SHELFTAG · PP TAG</span>
                </div>

                {/* Floating Efficiency Pill */}
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[7.5px] sm:text-[8px] text-[#E1DCC9] font-mono flex items-center gap-1 shadow-md">
                  <span className="text-emerald-400 font-bold">1–4 DAYS ➔ 5 MINS</span>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-10 px-2.5 py-1 border-t border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm flex items-center justify-between text-[8px] text-[#E1DCC9]/70 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-[#E1DCC9]/50">ENGINE:</span>
                <span className="text-emerald-400 font-medium">9-TAG PACKING • ±0.1mm ACCURACY</span>
              </span>
              <span className="text-amber-400 font-medium">OFFLINE READY</span>
            </div>
          </div>
        );
      case 'wifi-hitmap':
        return (
          <div className="w-full h-full bg-[#0C0804] relative overflow-hidden flex flex-col justify-between font-mono text-[9px] text-[#E1DCC9]/80 select-none">
            {/* Production System Screenshot with UI Blend - 4:3 Aspect Presentation */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={getProjectPreviewImage(project) || wifiHeatmapImg}
                alt="WiFi Signal Mapping & Network Infrastructure System"
                className="w-full h-full object-cover object-top scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.06] opacity-88 group-hover:opacity-100"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== wifiHeatmapImg) {
                    target.src = wifiHeatmapImg;
                  }
                }}
              />

              {/* Edge Scrim Vignette: blends the bright panels into the dark coffee theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F150C] via-[#1F150C]/20 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/55 pointer-events-none" />

              {/* Subtle Warm Tone Harmonizer */}
              <div className="absolute inset-0 bg-[#412D15]/20 mix-blend-color pointer-events-none" />

              {/* Technical CAD scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[size:100%_4px] opacity-35 pointer-events-none" />
            </div>

            {/* Top HUD Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between p-2 border-b border-[#412D15]/70 bg-[#0E0905]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                <span className="text-[9px] font-bold text-[#E1DCC9] tracking-wider uppercase font-mono">
                  WIFI HEATMAP v1.0.5
                </span>
              </div>
              <span className="text-[8px] text-cyan-300 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-700/50 font-mono tracking-wide">
                BR-408 FLAGSHIP
              </span>
            </div>

            {/* Center Viewfinder / Corner Reticles */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-2 pointer-events-none">
              <div className="w-full h-full rounded border border-[#E1DCC9]/15 flex items-center justify-between p-1.5 relative">
                {/* Corner crosshairs */}
                <span className="absolute -top-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -top-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>

                {/* Floating Node Badge */}
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[7.5px] sm:text-[8px] text-emerald-400 font-mono flex items-center gap-1 shadow-md">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span>MDF-01 ➔ 4 AP NODES</span>
                </div>

                {/* Floating Coverage Pill */}
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[7.5px] sm:text-[8px] text-[#E1DCC9] font-mono flex items-center gap-1 shadow-md">
                  <span className="text-amber-400 font-bold">2.4/5GHz</span>
                  <span className="text-[#E1DCC9]/60">COVERAGE</span>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-10 px-2.5 py-1 border-t border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm flex items-center justify-between text-[8px] text-[#E1DCC9]/70 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-[#E1DCC9]/50">SURVEY:</span>
                <span className="text-emerald-400 font-medium">INTERACTIVE FLOOR PLAN</span>
              </span>
              <span className="text-cyan-400 font-medium">LIVE AUDIT</span>
            </div>
          </div>
        );
      case 'decstudiohub-suite':
        return (
          <div className="w-full h-full bg-[#0C0905] relative overflow-hidden flex flex-col justify-between font-mono text-[9px] text-[#E1DCC9]/80 select-none">
            {/* Production System Screenshot with UI Blend - 4:3 Aspect Presentation */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={getProjectPreviewImage(project) || decstudiohubImg}
                alt="DECStudioHub — Offline Digital Utility Suite"
                className="w-full h-full object-cover object-top scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.06] opacity-88 group-hover:opacity-100"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== decstudiohubImg) {
                    target.src = decstudiohubImg;
                  }
                }}
              />

              {/* Edge Scrim Vignette: blends the screenshot into the dark coffee theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F150C] via-[#1F150C]/20 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/55 pointer-events-none" />

              {/* Subtle Warm Amber Tone Harmonizer */}
              <div className="absolute inset-0 bg-[#412D15]/20 mix-blend-color pointer-events-none" />

              {/* Technical CAD scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[size:100%_4px] opacity-35 pointer-events-none" />
            </div>

            {/* Top HUD Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between p-2 border-b border-[#412D15]/70 bg-[#0E0905]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_6px_#a3e635]" />
                <span className="text-[9px] font-bold text-[#E1DCC9] tracking-wider uppercase font-mono">
                  DECSTUDIOHUB v1.0.0
                </span>
              </div>
              <span className="text-[8px] text-lime-300 bg-lime-950/70 px-1.5 py-0.5 rounded border border-lime-700/50 font-mono tracking-wide">
                100% CLIENT-SIDE
              </span>
            </div>

            {/* Center Viewfinder / Corner Reticles */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-2 pointer-events-none">
              <div className="w-full h-full rounded border border-[#E1DCC9]/15 flex items-center justify-between p-1.5 relative">
                {/* Corner crosshairs */}
                <span className="absolute -top-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -top-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>

                {/* Floating Tools Count Badge */}
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[7.5px] sm:text-[8px] text-lime-300 font-mono flex items-center gap-1 shadow-md">
                  <span className="w-1 h-1 rounded-full bg-lime-400" />
                  <span>15 IMAGE TOOLS · 52+ ENGINES</span>
                </div>

                {/* Floating Privacy Pill */}
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#412D15] text-[7.5px] sm:text-[8px] text-[#E1DCC9] font-mono flex items-center gap-1 shadow-md">
                  <span className="text-emerald-400 font-bold">0 KB</span>
                  <span className="text-[#E1DCC9]/60">DATA EGRESS</span>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-10 px-2.5 py-1 border-t border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm flex items-center justify-between text-[8px] text-[#E1DCC9]/70 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-[#E1DCC9]/50">ENGINE:</span>
                <span className="text-lime-300 font-medium">CANVAS API • NETWORKING • SOLAR</span>
              </span>
              <span className="text-emerald-400 font-medium">ZERO ADS</span>
            </div>
          </div>
        );
      case 'roving-its-automation':
        return (
          <div className="w-full h-full bg-[#0C0806] relative overflow-hidden flex flex-col justify-between font-mono text-[9px] text-[#E1DCC9]/80 select-none">
            {/* Ambient Background & CAD Scanlines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,100,167,0.2)_0%,rgba(12,8,6,0.95)_75%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_4px] opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(225,220,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(225,220,201,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

            {/* Top HUD Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between p-2 border-b border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                <span className="text-[9px] font-bold text-[#E1DCC9] tracking-wider uppercase font-mono">
                  M365 CLOUD FLOW v2.4
                </span>
              </div>
              <span className="text-[8px] text-purple-300 bg-purple-950/70 px-1.5 py-0.5 rounded border border-purple-700/50 font-mono tracking-wide">
                POWER AUTOMATE
              </span>
            </div>

            {/* Center Flow Motion Mini-Canvas */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-2.5">
              <div className="w-full h-full rounded border border-[#E1DCC9]/15 flex flex-col justify-between p-2 relative bg-black/40">
                {/* Corner crosshairs */}
                <span className="absolute -top-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -top-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>

                {/* Animated Horizontal Pipeline Diagram */}
                <div className="grid grid-cols-4 gap-1.5 items-center my-auto">
                  {/* Step 1: Forms */}
                  <div className="p-1 rounded bg-[#008272]/20 border border-[#008272]/60 text-center">
                    <span className="text-[7.5px] font-bold text-teal-300 block truncate">FORMS</span>
                    <span className="text-[6.5px] text-[#E1DCC9]/60 block truncate">Checklist</span>
                  </div>
                  {/* Step 2: Lists */}
                  <div className="p-1 rounded bg-[#038387]/20 border border-[#038387]/60 text-center">
                    <span className="text-[7.5px] font-bold text-cyan-300 block truncate">LISTS</span>
                    <span className="text-[6.5px] text-[#E1DCC9]/60 block truncate">Master DB</span>
                  </div>
                  {/* Step 3: Automate */}
                  <div className="p-1 rounded bg-[#742774]/20 border border-[#818CF8]/60 text-center">
                    <span className="text-[7.5px] font-bold text-indigo-300 block truncate">AUTOMATE</span>
                    <span className="text-[6.5px] text-[#E1DCC9]/60 block truncate">Logic Flow</span>
                  </div>
                  {/* Step 4: Teams */}
                  <div className="p-1 rounded bg-[#464EB8]/20 border border-[#6264A7] text-center shadow-[0_0_8px_rgba(98,100,167,0.3)]">
                    <span className="text-[7.5px] font-bold text-purple-200 block truncate">TEAMS</span>
                    <span className="text-[6.5px] text-emerald-400 block truncate">Broadcast</span>
                  </div>
                </div>

                {/* Animated SVG Flowing Line */}
                <div className="w-full h-3 my-0.5">
                  <svg viewBox="0 0 200 12" className="w-full h-full overflow-visible">
                    <path
                      d="M 10 6 L 190 6"
                      stroke="#412D15"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    <circle r="3" fill="#10B981">
                      <animate
                        attributeName="cx"
                        values="10;190"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>

                {/* Floating Telemetry Tags */}
                <div className="flex items-center justify-between text-[7.5px] font-mono text-[#E1DCC9]/70 pt-0.5 border-t border-[#412D15]/40">
                  <span className="flex items-center gap-1 text-amber-300">
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    TRIGGER: ITEM CREATED
                  </span>
                  <span className="text-emerald-400 font-bold">100% AUTOMATED</span>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-10 px-2.5 py-1 border-t border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm flex items-center justify-between text-[8px] text-[#E1DCC9]/70 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-[#E1DCC9]/50">ENGINE:</span>
                <span className="text-purple-300 font-medium">DURATION CALC • @MENTION • TEAMS</span>
              </span>
              <span className="text-emerald-400 font-medium">ACTIVE</span>
            </div>
          </div>
        );
      case 'roving-its-email-automation':
        return (
          <div className="w-full h-full bg-[#0C0806] relative overflow-hidden flex flex-col justify-between font-mono text-[9px] text-[#E1DCC9]/80 select-none">
            {/* Ambient Background & CAD Scanlines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,120,212,0.22)_0%,rgba(12,8,6,0.95)_75%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_4px] opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(225,220,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(225,220,201,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

            {/* Top HUD Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between p-2 border-b border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                <span className="text-[9px] font-bold text-[#E1DCC9] tracking-wider uppercase font-mono">
                  M365 CLOUD FLOW v2.5
                </span>
              </div>
              <span className="text-[8px] text-sky-300 bg-sky-950/70 px-1.5 py-0.5 rounded border border-sky-700/50 font-mono tracking-wide">
                MICROSOFT OUTLOOK
              </span>
            </div>

            {/* Center Flow Motion Mini-Canvas */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-2.5">
              <div className="w-full h-full rounded border border-[#E1DCC9]/15 flex flex-col justify-between p-2 relative bg-black/40">
                {/* Corner crosshairs */}
                <span className="absolute -top-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -top-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -left-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>
                <span className="absolute -bottom-1 -right-1 text-[7px] text-[#E1DCC9]/40 font-mono">+</span>

                {/* Animated Horizontal Pipeline Diagram */}
                <div className="grid grid-cols-4 gap-1.5 items-center my-auto">
                  {/* Step 1: Forms */}
                  <div className="p-1 rounded bg-[#008272]/20 border border-[#008272]/60 text-center">
                    <span className="text-[7.5px] font-bold text-teal-300 block truncate">FORMS</span>
                    <span className="text-[6.5px] text-[#E1DCC9]/60 block truncate">Checklist</span>
                  </div>
                  {/* Step 2: Lists */}
                  <div className="p-1 rounded bg-[#038387]/20 border border-[#038387]/60 text-center">
                    <span className="text-[7.5px] font-bold text-cyan-300 block truncate">LISTS</span>
                    <span className="text-[6.5px] text-[#E1DCC9]/60 block truncate">Master DB</span>
                  </div>
                  {/* Step 3: Automate */}
                  <div className="p-1 rounded bg-[#742774]/20 border border-[#818CF8]/60 text-center">
                    <span className="text-[7.5px] font-bold text-indigo-300 block truncate">AUTOMATE</span>
                    <span className="text-[6.5px] text-[#E1DCC9]/60 block truncate">Duration &amp; Logic</span>
                  </div>
                  {/* Step 4: Outlook */}
                  <div className="p-1 rounded bg-[#0078D4]/25 border border-[#0078D4] text-center shadow-[0_0_8px_rgba(0,120,212,0.4)]">
                    <span className="text-[7.5px] font-bold text-sky-200 block truncate">OUTLOOK</span>
                    <span className="text-[6.5px] text-emerald-400 block truncate">Email Report</span>
                  </div>
                </div>

                {/* Animated SVG Flowing Line */}
                <div className="w-full h-3 my-0.5">
                  <svg viewBox="0 0 200 12" className="w-full h-full overflow-visible">
                    <path
                      d="M 10 6 L 190 6"
                      stroke="#412D15"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    <circle r="3" fill="#0078D4">
                      <animate
                        attributeName="cx"
                        values="10;190"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>

                {/* Floating Telemetry Tags */}
                <div className="flex items-center justify-between text-[7.5px] font-mono text-[#E1DCC9]/70 pt-0.5 border-t border-[#412D15]/40">
                  <span className="flex items-center gap-1 text-sky-300">
                    <span className="w-1 h-1 rounded-full bg-sky-400" />
                    TARGET: ITS &amp; STAKEHOLDERS
                  </span>
                  <span className="text-emerald-400 font-bold">100% AUTOMATED</span>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-10 px-2.5 py-1 border-t border-[#412D15]/70 bg-[#0E0905]/85 backdrop-blur-sm flex items-center justify-between text-[8px] text-[#E1DCC9]/70 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-[#E1DCC9]/50">ENGINE:</span>
                <span className="text-sky-300 font-medium">DURATION • CONDITION • OUTLOOK V2</span>
              </span>
              <span className="text-emerald-400 font-medium">ACTIVE</span>
            </div>
          </div>
        );
      case 'it-support':
        return (
          <div className="w-full h-full bg-[#150E07] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-[#E1DCC9]/70 select-none">
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-2">
              <span className="flex items-center gap-1.5 text-[#E1DCC9]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                ASSET_HEALTH_DAEMON
              </span>
              <span className="text-[#E1DCC9]/40">PORT: 8080</span>
            </div>
            <div className="space-y-1.5 py-2">
              <div className="flex justify-between text-[#E1DCC9]/80">
                <span>LAN_DEVICES: 48 ONLINE</span>
                <span className="text-emerald-400">99.8% SLA</span>
              </div>
              <div className="w-full bg-[#1F150C] h-1.5 rounded overflow-hidden">
                <div className="bg-[#E1DCC9] h-full w-[88%]" />
              </div>
              <div className="flex justify-between text-[#E1DCC9]/50 text-[9px]">
                <span>PRINTER_SPOOLER: READY</span>
                <span>TICKETS: 0 PENDING</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#412D15]/40 flex items-center justify-between text-[9px] text-[#E1DCC9]/40">
              <span>SCANNER: USB/BT OK</span>
              <span>PING: 1.2ms</span>
            </div>
          </div>
        );
      case 'android-pos':
        return (
          <div className="w-full h-full bg-[#120D08] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-[#E1DCC9]/70 select-none">
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-2">
              <span className="flex items-center gap-1.5 text-[#E1DCC9]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                POS_CORE_SYNC.apk
              </span>
              <span className="text-[#E1DCC9]/40">SQLITE OFFLINE</span>
            </div>
            <div className="py-2 space-y-1">
              <div className="text-[11px] text-[#E1DCC9] font-bold">TX_QUEUE: 14 BATCHED</div>
              <div className="text-[9px] text-[#E1DCC9]/60">THERMAL_PRINT: ESC/POS DRIVER LOADED</div>
              <div className="text-[9px] text-emerald-400">AUTO_RECONCILE: STANDBY</div>
            </div>
            <div className="pt-2 border-t border-[#412D15]/40 flex items-center justify-between text-[9px] text-[#E1DCC9]/40">
              <span>SDK: 34 (Android 14)</span>
              <span>BT: PAIRED</span>
            </div>
          </div>
        );
      case 'automation':
        return (
          <div className="w-full h-full bg-[#0E0B07] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-[#E1DCC9]/70 select-none">
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-2">
              <span className="flex items-center gap-1.5 text-[#E1DCC9]">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                CRON_INTEGRITY_WATCH
              </span>
              <span className="text-[#E1DCC9]/40">PID: 4912</span>
            </div>
            <div className="space-y-1 py-1">
              <div className="text-[9px] text-[#E1DCC9]/70">SHA256: e3b0c44298fc1c14...</div>
              <div className="text-[9px] text-emerald-400">SNAPSHOT: ARCHIVED OK (2.4 GB)</div>
              <div className="text-[9px] text-[#E1DCC9]/50">WEBHOOK: DISPATCHED [200 OK]</div>
            </div>
            <div className="pt-2 border-t border-[#412D15]/40 flex items-center justify-between text-[9px] text-[#E1DCC9]/40">
              <span>FREQ: 00:00 UTC</span>
              <span>STATUS: NOMINAL</span>
            </div>
          </div>
        );
      case 'web-platform':
        return (
          <div className="w-full h-full bg-[#18110A] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-[#E1DCC9]/70 select-none">
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-2">
              <span className="flex items-center gap-1.5 text-[#E1DCC9]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                CLIENT_PORTAL_SPA
              </span>
              <span className="text-[#E1DCC9]/40">VITE + REACT</span>
            </div>
            <div className="space-y-1.5 py-1">
              <div className="h-2 w-2/3 bg-[#412D15] rounded" />
              <div className="h-2 w-full bg-[#1F150C] rounded" />
              <div className="flex gap-2 text-[9px] text-[#E1DCC9]/60">
                <span>LIGHTHOUSE: 98</span>
                <span>TTFB: 42ms</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#412D15]/40 flex items-center justify-between text-[9px] text-[#E1DCC9]/40">
              <span>SSR: HYBRID</span>
              <span>A11Y: WCAG AA</span>
            </div>
          </div>
        );
      case 'creative-studio':
        return (
          <div className="w-full h-full bg-[#160E08] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-[#E1DCC9]/70 select-none">
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-2">
              <span className="flex items-center gap-1.5 text-[#E1DCC9]">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                STUDIO_PIPELINE.node
              </span>
              <span className="text-[#E1DCC9]/40">1080p60</span>
            </div>
            <div className="space-y-1 py-1">
              <div className="text-[10px] text-[#E1DCC9]">RENDER_QUEUE: 3 EPISODES</div>
              <div className="text-[9px] text-[#E1DCC9]/60">BATCH_THUMBNAILS: 16:9 + 9:16</div>
              <div className="text-[9px] text-amber-300">PUBLISH_SYNC: READY</div>
            </div>
            <div className="pt-2 border-t border-[#412D15]/40 flex items-center justify-between text-[9px] text-[#E1DCC9]/40">
              <span>TAGS: AUTO_GENERATED</span>
              <span>SYNC: YT & TT</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-[#110C07] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-[#E1DCC9]/70 select-none">
            <div className="flex items-center justify-between border-b border-[#412D15]/60 pb-2">
              <span className="text-[#E1DCC9]">SYS_TOOLKIT</span>
              <span className="text-[#E1DCC9]/40">v2.1</span>
            </div>
            <div className="py-2 text-[9px] text-[#E1DCC9]/70">
              NETWORK_DIAGNOSTICS & PACKET_ANALYSIS
            </div>
            <div className="pt-2 border-t border-[#412D15]/40 text-[9px] text-[#E1DCC9]/40">
              STATUS: READY
            </div>
          </div>
        );
    }
  };

  return (
    <article
      className="group relative flex flex-col justify-between rounded-xl border border-[#412D15] bg-[#1F150C]/50 hover:bg-[#1F150C] transition-all duration-300 hover:-translate-y-1 hover:border-[#E1DCC9]/40 hover:shadow-xl overflow-hidden"
    >
      <div>
        {/* Preview Frame - 4:3 Aspect Ratio for maximum interface visibility */}
        <div
          className="relative aspect-[4/3] w-full border-b border-[#412D15] bg-[#0E0A06] overflow-hidden cursor-pointer flex flex-col"
          onClick={() => onViewDetails(project)}
        >
          {/* Card Top Header: Displays Category and Status cleanly without overlapping preview content */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#170F09]/95 border-b border-[#412D15]/70 z-10 shrink-0">
            {/* Category indicator */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1F150C] border border-[#412D15] text-[9px] font-mono text-[#E1DCC9]/90 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1DCC9]/50" />
              {project.category}
            </span>

            {/* Status indicator */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 border border-[#412D15] text-[9px] font-mono text-[#E1DCC9]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span>{project.status}</span>
            </span>
          </div>

          {/* Technical Graphic Preview (Unobstructed, full visibility in 4:3) */}
          <div className="w-full flex-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            {renderPreviewGraphic(project.imageTheme)}
          </div>
        </div>

        {/* Content Body - refined font sizing for compact scannability */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <h3
            onClick={() => onViewDetails(project)}
            className="font-heading text-[15px] sm:text-base font-bold text-[#E1DCC9] cursor-pointer hover:text-white transition-colors leading-snug"
          >
            {project.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#E1DCC9]/70 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Zero-Pill Tech Stack Metadata per Constitution */}
          <div className="pt-1">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-[10.5px] font-mono text-[#E1DCC9]/60">
              {project.techStack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="hover:text-[#E1DCC9] transition-colors">{tech}</span>
                  {idx < project.techStack.length - 1 && (
                    <span className="text-[#412D15]" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0 mt-1 flex flex-wrap items-center justify-between border-t border-[#412D15]/40 pt-3 gap-2">
        <button
          onClick={() => onViewDetails(project)}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#E1DCC9] hover:underline decoration-1 underline-offset-4"
        >
          <span>View Details</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live app for ${project.title}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#412D15] hover:bg-[#573d1e] text-[10.5px] font-medium text-[#E1DCC9] border border-[#E1DCC9]/30 transition-all shadow-sm"
            >
              <span>Live System</span>
              <span className="text-[9px]">↗</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-1 text-[10.5px] font-mono text-[#E1DCC9]/70 hover:text-[#E1DCC9] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
