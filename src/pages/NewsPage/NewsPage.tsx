import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NewsList } from '@/features/showNews';
import { PageHeader } from '@/shared/ui/PageHeader';

export const NewsPage: React.FC = () => {
  const { t } = useTranslation('newspage');

  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <PageHeader title={t('title')} children={null} />
      <NewsList />
    </div>
  );
};
