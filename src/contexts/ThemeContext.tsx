
import React, { createContext, useContext, useState, useEffect } from 'react';

type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'red';

interface ThemeContextType {
  isDark: boolean;
  accentColor: AccentColor;
  setIsDark: (isDark: boolean) => void;
  setAccentColor: (color: AccentColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const accentColorMap: Record<AccentColor, string> = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  green: '#10b981',
  orange: '#f97316',
  pink: '#ec4899',
  red: '#ef4444'
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accent-color') as AccentColor;
      return saved || 'blue';
    }
    return 'blue';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const color = accentColorMap[accentColor];
    console.log('Applying accent color:', accentColor, color);
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accent-color', accentColor);
  }, [accentColor]);

  const setAccentColor = (color: AccentColor) => {
    console.log('ThemeContext: setAccentColor called with:', color);
    setAccentColorState(color);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{
      isDark,
      accentColor,
      setIsDark,
      setAccentColor,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
