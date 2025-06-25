import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MainLinkButton } from '../../shared/ui/MainLinkButton';

export const HomeButton: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={`w-fit h-fit justify-self-start ml-[3vw]`}>
      <MainLinkButton path={'/'} title={t('homeButtonTitle')} />
    </div>
  );
};
