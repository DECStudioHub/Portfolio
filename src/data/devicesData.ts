/**
 * IT Devices & Hardware Gallery Data
 * Centralized data array for the DECStudio Experience: Devices Gallery.
 * Contains verified hardware devices with real photographic records.
 */

export const deviceAssetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export type DeviceCategory =
  | 'Computers'
  | 'POS'
  | 'Printers'
  | 'Networking'
  | 'Scanners'
  | 'Servers'
  | 'UPS'
  | 'Biometric'
  | 'Cleaning Tools'
  | 'Mobile'
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
  { id: 'biometric', label: 'Biometric', filterCategory: 'Biometric' },
  { id: 'cleaning-tools', label: 'Cleaning Tools', filterCategory: 'Cleaning Tools' },
  { id: 'computers', label: 'Computers', filterCategory: 'Computers' },
  { id: 'mobile', label: 'Mobile', filterCategory: 'Mobile' },
  { id: 'networking', label: 'Networking', filterCategory: 'Networking' },
  { id: 'other', label: 'Other', filterCategory: 'Other' },
  { id: 'pos', label: 'POS', filterCategory: 'POS' },
  { id: 'printers', label: 'Printers', filterCategory: 'Printers' },
  { id: 'scanners', label: 'Scanners', filterCategory: 'Scanners' },
  { id: 'servers', label: 'Servers', filterCategory: 'Servers' },
  { id: 'ups', label: 'UPS', filterCategory: 'UPS' },
];

