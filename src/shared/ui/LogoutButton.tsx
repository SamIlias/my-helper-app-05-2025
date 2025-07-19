import * as React from 'react';
import { logOut } from '../../features/auth/api/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { setUser } from '../../features/auth/model/authSlice';

export const LogoutButton: React.FC = () => {
  // const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    await logOut();
    dispatch(setUser(null));
  };

  return (
    <svg
      className="h-1/3 fill-amber-500/40 hover:fill-amber-500 cursor-pointer transition duration-500"
      onClick={handleSignOut}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M33.6444 27.0444C32.7853 27.9035 32.7853 29.2965 33.6444 30.1556C34.5035 31.0147 35.8965 31.0147 36.7556 30.1556L43.1642 23.747C43.1972 23.714 43.2293 23.6801 43.2601 23.6456C43.714 23.2426 44 22.6547 44 22C44 21.3453 43.714 20.7574 43.2601 20.3544C43.2293 20.3199 43.1972 20.286 43.1642 20.253L36.7556 13.8444C35.8965 12.9852 34.5035 12.9852 33.6444 13.8444C32.7853 14.7035 32.7853 16.0965 33.6444 16.9556L36.4888 19.8H24.2C22.9849 19.8 22 20.7849 22 22C22 23.2151 22.9849 24.2 24.2 24.2H36.4888L33.6444 27.0444Z" />
      <path d="M6.6 0C2.95493 0 0 2.95493 0 6.6V37.4C0 41.0452 2.95493 44 6.6 44H27.5C30.5375 44 33 41.5375 33 38.5V32.4117C32.6742 32.2234 32.3675 31.99 32.0888 31.7112C30.6491 30.2716 30.4157 28.0828 31.3883 26.4H24.2C21.7699 26.4 19.8 24.4301 19.8 22C19.8 19.5699 21.7699 17.6 24.2 17.6H31.3883C30.4157 15.9173 30.6491 13.7283 32.0888 12.2887C32.3675 12.01 32.6742 11.7765 33 11.5882V5.5C33 2.46244 30.5375 0 27.5 0H6.6Z" />
    </svg>
  );
};
