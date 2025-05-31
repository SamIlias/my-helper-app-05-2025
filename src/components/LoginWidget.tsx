import * as React from 'react';
import { signOut, User } from 'firebase/auth';
import { MainLinkButton } from './common/MainLinkButton.tsx';
import { auth } from '../api/firebase.ts';
import { Dispatch, SetStateAction } from 'react';

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
        <div className="flex gap-3">
          <span>{getNameFromEmail(user.email)}</span>
          <button
            className="border rounded-md hover:text-yellow-400 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      ) : (
        <MainLinkButton path={'/auth'} title={'Login'} />
      )}
    </>
  );
};
