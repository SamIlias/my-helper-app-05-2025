import * as React from 'react';
import { MainLayout } from '@/shared/ui/layouts/MainLayout';
import { mainLayoutColors } from '@/shared/myStyles/myStyles';
import { TaskSection } from '@/pages/TodoPage/TaskSection';
import { CustomCalendar } from '@/widgets/Calendar/CustomCalendar';
import { useTranslation } from 'react-i18next';

export const TodoPage: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <MainLayout
      children={
        <main className="grid grid-cols-[3fr_1fr] h-full gap-2">
          <TaskSection />
          <aside className={`flex flex-col gap-2 h-full`}>
            <section className={`${mainLayoutColors.tilesBackground} h-fit p-3 `}>
              <CustomCalendar locale={i18n.language} />
            </section>

            <section className={`${mainLayoutColors.tilesBackground} flex-1 `}></section>
          </aside>
        </main>
      }
    />
  );
};
