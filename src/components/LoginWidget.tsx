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

//todo move to utils-------------
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const getNameFromEmail = (email: string | null) => {
  if (!email) {
    return '';
  }
  const rawName = email.split('@')[0];
  return capitalize(rawName);
};

const truncate = (s: string, size: number = 7): string => {
  if (size >= s.length) {
    return s;
  }

  return s.slice(0, size) + '...';
};
//----------------------

export const LoginWidget: React.FC<Props> = ({ user, setUser }) => {
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div className={`flex gap-3`}>
          <div className={`${myStyles.textCol.secondary}`}>
            {truncate(getNameFromEmail(user.email), 15)}
          </div>
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
