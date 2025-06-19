import { useState } from 'react';
import { signIn, signUp, signInWithGoogle } from '../api/signInLogic';
import { useTranslation } from 'react-i18next';
import { normalizeError } from '@/shared/lib/utils/errorHandler';
import { UserCredential } from 'firebase/auth';

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
    <div className="p-4 max-w-sm mx-auto bg-gray-600 rounded shadow space-y-4">
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <input
        type="email"
        placeholder={t('form.emailPlaceholder')}
        className="border p-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder={t('form.passwordPlaceholder')}
        className="border p-2 w-full rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleAction(() => signIn(email, password))}
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        {t('form.signInButtonTitle')}
      </button>
      <button
        onClick={handleAction(() => signUp(email, password))}
        className="w-full py-2 bg-green-500 text-white rounded"
      >
        {t('form.signUpButtonTitle')}
      </button>
      <button
        onClick={handleAction(signInWithGoogle)}
        className="w-full py-2 bg-yellow-400 text-black rounded"
      >
        {t('form.signInGoogleButtonTitle')}
      </button>
    </div>
  );
};
