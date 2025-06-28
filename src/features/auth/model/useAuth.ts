import { useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { signIn, signInWithGoogle, signUp } from '../api/auth';
import { normalizeError } from '@/shared/utils/errorHandler';

export const useAuth = () => {
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

  const signInAction = handleAction(() => signIn(email, password));
  const signUpAction = handleAction(() => signUp(email, password));
  const signInWithGoogleAction = handleAction(signInWithGoogle);

  return {
    email,
    password,
    setEmail,
    setPassword,
    errorMessage,
    signInAction,
    signUpAction,
    signInWithGoogleAction,
  };
};
