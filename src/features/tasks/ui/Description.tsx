import * as React from 'react';
import { TaskType } from '../model/types';
import { borderColors, textColors } from '../../../shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';

type Props = {
  activeTask?: TaskType | null;
};

export const Description: React.FC<Props> = ({ activeTask }) => {
  const { t } = useTranslation('todopage');

  return (
    <div className={`border ${borderColors.primary}  h-full rounded p-2 overflow-y-scroll`}>
      <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>
        {t('tasksList.descriptionTitle')}
      </h2>
      <p
        className={`${activeTask?.description ? `${textColors.secondary} text-shadow-md whitespace-pre-wrap text-balance` : 'text-amber-700 text-shadow-md italic'}`}
      >
        {activeTask?.description || t('tasksList.descriptionPlaceholder')}
      </p>
    </div>
  );
};
