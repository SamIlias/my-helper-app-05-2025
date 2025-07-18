import { LoginWidget } from '../Login/LoginWidget';
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton';
import { LanguageSelector } from '@/shared/ui/LanguageSelector';
import * as React from 'react';
import MainNav from '@/widgets/MainNavigation/MainNav';
import { Clock } from '@/shared/ui';
import { Logo } from '@/shared/ui/Logo';

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-full">
      <div className="flex w-1/3 h-full">
        <div className="flex items-center justify-center w-1/3">
          <Logo />
        </div>
        <nav className="flex w-2/3">
          <MainNav />
        </nav>
      </div>
      <div className="flex gap-10 justify-end items-center border h-full ">
        <Clock />
        <ThemeToggleButton />
        <LanguageSelector />
        <LoginWidget />
      </div>
    </div>
  );
};
