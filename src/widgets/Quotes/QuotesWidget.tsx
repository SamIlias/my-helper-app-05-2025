import * as React from 'react';
import { Quote } from '@/features/showQuote';

export const QuotesWidget: React.FC = () => {
  return (
    <div className="h-full flex flex-col text-center justify-center">
      <Quote />
    </div>
  );
};
