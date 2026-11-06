import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Layers,
  Clock,
  Workflow,
  Cpu,
  FileText,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Scale,
  Send,
  Mail,
  Inbox,
  AlertCircle,
  Calendar,
  Store,
  UserCheck,
  Sparkles,
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

export const EmailAutomationFlowHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flow' | 'reference' | 'sample-report'>('sample-report');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('trigger');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // Nodes metadata matching improved_workflow_diagram_d620cf79.webp and actual Prince Talisay checklist
  const nodes: Record<string, NodeDetail> = {
    trigger: {
      id: 'trigger',
      title: 'When an item is created or modified',
      type: 'trigger',
      tool: 'Microsoft Lists / SharePoint',
      toolColor: '#008272', // Microsoft Lists Teal
      badge: 'TRIGGER EVENT',
      description:
        'Fires automatically whenever a Roving IT Support (ITS) personnel submits or updates a Store Visit Checklist via Microsoft Forms, which syncs immediately to the centralized Microsoft Lists master database.',
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
        'Calculates the total time spent in-store using timestamp arithmetic: evaluates Entrance Date and Exit Date to compute visit duration for SLA validation and PM reporting.',
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
    condition1: {
      id: 'condition1',
      title: 'Condition: Primary Validation',
      type: 'condition',
      tool: 'Power Automate Logic',
      toolColor: '#F59E0B',
      badge: 'LOGIC GATE 1',
      description:
        'Evaluates whether the checklist has completed all mandatory PM steps or flags an edge case. If False, it seamlessly proceeds to Condition 2 for urgent concerns and notification routing.',
      inputs: {
        'Expression': 'equals(triggerBody()?[\'ChecklistComplete\'], false)',
      },
      outputs: {
        'Branch Result': 'False ➔ Proceeding to Condition 2 (Operational Routing)',
      },
    },
    condition2: {
      id: 'condition2',
      title: 'Condition 2: Notification & Routing Check',
      type: 'condition',
      tool: 'Power Automate Logic',
      toolColor: '#F59E0B',
      badge: 'LOGIC GATE 2',
      description:
        'Evaluates whether the store visit checklist is approved and has active updates or urgent issues (#472123, #469715). When True, executes the Microsoft Outlook "Send an email (V2)" action.',
      inputs: {
        'Expression': 'or(equals(triggerBody()?[\'RequiresBroadcast\'], true), not(empty(triggerBody()?[\'Assessment\'])))',
      },
      outputs: {
        'Branch Result': 'True ➔ Execute "Send an email (V2)" via Microsoft Outlook',
        'False Branch': '0 Actions (Silent termination)',
      },
    },
    sendEmail: {
      id: 'sendEmail',
      title: 'Send an email (V2)',
      type: 'notification',
      tool: 'Microsoft Outlook (Office 365)',
      toolColor: '#0078D4', // Microsoft Outlook Blue
      badge: 'EMAIL DISPATCH',
      description:
        'Compiles and dispatches an automated HTML Store Visit Checklist Report to the Roving ITS Team, Client Support Operations, and executive stakeholders with visit duration, urgent tickets, and pending action items.',
      inputs: {
        'To': 'roving-its-team@princeretail.com; itsupport-operations@princeretail.com',
        'CC': 'dantecustodio13@gmail.com; store.operations@princeretail.com',
        'Subject': '[Roving ITS] STORE VISIT CHECKLIST – APPROVED ✅ | Prince Talisay',
        'Importance': 'High',
        'IsHtml': 'Yes',
      },
      outputs: {
        'Delivery Status': 'Sent (200 OK)',
        'Message ID': '<202610231615.ITS.ROVING.PRINCE-TALISAY@princeretail.com>',
        'Recipients Reached': 'Roving ITS Team, Client Support Operations & Stakeholders',
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
      { step: 2, node: 'duration', delay: 2200 },
      { step: 3, node: 'condition1', delay: 3500 },
      { step: 4, node: 'condition2', delay: 4800 },
      { step: 5, node: 'sendEmail', delay: 6200 },
    ];

    steps.forEach(({ step, node, delay }) => {
      setTimeout(() => {
        setSimStep(step);
        setSelectedNodeId(node);
      }, delay);
    });

    setTimeout(() => {
      setIsSimulating(false);
    }, 7200);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimStep(0);
    setSelectedNodeId('trigger');
  };

  return (
    <div className="space-y-6">
      {/* CAD Control Banner & Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#412D15] pb-4">
        {/* Navigation Tabs */}
        <div className="inline-flex items-center p-1 rounded-xl border border-[#412D15] bg-[#160E08] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('sample-report')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'sample-report'
                ? 'bg-[#412D15] text-[#E1DCC9] font-bold shadow'
                : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Outlook Email Report Preview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'flow'
                ? 'bg-[#412D15] text-[#E1DCC9] font-bold shadow'
                : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9]'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Workflow Engine</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reference')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'reference'
                ? 'bg-[#412D15] text-[#E1DCC9] font-bold shadow'
                : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Original Flow Diagram</span>
          </button>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {activeTab === 'flow' && (
            <>
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-600/60 bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 font-semibold transition-all disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? `Executing Step ${simStep}/5...` : 'Simulate Email Flow'}</span>
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,120,212,0.15)_0%,rgba(10,7,4,0.98)_75%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(225,220,201,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(225,220,201,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

            {/* Corner CAD HUD Callouts */}
            <span className="absolute top-3 left-3 text-[9px] text-[#E1DCC9]/40 font-mono pointer-events-none">
              + FLOW_ID: ROVING_ITS_EMAIL_AUTOMATION
            </span>
            <span className="absolute top-3 right-3 text-[9px] text-amber-400/70 font-mono pointer-events-none">
              POWER_AUTOMATE // OUTLOOK ENGINE v2.5
            </span>
            <span className="absolute bottom-3 left-3 text-[9px] text-[#E1DCC9]/40 font-mono pointer-events-none">
              TRIGGER: MICROSOFT_LISTS_EVENT
            </span>
            <span className="absolute bottom-3 right-3 text-[9px] text-sky-400/80 font-mono pointer-events-none">
              ENDPOINT: OUTLOOK_SEND_EMAIL_V2 ➔
            </span>

            {/* SVG Flow Motion Canvas with 700ms Ingress Drawing Lines */}
            <div className="relative w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#412D15]">
              <div className="min-w-[760px] sm:min-w-full aspect-[16/12] max-h-[640px] flex items-center justify-center p-3">
                <svg
                  viewBox="0 0 840 680"
                  className="w-full h-full overflow-visible"
                  aria-label="Power Automate Email Cloud Flow Diagram"
                >
                  <defs>
                    <filter id="emailFlowGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* ================= SVG CONNECTOR LINES ================= */}
                  {/* Path 1: Trigger -> Duration */}
                  <path
                    id="ep1"
                    d="M 420 78 L 420 120"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />
                  {/* Path 2: Duration -> Condition 1 */}
                  <path
                    id="ep2"
                    d="M 420 178 L 420 220"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 3A: Condition 1 -> True (Left Branch) */}
                  <path
                    id="ep3a"
                    d="M 370 268 C 370 295 210 295 210 326"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 3B: Condition 1 -> False (Right Branch -> Condition 2) */}
                  <path
                    id="ep3b"
                    d="M 470 268 C 470 295 600 295 600 326"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 4A: Condition 2 -> True (Send an email V2) */}
                  <path
                    id="ep4a"
                    d="M 550 410 C 550 440 480 435 480 472"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* Path 4B: Condition 2 -> False (0 Actions) */}
                  <path
                    id="ep4b"
                    d="M 650 410 C 650 440 710 440 710 472"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="flow-connector"
                  />

                  {/* ================= FLOW MOTION DATA PULSES ================= */}
                  <circle r="4.5" fill="#F59E0B" filter="url(#emailFlowGlow)">
                    <animateMotion dur="2.4s" repeatCount="indefinite">
                      <mpath href="#ep1" />
                    </animateMotion>
                  </circle>
                  <circle r="4.5" fill="#818CF8" filter="url(#emailFlowGlow)">
                    <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite">
                      <mpath href="#ep2" />
                    </animateMotion>
                  </circle>
                  <circle r="4" fill="#EF4444" filter="url(#emailFlowGlow)">
                    <animateMotion dur="2.6s" begin="0.5s" repeatCount="indefinite">
                      <mpath href="#ep3b" />
                    </animateMotion>
                  </circle>
                  <circle r="5" fill="#0078D4" filter="url(#emailFlowGlow)">
                    <animateMotion dur="2.8s" begin="1.2s" repeatCount="indefinite">
                      <mpath href="#ep4a" />
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
                    <rect x="0" y="0" width="6" height="58" rx="3" fill="#008272" />

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
                        <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LIST</span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Node Connector Button 1 */}
                  <g transform="translate(420, 99)">
                    <circle r="11" fill="#1A120B" stroke="#008272" strokeWidth="1.5" />
                    <text x="0" y="3.5" textAnchor="middle" fill="#008272" fontSize="13" fontWeight="bold">
                      +
                    </text>
                  </g>

                  {/* NODE 2: Visit Duration */}
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
                      fill={selectedNodeId === 'duration' ? '#22141F' : '#140D07'}
                      stroke={selectedNodeId === 'duration' ? '#742774' : '#412D15'}
                      strokeWidth={selectedNodeId === 'duration' ? '2' : '1.2'}
                      className="transition-colors duration-200"
                    />
                    <rect x="0" y="0" width="6" height="58" rx="3" fill="#742774" />

                    <foreignObject x="12" y="8" width="296" height="42">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#742774]/20 border border-[#742774] flex items-center justify-center text-purple-300">
                            <Clock className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-[10px] text-purple-400 font-semibold tracking-wide uppercase">
                              COMPOSE ACTION
                            </div>
                            <div className="font-heading text-xs font-bold text-[#E1DCC9]">
                              Visit Duration
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-purple-300 font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                          1Days
                        </span>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Node Connector Button 2 */}
                  <g transform="translate(420, 199)">
                    <circle r="11" fill="#1A120B" stroke="#742774" strokeWidth="1.5" />
                    <text x="0" y="3.5" textAnchor="middle" fill="#742774" fontSize="13" fontWeight="bold">
                      +
                    </text>
                  </g>

                  {/* OUTER CONDITION 1 CONTAINER (Condition Box) */}
                  <g transform="translate(20, 218)">
                    {/* Outer scope card */}
                    <rect
                      x="0"
                      y="0"
                      width="800"
                      height="440"
                      rx="14"
                      fill="#0D0906"
                      fillOpacity="0.85"
                      stroke="#412D15"
                      strokeWidth="1.2"
                    />

                    {/* Condition 1 Header Bar */}
                    <g
                      transform="translate(250, 0)"
                      onClick={() => setSelectedNodeId('condition1')}
                      className="cursor-pointer"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="300"
                        height="44"
                        rx="10"
                        fill={selectedNodeId === 'condition1' ? '#2A1D0F' : '#1C130A'}
                        stroke={selectedNodeId === 'condition1' ? '#F59E0B' : '#412D15'}
                        strokeWidth={selectedNodeId === 'condition1' ? '2' : '1'}
                      />
                      <foreignObject x="10" y="6" width="280" height="32">
                        <div className="flex items-center justify-between text-xs font-mono text-[#E1DCC9]">
                          <div className="flex items-center gap-2">
                            <Scale className="w-4 h-4 text-amber-400" />
                            <span className="font-bold text-white tracking-wide">Condition</span>
                          </div>
                          <span className="text-amber-400 text-xs">▲</span>
                        </div>
                      </foreignObject>
                    </g>

                    {/* Left Branch: TRUE */}
                    <g transform="translate(15, 60)">
                      <rect
                        x="0"
                        y="0"
                        width="270"
                        height="70"
                        rx="10"
                        fill="#0A0805"
                        stroke="#10B981"
                        strokeOpacity="0.35"
                        strokeWidth="1"
                      />
                      {/* True Pill */}
                      <g transform="translate(15, -12)">
                        <rect x="0" y="0" width="85" height="24" rx="6" fill="#10B981" />
                        <text x="35" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                          True
                        </text>
                        <text x="70" y="16" fill="#FFFFFF" fontSize="10">▲</text>
                      </g>
                      {/* Empty branch plus */}
                      <g transform="translate(135, 42)">
                        <circle r="10" fill="#140D07" stroke="#10B981" strokeWidth="1" />
                        <text x="0" y="3.5" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">
                          +
                        </text>
                      </g>
                    </g>

                    {/* Right Branch: FALSE (Contains Condition 2) */}
                    <g transform="translate(300, 60)">
                      <rect
                        x="0"
                        y="0"
                        width="485"
                        height="355"
                        rx="12"
                        fill="#0B0704"
                        stroke="#EF4444"
                        strokeOpacity="0.35"
                        strokeWidth="1"
                      />
                      {/* False Pill */}
                      <g transform="translate(15, -12)">
                        <rect x="0" y="0" width="85" height="24" rx="6" fill="#DC2626" />
                        <text x="35" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                          False
                        </text>
                        <text x="70" y="16" fill="#FFFFFF" fontSize="10">▲</text>
                      </g>

                      {/* Top plus connector inside False branch */}
                      <g transform="translate(242, 24)">
                        <circle r="9" fill="#140D07" stroke="#38BDF8" strokeWidth="1" />
                        <text x="0" y="3" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold">
                          +
                        </text>
                      </g>

                      {/* NESTED CONDITION 2 CONTAINER */}
                      <g transform="translate(15, 45)">
                        <rect
                          x="0"
                          y="0"
                          width="455"
                          height="285"
                          rx="10"
                          fill="#100A06"
                          stroke="#412D15"
                          strokeWidth="1.2"
                        />

                        {/* Condition 2 Header Bar */}
                        <g
                          transform="translate(90, 0)"
                          onClick={() => setSelectedNodeId('condition2')}
                          className="cursor-pointer"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="275"
                            height="38"
                            rx="8"
                            fill={selectedNodeId === 'condition2' ? '#2E1F11' : '#1F140A'}
                            stroke={selectedNodeId === 'condition2' ? '#F59E0B' : '#412D15'}
                            strokeWidth={selectedNodeId === 'condition2' ? '2' : '1'}
                          />
                          <foreignObject x="8" y="4" width="259" height="30">
                            <div className="flex items-center justify-between text-xs font-mono text-[#E1DCC9]">
                              <div className="flex items-center gap-2">
                                <Scale className="w-3.5 h-3.5 text-amber-400" />
                                <span className="font-bold text-white text-xs">Condition 2</span>
                              </div>
                              <span className="text-amber-400 text-xs">▲</span>
                            </div>
                          </foreignObject>
                        </g>

                        {/* Condition 2 Left Branch: TRUE (Contains Send an email V2) */}
                        <g transform="translate(15, 52)">
                          <rect
                            x="0"
                            y="0"
                            width="250"
                            height="200"
                            rx="10"
                            fill="#0A0704"
                            stroke="#10B981"
                            strokeOpacity="0.45"
                            strokeWidth="1"
                          />
                          {/* True Pill */}
                          <g transform="translate(12, -11)">
                            <rect x="0" y="0" width="75" height="22" rx="5" fill="#10B981" />
                            <text x="30" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                              True
                            </text>
                            <text x="60" y="15" fill="#FFFFFF" fontSize="9">▲</text>
                          </g>

                          {/* Plus button above action */}
                          <g transform="translate(125, 20)">
                            <circle r="8" fill="#140D07" stroke="#38BDF8" strokeWidth="1" />
                            <text x="0" y="2.5" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">
                              +
                            </text>
                          </g>

                          {/* NODE 5: Send an email (V2) - MICROSOFT OUTLOOK ACTION */}
                          <g
                            transform="translate(12, 38)"
                            onClick={() => setSelectedNodeId('sendEmail')}
                            className="cursor-pointer group"
                          >
                            <rect
                              x="0"
                              y="0"
                              width="226"
                              height="64"
                              rx="10"
                              fill={selectedNodeId === 'sendEmail' ? '#142135' : '#0B1524'}
                              stroke={selectedNodeId === 'sendEmail' ? '#0078D4' : '#1E3A5F'}
                              strokeWidth={selectedNodeId === 'sendEmail' ? '2.5' : '1.5'}
                              className="transition-colors duration-200"
                            />
                            {/* Blue Accent Bar */}
                            <rect x="0" y="0" width="6" height="64" rx="3" fill="#0078D4" />

                            <foreignObject x="12" y="8" width="206" height="48">
                              <div className="flex items-center gap-2.5 h-full">
                                <div className="w-9 h-9 rounded-lg bg-[#0078D4]/20 border border-[#0078D4] flex items-center justify-center text-sky-400 flex-shrink-0 shadow-sm relative">
                                  <Mail className="w-5 h-5 text-sky-400" />
                                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-[#0A0704] flex items-center justify-center text-[7px] text-white font-bold">
                                    ✓
                                  </span>
                                </div>
                                <div className="overflow-hidden">
                                  <div className="text-[9px] text-sky-400 font-semibold uppercase font-mono tracking-wide truncate">
                                    OFFICE 365 OUTLOOK
                                  </div>
                                  <div className="font-heading text-xs font-bold text-white truncate">
                                    Send an email (V2)
                                  </div>
                                  <div className="text-[9px] text-[#A6A6A6] truncate font-mono">
                                    To: Roving ITS Team
                                  </div>
                                </div>
                              </div>
                            </foreignObject>
                          </g>

                          {/* Plus button below action */}
                          <g transform="translate(125, 126)">
                            <circle r="8" fill="#140D07" stroke="#38BDF8" strokeWidth="1" />
                            <text x="0" y="2.5" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">
                              +
                            </text>
                          </g>
                        </g>

                        {/* Condition 2 Right Branch: FALSE (0 Actions) */}
                        <g transform="translate(285, 52)">
                          <rect
                            x="0"
                            y="0"
                            width="155"
                            height="95"
                            rx="10"
                            fill="#0A0704"
                            stroke="#EF4444"
                            strokeOpacity="0.45"
                            strokeWidth="1"
                          />
                          {/* False Pill */}
                          <g transform="translate(12, -11)">
                            <rect x="0" y="0" width="75" height="22" rx="5" fill="#DC2626" />
                            <text x="30" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                              False
                            </text>
                            <text x="60" y="15" fill="#FFFFFF" fontSize="9">▼</text>
                          </g>

                          {/* 0 Actions Text */}
                          <text
                            x="77"
                            y="52"
                            textAnchor="middle"
                            fill="#A6A6A6"
                            fontSize="11"
                            fontFamily="monospace"
                          >
                            0 Actions
                          </text>
                        </g>
                      </g>

                      {/* Bottom connector inside outer condition */}
                      <g transform="translate(242, 385)">
                        <circle r="9" fill="#140D07" stroke="#38BDF8" strokeWidth="1" />
                        <text x="0" y="3" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold">
                          +
                        </text>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Node Inspector Telemetry Card */}
          <div className="rounded-xl border border-[#412D15] bg-[#160E08] p-5 shadow-2xl space-y-4 font-mono text-xs text-[#E1DCC9]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#412D15] pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow"
                  style={{ backgroundColor: selectedNode.toolColor }}
                >
                  {selectedNode.type === 'trigger' && <Layers className="w-5 h-5" />}
                  {selectedNode.type === 'action' && <Clock className="w-5 h-5" />}
                  {selectedNode.type === 'condition' && <Scale className="w-5 h-5" />}
                  {selectedNode.type === 'notification' && <Mail className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-[10px] text-amber-400 uppercase font-semibold">
                    {selectedNode.badge} · {selectedNode.tool}
                  </div>
                  <h4 className="font-heading text-base font-bold text-[#E1DCC9]">
                    {selectedNode.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#25180D] border border-[#412D15] text-[11px] text-emerald-400">
                  STATUS: VERIFIED
                </span>
                <span className="px-2.5 py-1 rounded bg-[#25180D] border border-[#412D15] text-[11px] text-[#E1DCC9]/60">
                  LATENCY: ~210ms
                </span>
              </div>
            </div>

            <p className="text-[#E1DCC9]/80 leading-relaxed font-sans text-sm">
              {selectedNode.description}
            </p>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-lg border border-[#412D15]/80 bg-[#1F150C] p-3.5 space-y-2">
                <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>STEP INPUTS &amp; CONFIGURATION</span>
                </div>
                <div className="space-y-1 text-[11px] text-[#E1DCC9]/70">
                  {Object.entries(selectedNode.inputs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                      <span className="text-[#E1DCC9]/50 min-w-[130px]">{key}:</span>
                      <span className="text-white font-mono break-all">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#412D15]/80 bg-[#1F150C] p-3.5 space-y-2">
                <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>REAL-TIME OUTPUT PAYLOAD</span>
                </div>
                <div className="space-y-1 text-[11px] text-[#E1DCC9]/70">
                  {Object.entries(selectedNode.outputs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                      <span className="text-[#E1DCC9]/50 min-w-[130px]">{key}:</span>
                      <span className="text-emerald-300 font-mono break-all">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OUTLOOK EMAIL REPORT PREVIEW (Actual Result from Microsoft Outlook Email Notification) */}
      {activeTab === 'sample-report' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#412D15] bg-[#160E08] p-4 text-xs font-mono text-[#E1DCC9]/70 flex items-center justify-between">
            <div>
              <span className="text-[#E1DCC9]/50 block text-[10px] uppercase">Notification Target</span>
              <span>Destination: <strong>Microsoft Outlook &gt; Roving ITS &amp; Stakeholders Distribution</strong></span>
            </div>
            <span className="text-sky-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>STATUS: DISPATCHED (200 OK)</span>
            </span>
          </div>

          {/* Microsoft Outlook Message Card (Actual Result) */}
          <div className="max-w-3xl mx-auto rounded-xl border border-[#30363D] bg-[#161B22] p-5 sm:p-7 shadow-2xl text-[#E1E1E1] space-y-5 font-sans select-text">
            {/* Outlook Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363D] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0078D4] text-white flex items-center justify-center font-bold text-base shadow-lg relative">
                  <Mail className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded bg-red-600 text-[8px] font-mono text-white font-bold">
                    !
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[9.5px] font-mono text-sky-300 uppercase font-semibold">
                      MICROSOFT OUTLOOK
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-red-950/70 border border-red-700/50 text-[9.5px] font-mono text-red-300 uppercase font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      HIGH IMPORTANCE
                    </span>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white mt-1">
                    [Roving ITS] STORE VISIT CHECKLIST – APPROVED ✅ | Prince Talisay
                  </h3>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-[#8B949E]">
                <div>Oct 23, 2026, 4:15 PM</div>
                <div className="text-[10px] text-emerald-400">Automated Mail Broadcast</div>
              </div>
            </div>

            {/* Email Metadata Envelope (From, To, Cc, Subject) */}
            <div className="rounded-lg border border-[#30363D]/80 bg-[#0D1117] p-3.5 text-xs font-mono space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                <span className="sm:col-span-2 text-[#8B949E] uppercase text-[10px]">From:</span>
                <span className="sm:col-span-10 text-white font-medium flex items-center gap-2 flex-wrap">
                  <span>Power Automate &lt;powerautomate-noreply@microsoft.com&gt;</span>
                  <span className="text-[#8B949E] text-[10px] font-normal">on behalf of</span>
                  <span className="text-amber-400 font-semibold">Dante Custodio Jr.</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                <span className="sm:col-span-2 text-[#8B949E] uppercase text-[10px]">To:</span>
                <span className="sm:col-span-10 text-[#C9D1D9] break-all">
                  Roving ITS Support Team &lt;roving-its-team@princeretail.com&gt;; IT Operations &lt;itsupport-operations@princeretail.com&gt;
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                <span className="sm:col-span-2 text-[#8B949E] uppercase text-[10px]">Cc:</span>
                <span className="sm:col-span-10 text-[#8B949E] break-all">
                  dantecustodio13@gmail.com; store.operations@princeretail.com
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 border-t border-[#30363D]/60 pt-1.5">
                <span className="sm:col-span-2 text-[#8B949E] uppercase text-[10px]">Subject:</span>
                <span className="sm:col-span-10 text-white font-bold">
                  [Roving ITS] STORE VISIT CHECKLIST – APPROVED ✅ | Prince Talisay
                </span>
              </div>
            </div>

            {/* Email Body: Clean, High-Contrast Formatted Report */}
            <div className="rounded-xl border border-[#30363D] bg-[#0E131A] p-5 sm:p-6 space-y-5 text-xs sm:text-[13px] leading-relaxed text-[#EDEDED] font-mono shadow-inner">
              {/* 1. Header Banner */}
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-between">
                <div className="font-bold text-sm sm:text-base text-white tracking-wide flex items-center gap-2">
                  <span>📋</span>
                  <span>STORE VISIT CHECKLIST – APPROVED ✅</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono text-[10px] font-bold uppercase border border-emerald-500/40">
                  VERIFIED REPORT
                </span>
              </div>

              {/* 2. VISIT DETAILS */}
              <div className="space-y-1.5 bg-[#141A22] p-3.5 rounded-lg border border-[#30363D]/60">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-400">
                  <span>📍</span>
                  <span>VISIT DETAILS</span>
                </div>
                <div className="space-y-1 text-[#CCCCCC] pl-5 text-xs sm:text-[12.5px]">
                  <div>Store: <strong className="text-white font-semibold">Prince Talisay</strong></div>
                  <div>Entrance Date: <span className="text-white">2026-10-23</span></div>
                  <div>Exit Date: <span className="text-white">2026-10-23</span></div>
                  <div>Visit Duration: <span className="text-white font-semibold px-1.5 py-0.5 rounded bg-[#1F2937] text-amber-300">1Days</span></div>
                </div>
              </div>

              {/* 3. TICKET UPDATES */}
              <div className="space-y-1.5 bg-[#141A22] p-3.5 rounded-lg border border-[#30363D]/60">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider text-purple-400">
                  <span>🎟️</span>
                  <span>TICKET UPDATES</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pl-5 max-w-sm pt-1">
                  <div className="p-2 rounded bg-emerald-950/50 border border-emerald-700/50 text-center">
                    <span className="text-[10px] text-emerald-400 uppercase block font-semibold">Resolved</span>
                    <span className="text-base font-bold text-white">2</span>
                  </div>
                  <div className="p-2 rounded bg-amber-950/50 border border-amber-700/50 text-center">
                    <span className="text-[10px] text-amber-400 uppercase block font-semibold">Pending</span>
                    <span className="text-base font-bold text-white">8</span>
                  </div>
                </div>
              </div>

              {/* 4. URGENT CONCERNS & TICKET STATUS */}
              <div className="space-y-3 bg-[#141A22] p-3.5 rounded-lg border border-[#30363D]/60">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-400">
                    <span>⚠️</span>
                    <span>URGENT CONCERNS</span>
                  </div>
                  <div className="font-bold text-white tracking-wide text-[11px] mt-0.5">
                    TICKET STATUS
                  </div>
                </div>

                {/* Ticket 1 */}
                <div className="space-y-0.5 pl-3 border-l-2 border-amber-500/80 py-0.5 bg-[#1A1F29]/60 rounded-r p-2">
                  <div className="font-bold text-white text-[12px] sm:text-xs">
                    1. Ticket #472123 — Internet Connection Assessment &amp; Resolution (Store Audit Finding)
                  </div>
                  <div className="text-[#BDBDBD] text-[11.5px]">
                    Status: <span className="text-amber-300 font-semibold">Ongoing</span> — Request approved; PR creation in progress
                  </div>
                </div>

                {/* Ticket 2 */}
                <div className="space-y-0.5 pl-3 border-l-2 border-emerald-500/80 py-0.5 bg-[#1A1F29]/60 rounded-r p-2">
                  <div className="font-bold text-white text-[12px] sm:text-xs">
                    2. Ticket #469715 — Biometrics Device Replacement
                  </div>
                  <div className="text-[#BDBDBD] text-[11.5px]">
                    PR created: <span className="text-white">October 18, 2026</span> — <strong className="text-emerald-300">PR85275 ✅</strong>
                  </div>
                  <div className="text-[#BDBDBD] text-[11.5px]">
                    Next step: Follow up with Procurement for PO creation
                  </div>
                </div>
              </div>

              {/* 5. PENDING ISSUES AND NEXT STEPS */}
              <div className="space-y-2 bg-[#141A22] p-3.5 rounded-lg border border-[#30363D]/60">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider text-sky-400">
                  <span>📢</span>
                  <span>PENDING ISSUES AND NEXT STEPS</span>
                </div>
                <div className="space-y-1.5 text-[#CCCCCC] text-[11.5px] pl-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-bold">1.</span>
                    <span>#466125 — Print head in transit ➔ Complete next week</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-bold">2.</span>
                    <span>#470755 — Cash drawer ➔ Start approval process</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-bold">3.</span>
                    <span>#472418 — TLY print head ➔ Waiting Sir June for PR (task sent 10/23)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-bold">4.</span>
                    <span>#472786 — Zebra print head ➔ For PR creation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-bold">5.</span>
                    <span>#474275 — Keyboard ➔ On-site check: 1st week Nov</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-bold">6.</span>
                    <span>#474280 — POS relocation ➔ Verify layout with CSS</span>
                  </div>
                </div>
              </div>

              {/* 6. Link & Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href="#checklist-report"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0078D4] hover:bg-[#106EBE] text-white font-semibold text-xs sm:text-[13px] transition-colors shadow-md w-fit"
                >
                  <Inbox className="w-4 h-4" />
                  <span>Open ITS Store Visit Checklist Report ↗</span>
                </a>
                <span className="text-[11px] text-[#8B949E] font-mono">
                  Prince Retail Group M365 Lists Service
                </span>
              </div>

              {/* 7. Sign-off */}
              <div className="pt-4 border-t border-[#30363D] space-y-1">
                <div className="text-[#CCCCCC] flex items-center gap-1.5">
                  <span>Best Regards,</span>
                  <span>🤠</span>
                </div>
                <div className="font-bold text-[#E89E53] text-sm">
                  Dante Custodio Jr.
                </div>
                <div className="text-[11px] text-[#8B949E]">
                  Supervisor - Client Support | Prince Retail Group of Companies
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
            <span>Reference Workflow Diagram: <strong>Power Automate Cloud Flow Snapshot (Send an email V2)</strong></span>
            <span className="text-amber-400">ORIGINAL SOURCE SCREENSHOT</span>
          </div>

          <div className="rounded-xl border border-[#412D15] overflow-hidden bg-[#0A0704] p-4 flex items-center justify-center shadow-2xl">
            <img
              src="/assets/aistudio/improved_workflow_diagram_d620cf79.webp"
              alt="Power Automate Email Flow Reference"
              className="max-h-[640px] w-auto object-contain rounded-lg border border-[#412D15]/80 shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};
