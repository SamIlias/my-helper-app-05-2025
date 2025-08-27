import React from 'react';
import { useTranslation } from 'react-i18next';
import { authPage, textColors } from '@/shared/myStyles/myStyles';
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
    <div className={`flex items-center h-screen w-screen ${authPage.background}`}>
      <div className={`flex flex-col gap-4 ${authPage.form.mainStyle}`}>
        {errorMessage && <p className={`${textColors.danger} text-sm`}>{errorMessage}</p>}
        <input
          type="email"
          placeholder={t('form.emailPlaceholder')}
          className={`${authPage.form.input}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t('form.passwordPlaceholder')}
          className={`${authPage.form.input}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signInAction} className={`${authPage.form.signInButton}`}>
          {t('form.signInButtonTitle')}
        </button>
        <button onClick={signUpAction} className={`${authPage.form.signUpButton}`}>
          {t('form.signUpButtonTitle')}
        </button>
        <button
          onClick={signInWithGoogleAction}
          className={`${authPage.form.signInWithGoogleButton}`}
        >
          {t('form.signInGoogleButtonTitle')}
        </button>
      </div>
    </div>
  );
};
