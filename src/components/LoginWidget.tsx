import * as React from 'react';
import { signOut, User } from 'firebase/auth';
import { MainLinkButton } from './common/MainLinkButton.tsx';
import { auth } from '../api/firebase.ts';
import { Dispatch, SetStateAction } from 'react';
import { myStyles } from '../myStyles/myStyles.ts';
import { getNameFromEmail, truncate } from '../lib/utils/stringHandler.ts';
import { useTranslation } from 'react-i18next';

type Props = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const LoginWidget: React.FC<Props> = ({ user, setUser }) => {
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const { t } = useTranslation('common');

  return (
    <>
      {user ? (
        <div className={`flex gap-3`}>
          <div className={`${myStyles.textColor.secondary}`}>
            {truncate(getNameFromEmail(user.email), 15)}
          </div>
          <button className={`${myStyles.button.main} h-fit`} onClick={handleSignOut}>
            {t('logoutButtonTitle')}
          </button>
        </div>
      ) : (
        <MainLinkButton path={'/auth'} title={t('loginButtonTitle')} />
      )}
    </>
  );
};
