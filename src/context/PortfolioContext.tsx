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

const CURSOR_STORAGE_KEY = 'decstudio_cursor_enabled';
const MOTION_STORAGE_KEY = 'decstudio_reduced_motion';

const readStoredBoolean = (key: string, fallback: boolean) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === 'true';
  } catch {
    return fallback;
  }
};

const writeStoredBoolean = (key: string, value: boolean) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Preferences still work for the current page when storage is unavailable.
  }
};

const getInitialData = (): PortfolioConfig => {
  // Always enforce official initialPortfolioData containing the 3 verified production projects
  return initialPortfolioData;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioConfig>(getInitialData);
  const [activeSection, setActiveSection] = useState<string>('home');

  const [isCursorEnabled, setIsCursorEnabledState] = useState<boolean>(() =>
    typeof window === 'undefined' ? true : readStoredBoolean(CURSOR_STORAGE_KEY, true)
  );

  const [isReducedMotion, setIsReducedMotionState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(MOTION_STORAGE_KEY);
      return saved === null
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : saved === 'true';
    } catch {
      return false;
    }
  });

  const setIsCursorEnabled = useCallback((enabled: boolean) => {
    setIsCursorEnabledState(enabled);
    writeStoredBoolean(CURSOR_STORAGE_KEY, enabled);
  }, []);

  const setIsReducedMotion = useCallback((enabled: boolean) => {
    setIsReducedMotionState(enabled);
    writeStoredBoolean(MOTION_STORAGE_KEY, enabled);
  }, []);

  const updateData = useCallback((newData: PortfolioConfig) => {
    setData(newData);
  }, []);

  const resetData = useCallback(() => {
    setData(initialPortfolioData);
  }, []);

  // Synchronize reduced-motion preference with the document root class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isReducedMotion) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
    }
  }, [isReducedMotion]);

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
