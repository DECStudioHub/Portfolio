import React, { useState, useId } from 'react';
import {
  GitBranch,
  Github,
  Code2,
  Sparkles,
  Bot,
  Terminal,
  Rocket,
  FileText,
  Server,
  Database,
  Triangle,
  Zap,
  Flame,
  LayoutGrid,
  Activity,
  CheckCircle2,
  Cpu,
  Wrench,
  Network,
  Wifi,
  HardDrive,
  ShieldCheck,
  TerminalSquare,
  Video,
  Film,
  Camera,
  Palette,
  Headphones,
  Music,
  Volume2,
  Clapperboard,
  Webhook,
  Cable,
  Workflow,
  Cog,
  Binary,
  Globe,
  Layout,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { PortfolioConfig } from '../data/portfolioData';

export interface SkillCategoryIntegrationsProps {
  categoryTitle: string;
  categoryDescription?: string;
  skills: PortfolioConfig['skills'][0]['skills'];
}

interface ToolNode {
  id: string;
  name: string;
  level: string;
  experience: string;
  categoryTag: string;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
}

export const SkillCategoryIntegrations: React.FC<SkillCategoryIntegrationsProps> = ({
  categoryTitle,
  categoryDescription,
  skills,
}) => {
  const componentId = useId().replace(/:/g, '');
  const [activeToolId, setActiveToolId] = useState<string>('');
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

  // Center hub coordinates
  const cx = 480;
  const cy = 300;

  // Metadata mapper for all tools across all 5 skill categories
  const getToolMetadata = (name: string, catTitle: string) => {
    switch (name) {
      // --- Category 1: Development Tool ---
      case 'Git & Version Control':
        return {
          id: 'git',
          tag: 'workflow',
          color: '#F97316',
          glowColor: 'rgba(249, 115, 22, 0.45)',
          icon: <GitBranch className="w-4 h-4 text-orange-400" />,
        };
      case 'GitHub':
        return {
          id: 'github',
          tag: 'workflow',
          color: '#E1DCC9',
          glowColor: 'rgba(225, 220, 201, 0.35)',
          icon: <Github className="w-4 h-4 text-[#E1DCC9]" />,
        };
      case 'VS Code':
        return {
          id: 'vscode',
          tag: 'editor',
          color: '#38BDF8',
          glowColor: 'rgba(56, 189, 248, 0.45)',
          icon: <Code2 className="w-4 h-4 text-sky-400" />,
        };
      case 'Codex':
        return {
          id: 'codex',
          tag: 'ai-code',
          color: '#10B981',
          glowColor: 'rgba(16, 185, 129, 0.45)',
          icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        };
      case 'Claude Code':
        return {
          id: 'claude-code',
          tag: 'ai-code',
          color: '#D97706',
          glowColor: 'rgba(217, 119, 6, 0.45)',
          icon: <Bot className="w-4 h-4 text-amber-500" />,
        };
      case 'Open Code':
        return {
          id: 'open-code',
          tag: 'ai-code',
          color: '#14B8A6',
          glowColor: 'rgba(20, 184, 166, 0.45)',
          icon: <Terminal className="w-4 h-4 text-teal-400" />,
        };
      case 'Antigravity':
        return {
          id: 'antigravity',
          tag: 'ai-code',
          color: '#818CF8',
          glowColor: 'rgba(129, 140, 248, 0.45)',
          icon: <Rocket className="w-4 h-4 text-indigo-400" />,
        };
      case 'Notion':
        return {
          id: 'notion',
          tag: 'productivity',
          color: '#E1DCC9',
          glowColor: 'rgba(225, 220, 201, 0.35)',
          icon: <FileText className="w-4 h-4 text-[#E1DCC9]" />,
        };
      case 'Node JS':
        return {
          id: 'nodejs',
          tag: 'runtime',
          color: '#84CC16',
          glowColor: 'rgba(132, 204, 22, 0.45)',
          icon: <Server className="w-4 h-4 text-lime-400" />,
        };
      case 'MySQL':
        return {
          id: 'mysql',
          tag: 'database',
          color: '#06B6D4',
          glowColor: 'rgba(6, 182, 212, 0.45)',
          icon: <Database className="w-4 h-4 text-cyan-400" />,
        };
      case 'Vercel':
        return {
          id: 'vercel',
          tag: 'cloud-deploy',
          color: '#FFFFFF',
          glowColor: 'rgba(255, 255, 255, 0.45)',
          icon: <Triangle className="w-3.5 h-3.5 text-white fill-current" />,
        };
      case 'Supabase':
        return {
          id: 'supabase',
          tag: 'backend',
          color: '#34D399',
          glowColor: 'rgba(52, 211, 153, 0.45)',
          icon: <Zap className="w-4 h-4 text-emerald-400" />,
        };
      case 'Firebase':
        return {
          id: 'firebase',
          tag: 'backend',
          color: '#F59E0B',
          glowColor: 'rgba(245, 158, 11, 0.45)',
          icon: <Flame className="w-4 h-4 text-amber-400" />,
        };
      case 'Microsoft 365 & Tools':
        return {
          id: 'm365',
          tag: 'productivity',
          color: '#60A5FA',
          glowColor: 'rgba(96, 165, 250, 0.45)',
          icon: <LayoutGrid className="w-4 h-4 text-blue-400" />,
        };

      // --- Category 2: IT Support & Operations ---
      case 'Hardware Troubleshooting':
        return {
          id: 'hw-troubleshoot',
          tag: 'diagnostics',
          color: '#F59E0B',
          glowColor: 'rgba(245, 158, 11, 0.45)',
          icon: <Cpu className="w-4 h-4 text-amber-400" />,
        };
      case 'Software Troubleshooting':
        return {
          id: 'sw-troubleshoot',
          tag: 'systems',
          color: '#38BDF8',
          glowColor: 'rgba(56, 189, 248, 0.45)',
          icon: <TerminalSquare className="w-4 h-4 text-sky-400" />,
        };
      case 'Network Troubleshooting':
        return {
          id: 'net-troubleshoot',
          tag: 'infrastructure',
          color: '#10B981',
          glowColor: 'rgba(16, 185, 129, 0.45)',
          icon: <Network className="w-4 h-4 text-emerald-400" />,
        };

      // --- Category 3: Multimedia ---
      case 'Video Editing':
        return {
          id: 'video-editing',
          tag: 'motion-video',
          color: '#F43F5E',
          glowColor: 'rgba(244, 63, 94, 0.45)',
          icon: <Clapperboard className="w-4 h-4 text-rose-400" />,
        };
      case 'Photo Editing':
        return {
          id: 'photo-editing',
          tag: 'visual-design',
          color: '#A855F7',
          glowColor: 'rgba(168, 85, 247, 0.45)',
          icon: <Palette className="w-4 h-4 text-purple-400" />,
        };
      case 'Audio Editing':
        return {
          id: 'audio-editing',
          tag: 'sound-design',
          color: '#06B6D4',
          glowColor: 'rgba(6, 182, 212, 0.45)',
          icon: <Headphones className="w-4 h-4 text-cyan-400" />,
        };

      // --- Category 4: Software Engineering ---
      case 'API Integration':
        return {
          id: 'api-integration',
          tag: 'protocols',
          color: '#38BDF8',
          glowColor: 'rgba(56, 189, 248, 0.45)',
          icon: <Webhook className="w-4 h-4 text-sky-400" />,
        };
      case 'Database Management':
        return {
          id: 'db-management',
          tag: 'data-tier',
          color: '#10B981',
          glowColor: 'rgba(16, 185, 129, 0.45)',
          icon: <Database className="w-4 h-4 text-emerald-400" />,
        };
      case 'Automation & Scripting':
        return {
          id: 'automation-scripting',
          tag: 'pipeline',
          color: '#F59E0B',
          glowColor: 'rgba(245, 158, 11, 0.45)',
          icon: <Workflow className="w-4 h-4 text-amber-400" />,
        };

      // --- Category 5: VIBE Coding ---
      case 'Website Application':
      case 'Web Appl Front End & Back End':
        return {
          id: 'vibe-webapp',
          tag: 'web-app',
          color: '#10B981',
          glowColor: 'rgba(16, 185, 129, 0.45)',
          icon: <Globe className="w-4 h-4 text-emerald-400" />,
        };
      case 'Website Development':
      case 'Website Developement':
      case 'Website Design':
        return {
          id: 'vibe-webdev',
          tag: 'web-dev',
          color: '#A855F7',
          glowColor: 'rgba(168, 85, 247, 0.45)',
          icon: <Layout className="w-4 h-4 text-purple-400" />,
        };
      case 'Android Development':
      case 'Android App Front End & Back End':
        return {
          id: 'vibe-android',
          tag: 'android-os',
          color: '#38BDF8',
          glowColor: 'rgba(56, 189, 248, 0.45)',
          icon: <Smartphone className="w-4 h-4 text-sky-400" />,
        };
      case 'FullStack System':
      case 'Full Stack System':
      case 'System Front End & Back End':
        return {
          id: 'vibe-system',
          tag: 'fullstack',
          color: '#F59E0B',
          glowColor: 'rgba(245, 158, 11, 0.45)',
          icon: <Binary className="w-4 h-4 text-amber-400" />,
        };

      default:
        return {
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          tag: catTitle.toLowerCase().slice(0, 10),
          color: '#E1DCC9',
          glowColor: 'rgba(225, 220, 201, 0.35)',
          icon: <Code2 className="w-4 h-4 text-amber-400" />,
        };
    }
  };

  // Center Hub branding configuration based on Category
  const getHubBranding = () => {
    switch (categoryTitle) {
      case 'IT Support & Operations':
        return {
          headerTag: 'SYSTEM INFRA',
          nodeCountTag: '3 NODES',
          title: 'IT Support & Ops',
          subTitle: 'Enterprise Reliability',
          statusText: 'DATA PULSE: STREAMING (700ms)',
          accentColor: '#06B6D4',
          accentGlow: 'rgba(6, 182, 212, 0.25)',
          icon: (
            <path
              d="M14 5 L22 8.5 L22 17.5 C22 22 14 26 14 26 C14 26 6 22 6 17.5 L6 8.5 Z"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          ),
        };
      case 'Multimedia':
        return {
          headerTag: 'STUDIO MEDIA',
          nodeCountTag: '3 NODES',
          title: 'Multimedia Studio',
          subTitle: 'Creative Production',
          statusText: 'DATA PULSE: STREAMING (700ms)',
          accentColor: '#F43F5E',
          accentGlow: 'rgba(244, 63, 94, 0.25)',
          icon: (
            <path
              d="M7 6 L21 6 C22 6 23 7 23 8 L23 20 C23 21 22 22 21 22 L7 22 C6 22 5 21 5 20 L5 8 C5 7 6 6 7 6 Z M11 11 L18 14 L11 17 Z"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          ),
        };
      case 'Software Engineering':
        return {
          headerTag: 'SYS ARCHITECTURE',
          nodeCountTag: '3 NODES',
          title: 'Software Engine',
          subTitle: 'APIs, Data & Logic',
          statusText: 'DATA PULSE: STREAMING (700ms)',
          accentColor: '#818CF8',
          accentGlow: 'rgba(129, 140, 248, 0.25)',
          icon: (
            <path
              d="M14 6 L22 10.5 L22 21.5 L14 26 L6 21.5 L6 10.5 Z M14 6 L14 26 M6 10.5 L22 21.5"
              fill="none"
              stroke="#818CF8"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          ),
        };
      case 'VIBE Coding':
        return {
          headerTag: 'AI NO-CODE',
          nodeCountTag: '4 NODES',
          title: 'VIBE Coding Hub',
          subTitle: 'Rapid Web & Android',
          statusText: 'DATA PULSE: STREAMING (700ms)',
          accentColor: '#10B981',
          accentGlow: 'rgba(16, 185, 129, 0.25)',
          icon: (
            <path
              d="M14 5 L17 12 L24 14 L17 16 L14 23 L11 16 L4 14 L11 12 Z"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          ),
        };
      case 'Development Tool':
      default:
        return {
          headerTag: 'CORE ENGINE',
          nodeCountTag: `${skills.length} NODES`,
          title: 'Development Tool',
          subTitle: 'Active Integrations',
          statusText: 'DATA PULSE: STREAMING (700ms)',
          accentColor: '#D97706',
          accentGlow: 'rgba(217, 119, 6, 0.25)',
          icon: (
            <path
              d="M14 6 L22 10.5 L22 21.5 L14 26 L6 21.5 L6 10.5 Z"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          ),
        };
    }
  };

  const hubBranding = getHubBranding();

  // Dynamic Layout Calculation based on number of skills
  const is14Nodes = skills.length >= 10;
  const is3Nodes = skills.length === 3;
  const is4Nodes = skills.length === 4;

  const innerRingRadius = 175;
  const outerRingRx = 365;
  const outerRingRy = 230;

  const innerToolsList = [
    'VS Code',
    'Git & Version Control',
    'GitHub',
    'Node JS',
    'MySQL',
    'Vercel',
  ];

  const outerToolsList = [
    'Codex',
    'Claude Code',
    'Open Code',
    'Antigravity',
    'Supabase',
    'Firebase',
    'Notion',
    'Microsoft 365 & Tools',
  ];

  const toolNodes: ToolNode[] = skills.map((skill, idx) => {
    const meta = getToolMetadata(skill.name, categoryTitle);
    let x = cx;
    let y = cy;

    if (is14Nodes) {
      const innerIndex = innerToolsList.indexOf(skill.name);
      const outerIndex = outerToolsList.indexOf(skill.name);

      if (innerIndex !== -1) {
        const angle = -Math.PI / 2 + (innerIndex * 2 * Math.PI) / 6;
        x = Math.round(cx + innerRingRadius * Math.cos(angle));
        y = Math.round(cy + innerRingRadius * Math.sin(angle));
      } else if (outerIndex !== -1) {
        const angle = -Math.PI / 2 - Math.PI / 8 + (outerIndex * 2 * Math.PI) / 8;
        x = Math.round(cx + outerRingRx * Math.cos(angle));
        y = Math.round(cy + outerRingRy * Math.sin(angle));
      } else {
        const angle = (idx * 2 * Math.PI) / skills.length;
        x = Math.round(cx + 280 * Math.cos(angle));
        y = Math.round(cy + 190 * Math.sin(angle));
      }
    } else if (is3Nodes) {
      // 3 Nodes: Top, Bottom-Right, Bottom-Left
      if (idx === 0) {
        x = cx;
        y = cy - 170; // 130
      } else if (idx === 1) {
        x = cx + 270; // 750
        y = cy + 105; // 405
      } else {
        x = cx - 270; // 210
        y = cy + 105; // 405
      }
    } else if (is4Nodes) {
      // 4 Nodes: 4 balanced quadrants
      if (idx === 0) {
        x = cx - 265; // 215 Top-Left: #1 Website Application
        y = cy - 110; // 190
      } else if (idx === 1) {
        x = cx + 265; // 745 Top-Right: #2 Website Development
        y = cy - 110; // 190
      } else if (idx === 2) {
        x = cx - 265; // 215 Bottom-Left: #3 Android Development
        y = cy + 110; // 410
      } else {
        x = cx + 265; // 745 Bottom-Right: #4 FullStack System
        y = cy + 110; // 410
      }
    } else {
      // General radial distribution for any custom count
      const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / skills.length;
      x = Math.round(cx + 280 * Math.cos(angle));
      y = Math.round(cy + 175 * Math.sin(angle));
    }

    return {
      id: meta.id,
      name: skill.name,
      level: skill.level,
      experience: skill.experience,
      categoryTag: meta.tag,
      x,
      y,
      color: meta.color,
      glowColor: meta.glowColor,
      icon: meta.icon,
    };
  });

  // Current inspected tool (defaults to first tool)
  const currentInspectedTool =
    toolNodes.find((t) => t.id === (hoveredToolId || activeToolId)) || toolNodes[0];

  // Tile dimensions: wider for 3 & 4 nodes so full labels fit with great elegance
  const tileW = is14Nodes ? 100 : 170;
  const tileH = is14Nodes ? 50 : 58;

  return (
    <div className="space-y-6">
      {/* Top Banner & Context Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#412D15]/40 pb-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#E1DCC9]/90">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: hubBranding.accentColor,
              boxShadow: `0 0 6px ${hubBranding.accentColor}`,
            }}
          />
          <span className="font-semibold text-emerald-300">
            {categoryTitle.toUpperCase()} INTEGRATION HUB
          </span>
          <span className="text-[#E1DCC9]/40">•</span>
          <span className="text-[#E1DCC9]/70">Centralized Workflow & Continuous Data Stream</span>
        </div>
        <div className="flex items-center gap-2 text-[#E1DCC9]/60">
          <span>{skills.length} Connected Nodes</span>
          <span>•</span>
          <span className="text-amber-400">700ms Ingress Drawing</span>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="relative w-full rounded-2xl border border-[#412D15] bg-[#0E0A06] overflow-hidden shadow-2xl group select-none">
        {/* Ambient Dark Grid & Glow Backdrops */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(65,45,21,0.35)_0%,rgba(14,10,6,0.95)_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(225,220,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(225,220,201,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35 pointer-events-none" />

        {/* Viewport Corner CAD Reticles */}
        <span className="absolute top-3 left-3 text-[9px] text-[#E1DCC9]/30 font-mono pointer-events-none">
          + HUB_{categoryTitle.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase().slice(0, 10)}
        </span>
        <span className="absolute top-3 right-3 text-[9px] text-[#E1DCC9]/30 font-mono pointer-events-none">
          SYS_ACTIVE // 2026
        </span>
        <span className="absolute bottom-3 left-3 text-[9px] text-[#E1DCC9]/30 font-mono pointer-events-none">
          SECURE_INGRESS
        </span>
        <span className="absolute bottom-3 right-3 text-[9px] text-[#E1DCC9]/30 font-mono pointer-events-none">
          DATA_PULSE_OUTWARD ➔
        </span>

        {/* Mobile Swipe Hint Banner */}
        <div className="sm:hidden relative z-10 flex items-center justify-between px-3 py-1.5 bg-[#1F150C]/90 border-b border-[#412D15] text-[10px] font-mono text-[#E1DCC9]/80">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Swipe map horizontally to pan nodes</span>
          </span>
          <span className="text-emerald-400">Tap node to inspect</span>
        </div>

        {/* SVG Integrations Layer with Mobile Horizontal Scroll Container */}
        <div className="relative w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#412D15] scrollbar-track-transparent">
          <div className="min-w-[680px] sm:min-w-full aspect-[16/10] sm:aspect-[16/10.2] max-h-[640px] flex items-center justify-center p-2 sm:p-0">
            <svg
              viewBox="0 0 960 600"
              className="w-full h-full overflow-visible"
              aria-label={`${categoryTitle} Integrations Diagram`}
            >
            <defs>
              {/* Glow Filter for Data Dots */}
              <filter id={`dotGlow-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Hub Radial Glow */}
              <radialGradient id={`hubGlow-${componentId}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={hubBranding.accentColor} stopOpacity="0.38" />
                <stop offset="70%" stopColor="#412D15" stopOpacity="0.12" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Hub Pulsing Radar Rings */}
            <circle cx={cx} cy={cy} r="240" fill="none" stroke="rgba(225,220,201,0.04)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx={cx} cy={cy} r="175" fill="none" stroke="rgba(225,220,201,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={cx} cy={cy} r="115" fill={`url(#hubGlow-${componentId})`} opacity="0.85" />
            <circle
              cx={cx}
              cy={cy}
              r="84"
              fill="none"
              stroke={hubBranding.accentColor}
              strokeOpacity="0.3"
              strokeWidth="1.2"
              className="animate-pulse"
            />

            {/* Connector Lines & Outward Flowing Data Dots */}
            {toolNodes.map((tool, idx) => {
              const isHovered = hoveredToolId === tool.id;
              const isActive = activeToolId === tool.id;
              const pathId = `connector-${componentId}-${tool.id}`;
              const pathD = `M ${cx} ${cy} L ${tool.x} ${tool.y}`;
              const strokeColor = isHovered || isActive ? tool.color : 'rgba(225, 220, 201, 0.22)';
              const strokeWidth = isHovered || isActive ? 2.4 : 1.3;
              const flowDuration = 2.0 + (idx % 4) * 0.35;

              return (
                <g key={tool.id} className="transition-all duration-300">
                  {/* Connector Line Drawing In Over 700ms */}
                  <path
                    id={pathId}
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray="450"
                    strokeDashoffset="0"
                    style={{
                      animation: `drawConnectorLine 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                      filter: isHovered || isActive ? `drop-shadow(0 0 5px ${tool.color})` : 'none',
                    }}
                  />

                  {/* Secondary Ambient Flow Track */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(245, 158, 11, 0.08)"
                    strokeWidth="3.2"
                  />

                  {/* Outward Flowing Glowing Data Dot */}
                  <circle
                    r={isHovered || isActive ? 4.8 : 3.6}
                    fill={isHovered || isActive ? tool.color : hubBranding.accentColor}
                    filter={`url(#dotGlow-${componentId})`}
                  >
                    <animateMotion
                      dur={`${flowDuration}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>

                  {/* Secondary Trailing Glow Particle */}
                  <circle
                    r="6.8"
                    fill={tool.color}
                    opacity="0.28"
                    filter={`url(#dotGlow-${componentId})`}
                  >
                    <animateMotion
                      dur={`${flowDuration}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* Central Brand Tile */}
            <g transform={`translate(${cx - 80}, ${cy - 46})`}>
              {/* Outer Glow Shield */}
              <rect
                x="-4"
                y="-4"
                width="168"
                height="100"
                rx="20"
                fill="none"
                stroke={hubBranding.accentColor}
                strokeOpacity="0.4"
                strokeWidth="1.6"
                className="animate-pulse"
              />

              {/* Central Tile Base */}
              <rect
                x="0"
                y="0"
                width="160"
                height="92"
                rx="16"
                fill="#181008"
                stroke={hubBranding.accentColor}
                strokeWidth="1.8"
                filter={`drop-shadow(0 8px 24px ${hubBranding.accentGlow})`}
              />

              {/* Inner Decorative CAD Header */}
              <rect x="0" y="0" width="160" height="24" rx="14" fill="#24170C" />
              <circle cx="16" cy="12" r="3" fill="#10B981" />
              <text
                x="26"
                y="15"
                fill="#E1DCC9"
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
              >
                {hubBranding.headerTag}
              </text>
              <text
                x="146"
                y="15"
                fill="rgba(225,220,201,0.5)"
                fontSize="8"
                fontFamily="monospace"
                textAnchor="end"
              >
                {hubBranding.nodeCountTag}
              </text>

              {/* Brand Title and Geometric Icon */}
              <g transform="translate(14, 34)">
                <rect x="0" y="2" width="28" height="28" rx="8" fill="#3D2612" stroke="rgba(225,220,201,0.2)" />
                {hubBranding.icon}
                <circle cx="14" cy="16" r="2.5" fill="#E1DCC9" />

                <text x="36" y="14" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  {hubBranding.title}
                </text>
                <text x="36" y="27" fill={hubBranding.accentColor} fontSize="8.5" fontFamily="monospace">
                  {hubBranding.subTitle}
                </text>
              </g>

              {/* Status footer pill inside tile */}
              <rect x="12" y="70" width="136" height="14" rx="7" fill="#120A04" stroke="rgba(225,220,201,0.15)" />
              <circle cx="20" cy="77" r="2" fill="#34D399" />
              <text x="27" y="80" fill="rgba(225,220,201,0.85)" fontSize="7" fontFamily="monospace">
                {hubBranding.statusText}
              </text>
            </g>

            {/* Surrounding Tool Tiles */}
            {toolNodes.map((tool) => {
              const isHovered = hoveredToolId === tool.id;
              const isActive = activeToolId === tool.id;

              return (
                <g
                  key={tool.id}
                  transform={`translate(${tool.x - tileW / 2}, ${tool.y - tileH / 2})`}
                  onMouseEnter={() => setHoveredToolId(tool.id)}
                  onMouseLeave={() => setHoveredToolId(null)}
                  onClick={() => setActiveToolId(tool.id)}
                  className="cursor-pointer"
                >
                  {/* Outer glow ring on hover/active */}
                  {(isHovered || isActive) && (
                    <rect
                      x="-3"
                      y="-3"
                      width={tileW + 6}
                      height={tileH + 6}
                      rx="14"
                      fill="none"
                      stroke={tool.color}
                      strokeWidth="1.6"
                      opacity="0.9"
                      filter={`drop-shadow(0 0 10px ${tool.glowColor})`}
                    />
                  )}

                  {/* Tool Card Tile Base */}
                  <rect
                    x="0"
                    y="0"
                    width={tileW}
                    height={tileH}
                    rx="12"
                    fill={isHovered || isActive ? '#26180D' : '#150E08'}
                    stroke={isHovered || isActive ? tool.color : '#412D15'}
                    strokeWidth={isHovered || isActive ? 1.6 : 1}
                    className="transition-colors duration-200"
                  />

                  {/* Clean Content Layer */}
                  <foreignObject x="0" y="0" width={tileW} height={tileH}>
                    <div className="w-full h-full p-2.5 flex flex-col justify-between select-none">
                      <div className="flex items-center justify-between">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center border transition-all shadow-sm"
                          style={{
                            backgroundColor: isHovered || isActive ? '#3D2612' : '#20140A',
                            borderColor: isHovered || isActive ? tool.color : '#412D15',
                          }}
                        >
                          {tool.icon}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {!is14Nodes && (
                            <span className="text-[9px] font-mono text-[#E1DCC9]/60 truncate max-w-[85px]">
                              {tool.level}
                            </span>
                          )}
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: tool.color }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono font-bold text-[#E1DCC9] truncate ${
                            is14Nodes ? 'text-[10px] max-w-[84px]' : 'text-[11px] max-w-[150px]'
                          }`}
                        >
                          {tool.name}
                        </span>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>

      {/* Interactive Tool Telemetry Inspector (Below Diagram) */}
      <div className="rounded-xl border border-[#412D15] bg-[#160E08]/90 p-4 sm:p-5 backdrop-blur-md shadow-lg space-y-3 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#412D15]/60 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl border flex items-center justify-center shadow-md"
              style={{
                backgroundColor: '#26170B',
                borderColor: currentInspectedTool.color,
                boxShadow: `0 0 12px ${currentInspectedTool.glowColor}`,
              }}
            >
              {currentInspectedTool.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading text-base sm:text-lg font-bold text-[#E1DCC9]">
                  {currentInspectedTool.name}
                </h4>
                <span
                  className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wide border"
                  style={{
                    backgroundColor: 'rgba(36,23,12,0.8)',
                    borderColor: currentInspectedTool.color,
                    color: currentInspectedTool.color,
                  }}
                >
                  {currentInspectedTool.categoryTag}
                </span>
              </div>
              <span className="text-xs font-mono text-[#E1DCC9]/60">
                Connected into DECStudio Technical Pipeline
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono">
            <span className="text-[#E1DCC9]/50">Proficiency:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2A1E11] border border-[#412D15] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentInspectedTool.level}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs font-mono">
          <div className="md:col-span-8 text-[#E1DCC9]/80 leading-relaxed bg-[#0E0A06] p-3 rounded-lg border border-[#412D15]/70">
            <span className="text-[#E1DCC9]/50 block text-[10px] uppercase mb-1">
              Workflow Role & Experience
            </span>
            {currentInspectedTool.experience}
          </div>
          <div className="md:col-span-4 flex items-center justify-between p-3 rounded-lg bg-[#0E0A06] border border-[#412D15]/70 text-[11px] text-[#E1DCC9]/70">
            <div className="space-y-1">
              <span className="text-[10px] text-[#E1DCC9]/50 uppercase block">Data Direction</span>
              <span className="text-amber-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>Outward Pulse Flow</span>
              </span>
            </div>
            <span className="text-[9px] text-[#E1DCC9]/40 font-mono">SYNC: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Embedded CSS for 700ms Ingress Drawing Animation */}
      <style>{`
        @keyframes drawConnectorLine {
          from {
            stroke-dashoffset: 450;
            opacity: 0.15;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
