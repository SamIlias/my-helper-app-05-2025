import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';
import { getNameFromEmail, truncate } from '@/shared/utils/stringHandler.ts';
import { textColors } from '@/shared/myStyles/myStyles';
import { LoginButton, LogoutButton } from '../../shared/ui';

type Props = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const LoginWidget: React.FC<Props> = ({ user, setUser }) => {
  const usernameLettersNumber = 15;

  if (user) {
    return (
      <div className={`flex gap-3`}>
        <div className={`${textColors.secondary}`}>
          {truncate(getNameFromEmail(user.email), usernameLettersNumber)}
        </div>
        <LogoutButton setUser={setUser} />
      </div>
    );
  }

  return <LoginButton />;
};
