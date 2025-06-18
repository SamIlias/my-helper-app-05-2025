import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export interface ThemeContextInterface {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to load theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

// Hook to use ThemeContext
export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
