import '../../../index.css';
import * as React from 'react';
import { AiConversation } from './AiConversation.tsx';
import type { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { QuoteBlock } from './QuoteBlock.tsx';
import { myStyles } from '../../../myStyles/myStyles.ts';
import { useTranslation } from 'react-i18next';

type Props = {
  user: User | null | undefined;
};

export const HomePage: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('homepage');
  return (
    <>
      {user ? (
        <div className="grid grid-rows-[1fr_8fr_1fr] h-full gap-2 mx-3">
          <div className="place-self-start">
            <h1 className={myStyles.pageTitle}>{t('title')}</h1>
          </div>

          <div className="h-full min-h-0">
            <AiConversation user={user} />
          </div>

          <div className="h-full">
            <QuoteBlock />
          </div>
        </div>
      ) : (
        <Navigate to="/auth" replace={true} />
      )}
    </>
  );
};
