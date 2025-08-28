import '@/index.css';
import * as React from 'react';
import { AiConversation } from '@/features/aiConversation';
import { MainLayout } from '@/shared/ui/layouts/MainLayout';
import { mainLayoutColors } from '@/shared/myStyles/myStyles';
import WeatherWidget from '@/widgets/Weather';
import NewsWidget from '@/widgets/News';
import { QuotesWidget } from '@/widgets/Quotes/QuotesWidget';

export const AssistantPage: React.FC = () => {
  return (
    <MainLayout
      children={
        <main className="grid grid-cols-[3fr_1fr] h-full gap-2">
          <section
            className={`h-full flex justify-center rounded-xs overflow-auto ${mainLayoutColors.tilesBackground}`}
          >
            <AiConversation />
          </section>

          <aside className={`flex flex-col gap-2 h-full`}>
            <section className={`${mainLayoutColors.tilesBackground} flex-1`}>
              <WeatherWidget />
            </section>

            <section className={`${mainLayoutColors.tilesBackground} overflow-auto h-96 `}>
              <NewsWidget />
            </section>

            <section className={`${mainLayoutColors.tilesBackground} flex-1 `}>
              <QuotesWidget />
            </section>
          </aside>
        </main>
      }
    />
  );
};
