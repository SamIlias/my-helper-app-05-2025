import * as React from 'react';
import { User } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { logOut } from '../api';
import { buttonStyles } from '../../../shared/myStyles/myStyles';

type Props = {
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const LogoutButton: React.FC<Props> = ({ setUser }) => {
  const { t } = useTranslation('common');

  const handleSignOut = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <button className={`${buttonStyles.main} h-fit`} onClick={handleSignOut}>
      {t('logoutButtonTitle')}
    </button>
  );
};
