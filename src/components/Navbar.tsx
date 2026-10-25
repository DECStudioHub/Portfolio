import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { data, activeSection } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonial', label: 'Testimonial' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-[#412D15]/60 shadow-xl py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="group flex items-center gap-2"
        >
          <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#E1DCC9] group-hover:text-white transition-colors">
            {data.brand.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#412D15] group-hover:bg-[#E1DCC9] transition-colors" />
        </a>

        {/* Zone 2: 7 clean text navigation links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={`relative py-1 text-xs lg:text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#E1DCC9] font-semibold'
                    : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E1DCC9] rounded-full shadow-[0_0_8px_#E1DCC9]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Contact Direct Action Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 rounded-lg bg-[#412D15] hover:bg-[#523A1B] text-xs font-semibold text-[#E1DCC9] border border-[#E1DCC9]/20 transition-all hover:border-[#E1DCC9]/50 shadow-md"
          >
            Let's Connect
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-[#412D15] bg-[#1F150C]/80 text-[#E1DCC9] hover:bg-[#1F150C] transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-black/95 backdrop-blur-2xl border-b border-[#412D15] p-5 shadow-2xl transition-all">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className={`flex items-center justify-between py-2.5 text-sm font-medium tracking-wide border-b border-[#412D15]/40 transition-colors ${
                    isActive
                      ? 'text-[#E1DCC9] font-bold pl-2 border-l-2 border-l-[#E1DCC9]'
                      : 'text-[#E1DCC9]/70 hover:text-[#E1DCC9]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-[#E1DCC9]">●</span>}
                </a>
              );
            })}
          </nav>

          <div className="pt-4 mt-2">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-2.5 rounded-lg bg-[#412D15] text-xs font-semibold text-[#E1DCC9] text-center"
            >
              Contact DECStudio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
