import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NewsList } from '@/features/showNews';
import { PageHeader } from '@/shared/ui/PageHeader';

export const NewsWidget: React.FC = () => {
  const { t } = useTranslation('newspage');

  return (
    <div className="h-full">
      <NewsList />
    </div>
  );
};
