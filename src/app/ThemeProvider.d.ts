import React from 'react';
type Theme = 'dark' | 'light';
export interface ThemeContextInterface {
    theme: Theme;
    toggleTheme: () => void;
}
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useTheme: () => ThemeContextInterface;
export {};
