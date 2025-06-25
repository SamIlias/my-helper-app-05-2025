import * as React from 'react';
import { useTheme } from '../../app/ThemeProvider';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-1 rounded cursor-pointer bg-stone-600 text-white dark:bg-stone-200  dark:text-black border "
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
