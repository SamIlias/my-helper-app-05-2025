import { LoginWidget } from '../Login/LoginWidget';
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton';
import { LanguageSelector } from '@/shared/ui/LanguageSelector';
import type { User } from 'firebase/auth';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { HomeButton } from './HomeButton';

type PropsType = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const Header: React.FC<PropsType> = ({ user, setUser }) => {
  return (
    <>
      <HomeButton />
      <div className="justify-self-end mr-[3vw]">
        <LoginWidget user={user} setUser={setUser} />

        <div className="relative flex gap-2 mt-1 justify-self-end">
          <ThemeToggleButton />
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};
