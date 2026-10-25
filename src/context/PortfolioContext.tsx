import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { initialPortfolioData, PortfolioConfig } from '../data/portfolioData';

interface PortfolioContextType {
  data: PortfolioConfig;
  updateData: (newData: PortfolioConfig) => void;
  resetData: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isCursorEnabled: boolean;
  setIsCursorEnabled: (enabled: boolean) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (enabled: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'decstudio_portfolio_data_v1';
const CURSOR_STORAGE_KEY = 'decstudio_cursor_enabled';
const MOTION_STORAGE_KEY = 'decstudio_reduced_motion';

const getInitialData = (): PortfolioConfig => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...initialPortfolioData,
        ...parsed,
        brand: { ...initialPortfolioData.brand, ...(parsed.brand || {}) },
        profile: { ...initialPortfolioData.profile, ...(parsed.profile || {}) },
        about: { ...initialPortfolioData.about, ...(parsed.about || {}) },
        background: { ...initialPortfolioData.background, ...(parsed.background || {}) },
      };
    }
  } catch (e) {
    console.error('Failed to load saved portfolio data from localStorage:', e);
  }
  return initialPortfolioData;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioConfig>(getInitialData);
  const [activeSection, setActiveSection] = useState<string>('home');

  const [isCursorEnabled, setIsCursorEnabledState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CURSOR_STORAGE_KEY);
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const [isReducedMotion, setIsReducedMotionState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(MOTION_STORAGE_KEY);
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const setIsCursorEnabled = useCallback((enabled: boolean) => {
    setIsCursorEnabledState(enabled);
    localStorage.setItem(CURSOR_STORAGE_KEY, String(enabled));
  }, []);

  const setIsReducedMotion = useCallback((enabled: boolean) => {
    setIsReducedMotionState(enabled);
    localStorage.setItem(MOTION_STORAGE_KEY, String(enabled));
  }, []);

  const updateData = useCallback((newData: PortfolioConfig) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to persist portfolio data to localStorage:', e);
    }
  }, []);

  const resetData = useCallback(() => {
    setData(initialPortfolioData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear portfolio data from localStorage:', e);
    }
  }, []);

  // Scroll spy to update active section in navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'testimonial', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        activeSection,
        setActiveSection,
        isCursorEnabled,
        setIsCursorEnabled,
        isReducedMotion,
        setIsReducedMotion,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
