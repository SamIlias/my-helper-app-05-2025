import { MainLinkButton } from '../../../shared/ui/MainLinkButton';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export const LoginButton: React.FC = () => {
  const { t } = useTranslation('common');
  return <MainLinkButton path={'/auth'} title={t('loginButtonTitle')} />;
};
