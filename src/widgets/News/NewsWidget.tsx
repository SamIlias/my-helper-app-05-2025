import * as React from 'react';
import { NewsList } from '@/features/showNews';

export const NewsWidget: React.FC = () => {
  return (
    <div className="h-full">
      <NewsList />
    </div>
  );
};
