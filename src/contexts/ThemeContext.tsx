
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

const accentColorMap: Record<AccentColor, { hex: string; hsl: string }> = {
  blue: { hex: '#3b82f6', hsl: '217 91% 60%' },
  purple: { hex: '#8b5cf6', hsl: '262 83% 58%' },
  green: { hex: '#10b981', hsl: '158 64% 52%' },
  orange: { hex: '#f97316', hsl: '20 90% 48%' },
  pink: { hex: '#ec4899', hsl: '322 65% 54%' },
  red: { hex: '#ef4444', hsl: '0 84% 60%' }
};

const applyAccentColor = (accentColor: AccentColor, isDark: boolean) => {
  const colorConfig = accentColorMap[accentColor];
  console.log('Applying accent color globally:', accentColor, colorConfig);
  
  const root = document.documentElement;
  root.style.setProperty('--accent-color', colorConfig.hex);
  root.style.setProperty('--primary', colorConfig.hsl);
  root.style.setProperty('--primary-foreground', isDark ? '222.2 84% 4.9%' : '210 40% 98%');
  root.style.setProperty('--ring', colorConfig.hsl);
  
  // Also apply to sidebar colors for consistency
  root.style.setProperty('--sidebar-primary', colorConfig.hsl);
  root.style.setProperty('--sidebar-ring', colorConfig.hsl);
  
  // Force re-render by triggering a layout change
  root.style.setProperty('--accent-applied', Date.now().toString());
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

  // Apply theme on mount and theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Reapply accent color when theme changes
    applyAccentColor(accentColor, isDark);
  }, [isDark, accentColor]);

  // Apply accent color when it changes
  useEffect(() => {
    applyAccentColor(accentColor, isDark);
    localStorage.setItem('accent-color', accentColor);
  }, [accentColor, isDark]);

  // Apply colors immediately on mount
  useEffect(() => {
    applyAccentColor(accentColor, isDark);
  }, []);

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
