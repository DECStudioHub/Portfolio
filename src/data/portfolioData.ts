/**
 * DECStudio Portfolio Data Configuration
 * Centralized, fully editable data file for Phase 1 — Version 1.0.1
 */

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  hoverColor: string;
  ariaLabel: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Development' | 'Android' | 'Software' | 'IT Tools' | 'Automation' | 'Creative Projects';
  tags?: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  status: 'Production' | 'Production Ready' | 'Active System' | 'Deployed' | 'Open Source' | 'In Development' | 'Completed';
  githubUrl?: string;
  liveUrl?: string;
  architectureNotes?: string;
  imageTheme: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Primary Stack", "Production Deployed", "Specialized"
    experience: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  type: string;
  overview?: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
  coreAreas?: string[];
}

export interface CareerProgressionItem {
  role: string;
  company: string;
  period: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  avatarText?: string;
}

export interface PortfolioConfig {
  version: string;
  brand: {
    name: string;
    tagline: string;
    footerSubtitle: string;
    copyrightYear: number;
  };
  profile: {
    name: string;
    headline: string;
    subHeadline: string;
    roleTag?: string;
    disclaimer?: string;
    introRoles: string[];
    supportingText: string;
    location: string;
    email: string;
    availability: string;
    avatarUrl?: string;
    formBoldId?: string;
  };
  background: {
    imageUrl: string;
    opacity: number;
    blur: number;
  };
  socials: SocialLink[];
  about: {
    tagline?: string;
    bio: string[];
    pillars: {
      title: string;
      subtitle: string;
      description: string;
    }[];
  };
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  careerProgression?: CareerProgressionItem[];
  professionalFocus?: string[];
  testimonials: TestimonialItem[];
}

