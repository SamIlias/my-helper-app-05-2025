import { Header } from '@/widgets/Header/Header';
import React from 'react';
import { mainLayoutColors, textColors } from '@/shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={`w-screen h-screen grid grid-rows-[96px_1fr_24px] overflow-hidden  
      bg-gradient-to-b from-white to-white dark:from-stone-950 dark:to-red-700/10`}
    >
      <header className={`w-full ${mainLayoutColors.primaryBackground}`}>
        <Header />
      </header>

      <main className={`w-full overflow-hidden p-2 ${mainLayoutColors.contentBackground}`}>
        {children}
      </main>
      <footer className={`w-full text-sm text-end ${mainLayoutColors.primaryBackground}`}>
        <span className={`px-4 ${textColors.main}`}>{t('developedBy')}</span>
      </footer>
    </div>
  );
};
