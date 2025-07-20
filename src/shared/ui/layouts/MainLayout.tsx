import { Header } from '@/widgets/Header/Header';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className={`w-screen h-screen flex flex-col  
      bg-gradient-to-b from-white to-white dark:from-stone-950 dark:to-red-700/10`}
    >
      <header className="w-full h-24 bg-gradient-to-r from-stone-500 from-5% via-stone-600 via-20% to-stone-700 to-90% ">
        <Header />
      </header>

      <main className="w-full flex-1 p-2 overflow-hidden bg-stone-500/10 dark:bg-stone-100/10">
        {children}
      </main>
      <footer className="w-full h-6 text-sm bg-gradient-to-r from-stone-500 from-5% via-stone-600 via-20% to-stone-700 to-90% flex justify-end">
        <span className="px-4">
          Developed by Samovich Ilya. E-mail: Samovichilias19life@gmail.com
        </span>
      </footer>
    </div>
  );
};
