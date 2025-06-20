import * as React from 'react';
import { useTheme } from '../../app/ThemeProvider';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-1 rounded dark:bg-gray-200 bg-gray-800 dark:text-black text-white"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
