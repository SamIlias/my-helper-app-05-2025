import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../api/firebase.ts';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { normalizeError } from '../../../lib/utils/errorHandler.ts';
// import { useTranslation } from 'react-i18next';

type AuthProps = {
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const AuthPage: React.FC<AuthProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const { t } = useTranslation('authpage');

  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleSignUp = async () => {
    try {
      setErrorMessage(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  const handleSignIn = async () => {
    try {
      setErrorMessage(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setErrorMessage(null);
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  if (loading) return <p>{'Loading'}</p>;

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-600 rounded shadow space-y-4">
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <>
          {(error || errorMessage) && (
            <p className="text-red-500 text-sm">{error?.message || errorMessage}</p>
          )}
          <input
            type="email"
            placeholder={'form.emailPlaceholder'}
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={'form.passwordPlaceholder'}
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn} className="w-full py-2 bg-blue-500 text-white rounded">
            {'form.signInButtonTitle'}
          </button>
          <button onClick={handleSignUp} className="w-full py-2 bg-green-500 text-white rounded">
            {'form.signOutButtonTitle'}
          </button>
          <button
            onClick={handleGoogleAuth}
            className="w-full py-2 bg-yellow-400 text-black rounded"
          >
            {'form.signInGoogleButtonTitle'}
          </button>
        </>
      )}
    </div>
  );
};
