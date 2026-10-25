/**
 * IT Devices & Hardware Gallery Data
 * Centralized data array for the DECStudio Experience: Devices Gallery.
 * Focused strictly on Title, Category, and Description as requested.
 */

export type DeviceCategory =
  | 'Computers'
  | 'POS'
  | 'Printers'
  | 'Networking'
  | 'Scanners'
  | 'Servers'
  | 'Other';

export interface DeviceItem {
  id: string;
  title: string;
  category: DeviceCategory;
  description: string;
  image?: string; // Optional image URL or file path. If empty, renders CAD placeholder.
  iconName:
    | 'Monitor'
    | 'Laptop'
    | 'CreditCard'
    | 'Printer'
    | 'ScanBarcode'
    | 'Tag'
    | 'Network'
    | 'Wifi'
    | 'Server'
    | 'Smartphone'
    | 'HardDrive'
    | 'ScanLine';
}

export const deviceCategories: { id: string; label: string; filterCategory: DeviceCategory | 'All' }[] = [
  { id: 'all', label: 'All Devices', filterCategory: 'All' },
  { id: 'computers', label: 'Computers', filterCategory: 'Computers' },
  { id: 'pos', label: 'POS', filterCategory: 'POS' },
  { id: 'printers', label: 'Printers', filterCategory: 'Printers' },
  { id: 'networking', label: 'Networking', filterCategory: 'Networking' },
  { id: 'scanners', label: 'Scanners', filterCategory: 'Scanners' },
  { id: 'servers', label: 'Servers', filterCategory: 'Servers' },
  { id: 'other', label: 'Other', filterCategory: 'Other' },
];

export const initialDevicesData: DeviceItem[] = [
  {
    id: 'dev-hp-flex-pro',
    title: 'HP Flex Pro i3-8100 Desktop Computer',
    category: 'POS',
    description:
      'HP Flex Pro desktop computer powered by an Intel Core i3-8100 processor, suitable for everyday office tasks, business applications, and general productivity.',
    image: '/assets/aistudio/hp_flex_pro_ready.png',
    iconName: 'Monitor',
  },
  {
    id: 'dev-pos-terminal',
    title: 'POS Terminal',
    category: 'POS',
    description:
      'All-in-one retail checkout POS systems installation, capacitive touch digitizer calibration, customer display syncing, and offline cache recovery.',
    image: '',
    iconName: 'CreditCard',
  },
  {
    id: 'dev-desktop-pc',
    title: 'Desktop Computer',
    category: 'Computers',
    description:
      'Enterprise workstation deployment, component-level hardware diagnostics, OS image rollout, and domain integration across retail back offices.',
    image: '',
    iconName: 'Monitor',
  },
  {
    id: 'dev-laptop',
    title: 'Laptop',
    category: 'Computers',
    description:
      'Business laptop management, mobile workforce readiness, VPN client configuration, battery health maintenance, and field hardware repairs.',
    image: '',
    iconName: 'Laptop',
  },
  {
    id: 'dev-thermal-printer',
    title: 'Thermal Receipt Printer',
    category: 'Printers',
    description:
      '80mm/58mm direct thermal receipt printer servicing, cutter blade jam release, printhead maintenance, baud rate DIP switch setup, and RJ11 kickout.',
    image: '',
    iconName: 'Printer',
  },
  {
    id: 'dev-zebra-printer',
    title: 'Zebra Label Printer',
    category: 'Printers',
    description:
      'Industrial and desktop thermal transfer label printer calibration, ZPL command formatting, gap/black mark sensor tuning, and shelf tag production.',
    image: '',
    iconName: 'Tag',
  },
  {
    id: 'dev-barcode-scanner',
    title: 'Barcode Scanner',
    category: 'Scanners',
    description:
      '1D/2D handheld and presentation barcode scanners configuration, symbology programming (UPC/EAN/Code 128), and scan engine calibration.',
    image: '',
    iconName: 'ScanBarcode',
  },
  {
    id: 'dev-pdt-handheld',
    title: 'Handheld PDT Device',
    category: 'Scanners',
    description:
      'Rugged Portable Data Terminal (PDT) and mobile computer provisioning, Wi-Fi roaming configuration, barcode engine tuning, and inventory cycle counting.',
    image: '',
    iconName: 'Smartphone',
  },
  {
    id: 'dev-network-switch',
    title: 'Network Switch',
    category: 'Networking',
    description:
      'Layer 2/Layer 3 managed rackmount switches installation, VLAN segmentation for POS and CCTV, PoE power budget auditing, and cable patch management.',
    image: '',
    iconName: 'Network',
  },
  {
    id: 'dev-wireless-ap',
    title: 'Wireless Access Point',
    category: 'Networking',
    description:
      'Enterprise dual-band wireless AP site mapping, 2.4/5GHz channel interference auditing, coverage heatmap survey, and seamless branch roaming.',
    image: '',
    iconName: 'Wifi',
  },
  {
    id: 'dev-server-rack',
    title: 'Server',
    category: 'Servers',
    description:
      '1U/2U rackmount server hardware health monitoring, hardware RAID rebuilds, redundant PSU failovers, IPMI/iDRAC management, and thermal management.',
    image: '',
    iconName: 'Server',
  },
  {
    id: 'dev-nas-storage',
    title: 'Network Attached Storage',
    category: 'Servers',
    description:
      'Centralized branch NAS storage configuration, automated local backup jobs, RAID data parity integrity, and snapshot disaster recovery schedules.',
    image: '',
    iconName: 'HardDrive',
  },
  {
    id: 'dev-flatbed-scanner',
    title: 'Document & Passport Scanner',
    category: 'Other',
    description:
      'High-speed auto-feeder (ADF) document scanner servicing, glass optical cleaning, TWAIN/WIA driver troubleshooting, and automated PDF scanning pipelines.',
    image: '',
    iconName: 'ScanLine',
  },
];
