/**
 * IT Devices & Hardware Gallery Data
 * Centralized data array for the DECStudio Experience: Devices Gallery.
 * Contains verified hardware devices with real photographic records.
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
  image: string; // Image URL or file path for active portfolio hardware
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
  { id: 'pos', label: 'POS', filterCategory: 'POS' },
  { id: 'printers', label: 'Printers', filterCategory: 'Printers' },
  { id: 'computers', label: 'Computers', filterCategory: 'Computers' },
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
    id: 'dev-epson-l3210',
    title: 'Epson EcoTank L3210 All-in-One Printer',
    category: 'Printers',
    description:
      'Multifunction ink tank printer with print, scan, and copy capabilities, ideal for everyday office and business document needs.',
    image: '/assets/aistudio/epson_l3210_ready.png',
    iconName: 'Printer',
  },
];
