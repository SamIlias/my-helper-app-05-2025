import * as React from 'react';
import { getNameFromEmail, truncate } from '@/shared/utils/stringHandler';
import { textColors } from '@/shared/myStyles/myStyles';
import { LoginButton, LogoutButton } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const LoginWidget: React.FC = () => {
  const usernameLettersNumber = 15;
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return (
      <div className={`flex gap-3`}>
        <div className={`${textColors.secondary}`}>
          {truncate(getNameFromEmail(user.email), usernameLettersNumber)}
        </div>
        <LogoutButton />
      </div>
    );
  }

  return <LoginButton />;
};
