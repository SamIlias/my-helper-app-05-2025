import '@/index.css';
import * as React from 'react';
import { AiConversation } from '@/features/aiConversation';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/shared/ui/layouts/MainLayout';
import { mainLayoutColors } from '@/shared/myStyles/myStyles';
import WeatherWidget from '@/widgets/Weather';

export const AssistantPage: React.FC = () => {
  // const { t } = useTranslation('homepage');

  return (
    <MainLayout
      children={
        <main className="grid grid-cols-[3fr_1fr] h-full gap-2">
          <section
            className={`h-full flex justify-center rounded-xs overflow-auto ${mainLayoutColors.tilesBackground}`}
          >
            <AiConversation />
          </section>

          <aside className={`grid gap-2 grid-rows-[30%_80%] rounded-xs h-full `}>
            <section className={`${mainLayoutColors.tilesBackground}`}>
              <WeatherWidget />
            </section>

            <section className={`${mainLayoutColors.tilesBackground} `}></section>

            <section className={`${mainLayoutColors.tilesBackground} `}></section>
          </aside>

          {/*<section className="h-full">*/}
          {/*  <QuoteBlock />*/}
          {/*</section>*/}
        </main>
      }
    />
  );
};
