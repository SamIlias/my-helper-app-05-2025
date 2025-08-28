import * as React from 'react';
import { textColors } from '@/shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';

export const Logo: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-end">
      <span className={`text-5xl ${textColors.main}`}>Todai</span>
      <span className={`${textColors.main} text-sm`}>{t('logoSlogan')}</span>
    </div>
  );
};
