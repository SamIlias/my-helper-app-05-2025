import '@/index.css';
import * as React from 'react';
import { AiConversation } from '@/features/aiConversation';
import { QuoteBlock } from '@/features/showQuote';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/shared/ui';

export const HomePage: React.FC = () => {
  const { t } = useTranslation('homepage');

  return (
    <main className="grid grid-rows-[1fr_8fr_1fr] h-full gap-2 mx-3">
      <PageHeader title={t('title')} children={null} />

      <section className="h-full min-h-0">
        <AiConversation />
      </section>

      <section className="h-full">
        <QuoteBlock />
      </section>
    </main>
  );
};
