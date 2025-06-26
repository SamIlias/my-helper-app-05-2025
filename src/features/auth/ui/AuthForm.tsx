import { useState } from 'react';
import { signIn, signUp, signInWithGoogle } from '../api';
import { useTranslation } from 'react-i18next';
import { normalizeError } from '@/shared/utils/errorHandler';
import { UserCredential } from 'firebase/auth';
import { textColors } from '../../../shared/myStyles/myStyles';

export const AuthForm: React.FC = () => {
  const { t } = useTranslation('authpage');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAction = (action: () => Promise<UserCredential>) => async () => {
    setErrorMessage(null);
    try {
      await action();
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  return (
    <div className="flex items-center h-full w-full">
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
          onClick={handleAction(() => signIn(email, password))}
          className="w-full py-2 bg-lime-500/40  rounded hover:bg-lime-500 cursor-pointer"
        >
          {t('form.signInButtonTitle')}
        </button>
        <button
          onClick={handleAction(() => signUp(email, password))}
          className="w-full py-2 bg-amber-500/40  rounded hover:bg-amber-500 cursor-pointer"
        >
          {t('form.signUpButtonTitle')}
        </button>
        <button
          onClick={handleAction(signInWithGoogle)}
          className="w-full py-2 bg-yellow-500/40  rounded hover:bg-yellow-500 cursor-pointer"
        >
          {t('form.signInGoogleButtonTitle')}
        </button>
      </div>
    </div>
  );
};