export const initialDevicesData: DeviceItem[] = [
  {
    id: 'dev-hp-flex-pro',
    title: 'HP Flex Pro i3-8100 Desktop Computer',
    category: 'POS',
    description:
      'HP Flex Pro desktop computer powered by an Intel Core i3-8100 processor, suitable for everyday office tasks, business applications, and general productivity.',
    image: deviceAssetUrl('/assets/aistudio/hp_flex_pro_ready.png'),
    iconName: 'Monitor',
  },
  {
    id: 'dev-epson-l3210',
    title: 'Epson EcoTank L3210 All-in-One Printer',
    category: 'Printers',
    description:
      'Multifunction ink tank printer with print, scan, and copy capabilities, ideal for everyday office and business document needs.',
    image: deviceAssetUrl('/assets/aistudio/epson_l3210_ready.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-brother-dcp-t520w',
    title: 'Brother DCP-T520W Wireless Ink Tank Printer',
    category: 'Printers',
    description:
      'Color ink tank printer with wireless Wi-Fi connectivity, print, scan, and copy functions, ideal for office and everyday document printing.',
    image: deviceAssetUrl('/assets/aistudio/Brother_DCP-T520W_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-epson-tm-u220b',
    title: 'Epson TM-U220B Impact Receipt Printer',
    category: 'Printers',
    description: 'Impact receipt printer designed for dependable point-of-sale printing in retail and service environments.',
    image: deviceAssetUrl('/assets/aistudio/Epson_TM-U220B_ec5d8b21_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-epson-wf-c869r',
    title: 'Epson WorkForce Pro WF-C869R Multifunction Printer',
    category: 'Printers',
    description: 'High-volume color multifunction printer for office printing, copying, and scanning.',
    image: deviceAssetUrl('/assets/aistudio/Epson_WF-C869R_86416e44_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-honeywell-7980g',
    title: 'Honeywell Genesis 7980g Presentation Scanner',
    category: 'Scanners',
    description: 'Hands-free presentation barcode scanner for fast checkout scanning of packaged and mobile barcodes.',
    image: deviceAssetUrl('/assets/aistudio/Honeywell_7980G_6b2c7223.webp'),
    iconName: 'ScanBarcode',
  },
  {
    id: 'dev-hp-rp5-5810',
    title: 'HP RP5 Retail System Model 5810',
    category: 'POS',
    description: 'Retail-ready desktop system for point-of-sale and store operations applications.',
    image: deviceAssetUrl('/assets/aistudio/HP_HP_RP5_Retail_System_Model_5810_049ef82f_cutout.png'),
    iconName: 'Monitor',
  },
  {
    id: 'dev-lenovo-ideapad-d330',
    title: 'Lenovo IdeaPad D330 2-in-1 Laptop',
    category: 'Computers',
    description: 'Detachable 2-in-1 laptop with tablet mode for mobile productivity and everyday computing.',
    image: deviceAssetUrl('/assets/aistudio/Lenovo_Ideapad_D330_2f59ac4a_cutout.png'),
    iconName: 'Laptop',
  },
  {
    id: 'dev-lenovo-thinksystem-st550',
    title: 'Lenovo ThinkSystem ST550 Tower Server',
    category: 'Servers',
    description: 'Business tower server for enterprise workloads, storage, and IT infrastructure applications.',
    image: deviceAssetUrl('/assets/aistudio/Lenovo_ThinkSystem_ST550_e67a31b2_cutout.png'),
    iconName: 'Server',
  },
  {
    id: 'dev-liebert-gxt4-6kva',
    title: 'Liebert GXT4 6kVA Online UPS',
    category: 'UPS',
    description: '6 kVA online uninterruptible power supply for backup power and conditioning for critical IT equipment.',
    image: deviceAssetUrl('/assets/aistudio/Liebert_GXT4_6KVA_b9633f8b_cutout.png'),
    iconName: 'HardDrive',
  },
  {
    id: 'dev-liebert-gxt5-10kva',
    title: 'Liebert GXT5 10kVA Online UPS',
    category: 'UPS',
    description: '10 kVA online UPS for protecting server and network equipment from power interruptions.',
    image: deviceAssetUrl('/assets/aistudio/Liebert_GXT5_10KVA_b275fc7f_cutout.png'),
    iconName: 'HardDrive',
  },
  {
    id: 'dev-liebert-gxt-mtplus-cx-3kva',
    title: 'Liebert GXT-MTPLUS CX 3kVA UPS',
    category: 'UPS',
    description: '3 kVA uninterruptible power supply for keeping connected equipment powered and protected during outages.',
    image: deviceAssetUrl('/assets/aistudio/Liebert_GXT-MTPLUS_CX_3KVA_85e0f55f_cutout.png'),
    iconName: 'HardDrive',
  },
  {
    id: 'dev-peplink-balance-one-core',
    title: 'Peplink Balance One Core Multi-WAN Router',
    category: 'Networking',
    description: 'Multi-WAN business router for internet connectivity, traffic management, and network failover.',
    image: deviceAssetUrl('/assets/aistudio/Peplink_Balance_One_Core_6d667151_cutout.png'),
    iconName: 'Network',
  },
  {
    id: 'dev-pole-display-vfd3010',
    title: 'EC Line VFD3010 Customer Pole Display',
    category: 'POS',
    description: 'Customer-facing VFD display for showing transaction details at point-of-sale counters.',
    image: deviceAssetUrl('/assets/aistudio/Pole_Display__VFD3010__EC_Line_136be7ff_cutout.png'),
    iconName: 'Monitor',
  },
  {
    id: 'dev-posiflex-hs-3514w-24',
    title: 'Posiflex HS-3514W-24 All-in-One POS Terminal',
    category: 'POS',
    description: 'Touchscreen all-in-one POS terminal for checkout transactions and retail applications.',
    image: deviceAssetUrl('/assets/aistudio/Posiflex_HS_3514W-24_2b54172e_cutout.png'),
    iconName: 'CreditCard',
  },
  {
    id: 'dev-posiflex-hs-6514w-14',
    title: 'Posiflex HS-6514W-14 POS Terminal',
    category: 'POS',
    description: 'Compact touchscreen POS terminal for retail checkout and customer transactions.',
    image: deviceAssetUrl('/assets/aistudio/Posiflex_HS_6514W-14_5393e2bb_cutout.png'),
    iconName: 'CreditCard',
  },
  {
    id: 'dev-posiflex-tx-5000',
    title: 'Posiflex TX-5000 Fanless POS Computer',
    category: 'POS',
    description: 'Compact fanless computer for point-of-sale, kiosk, and other business applications.',
    image: deviceAssetUrl('/assets/aistudio/Posiflex_TX-5000_f220f8bb.png'),
    iconName: 'Monitor',
  },
  {
    id: 'dev-sm320p-retail-scale',
    title: 'SM320P Retail Price Computing Scale',
    category: 'POS',
    description: 'Retail price-computing scale with an integrated keypad and customer-facing display.',
    image: deviceAssetUrl('/assets/aistudio/SM320P_00e6a13c_cutout.png'),
    iconName: 'CreditCard',
  },
  {
    id: 'dev-star-bsc10ud-24',
    title: 'Star BSC10UD-24 Thermal Receipt Printer',
    category: 'Printers',
    description: 'Thermal receipt printer for point-of-sale transactions and customer receipts.',
    image: deviceAssetUrl('/assets/aistudio/Star_BSC10UD-24_a663521b_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-symbol-ls-2208',
    title: 'Symbol LS2208 Handheld Barcode Scanner',
    category: 'Scanners',
    description: 'Handheld barcode scanner for retail checkout and everyday product scanning.',
    image: deviceAssetUrl('/assets/aistudio/Symbol_LS-2208_88b133e6_cutout.png'),
    iconName: 'ScanBarcode',
  },
  {
    id: 'dev-ws-sm230-scale',
    title: 'WS SM230 Retail Scale',
    category: 'POS',
    description: 'Electronic retail scale with a customer-facing display for weighing and checkout operations.',
    image: deviceAssetUrl('/assets/aistudio/WS_SM230_b372e224_cutout.png'),
    iconName: 'CreditCard',
  },
  {
    id: 'dev-zebra-mc22',
    title: 'Zebra MC22 Mobile Computer',
    category: 'Mobile',
    description: 'Rugged handheld mobile computer for barcode scanning and frontline store workflows.',
    image: deviceAssetUrl('/assets/aistudio/Zebra_MC22_fb5217ca_cutout.png'),
    iconName: 'Smartphone',
  },
  {
    id: 'dev-zebra-tc22',
    title: 'Zebra TC22 Mobile Computer',
    category: 'Mobile',
    description: 'Rugged Android mobile computer for barcode scanning, inventory, and mobile work.',
    image: deviceAssetUrl('/assets/aistudio/Zebra_TC22_7ba02a18_cutout.png'),
    iconName: 'Smartphone',
  },
  {
    id: 'dev-zebra-zt231',
    title: 'Zebra ZT231 Industrial Label Printer',
    category: 'Printers',
    description: 'Industrial label printer for shipping, inventory, and barcode labeling workflows.',
    image: deviceAssetUrl('/assets/aistudio/Zebra_ZT231_93461f73_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-zkteco-in01-a',
    title: 'ZKTeco IN01-A Biometric Time Attendance Terminal',
    category: 'Biometric',
    description: 'Biometric time-attendance terminal for employee clock-in and workplace access management.',
    image: deviceAssetUrl('/assets/aistudio/ZKTeco_IN01-A_881726dc_cutout.png'),
    iconName: 'ScanLine',
  },
  {
    id: 'dev-zebra-zt230',
    title: 'Zebra ZT230 Industrial Barcode Label Printer',
    category: 'Printers',
    description: 'Industrial barcode label printer for durable shipping and inventory labels.',
    image: deviceAssetUrl('/assets/aistudio/ZT230_6767abe0_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-ruijie-rg-ap820-l-v3',
    title: 'Ruijie RG-AP820-L(V3) Wireless Access Point',
    category: 'Networking',
    description: 'Business wireless access point for reliable indoor Wi-Fi coverage.',
    image: deviceAssetUrl('/assets/aistudio/Access_Point__RG-AP820-L_V3___Ruijie_d8e63ef3.png'),
    iconName: 'Wifi',
  },
  {
    id: 'dev-acer-travelmate-p214',
    title: 'Acer TravelMate P214 Business Laptop',
    category: 'Computers',
    description: 'Business laptop for everyday office work, productivity applications, and mobile use.',
    image: deviceAssetUrl('/assets/aistudio/Acer_TravelMate_p214_eeec7c7d_cutout.png'),
    iconName: 'Laptop',
  },
  {
    id: 'dev-aruba-ap-535',
    title: 'Aruba AP-535 Unified Wireless Access Point',
    category: 'Networking',
    description: 'Enterprise wireless access point for business Wi-Fi coverage and network connectivity.',
    image: deviceAssetUrl('/assets/aistudio/Aruba_AP-535_Unified__JZ336A__b007b05a_cutout.png'),
    iconName: 'Wifi',
  },
  {
    id: 'dev-stanley-blower',
    title: 'Stanley Portable Electric Blower',
    category: 'Cleaning Tools',
    description: 'Portable electric blower for clearing dust and debris during equipment and workspace maintenance.',
    image: deviceAssetUrl('/assets/aistudio/Blower_Stanley_cacb8b54_cutout.png'),
    iconName: 'HardDrive',
  },
  {
    id: 'dev-brother-dcp-t530dw',
    title: 'Brother DCP-T530DW Wireless Ink Tank Printer',
    category: 'Printers',
    description: 'Wireless color ink tank all-in-one printer for everyday printing, scanning, and copying.',
    image: deviceAssetUrl('/assets/aistudio/Brother_DCP-T530DW_203e23ae_cutout.png'),
    iconName: 'Printer',
  },
  {
    id: 'dev-clone-desktop',
    title: 'Clone Desktop Computer',
    category: 'Computers',
    description: 'Desktop tower for office applications, routine productivity tasks, and general computing.',
    image: deviceAssetUrl('/assets/aistudio/Clone_Desktop_2a0c3046_cutout.png'),
    iconName: 'Monitor',
  },
  {
    id: 'dev-datalogic-magellan-2200vs',
    title: 'Datalogic Magellan 2200VS Fixed Barcode Scanner',
    category: 'Scanners',
    description: 'Fixed presentation barcode scanner for hands-free product scanning at checkout counters.',
    image: deviceAssetUrl('/assets/aistudio/Datalogic_Magellan_2200VS_10ea6377_cutout.png'),
    iconName: 'ScanBarcode',
  },
  {
    id: 'dev-dell-latitude-3400',
    title: 'Dell Latitude 3400 Business Laptop',
    category: 'Computers',
    description: 'Dell business laptop for portable office work, collaboration, and everyday productivity.',
    image: deviceAssetUrl('/assets/aistudio/Dell_Latitude_3400_f22ee2a5_cutout.png'),
    iconName: 'Laptop',
  },
  {
    id: 'dev-dell-latitude-3420',
    title: 'Dell Latitude 3420 Business Laptop',
    category: 'Computers',
    description: 'Business laptop for workplace applications, collaboration, and mobile productivity.',
    image: deviceAssetUrl('/assets/aistudio/Dell_Latitude_3420_bbee569f_cutout.png'),
    iconName: 'Laptop',
  },
  {
    id: 'dev-dell-optiplex-3000',
    title: 'Dell OptiPlex 3000 Compact Desktop Computer',
    category: 'Computers',
    description: 'Compact desktop computer for business applications and everyday workplace tasks.',
    image: deviceAssetUrl('/assets/aistudio/DELL_Optiplex__3000_a5f84558_cutout.png'),
    iconName: 'Monitor',
  },
  {
    id: 'dev-epson-ds-530',
    title: 'Epson DS-530 Document Scanner',
    category: 'Scanners',
    description: 'Document scanner for capturing business paperwork, forms, and everyday office documents.',
    image: deviceAssetUrl('/assets/aistudio/Epson_DS-530_edd39449_cutout.png'),
    iconName: 'ScanLine',
  },
  {
    id: 'dev-epson-ds-530ii',
    title: 'Epson WorkForce DS-530II Document Scanner',
    category: 'Scanners',
    description: 'Desktop document scanner for digitizing office paperwork and business workflows.',
    image: deviceAssetUrl('/assets/aistudio/EPSON_DS530II_8d66d99b_cutout.png'),
    iconName: 'ScanLine',
  },
  {
    id: 'dev-epson-lx-310',
    title: 'Epson LX-310 Dot Matrix Printer',
    category: 'Printers',
    description: 'Impact dot matrix printer for invoices, multipart forms, and continuous paper.',
    image: deviceAssetUrl('/assets/aistudio/Epson_LX-310_7846c0bc_cutout.png'),
    iconName: 'Printer',
  },
];
