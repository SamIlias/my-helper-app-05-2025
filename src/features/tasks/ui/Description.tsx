import * as React from 'react';
import { borderColors, textColors } from '../../../shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';

export const Description: React.FC<{ description: string | undefined }> = ({ description }) => {
  const { t } = useTranslation('todopage');

  return (
    <div className={`border ${borderColors.primary}  h-full rounded p-2 overflow-y-scroll`}>
      <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>
        {t('tasksList.descriptionTitle')}
      </h2>
      <p
        className={`${description ? `${textColors.secondary} text-shadow-md whitespace-pre-wrap text-balance` : 'text-amber-700 text-shadow-md italic'}`}
      >
        {description || t('tasksList.descriptionPlaceholder')}
      </p>
    </div>
  );
};