export const initialPortfolioData: PortfolioConfig = {
  version: '1.0.1',
  brand: {
    name: 'DECStudio',
    tagline: 'Technical • Creative • Reliable • Modern • Minimalist • Professional',
    footerSubtitle: 'Web Developer • Android Developer • IT Tech Support • Content Creator',
    copyrightYear: 2026,
  },
  profile: {
    name: 'Dante Custodio Jr.',
    headline: "Hi, I'm Dante Custodio Jr.",
    subHeadline: 'Web Developer • Android Developer • IT Tech Support',
    roleTag: 'IT Client Support Supervisor - Team Lead at Prince Retail Group of Companies',
    disclaimer: '“I’m not a programmer. I’m a human with a bold imagination—and AI is the tool that brings my ideas to life.”',
    introRoles: [
      'Web Developer',
      'Android Developer',
      'IT Tech Support',
      'System Developer',
      'Content Creator',
    ],
    supportingText:
      'Building practical digital solutions, reliable systems, and creative technology experiences.',
    location: 'Philippines',
    email: 'decstudiohub@gmail.com',
    availability: 'Available for projects & collaboration',
    avatarUrl: '/PP.jpg',
    formBoldId: (import.meta as any).env?.VITE_FORMBOLD_ID || 'oJbpZ',
  },
  background: {
    imageUrl: '/dec.jpg',
    opacity: 65,
    blur: 0,
  },
  socials: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dante-escurido-custodio-jr-53421b145/',
      hoverColor: '#0A66C2',
      ariaLabel: 'DECStudio Dante Custodio Jr LinkedIn Profile',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/tuxcustodio',
      hoverColor: '#1877F2',
      ariaLabel: 'DECStudio Dante Custodio Jr Facebook Profile',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://www.youtube.com/@DECStudio_YTOfficialChannel',
      hoverColor: '#FF0000',
      ariaLabel: 'DECStudio Official YouTube Channel',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      url: 'https://www.tiktok.com/@decstudioofficial',
      hoverColor: '#25F4EE',
      ariaLabel: 'DECStudio TikTok Profile',
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/DECStudioHub',
      hoverColor: '#E1DCC9',
      ariaLabel: 'DECStudio GitHub Organization',
    },
  ],
  about: {
    tagline: 'IT Professional • Technology Innovator • Problem Solver',
    bio: [
      'I’m an IT Professional with extensive experience in IT operations, technical support, infrastructure, and team leadership across 27 retail branches, including 3 distribution centers and 24 stores in Negros and Panay.',
      'I specialize in solving technical challenges, improving business processes, and creating innovative solutions using modern technologies and AI tools—turning ideas into practical systems that help businesses work smarter, faster, and more efficiently.',
    ],
    pillars: [
      {
        title: 'Developer',
        subtitle: 'Web & Android Engineering',
        description:
          'Developing high-performance responsive web applications with React, TypeScript, and modern backend APIs, alongside native Android mobile solutions.',
      },
      {
        title: 'IT Professional',
        subtitle: 'Systems & Infrastructure',
        description:
          'Hands-on troubleshooting of hardware, networking, POS systems, enterprise devices, security configurations, and operational continuity.',
      },
      {
        title: 'Problem Solver',
        subtitle: 'System & Automation Logic',
        description:
          'Streamlining repetitive manual operations through custom batch scripts, API integrations, database workflows, and fault-tolerant system design.',
      },
      {
        title: 'Content Creator',
        subtitle: 'Digital Content & Studio Media',
        description:
          'Producing engaging technology content, visual media, technical tutorials, and creative brand experiences across YouTube, TikTok, and digital channels.',
      },
    ],
  },
  skills: [
    {
      title: 'Development',
      description: 'Client-side web architecture, interactive interfaces, and mobile applications.',
      skills: [
        { name: 'HTML5 / Semantic Markup', level: 'Production Core', experience: 'High standard standards & SEO' },
        { name: 'CSS3 / Tailwind CSS', level: 'Production Core', experience: 'Responsive UI, animations, themes' },
        { name: 'JavaScript (ESNext)', level: 'Production Core', experience: 'Modern asynchronous runtime' },
        { name: 'React & TypeScript', level: 'Production Core', experience: 'Component architecture & state' },
        { name: 'Node.js & Express', level: 'Full Stack', experience: 'REST APIs, server-side services' },
        { name: 'Android Development', level: 'Mobile Native', experience: 'Kotlin / Java, Android SDK' },
      ],
    },
    {
      title: 'Software Engineering',
      description: 'Robust architectures, database persistence, and system integrations.',
      skills: [
        { name: 'Application Development', level: 'Core Competency', experience: 'Full-cycle solution delivery' },
        { name: 'API Integration', level: 'Core Competency', experience: 'Third-party APIs & webhooks' },
        { name: 'Database Management', level: 'Practiced', experience: 'Relational & document data models' },
        { name: 'System Architecture', level: 'Engineering', experience: 'Modular & resilient patterns' },
        { name: 'Automation & Scripting', level: 'Workflow Optimization', experience: 'Automated batching & jobs' },
      ],
    },
    {
      title: 'IT Support & Operations',
      description: 'Enterprise hardware, network diagnostics, POS maintenance, and end-user support.',
      skills: [
        { name: 'Hardware Troubleshooting', level: 'Diagnostic Expert', experience: 'Desktops, laptops, peripherals' },
        { name: 'Software Troubleshooting', level: 'Diagnostic Expert', experience: 'OS configuration & diagnostics' },
        { name: 'Network Troubleshooting', level: 'Operational', experience: 'LAN/WAN, routing, DNS, switches' },
        { name: 'Printer & Peripheral Support', level: 'Operational', experience: 'Network & local printer setups' },
        { name: 'POS Support & Terminals', level: 'Specialized', experience: 'Retail POS, barcode scanners, sync' },
        { name: 'Device & Mobile Support', level: 'Operational', experience: 'Fleet device setup & MDM support' },
      ],
    },
    {
      title: 'Tools & Ecosystem',
      description: 'Everyday developer workflow tools, version control, and production software.',
      skills: [
        { name: 'Git & Version Control', level: 'Daily Workflow', experience: 'Branching, merging, rebasing' },
        { name: 'GitHub Ecosystem', level: 'Daily Workflow', experience: 'Repositories, issues, CI/CD' },
        { name: 'VS Code & Tooling', level: 'Configured', experience: 'Extensions, debugging, linters' },
        { name: 'AI Development Tools', level: 'Modernized', experience: 'Assisted prototyping & workflows' },
        { name: 'Microsoft 365 & Tools', level: 'Productivity', experience: 'Admin center, Office suites, cloud' },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-dec-system',
      title: 'DEC — Digital Efficiency & Continuity System',
      category: 'Web Development',
      tags: ['Web Development', 'IT Tools', 'Software', 'Automation'],
      shortDescription:
        'Enterprise Retail Inventory Count Tag, Shelf-Edge Labeling & Barcode Engine. A browser-based, offline-capable retail system designed to improve inventory counting, barcode generation, and precision printing.',
      fullDescription:
        'A browser-based, offline-capable retail system designed to improve inventory counting, barcode generation, Count Tag, Count Sheet, ShelfTag, and PP Tag printing. It addresses paper waste, manual locator entry, inconsistent print layouts, barcode scanning issues, and dependency on cloud-based tools.',
      features: [
        'Excel Import & Data Validation',
        'Intelligent 9 Tags/Page paper optimization',
        'Locator & SKU Barcode Generation',
        'Automatic Locator Grouping & A–Z Sorting',
        'Count Tag & Count Sheet Generation',
        'White ShelfTag & Yellow PP Tag Generator',
        'Millimeter-accurate Layout & Print Preview',
        'PDF Export & Browser Printing',
        'Local Backup & Restore',
      ],
      techStack: [
        'React 18',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Lucide React',
        'SheetJS (xlsx)',
        'JsBarcode',
        'jsPDF',
        'LocalStorage + JSON',
        'Offline-Capable / Client-Side',
      ],
      status: 'Production',
      liveUrl: 'https://prg-dec.vercel.app/',
      architectureNotes:
        'Excel Import → Data Validation → Data Processing → Module 1: PCOUNT W2W (Count Tag • Count Sheet • Locator Grouping • Barcode • 9-Tag Packing) | Module 2: ShelfTag / PP Tag (White Tag • Yellow Tag • Layout Editor • Print Preview) → Unified Rendering → Browser Print / PDF Export',
      imageTheme: 'dec-system',
    },
    {
      id: 'proj-wifi-hitmap',
      title: 'WiFi Signal Mapping & Network Infrastructure System',
      category: 'IT Tools',
      tags: ['IT Tools', 'Web Development', 'Software'],
      shortDescription:
        'A web-based application for visualizing WiFi coverage, mapping network equipment, and organizing WiFi survey data using interactive floor plans.',
      fullDescription:
        'A web-based application for visualizing WiFi coverage, mapping network equipment, and organizing WiFi survey data using interactive floor plans. Designed to help field IT engineers, network administrators, and technical teams survey wireless dead zones, map AP placements, trace MDF/IDF cabling, and generate comprehensive survey reports.',
      features: [
        'Interactive floor-plan mapping',
        'WiFi readings and heatmap visualization',
        'AP, MDF, IDF, and LAN cable mapping',
        'Project management and report generation',
      ],
      techStack: [
        'React',
        'JavaScript',
        'HTML5',
        'CSS',
        'Google AI Studio',
        'Vercel',
      ],
      status: 'Production',
      liveUrl: 'https://dec-it-pro-network-tools.vercel.app/',
      architectureNotes:
        'Modular, component-based web application with interactive mapping, data management, and reporting modules.',
      imageTheme: 'wifi-hitmap',
    },
    {
      id: 'proj-decstudiohub-suite',
      title: 'DECStudioHub — Offline Digital Utility Suite',
      category: 'Web Development',
      tags: ['Web Development', 'Software', 'IT Tools'],
      shortDescription:
        'A high-performance, privacy-first web utility suite consolidating a 15-tool canvas image studio, IT network calculators, and solar engineering engines entirely client-side.',
      fullDescription:
        'A privacy-focused, client-side digital utility and image processing web application built with React, TypeScript, and Tailwind CSS. It features a complete 15-tool canvas-based image studio—including resolution enhancement, bilateral denoising, and before/after split sliders—alongside specialized calculation engines for IT networking, solar system sizing, and electrical planning, running 100% in-browser with zero data egress.',
      features: [
        '15-Tool Canvas Image Studio (2×/4× upscale, bilateral denoising & split sliders)',
        'IT & Networking Suite (CIDR subnetting, IP analysis & Wi-Fi attenuation)',
        'Solar & Electrical Designer (PV array sizing, battery capacity & voltage drop)',
        'Motorcycle Telemetry & Financial Engines (Fuel economy, loan & tariff calculators)',
        'Privacy-First Architecture (100% client-side execution, zero data egress)',
      ],
      techStack: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'HTML5 Canvas API',
        'Lucide Icons',
        'Offline-First',
        'Vercel',
      ],
      status: 'Production',
      liveUrl: 'https://dec-studio-hub-digital-tool.vercel.app/',
      architectureNotes:
        '100% Client-Side Offline Architecture: React + Canvas API + Typed Arrays executing local image processing and calculation engines without server uploads or third-party telemetry.',
      imageTheme: 'decstudiohub-suite',
    },
  ],
  experience: [
    {
      id: 'exp-prince-supervisor',
      position: 'Client Support Supervisor',
      company: 'Prince Retail Group of Companies',
      location: 'Philippines',
      period: 'March 2022 – Present',
      type: 'Hybrid',
      overview:
        'Lead and oversee IT service operations supporting Prince Retail’s branch and distribution-center environments across Negros and Panay. Responsible for coordinating field IT support, maintaining reliable technology operations, and ensuring IT infrastructure supports continuous retail business operations.',
      responsibilities: [
        'Lead and coordinate Roving IT Operations across assigned branches and Distribution Centers.',
        'Supervise Client Support personnel and coordinate onsite and remote technical support activities.',
        'Oversee the installation, configuration, maintenance, and troubleshooting of IT hardware, software, network infrastructure, servers, POS systems, and business applications.',
        'Provide technical leadership and onsite IT support during new store openings, renovations, relocations, and technology deployments.',
        'Coordinate end-to-end IT requirements for store openings, including hardware deployment, network setup, system configuration, testing, validation, and operational handover.',
        'Monitor IT incidents, service requests, preventive maintenance activities, and field support performance.',
        'Support IT Service Management (ITSM) processes, including incident handling, service requests, task coordination, SLA monitoring, and root-cause analysis.',
        'Develop and improve operational workflows using Microsoft 365, SharePoint, Power Apps, Power Automate, Power BI, and service-management platforms.',
        'Develop dashboards, reports, checklists, and digital tools to improve IT visibility, service performance, asset monitoring, and operational efficiency.',
        'Analyze IT service and operational data to identify recurring issues, performance gaps, and opportunities for process improvement.',
        'Coordinate with internal departments, vendors, and business stakeholders to resolve technical issues and deliver IT requirements.',
        'Implement standardized procedures and documentation to improve consistency across geographically distributed locations.',
        'Participate in RCA, 5 Whys, corrective actions, preventive actions, and continuous improvement initiatives.',
        'Ensure IT systems and infrastructure remain secure, reliable, available, and aligned with business requirements.',
      ],
      technologies: [
        'IT Operations',
        'IT Service Management',
        'Team Leadership',
        'Roving IT Support',
        'Network Infrastructure',
        'Server Support',
        'POS Systems',
        'Store Opening Deployment',
        'Incident Management',
        'SLA Monitoring',
        'Root Cause Analysis',
        'Data Analysis',
        'Process Improvement',
        'Microsoft 365',
        'Power Platform',
      ],
      coreAreas: [
        'IT Operations',
        'IT Service Management',
        'Team Leadership',
        'Roving IT Support',
        'Network Infrastructure',
        'Server Support',
        'POS Systems',
        'Store Opening Deployment',
        'Incident Management',
        'SLA Monitoring',
        'Root Cause Analysis',
        'Data Analysis',
        'Process Improvement',
        'Microsoft 365',
        'Power Platform',
      ],
    },
    {
      id: 'exp-prince-lead',
      position: 'Senior Client Support Analyst – Team Lead',
      company: 'Prince Retail Group of Companies',
      location: 'Mandaue City, Cebu',
      period: 'March 2021 – February 2022',
      type: 'Remote',
      overview:
        'Provided senior-level technical support while serving as a team lead for Client Support operations. Coordinated technical issues, field activities, and service requests while assisting in the improvement of IT support processes.',
      responsibilities: [
        'Coordinated daily Client Support activities and technical escalations.',
        'Provided advanced troubleshooting for hardware, software, network, POS, and system-related incidents.',
        'Assisted in monitoring service performance, ticket resolution, and SLA compliance.',
        'Supported branch and Distribution Center IT operations through remote and onsite coordination.',
        'Assisted in IT documentation, reporting, troubleshooting procedures, and operational standardization.',
        'Served as a technical escalation point for complex incidents requiring deeper investigation.',
        'Supported continuous improvement initiatives within Client Support operations.',
      ],
      technologies: [
        'Technical Escalations',
        'Incident Management',
        'SLA Compliance',
        'POS Systems',
        'Network Infrastructure',
        'Standard Operating Procedures',
        'Team Leadership',
      ],
      coreAreas: [
        'Technical Escalations',
        'SLA Compliance',
        'POS & Hardware',
        'Team Leadership',
        'Continuous Improvement',
      ],
    },
    {
      id: 'exp-prince-analyst',
      position: 'Client Support Analyst',
      company: 'Prince Retail Group of Companies',
      location: 'Mandaue City, Cebu',
      period: 'February 2020 – March 2021',
      type: 'Remote',
      overview:
        'Provided centralized IT support and operational assistance for geographically distributed retail branches and Distribution Centers.',
      responsibilities: [
        'Managed and resolved IT incidents and service requests through service-management processes.',
        'Provided remote technical support for branch users, workstations, POS systems, network connectivity, and business applications.',
        'Monitored recurring incidents and identified opportunities for preventive action.',
        'Assisted in maintaining IT asset records and operational documentation.',
        'Supported reporting and data analysis for IT service performance.',
        'Developed and maintained digital tools and reports to improve operational visibility.',
        'Collaborated with field technicians and other support teams to resolve branch-level technical issues.',
      ],
      technologies: [
        'Centralized IT Support',
        'ITSM Processes',
        'Remote Troubleshooting',
        'Workstation & POS Support',
        'Asset Tracking',
        'Data Reporting & Dashboards',
        'Field Collaboration',
      ],
      coreAreas: [
        'Incident & Service Requests',
        'Remote Diagnostics',
        'Asset Tracking',
        'Reporting & Analytics',
      ],
    },
    {
      id: 'exp-prince-sr-tech',
      position: 'Senior Client Support Technician',
      company: 'Prince Retail Group of Companies',
      location: 'Mandaue City, Cebu',
      period: 'May 2019 – March 2020',
      type: 'Remote',
      overview:
        'Provided advanced technical support for retail branches and Distribution Centers, handling hardware, software, network, and systems-related issues.',
      responsibilities: [
        'Performed advanced troubleshooting and resolution of IT incidents.',
        'Supported branch networks, workstations, POS equipment, printers, servers, and peripheral devices.',
        'Conducted onsite and remote technical support activities.',
        'Assisted with infrastructure installations, equipment deployment, and system configuration.',
        'Coordinated technical escalations and vendor support when required.',
        'Maintained technical documentation and supported standard troubleshooting procedures.',
      ],
      technologies: [
        'Advanced Hardware Troubleshooting',
        'Branch Network Infrastructure',
        'Server & POS Support',
        'Thermal Printers & Peripherals',
        'Infrastructure Deployment',
        'Vendor Coordination',
      ],
      coreAreas: [
        'Hardware & Servers',
        'Network Systems',
        'POS & Peripherals',
        'Vendor Escalations',
      ],
    },
    {
      id: 'exp-prince-tech',
      position: 'Client Support Technician',
      company: 'Prince Retail Group of Companies',
      location: 'Mandaue City, Cebu',
      period: 'February 2018 – July 2019',
      type: 'Remote',
      overview:
        'Provided technical support to assigned retail branches and Distribution Centers, ensuring reliable day-to-day operation of IT equipment and business systems.',
      responsibilities: [
        'Troubleshot hardware, software, network, POS, printer, and peripheral issues.',
        'Performed workstation setup, configuration, maintenance, and deployment.',
        'Assisted with network and system installations at branch locations.',
        'Provided onsite technical support during branch operations and store activities.',
        'Maintained IT equipment and assisted in asset monitoring.',
        'Coordinated with senior support personnel for escalated technical issues.',
      ],
      technologies: [
        'Hardware Diagnostics',
        'Workstation Setup & Deployment',
        'Network Cabling & Patching',
        'POS Terminal Support',
        'Printer Maintenance',
        'Asset Monitoring',
      ],
      coreAreas: [
        'Workstation Setup',
        'Network Installation',
        'POS Support',
        'Hardware Diagnostics',
      ],
    },
    {
      id: 'exp-devlarn',
      position: 'IT Staff',
      company: 'Devlarn Ventures and Development Corporation',
      location: 'Mandaue City, Cebu',
      period: 'January 2018 – February 2018',
      type: 'On-site',
      overview:
        'Provided day-to-day technical support and IT assistance within the organization.',
      responsibilities: [
        'Provided hardware and software troubleshooting.',
        'Assisted with computer setup, configuration, and maintenance.',
        'Supported users with basic technical issues and IT requirements.',
        'Assisted in maintaining reliable operation of workplace IT equipment.',
      ],
      technologies: [
        'Desktop Support',
        'Computer Assembly & Configuration',
        'Software Troubleshooting',
        'Workplace IT Maintenance',
      ],
      coreAreas: ['Desktop Support', 'Hardware Setup', 'User Support'],
    },
    {
      id: 'exp-palmgrass',
      position: 'IT Staff / Graphics Designer / CCTV Operator',
      company: 'Cebu Palm Grass Hotel Incorporated',
      location: 'Cebu, Philippines',
      period: 'July 2016 – January 2018',
      type: 'On-site',
      overview:
        'Handled a combination of IT operations, technical support, digital graphics, and security-system monitoring within a hotel environment.',
      responsibilities: [
        'Provided technical support for computers, networks, printers, and other IT equipment.',
        'Assisted with network infrastructure, connectivity, and system troubleshooting.',
        'Managed and monitored CCTV/DVR security systems.',
        'Assisted in maintaining and troubleshooting surveillance equipment.',
        'Designed graphics and digital materials for hotel operations and promotions.',
        'Supported the hotel\'s website and WordPress-based content management.',
        'Assisted with general IT maintenance, configuration, and user support.',
        'Provided technical assistance to different hotel departments to maintain uninterrupted operations.',
      ],
      technologies: [
        'IT Technical Support',
        'Network Infrastructure',
        'CCTV / DVR Surveillance',
        'Graphic Design',
        'WordPress CMS',
        'Hospitality Systems',
      ],
      coreAreas: [
        'IT Operations',
        'CCTV Security Systems',
        'Digital Graphic Design',
        'WordPress & Web Content',
      ],
    },
  ],
  careerProgression: [
    {
      role: 'Client Support Supervisor',
      company: 'Prince Retail Group of Companies',
      period: '2022 – Present',
    },
    {
      role: 'Senior Client Support Analyst – Team Lead',
      company: 'Prince Retail Group of Companies',
      period: '2021 – 2022',
    },
    {
      role: 'Client Support Analyst',
      company: 'Prince Retail Group of Companies',
      period: '2020 – 2021',
    },
    {
      role: 'Senior Client Support Technician',
      company: 'Prince Retail Group of Companies',
      period: '2019 – 2020',
    },
    {
      role: 'Client Support Technician',
      company: 'Prince Retail Group of Companies',
      period: '2018 – 2019',
    },
    {
      role: 'IT Staff / Graphics Designer / CCTV Operator',
      company: 'Cebu Palm Grass Hotel Incorporated',
      period: '2016 – 2018',
    },
  ],
  professionalFocus: [
    'IT Operations',
    'IT Service Management',
    'Technical Support Leadership',
    'Retail IT Infrastructure',
    'Network & Server Support',
    'POS Systems',
    'Store Deployment',
    'Incident & Problem Management',
    'SLA & KPI Monitoring',
    'Data Analysis',
    'Process Automation',
    'Power Platform',
    'Asset Management',
    'Root Cause Analysis',
    'Continuous Improvement',
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Michael Santos',
      position: 'Operations Director',
      company: 'Retail Solutions Group',
      testimonial:
        'DECStudio diagnosed and resolved our retail POS network and hardware conflicts that had plagued us for weeks. Dante works with methodical precision and delivers solutions that last. Highly recommended for any technical requirement.',
      avatarText: 'MS',
    },
    {
      id: 'test-2',
      name: 'Grace Alvarez',
      position: 'Business Owner',
      company: 'Alvarez Commercial Enterprises',
      testimonial:
        'Working with Dante on our web portal and inventory system was seamless. He not only understands software engineering deeply but also translates technical concepts into practical, reliable tools for our everyday team.',
      avatarText: 'GA',
    },
    {
      id: 'test-3',
      name: 'Ryan David',
      position: 'Senior IT Project Manager',
      company: 'Nexus Tech Systems',
      testimonial:
        'Dante combines the discipline of an experienced IT support specialist with the creative engineering of a modern software developer. His automation scripts saved our department countless hours of manual work.',
      avatarText: 'RD',
    },
  ],
};
