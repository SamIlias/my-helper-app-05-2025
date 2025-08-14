import React from 'react';
import { useTranslation } from 'react-i18next';
import { textColors } from '@/shared/myStyles/myStyles';
import { useAuth } from '../model/useAuth';

export const AuthForm: React.FC = () => {
  const { t } = useTranslation('authpage');
  const {
    email,
    password,
    setEmail,
    setPassword,
    errorMessage,
    signInAction,
    signUpAction,
    signInWithGoogleAction,
  } = useAuth();

  return (
    <div className="flex items-center h-screen w-screen bg-stone-900">
      <div
        className={`flex flex-col gap-4 ${textColors.main} bg-stone-300/10 shadow-md p-4 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mx-auto border mb-40 rounded `}
      >
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <input
          type="email"
          placeholder={t('form.emailPlaceholder')}
          className="border p-2 w-full rounded focus:border-amber-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t('form.passwordPlaceholder')}
          className="border p-2 w-full rounded focus:border-amber-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={signInAction}
          className="w-full py-2 bg-lime-500/40  rounded hover:bg-lime-500 hover:text-stone-800 cursor-pointer"
        >
          {t('form.signInButtonTitle')}
        </button>
        <button
          onClick={signUpAction}
          className="w-full py-2 bg-amber-500/40  rounded hover:bg-amber-500 hover:text-stone-800 cursor-pointer"
        >
          {t('form.signUpButtonTitle')}
        </button>
        <button
          onClick={signInWithGoogleAction}
          className="w-full py-2 bg-yellow-500/40  rounded hover:bg-yellow-500 hover:text-stone-800 cursor-pointer"
        >
          {t('form.signInGoogleButtonTitle')}
        </button>
      </div>
    </div>
  );
};
