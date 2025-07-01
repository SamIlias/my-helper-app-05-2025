import { LoginWidget } from '../Login/LoginWidget';
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton';
import { LanguageSelector } from '@/shared/ui/LanguageSelector';
import * as React from 'react';
import { HomeButton } from './HomeButton';

export const Header: React.FC = () => {
  return (
    <>
      <HomeButton />
      <div className="justify-self-end mr-[3vw]">
        <LoginWidget />

        <div className="relative flex gap-2 mt-1 justify-self-end">
          <ThemeToggleButton />
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};
