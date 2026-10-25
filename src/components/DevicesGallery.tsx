import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Laptop,
  CreditCard,
  Printer,
  ScanBarcode,
  Tag,
  Network,
  Wifi,
  Server,
  Smartphone,
  HardDrive,
  ScanLine,
  Search,
  X,
  ChevronRight,
  Image as ImageIcon,
  Cpu,
  Layers,
  SlidersHorizontal,
  ChevronLeft,
} from 'lucide-react';
import {
  DeviceItem,
  DeviceCategory,
  deviceAssetUrl,
  deviceCategories,
  initialDevicesData,
} from '../data/devicesData';

const DEVICE_PAGE_SIZE = 9;

// Helper to map icon name to Lucide component
const renderDeviceIcon = (iconName: string, className = 'w-6 h-6') => {
  switch (iconName) {
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Printer':
      return <Printer className={className} />;
    case 'ScanBarcode':
      return <ScanBarcode className={className} />;
    case 'Tag':
      return <Tag className={className} />;
    case 'Network':
      return <Network className={className} />;
    case 'Wifi':
      return <Wifi className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'HardDrive':
      return <HardDrive className={className} />;
    case 'ScanLine':
      return <ScanLine className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

/**
 * Enhanced Device Media Presentation Component
 * Adopts the DECStudio luxury technical aesthetic:
 * Deep brown/black studio backing, subtle warm radial spotlight, CAD ticks, and elevation shadow.
 */
interface DeviceMediaProps {
  device: DeviceItem;
  isLarge?: boolean;
}

const DeviceMedia: React.FC<DeviceMediaProps> = ({ device, isLarge = false }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(device.image);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImgSrc(device.image);
    setImageError(false);
  }, [device.image]);

  const handleImageError = () => {
    // If the trimmed version fails, fallback to the original user asset
    if (imgSrc && imgSrc.includes('hp_flex_pro_ready')) {
      setImgSrc(deviceAssetUrl('/assets/aistudio/image_7e7bc175.png'));
    } else if (imgSrc && imgSrc.includes('epson_l3210_ready')) {
      setImgSrc(deviceAssetUrl('/assets/aistudio/image_c7308172.png'));
    } else {
      setImageError(true);
    }
  };

  // If a device photograph exists, showcase it on a studio pedestal
  if (imgSrc && imgSrc.trim() !== '' && !imageError) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#0D0905] flex items-center justify-center ${isLarge ? 'p-4 sm:p-5' : 'p-2'} select-none ${
          isLarge ? 'min-h-[280px] sm:min-h-[360px]' : 'min-h-[96px] sm:min-h-[112px]'
        }`}
      >
        {/* Subtle studio glow in warm DECStudio tone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#412D15]/40 via-[#1A1108]/30 to-black pointer-events-none" />

        {/* Engineering CAD grid overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #412D15 1px, transparent 1px),
              linear-gradient(to bottom, #412D15 1px, transparent 1px)
            `,
            backgroundSize: isLarge ? '20px 20px' : '14px 14px',
          }}
        />

        {/* Corner CAD Alignment Crosshairs */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#E1DCC9]/40 pointer-events-none z-10" />
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#E1DCC9]/40 pointer-events-none z-10" />
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#E1DCC9]/40 pointer-events-none z-10" />
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#E1DCC9]/40 pointer-events-none z-10" />

        {/* Top subtle category watermark */}
        <div className="absolute top-3 left-3 z-10 text-[9px] font-mono text-[#E1DCC9]/50 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{device.category}</span>
        </div>

        {/* Device Image Centered with studio lighting shadow */}
        <div className="relative z-10 w-full h-full flex items-center justify-center max-w-[92%] max-h-[92%]">
          <img
            src={imgSrc}
            alt={device.title}
            onError={handleImageError}
            className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Bottom subtle model watermark */}
        <div className="absolute bottom-2 right-3 z-10 text-[9px] font-mono text-[#E1DCC9]/40">
          <span>HARDWARE REGISTERED</span>
        </div>
      </div>
    );
  }

  // Otherwise render the technical CAD blueprint placeholder
  return (
    <div
      className={`relative w-full h-full bg-[#0E0A06] overflow-hidden select-none flex flex-col justify-between ${isLarge ? 'p-4' : 'p-2'} ${
        isLarge ? 'min-h-[260px] sm:min-h-[320px]' : 'min-h-[96px] sm:min-h-[112px]'
      }`}
    >
      {/* Background Engineering Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #412D15 1px, transparent 1px),
            linear-gradient(to bottom, #412D15 1px, transparent 1px)
          `,
          backgroundSize: isLarge ? '20px 20px' : '14px 14px',
        }}
      />

      {/* Radial subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#412D15]/25 via-transparent to-transparent pointer-events-none" />

      {/* Technical Corner Crop Marks */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#E1DCC9]/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#E1DCC9]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#E1DCC9]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#E1DCC9]/40 pointer-events-none" />

      {/* Top Header inside Placeholder */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#E1DCC9]/60">
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-pulse" />
          <span>{device.category}</span>
        </span>
        <span className="px-1.5 py-0.5 rounded border border-[#412D15] bg-[#160E08] text-[9px] text-[#E1DCC9]/70">
          HARDWARE SLOT
        </span>
      </div>

      {/* Center Icon & Technical Frame */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div
          className={`relative rounded-2xl border border-[#412D15] bg-[#1B120A]/90 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:border-[#E1DCC9]/40 ${
            isLarge ? 'w-20 h-20 text-[#E1DCC9]' : 'w-14 h-14 text-[#E1DCC9]/90'
          }`}
        >
          <div className="absolute inset-1 rounded-xl border border-dashed border-[#412D15]/70 pointer-events-none" />
          {renderDeviceIcon(device.iconName, isLarge ? 'w-10 h-10' : 'w-7 h-7')}
        </div>

        <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dashed border-[#412D15] bg-black/50 text-[10px] font-mono text-[#E1DCC9]/60">
          <ImageIcon className="w-3 h-3 text-[#E1DCC9]/50" />
          <span>Image Placeholder</span>
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#E1DCC9]/40 border-t border-[#412D15]/40 pt-1.5">
        <span className="truncate max-w-[170px]">{device.title}</span>
        <span>READY FOR PHOTO</span>
      </div>
    </div>
  );
};

export const DevicesGallery: React.FC = () => {
  const [devices] = useState<DeviceItem[]>(initialDevicesData);
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalDevice, setActiveModalDevice] = useState<DeviceItem | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard listener for ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalDevice) {
        setActiveModalDevice(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalDevice]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: devices.length,
    };
    deviceCategories.forEach((cat) => {
      if (cat.filterCategory !== 'All') {
        counts[cat.filterCategory] = devices.filter(
          (d) => d.category === cat.filterCategory
        ).length;
      }
    });
    return counts;
  }, [devices]);

  // Only display categories that contain verified devices (or 'All')
  const activeCategories = useMemo(() => {
    return deviceCategories.filter(
      (cat) => cat.filterCategory === 'All' || (categoryCounts[cat.filterCategory] ?? 0) > 0
    );
  }, [categoryCounts]);

  // Filtered devices list based on category & search query
  const filteredDevices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return devices.filter((device) => {
      const categoryMatch =
        selectedCategory === 'All' || device.category === selectedCategory;

      if (!categoryMatch) return false;
      if (!q) return true;

      const titleMatch = device.title.toLowerCase().includes(q);
      const descMatch = device.description.toLowerCase().includes(q);

      return titleMatch || descMatch;
    });
  }, [devices, selectedCategory, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredDevices.length / DEVICE_PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageDevices = filteredDevices.slice(
    (safePage - 1) * DEVICE_PAGE_SIZE,
    safePage * DEVICE_PAGE_SIZE
  );
  const firstVisibleDevice = filteredDevices.length === 0 ? 0 : (safePage - 1) * DEVICE_PAGE_SIZE + 1;
  const lastVisibleDevice = Math.min(safePage * DEVICE_PAGE_SIZE, filteredDevices.length);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div id="devices-gallery" className="space-y-5 pt-3">
      {/* Subsection Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#412D15]/40 pb-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#1A120B] border border-[#412D15] text-[10px] font-mono text-[#E1DCC9]/90">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Hardware & Infrastructure Portfolio</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#E1DCC9]">
            IT Devices & Equipment Gallery
          </h3>
          <p className="text-[11px] sm:text-xs text-[#E1DCC9]/70 font-mono max-w-2xl">
            Hands-on hardware, point-of-sale systems, network topology equipment, and office computer devices deployed across branch operations.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto text-[11px] font-mono text-[#E1DCC9]/70 bg-[#160E08] px-2.5 py-1 rounded-lg border border-[#412D15]">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span aria-live="polite">
            Showing <strong className="text-[#E1DCC9]">{firstVisibleDevice}–{lastVisibleDevice}</strong> of{' '}
            <strong className="text-[#E1DCC9]">{filteredDevices.length}</strong> devices
          </span>
        </div>
      </div>

      {/* Gallery Controls: Search & Category Filter Buttons */}
      <div className="space-y-2.5">
        {/* Search Field */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E1DCC9]/50" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search devices by title or description..."
              className="w-full pl-9 pr-9 py-1.5 rounded-lg border border-[#412D15] bg-[#120B06] text-xs text-[#E1DCC9] placeholder:text-[#E1DCC9]/40 focus:outline-none focus:border-[#E1DCC9] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E1DCC9]/50 hover:text-[#E1DCC9] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-[#E1DCC9]/50 flex items-center gap-1.5 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Title &amp; Description Registry</span>
          </div>
        </div>

        {/* Category Filter Buttons Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#412D15]">
          <div className="flex items-center gap-1.5 text-xs font-mono shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E1DCC9]/50 mr-1" />
            <span className="text-[#E1DCC9]/50 hidden sm:inline mr-1">Filter:</span>
          </div>

          <div className="flex items-center gap-2 flex-nowrap shrink-0">
            {activeCategories.map((cat) => {
              const isActive = selectedCategory === cat.filterCategory;
              const count = categoryCounts[cat.filterCategory] ?? 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.filterCategory)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1 shrink-0 ${
                    isActive
                      ? 'bg-[#412D15] text-[#E1DCC9] border border-[#E1DCC9]/50 shadow-md font-semibold'
                      : 'bg-[#150E08] text-[#E1DCC9]/70 hover:text-[#E1DCC9] hover:bg-[#1E140C] border border-[#412D15]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-[#E1DCC9]/20 text-[#E1DCC9]'
                        : 'bg-black/50 text-[#E1DCC9]/50'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compact, paginated device cards */}
      {filteredDevices.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {pageDevices.map((device, index) => (
              <motion.article
                layout
                key={device.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                className="group rounded-xl border border-[#412D15] bg-[#160E08]/90 overflow-hidden flex flex-col hover:border-[#E1DCC9]/40 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                {/* Card Top / Visual Media Frame */}
                <div>
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect ${device.title}`}
                    onClick={() => setActiveModalDevice(device)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveModalDevice(device);
                      }
                    }}
                    className="relative w-full h-24 sm:h-28 border-b border-[#412D15] cursor-pointer overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#E1DCC9]"
                  >
                    <DeviceMedia device={device} />

                    {/* Subtle Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="px-2 py-1 rounded-md border border-[#E1DCC9]/60 bg-[#1F150C]/90 text-[10px] font-mono text-[#E1DCC9] shadow-lg flex items-center gap-1">
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Title & Description Only */}
                  <div className="p-3 space-y-1.5">
                    {/* Category Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#412D15] bg-black/60 text-[9px] font-mono text-[#E1DCC9]/80 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {device.category}
                      </span>
                    </div>

                    {/* Device Title */}
                    <h4
                      tabIndex={0}
                      role="button"
                      onClick={() => setActiveModalDevice(device)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveModalDevice(device);
                        }
                      }}
                      className="font-heading text-sm sm:text-[15px] font-bold text-[#E1DCC9] group-hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline leading-tight line-clamp-2"
                    >
                      {device.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[10px] sm:text-[11px] text-[#E1DCC9]/70 leading-snug font-sans line-clamp-2">
                      {device.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl border border-dashed border-[#412D15] bg-[#140D07]/50 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#1F150C] border border-[#412D15] flex items-center justify-center text-[#E1DCC9]/50">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-heading text-lg font-bold text-[#E1DCC9]">
              No matching IT devices found
            </h4>
            <p className="text-xs sm:text-sm text-[#E1DCC9]/60 max-w-md mx-auto font-mono">
              No devices matched your search &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-[#412D15] hover:bg-[#573d1e] border border-[#E1DCC9]/30 text-xs font-mono text-[#E1DCC9] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {filteredDevices.length > 0 && totalPages > 1 && (
        <nav className="flex items-center justify-center gap-3 pt-1" aria-label="Device gallery pages">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={safePage === 1}
            className="inline-flex items-center gap-1 rounded-md border border-[#412D15] px-2.5 py-1.5 text-[11px] font-mono text-[#E1DCC9]/80 transition-colors hover:bg-[#1F150C] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </button>
          <span className="text-[11px] font-mono text-[#E1DCC9]/60" aria-live="polite">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={safePage === totalPages}
            className="inline-flex items-center gap-1 rounded-md border border-[#412D15] px-2.5 py-1.5 text-[11px] font-mono text-[#E1DCC9]/80 transition-colors hover:bg-[#1F150C] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </nav>
      )}

      {/* Clean Detail Modal (Title and Description Only) */}
      <AnimatePresence>
        {activeModalDevice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalDevice(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="device-modal-title"
              className="relative w-full max-w-2xl rounded-2xl border border-[#412D15] bg-[#160E08] text-[#E1DCC9] shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#412D15] bg-[#1F150C]/90 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg border border-[#412D15] bg-black/60 text-[#E1DCC9]">
                    {renderDeviceIcon(activeModalDevice.iconName, 'w-5 h-5')}
                  </span>
                  <div>
                    <h3 id="device-modal-title" className="font-heading text-lg sm:text-xl font-bold text-[#E1DCC9]">
                      {activeModalDevice.title}
                    </h3>
                    <div className="text-[10px] font-mono text-[#E1DCC9]/60">
                      Category: {activeModalDevice.category}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalDevice(null)}
                  aria-label="Close device modal"
                  className="p-2 rounded-lg border border-[#412D15] bg-black/40 text-[#E1DCC9]/70 hover:text-white hover:bg-[#2A1E11] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto">
                {/* Large Preview Media Frame */}
                <div className="rounded-xl border border-[#412D15] overflow-hidden bg-black">
                  <DeviceMedia device={activeModalDevice} isLarge={true} />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/60 font-semibold">
                    Description
                  </h4>
                  <p className="text-xs sm:text-sm text-[#E1DCC9]/90 leading-relaxed font-sans">
                    {activeModalDevice.description}
                  </p>
                </div>
              </div>

              {/* Modal Footer Bar */}
              <div className="p-4 sm:p-5 border-t border-[#412D15] bg-[#1F150C] flex items-center justify-between shrink-0">
                <span className="text-[11px] font-mono text-[#E1DCC9]/50">
                  DECStudio IT Devices Gallery
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModalDevice(null)}
                  className="px-5 py-2 rounded-lg bg-[#412D15] hover:bg-[#573d1e] border border-[#E1DCC9]/30 text-xs font-mono font-medium text-[#E1DCC9] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
