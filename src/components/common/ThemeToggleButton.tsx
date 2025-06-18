import * as React from 'react';
import { ThemeContextInterface } from '../../ThemeContext';

export const ThemeToggleButton: React.FC<ThemeContextInterface> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="px-1 rounded dark:bg-gray-200 bg-gray-800 dark:text-black text-white"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
