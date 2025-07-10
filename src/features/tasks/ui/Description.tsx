import * as React from 'react';
import { borderColors, textColors } from '@/shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';
import { CloseButton } from '@/shared/ui/CloseButton';

type Props = {
  description?: string;
  isMobile?: boolean;
  onCloseDescription: () => void;
};

export const Description: React.FC<Props> = ({
  description,
  isMobile = false,
  onCloseDescription,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`border ${borderColors.primary}  h-full rounded p-2 overflow-y-scroll`}>
      {isMobile && (
        <div className="flex justify-end mb-2">
          <CloseButton
            onClick={onCloseDescription}
            title={t('closeButtonTitle', { ns: 'common' })}
          />
        </div>
      )}
      <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>
        {t('tasksList.descriptionTitle', { ns: 'todopage' })}
      </h2>
      <p
        className={`${description ? `${textColors.secondary} text-shadow-md whitespace-pre-wrap text-balance` : 'text-amber-700 text-shadow-md italic'}`}
      >
        {description || t('tasksList.descriptionPlaceholder')}
      </p>
    </div>
  );
};
