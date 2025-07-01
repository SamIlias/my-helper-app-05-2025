import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { logOut } from '../../features/auth/api/auth';
import { buttonStyles } from '../myStyles/myStyles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { setUser } from '../../features/auth/model/authSlice';

export const LogoutButton: React.FC = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    await logOut();
    dispatch(setUser(null));
  };

  return (
    <button className={`${buttonStyles.main} h-fit`} onClick={handleSignOut}>
      {t('logoutButtonTitle')}
    </button>
  );
};
