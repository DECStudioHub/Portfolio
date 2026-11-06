import React, { useState, useEffect } from 'react';
import { deviceAssetUrl } from '../data/devicesData';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  AtSign,
  MessageSquare,
  Send,
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  Activity,
  Maximize2,
} from 'lucide-react';

interface NodeDetail {
  id: string;
  title: string;
  type: 'trigger' | 'action' | 'condition' | 'notification';
  tool: string;
  toolColor: string;
  badge: string;
  description: string;
  inputs: Record<string, string>;
  outputs: Record<string, string>;
}

export const AutomationFlowHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flow' | 'reference' | 'sample-report'>('sample-report');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('trigger');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // Nodes metadata matching image_3283d82b.png and actual Prince Talisay checklist image_e5fb24e6.png
  const nodes: Record<string, NodeDetail> = {
    trigger: {
      id: 'trigger',
      title: 'When an item is created or modified',
      type: 'trigger',
      tool: 'Microsoft Lists / SharePoint',
      toolColor: '#008272', // Microsoft Lists Teal
      badge: 'TRIGGER EVENT',
      description:
        'Fires automatically whenever a Roving IT Support (ITS) personnel submits or updates a Store Visit Checklist via Microsoft Forms, which writes directly into the centralized Microsoft Lists repository.',
      inputs: {
        'Site Address': 'https://prince.sharepoint.com/teams/IT-StoreOperations',
        'List Name': 'Roving_ITS_Store_Visit_Checklist_Master',
        'Trigger Mode': 'Automated On-Creation / On-Update',
      },
      outputs: {
        'Store': 'Prince Talisay',
        'Entrance Date': '2026-10-23',
        'Exit Date': '2026-10-23',
        'Visit Duration': '1Days',
        'Ticket Updates': 'Resolved: 2 · Pending: 8',
        'Checklist Status': 'STORE VISIT CHECKLIST – APPROVED ✅',
        'Roving ITS Engineer': 'Dante Custodio Jr. (Supervisor - Client Support)',
      },
    },
    duration: {
      id: 'duration',
      title: 'Visit Duration',
      type: 'action',
      tool: 'Power Automate Compose Engine',
      toolColor: '#742774', // Purple formula engine
      badge: 'DATA EXPRESSION',
      description:
        'Calculates the total time spent in-store using timestamp arithmetic: evaluates Entrance Date and Exit Date to compute visit duration.',
      inputs: {
        'Entrance Date': 'triggerBody()?[\'EntranceDate\']',
        'Exit Date': 'triggerBody()?[\'ExitDate\']',
        'Expression': 'concat(div(sub(ticks(ExitDate), ticks(EntranceDate)), 864000000000), \'Days\')',
      },
      outputs: {
        'Store': 'Prince Talisay',
        'Visit Duration Result': '1Days',
        'SLA Threshold': 'Standard Store Visit Schedule Met',
        'Status': 'Valid Duration Recorded',
      },
    },
    mention: {
      id: 'mention',
      title: 'Get an @mention token for a user',
      type: 'action',
      tool: 'Microsoft Teams Connector',
      toolColor: '#6264A7', // Teams Purple
      badge: 'TEAMS CONTEXT',
      description:
        'Dynamically queries Azure AD to retrieve user principal @mention token for Dante Custodio Jr. (Supervisor - Client Support) and Store PIC, ensuring immediate visibility in Teams.',
      inputs: {
        'User Email': 'dantecustodio13@gmail.com',
        'Target Scope': 'Channel / Group Chat Mentions',
      },
      outputs: {
        'Mention Tag': '<at>Dante Custodio Jr.</at>',
        'Designation': 'Supervisor - Client Support',
      },
    },
    condition1: {
      id: 'condition1',
      title: 'Condition: Checklist Validation',
      type: 'condition',
      tool: 'Power Automate Logic',
      toolColor: '#F59E0B',
      badge: 'LOGIC GATE 1',
      description:
        'Evaluates whether the checklist has completed all mandatory PM steps. If incomplete (True), logs an administrative exception; if completed (False), proceeds to severity routing.',
      inputs: {
        'Expression': 'equals(triggerBody()?[\'ChecklistComplete\'], false)',
      },
      outputs: {
        'Result': 'False ➔ Proceeding to Condition 2 (Standard & Critical Routing)',
      },
    },
    condition2: {
      id: 'condition2',
      title: 'Condition 2: Store Alert Priority',
      type: 'condition',
      tool: 'Power Automate Logic',
      toolColor: '#F59E0B',
      badge: 'LOGIC GATE 2',
      description:
        'Checks if the store visit requires immediate broadcast or has active urgent concerns (#472123, #469715). When True, immediately dispatches the Store Visit Checklist notification into Microsoft Teams.',
      inputs: {
        'Expression': 'or(equals(triggerBody()?[\'RequiresBroadcast\'], true), not(empty(triggerBody()?[\'Assessment\'])))',
      },
      outputs: {
        'Result': 'True ➔ Execute "Post message in a chat or channel" action',
      },
    },
    teamsPost: {
      id: 'teamsPost',
      title: 'Post message in a chat or channel',
      type: 'notification',
      tool: 'Microsoft Teams Webhook',
      toolColor: '#464EB8',
      badge: 'BROADCAST ACTION',
      description:
        'Delivers the approved Store Visit Checklist Report directly into the designated Roving ITS Microsoft Teams group chat with full visit details, ticket updates, urgent concerns, and pending next steps.',
      inputs: {
        'Post In': 'Group Chat / Channel',
        'Conversation ID': '19:roving-its-ops@thread.v2',
        'Store': 'Prince Talisay',
      },
      outputs: {
        'Status Code': '201 Created',
        'Broadcast Latency': '310ms post-submission',
        'Delivered To': 'Roving IT Support Operations Group (14 Members)',
      },
    },
  };

  const selectedNode = nodes[selectedNodeId] || nodes.trigger;

  // Flow simulation controller
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setSelectedNodeId('trigger');

    const steps = [
      { step: 1, node: 'trigger', delay: 1000 },
      { step: 2, node: 'duration', delay: 2000 },
      { step: 3, node: 'mention', delay: 3000 },
      { step: 4, node: 'condition1', delay: 4000 },
      { step: 5, node: 'condition2', delay: 5000 },
      { step: 6, node: 'teamsPost', delay: 6200 },
    ];

    steps.forEach(({ step, node, delay }) => {
      setTimeout(() => {
        setSimStep(step);
        setSelectedNodeId(node);
      }, delay);
    });

    setTimeout(() => {
      setIsSimulating(false);
    }, 8000);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimStep(0);
    setSelectedNodeId('trigger');
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-[#412D15] bg-[#160E08]/90 text-xs font-mono">
        {/* Navigation Tabs */}
        <div className="inline-flex items-center p-1 rounded-lg border border-[#412D15] bg-[#0E0A06] gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'flow'
                ? 'bg-[#412D15] text-[#E1DCC9] font-bold shadow'
                : 'text-[#E1DCC9]/60 hover:text-[#E1DCC9]'
            }`}
          >
            Interactive Flow Hub
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sample-report')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'sample-report'
                ? 'bg-[#412D15] text-[#E1DCC9] font-bold shadow'
                : 'text-[#E1DCC9]/60 hover:text-[#E1DCC9]'
            }`}
          >
            Teams Report Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reference')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'reference'
                ? 'bg-[#412D15] text-[#E1DCC9] font-bold shadow'
                : 'text-[#E1DCC9]/60 hover:text-[#E1DCC9]'
            }`}
          >
            Original Flow Diagram
          </button>
        </div>

        {/* Live Simulation Action Buttons */}
        <div className="flex items-center gap-2">
          {activeTab === 'flow' && (
            <>
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-600/60 bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 font-semibold transition-all disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? `Executing Step ${simStep}/6...` : 'Simulate Submission Flow'}</span>
              </button>
              {simStep > 0 && !isSimulating && (
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="p-1.5 rounded-lg border border-[#412D15] bg-[#1F150C] text-[#E1DCC9]/70 hover:text-[#E1DCC9]"
                  title="Reset simulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
          <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>M365 CLOUD FLOW: ACTIVE</span>
          </span>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE FLOW HUB CANVAS */}
      {activeTab === 'flow' && (
        <div className="space-y-6">
          <div className="relative w-full rounded-2xl border border-[#412D15] bg-[#0A0704] overflow-hidden shadow-2xl select-none">
            {/* Ambient CAD Grid Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(65,45,21,0.3)_0%,rgba(10,7,4,0.98)_75%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(225,220,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(225,220,201,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

            {/* Corner CAD HUD Callouts */}
            <span className="absolute top-3 left-3 text-[9px] text-[#E1DCC9]/40 font-mono pointer-events-none">
              + FLOW_ID: ROVING_ITS_CHECKLIST_AUTOMATION
            </span>
            <span className="absolute top-3 right-3 text-[9px] text-amber-400/70 font-mono pointer-events-none">
              POWER_AUTOMATE // LOGIC ENGINE v2.4
            </span>
            <span className="absolute bottom-3 left-3 text-[9px] text-[#E1DCC9]/40 font-mono pointer-events-none">
              TRIGGER: MICROSOFT_LISTS_EVENT
            </span>
            <span className="absolute bottom-3 right-3 text-[9px] text-emerald-400/70 font-mono pointer-events-none">
              ENDPOINT: TEAMS_GROUP_CHAT ➔
            </span>

            {/* SVG Flow Motion Canvas with 700ms Ingress Drawing Lines */}
            <div className="relative w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#412D15]">
              <div className="min-w-[760px] sm:min-w-full aspect-[16/11.5] max-h-[640px] flex items-center justify-center p-3">
                <svg
                  viewBox="0 0 840 680"
                  className="w-full h-full overflow-visible"
                  aria-label="Power Automate Cloud Flow Diagram"
                >
                  <defs>
                    <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Gradient definition for paths */}
                    <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D97706" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* ================= SVG CONNECTOR LINES ================= */}
                  {/* Path 1: Trigger -> Duration */}
                  <path
                    id="p1"
                    d="M 420 78 L 420 120"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />
                  {/* Path 2: Duration -> @Mention */}
                  <path
                    id="p2"
                    d="M 420 178 L 420 220"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />
                  {/* Path 3: @Mention -> Condition 1 */}
                  <path
                    id="p3"
                    d="M 420 278 L 420 318"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 4A: Condition 1 -> True (Left Branch) */}
                  <path
                    id="p4a"
                    d="M 370 366 C 370 395 210 390 210 422"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 4B: Condition 1 -> False (Right Branch -> Condition 2) */}
                  <path
                    id="p4b"
                    d="M 470 366 C 470 390 600 385 600 412"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 5A: Condition 2 -> True (Post to Teams) */}
                  <path
                    id="p5a"
                    d="M 550 460 C 550 490 480 485 480 522"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 5B: Condition 2 -> False (End/Silent Queue) */}
                  <path
                    id="p5b"
                    d="M 650 460 C 650 490 710 490 710 522"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* ================= FLOW MOTION DATA PULSES ================= */}
                  {/* Active Data Particles streaming down paths */}
                  <circle r="4.5" fill="#F59E0B" filter="url(#flowGlow)">
                    <animateMotion dur="2.4s" repeatCount="indefinite">
                      <mpath href="#p1" />
                    </animateMotion>
                  </circle>
                  <circle r="4.5" fill="#818CF8" filter="url(#flowGlow)">
                    <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite">
                      <mpath href="#p2" />
                    </animateMotion>
                  </circle>
                  <circle r="4.5" fill="#6264A7" filter="url(#flowGlow)">
                    <animateMotion dur="2.4s" begin="1.4s" repeatCount="indefinite">
                      <mpath href="#p3" />
                    </animateMotion>
                  </circle>
                  <circle r="4" fill="#EF4444" filter="url(#flowGlow)">
                    <animateMotion dur="2.6s" begin="0.4s" repeatCount="indefinite">
                      <mpath href="#p4b" />
                    </animateMotion>
                  </circle>
                  <circle r="5" fill="#10B981" filter="url(#flowGlow)">
                    <animateMotion dur="2.8s" begin="1.2s" repeatCount="indefinite">
                      <mpath href="#p5a" />
                    </animateMotion>
                  </circle>

                  {/* ================= INTERACTIVE NODE CARDS ================= */}

                  {/* NODE 1: Trigger (When an item is created or modified) */}
                  <g
                    transform="translate(260, 20)"
                    onClick={() => setSelectedNodeId('trigger')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="320"
                      height="58"
                      rx="12"
                      fill={selectedNodeId === 'trigger' ? '#21150B' : '#140D07'}
                      stroke={selectedNodeId === 'trigger' ? '#008272' : '#412D15'}
                      strokeWidth={selectedNodeId === 'trigger' ? '2' : '1.2'}
                      className="transition-colors duration-200"
                    />
                    {/* Teal accent bar on left */}
                    <rect x="0" y="0" width="6" height="58" rx="3" fill="#008272" />

                    {/* Node Content */}
                    <foreignObject x="12" y="8" width="296" height="42">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#008272]/20 border border-[#008272] flex items-center justify-center text-teal-300 font-bold">
                            <Layers className="w-4 h-4 text-teal-400" />
                          </div>
                          <div>
                            <div className="text-[10px] text-teal-400 font-semibold tracking-wide uppercase">
                              MICROSOFT LISTS TRIGGER
                            </div>
                            <div className="font-heading text-xs font-bold text-[#E1DCC9] truncate max-w-[190px]">
                              When an item is created or modified
                            </div>
                          </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                    </foreignObject>
                  </g>

                  {/* Step Connector Label + Icon */}
                  <circle cx="420" cy="98" r="9" fill="#1F150C" stroke="#412D15" strokeWidth="1.2" />
                  <text x="420" y="102" fill="#E1DCC9" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    +
                  </text>

                  {/* NODE 2: Visit Duration Calculation */}
                  <g
                    transform="translate(260, 120)"
                    onClick={() => setSelectedNodeId('duration')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="320"
                      height="58"
                      rx="12"
                      fill={selectedNodeId === 'duration' ? '#21150B' : '#140D07'}
                      stroke={selectedNodeId === 'duration' ? '#818CF8' : '#412D15'}
                      strokeWidth={selectedNodeId === 'duration' ? '2' : '1.2'}
                      className="transition-colors duration-200"
                    />
                    <rect x="0" y="0" width="6" height="58" rx="3" fill="#818CF8" />

                    <foreignObject x="12" y="8" width="296" height="42">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#818CF8]/20 border border-[#818CF8] flex items-center justify-center text-indigo-300 font-bold">
                            <Clock className="w-4 h-4 text-indigo-400" />
                          </div>
                          <div>
                            <div className="text-[10px] text-indigo-400 font-semibold tracking-wide uppercase">
                              DATA EXPRESSION / FORMULA
                            </div>
                            <div className="font-heading text-xs font-bold text-[#E1DCC9]">
                              Visit Duration Calculation
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] text-[#E1DCC9]/60 bg-[#2A1E11] px-1.5 py-0.5 rounded border border-[#412D15]">
                          TICKS SUB
                        </span>
                      </div>
                    </foreignObject>
                  </g>

                  <circle cx="420" cy="198" r="9" fill="#1F150C" stroke="#412D15" strokeWidth="1.2" />
                  <text x="420" y="202" fill="#E1DCC9" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    +
                  </text>

                  {/* NODE 3: Get an @mention token for a user */}
                  <g
                    transform="translate(260, 220)"
                    onClick={() => setSelectedNodeId('mention')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="320"
                      height="58"
                      rx="12"
                      fill={selectedNodeId === 'mention' ? '#21150B' : '#140D07'}
                      stroke={selectedNodeId === 'mention' ? '#6264A7' : '#412D15'}
                      strokeWidth={selectedNodeId === 'mention' ? '2' : '1.2'}
                      className="transition-colors duration-200"
                    />
                    <rect x="0" y="0" width="6" height="58" rx="3" fill="#6264A7" />

                    <foreignObject x="12" y="8" width="296" height="42">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#6264A7]/20 border border-[#6264A7] flex items-center justify-center text-purple-300 font-bold">
                            <AtSign className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-[10px] text-purple-400 font-semibold tracking-wide uppercase">
                              TEAMS AD CONTEXT
                            </div>
                            <div className="font-heading text-xs font-bold text-[#E1DCC9]">
                              Get an @mention token for user
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-700/50">
                          SUPERVISOR
                        </span>
                      </div>
                    </foreignObject>
                  </g>

                  <circle cx="420" cy="298" r="9" fill="#1F150C" stroke="#412D15" strokeWidth="1.2" />
                  <text x="420" y="302" fill="#E1DCC9" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    +
                  </text>

                  {/* NODE 4: Condition 1 (Outer Logic Container) */}
                  <g
                    transform="translate(280, 318)"
                    onClick={() => setSelectedNodeId('condition1')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="280"
                      height="48"
                      rx="10"
                      fill={selectedNodeId === 'condition1' ? '#26180D' : '#1E140C'}
                      stroke={selectedNodeId === 'condition1' ? '#F59E0B' : '#523A1B'}
                      strokeWidth={selectedNodeId === 'condition1' ? '2' : '1.4'}
                    />
                    <foreignObject x="10" y="8" width="260" height="32">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">⑂</span>
                          <span className="font-heading text-xs font-bold text-[#E1DCC9]">
                            Condition (Checklist Status)
                          </span>
                        </div>
                        <span className="text-[9px] text-[#E1DCC9]/60">LOGIC SPLIT</span>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Condition 1 Branch Pills: True (Left) vs False (Right) */}
                  <g transform="translate(180, 380)">
                    <rect x="0" y="0" width="60" height="20" rx="6" fill="#14532D" stroke="#22C55E" strokeWidth="1" />
                    <text x="30" y="14" fill="#86EFAC" fontSize="9.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      True ^
                    </text>
                  </g>

                  <g transform="translate(570, 380)">
                    <rect x="0" y="0" width="60" height="20" rx="6" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
                    <text x="30" y="14" fill="#FCA5A5" fontSize="9.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      False v
                    </text>
                  </g>

                  {/* Left Branch Node: True -> Exception / Silent Log */}
                  <g transform="translate(100, 422)">
                    <rect
                      x="0"
                      y="0"
                      width="220"
                      height="54"
                      rx="10"
                      fill="#120D08"
                      stroke="#14532D"
                      strokeWidth="1.2"
                    />
                    <foreignObject x="10" y="8" width="200" height="38">
                      <div className="text-[10px] font-mono space-y-0.5">
                        <span className="text-emerald-400 font-semibold block">True Branch</span>
                        <span className="text-[#E1DCC9]/80 block truncate">Log Incomplete Checklist</span>
                        <span className="text-[#E1DCC9]/40 text-[9px] block">Admin Exception Audit</span>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Outer False Container Frame (matching image_3283d82b.png) */}
                  <rect
                    x="350"
                    y="405"
                    width="440"
                    height="240"
                    rx="14"
                    fill="none"
                    stroke="#412D15"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <text x="365" y="420" fill="rgba(225,220,201,0.3)" fontSize="8.5" fontFamily="monospace">
                    // FALSE BRANCH SCOPE
                  </text>

                  {/* NODE 5: Condition 2 (Inside False branch) */}
                  <g
                    transform="translate(470, 412)"
                    onClick={() => setSelectedNodeId('condition2')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="260"
                      height="48"
                      rx="10"
                      fill={selectedNodeId === 'condition2' ? '#26180D' : '#1E140C'}
                      stroke={selectedNodeId === 'condition2' ? '#F59E0B' : '#523A1B'}
                      strokeWidth={selectedNodeId === 'condition2' ? '2' : '1.4'}
                    />
                    <foreignObject x="10" y="8" width="240" height="32">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">⑂</span>
                          <span className="font-heading text-xs font-bold text-[#E1DCC9]">
                            Condition 2 (Store Severity)
                          </span>
                        </div>
                        <span className="text-[9px] text-[#E1DCC9]/60">EVAL</span>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Condition 2 Branch Pills: True vs False */}
                  <g transform="translate(450, 480)">
                    <rect x="0" y="0" width="55" height="18" rx="5" fill="#14532D" stroke="#22C55E" strokeWidth="1" />
                    <text x="27.5" y="12.5" fill="#86EFAC" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      True ^
                    </text>
                  </g>

                  <g transform="translate(680, 480)">
                    <rect x="0" y="0" width="55" height="18" rx="5" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
                    <text x="27.5" y="12.5" fill="#FCA5A5" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      False v
                    </text>
                  </g>

                  {/* NODE 6: Post message in a chat or channel (The Flagship Teams Notification Action!) */}
                  <g
                    transform="translate(370, 520)"
                    onClick={() => setSelectedNodeId('teamsPost')}
                    className="cursor-pointer group"
                  >
                    {/* Outer Glow on Selection or Active Step */}
                    <rect
                      x="-3"
                      y="-3"
                      width="256"
                      height="74"
                      rx="14"
                      fill="none"
                      stroke="#464EB8"
                      strokeWidth="1.6"
                      strokeOpacity={selectedNodeId === 'teamsPost' || simStep === 6 ? '0.8' : '0'}
                      className="animate-pulse"
                    />

                    <rect
                      x="0"
                      y="0"
                      width="250"
                      height="68"
                      rx="12"
                      fill={selectedNodeId === 'teamsPost' ? '#1F1735' : '#140F22'}
                      stroke={selectedNodeId === 'teamsPost' || simStep === 6 ? '#7B83EB' : '#464EB8'}
                      strokeWidth="1.8"
                      className="transition-colors duration-200"
                    />
                    <rect x="0" y="0" width="6" height="68" rx="3" fill="#6264A7" />

                    <foreignObject x="12" y="10" width="228" height="48">
                      <div className="flex items-center gap-2.5 text-xs font-mono">
                        <div className="w-9 h-9 rounded-lg bg-[#6264A7]/30 border border-[#7B83EB] flex items-center justify-center text-purple-200 font-bold shrink-0">
                          <MessageSquare className="w-4 h-4 text-purple-300" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9.5px] text-purple-300 font-bold tracking-wide uppercase truncate">
                            MICROSOFT TEAMS ACTION
                          </div>
                          <div className="font-heading text-xs font-bold text-[#E1DCC9] truncate">
                            Post message in chat / channel
                          </div>
                          <div className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            <span>Adaptive Card Broadcast</span>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                  </g>

                  {/* False Node: Standard Non-Broadcast Queue */}
                  <g transform="translate(640, 522)">
                    <rect
                      x="0"
                      y="0"
                      width="135"
                      height="46"
                      rx="8"
                      fill="#120D08"
                      stroke="#412D15"
                      strokeWidth="1"
                    />
                    <foreignObject x="8" y="6" width="119" height="34">
                      <div className="text-[9px] font-mono text-[#E1DCC9]/50">
                        <span className="block text-red-400">False Branch</span>
                        <span className="block truncate">Silent Archive</span>
                      </div>
                    </foreignObject>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Interactive Node Telemetry Inspector */}
          <div className="rounded-xl border border-[#412D15] bg-[#160E08]/90 p-4 sm:p-5 backdrop-blur-md shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#412D15]/60 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shadow-md shrink-0"
                  style={{
                    backgroundColor: '#26170B',
                    borderColor: selectedNode.toolColor,
                    boxShadow: `0 0 12px ${selectedNode.toolColor}40`,
                  }}
                >
                  <Activity className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#E1DCC9]">
                      {selectedNode.title}
                    </h4>
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wide border"
                      style={{
                        backgroundColor: 'rgba(36,23,12,0.8)',
                        borderColor: selectedNode.toolColor,
                        color: selectedNode.toolColor,
                      }}
                    >
                      {selectedNode.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#E1DCC9]/60">
                    Tool Provider: <strong className="text-[#E1DCC9]">{selectedNode.tool}</strong>
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-[#E1DCC9]/60 flex items-center gap-2">
                <span>Node ID:</span>
                <code className="text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-[#412D15]">
                  {selectedNode.id}
                </code>
              </div>
            </div>

            <p className="text-xs text-[#E1DCC9]/80 font-mono leading-relaxed bg-[#0E0A06] p-3 rounded-lg border border-[#412D15]/70">
              {selectedNode.description}
            </p>

            {/* Input & Output Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#0E0A06] border border-[#412D15]/70 space-y-2">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">
                  ➔ Input Parameters & Dynamic Tokens
                </span>
                <div className="space-y-1.5">
                  {Object.entries(selectedNode.inputs).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2 text-[11px]">
                      <span className="text-[#E1DCC9]/50 truncate">{key}:</span>
                      <span className="text-[#E1DCC9] font-medium text-right truncate max-w-[200px]">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0E0A06] border border-[#412D15]/70 space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
                  ✔ Output Payload & Evaluated Values
                </span>
                <div className="space-y-1.5">
                  {Object.entries(selectedNode.outputs).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2 text-[11px]">
                      <span className="text-[#E1DCC9]/50 truncate">{key}:</span>
                      <span className="text-emerald-300 font-medium text-right truncate max-w-[200px]">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TEAMS REPORT PREVIEW (Actual Result from Microsoft Teams Notification) */}
      {activeTab === 'sample-report' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#412D15] bg-[#160E08] p-4 text-xs font-mono text-[#E1DCC9]/70 flex items-center justify-between">
            <div>
              <span className="text-[#E1DCC9]/50 block text-[10px] uppercase">Notification Target</span>
              <span>Destination: <strong>Microsoft Teams &gt; Roving IT Support Group Chat</strong></span>
            </div>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: DELIVERED</span>
            </span>
          </div>

          {/* Microsoft Teams Message Bubble (Actual Result) */}
          <div className="max-w-2xl mx-auto rounded-xl border border-[#383838] bg-[#1F1F1F] p-5 sm:p-7 shadow-2xl text-[#E1E1E1] space-y-4 font-sans select-text">
              {/* Teams Message Header */}
              <div className="flex items-center justify-between border-b border-[#383838] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5B5FC7] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    PA
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">Power Automate</h4>
                      <span className="px-1.5 py-0.5 rounded bg-[#383838] text-[9.5px] font-mono text-[#E1DCC9]/80 uppercase">
                        BOT
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A6A6A6]">Automated Store Visit Notification</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#A6A6A6] font-mono">10/23/2026 4:15 PM</span>
              </div>

              {/* Exact Production Message Body matching image_e5fb24e6.png */}
              <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-[#EDEDED] font-mono">
                {/* 1. Header Title */}
                <div className="font-bold text-sm sm:text-base text-white tracking-wide">
                  📋 STORE VISIT CHECKLIST – APPROVED ✅
                </div>

                {/* 2. VISIT DETAILS */}
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>📍</span>
                    <span>VISIT DETAILS</span>
                  </div>
                  <div className="space-y-0.5 text-[#CCCCCC] pl-5">
                    <div>Store: <strong className="text-white font-semibold">Prince Talisay</strong></div>
                    <div>Entrance Date: <span className="text-white">2026-10-23</span></div>
                    <div>Exit Date: <span className="text-white">2026-10-23</span></div>
                    <div>Visit Duration: <span className="text-white font-semibold">1Days</span></div>
                  </div>
                </div>

                {/* Divider 1 */}
                <div className="border-t border-[#444444]" />

                {/* 3. TICKET UPDATES */}
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>TICKET UPDATES</span>
                    <span>🎟️</span>
                  </div>
                  <div className="space-y-0.5 text-[#CCCCCC]">
                    <div>Resolved: <span className="text-white font-bold">2</span></div>
                    <div>Pending: <span className="text-white font-bold">8</span></div>
                  </div>
                </div>

                {/* Divider 2 */}
                <div className="border-t border-[#444444]" />

                {/* 4. URGENT CONCERNS & TICKET STATUS */}
                <div className="space-y-3">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>URGENT CONCERNS</span>
                      <span>⚠️</span>
                    </div>
                    <div className="font-bold text-white tracking-wide text-[11px]">
                      TICKET STATUS
                    </div>
                  </div>

                  {/* Ticket 1 */}
                  <div className="space-y-0.5 pl-3 border-l-2 border-amber-500/60 py-0.5">
                    <div className="font-bold text-white text-[12px] sm:text-xs">
                      1. Ticket #472123 — Internet Connection Assessment &amp; Resolution (Store Audit Finding)
                    </div>
                    <div className="text-[#BDBDBD] text-[11.5px]">
                      Status: Ongoing — Request approved; PR creation in progress
                    </div>
                  </div>

                  {/* Ticket 2 */}
                  <div className="space-y-0.5 pl-3 border-l-2 border-emerald-500/60 py-0.5">
                    <div className="font-bold text-white text-[12px] sm:text-xs">
                      2. Ticket #469715 — Biometrics Device Replacement
                    </div>
                    <div className="text-[#BDBDBD] text-[11.5px]">
                      PR created: October 18, 2026 — PR85275 ✅
                    </div>
                    <div className="text-[#BDBDBD] text-[11.5px]">
                      Next step: Follow up with Procurement for PO creation
                    </div>
                  </div>
                </div>

                {/* 5. PENDING ISSUES AND NEXT STEPS */}
                <div className="space-y-2 pt-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>PENDING ISSUES AND NEXT STEPS</span>
                    <span>📢</span>
                  </div>
                  <div className="space-y-1 text-[#CCCCCC] text-[11.5px]">
                    <div>1. #466125 — Print head in transit ➔ Complete next week</div>
                    <div>2. #470755 — Cash drawer ➔ Start approval process</div>
                    <div>3. #472418 — TLY print head ➔ Waiting Sir June for PR (task sent 10/23)</div>
                    <div>4. #472786 — Zebra print head ➔ For PR creation</div>
                    <div>5. #474275 — Keyboard ➔ On-site check: 1st week Nov</div>
                    <div>6. #474280 — POS relocation ➔ Verify layout with CSS</div>
                  </div>
                </div>

                {/* 6. Link */}
                <div className="pt-2">
                  <a
                    href="#checklist-report"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 text-[#5B9BD5] hover:text-[#79B0E6] underline font-semibold text-xs sm:text-[13px] transition-colors"
                  >
                    <span>ITS Store Visit Checklist Report</span>
                    <span>👈</span>
                  </a>
                </div>

                {/* 7. Sign-off */}
                <div className="pt-3 border-t border-[#383838] space-y-0.5">
                  <div className="text-[#CCCCCC] flex items-center gap-1.5">
                    <span>Best Regards,</span>
                    <span>🤠</span>
                  </div>
                  <div className="font-bold text-[#E89E53] text-sm">
                    Dante Custodio Jr.
                  </div>
                  <div className="text-[11px] text-[#A6A6A6]">
                    Supervisor - Client Support
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}

      {/* TAB 3: REFERENCE ORIGINAL FLOW SCREENSHOT */}
      {activeTab === 'reference' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#412D15] bg-[#160E08] p-4 text-xs font-mono text-[#E1DCC9]/80 flex items-center justify-between">
            <span>Reference Workflow Diagram: <strong>Power Automate Cloud Flow Snapshot</strong></span>
            <span className="text-amber-400">ORIGINAL SOURCE SCREENSHOT</span>
          </div>

          <div className="rounded-xl border border-[#412D15] overflow-hidden bg-[#0A0704] p-4 flex items-center justify-center shadow-2xl">
            <img
              src={deviceAssetUrl('/assets/aistudio/power_automate_flow_optimized_afb0b287.webp')}
              alt="Power Automate Original Flow Reference"
              className="max-h-[640px] w-auto object-contain rounded-lg border border-[#412D15]/80 shadow-md"
            />
          </div>
        </div>
      )}

      {/* Ingress drawing CSS */}
      <style>{`
        .flow-connector {
          stroke-dasharray: 8 6;
          animation: flowDash 30s linear infinite;
        }
        @keyframes flowDash {
          to {
            stroke-dashoffset: -500;
          }
        }
      `}</style>
    </div>
  );
};
