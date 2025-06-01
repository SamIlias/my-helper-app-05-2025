import * as React from 'react';
import { signOut, User } from 'firebase/auth';
import { MainLinkButton } from './common/MainLinkButton.tsx';
import { auth } from '../api/firebase.ts';
import { Dispatch, SetStateAction } from 'react';
import { myStyles } from '../myStyles/myStyles.ts';

type Props = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getNameFromEmail = (email: string | null) => {
  if (!email) {
    return '';
  }
  const rawName = email.split('@')[0];
  return capitalize(rawName);
};

export const LoginWidget: React.FC<Props> = ({ user, setUser }) => {
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div className={`flex gap-3`}>
          <span className={`${myStyles.textCol.secondary}`}>{getNameFromEmail(user.email)}</span>
          <button className={`${myStyles.button.main} h-fit`} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <MainLinkButton path={'/auth'} title={'Login'} />
      )}
    </>
  );
};
