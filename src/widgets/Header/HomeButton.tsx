import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MainLinkButton } from '../../shared/ui/MainLinkButton';
import { myStyles } from '../../shared/myStyles/myStyles';

export const HomeButton: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={`w-fit h-fit text-base justify-self-start ml-[3vw] ${myStyles.bgGrayBlur}`}>
      <MainLinkButton path={'/'} title={t('homeButtonTitle')} />
    </div>
  );
};
