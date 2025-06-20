import * as React from 'react';
import { myStyles } from '../../shared/myStyles/myStyles.ts';
import { useTranslation } from 'react-i18next';
import { NewsList } from '@/features/news/ui/newsList.tsx';

const NewsPage: React.FC = () => {
  const { t } = useTranslation('newspage');

  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <header className="border-b pb-2 w-full">
        <h1 className={`${myStyles.pageTitle}`}>{t('title')}</h1>
      </header>
      <NewsList />
    </div>
  );
};

export default NewsPage;
