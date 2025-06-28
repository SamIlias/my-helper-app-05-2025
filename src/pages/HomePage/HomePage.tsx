import '@/index.css';
import * as React from 'react';
import { AiConversation } from '@/features/aiConversation';
import type { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { QuoteBlock } from '@/features/showQuote';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/shared/ui';

type Props = {
  user: User | null | undefined;
};

export const HomePage: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('homepage');

  if (!user) return <Navigate to="/auth" replace={true} />;

  return (
    <main className="grid grid-rows-[1fr_8fr_1fr] h-full gap-2 mx-3">
      <PageHeader title={t('title')} children={null} />

      <section className="h-full min-h-0">
        <AiConversation user={user} />
      </section>

      <section className="h-full">
        <QuoteBlock />
      </section>
    </main>
  );
};
