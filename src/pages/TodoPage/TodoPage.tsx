import * as React from 'react';
import { MainLayout } from '@/shared/ui/layouts/MainLayout';
import { mainLayoutColors } from '@/shared/myStyles/myStyles';
import { TaskSection } from '@/pages/TodoPage/TaskSection';

export const TodoPage: React.FC = () => {
  return (
    <MainLayout
      children={
        <main className="grid grid-cols-[3fr_1fr] h-full gap-2">
          <TaskSection />

          <aside className={`flex flex-col gap-2 h-full`}>
            <section className={`${mainLayoutColors.tilesBackground} h-48`}></section>

            <section
              className={`${mainLayoutColors.tilesBackground} overflow-auto h-96 `}
            ></section>

            <section className={`${mainLayoutColors.tilesBackground} flex-1 `}></section>
          </aside>
        </main>
      }
    />
  );
};
