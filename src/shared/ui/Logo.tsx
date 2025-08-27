import * as React from 'react';
import { textColors } from '@/shared/myStyles/myStyles';

export const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-end">
      <span className={`text-5xl ${textColors.main}`}>Todai</span>
      <span className={`${textColors.main}`}>Be clear</span>
    </div>
  );
};
