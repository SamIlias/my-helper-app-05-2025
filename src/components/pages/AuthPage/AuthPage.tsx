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

type AuthProps = {
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const AuthPage: React.FC<AuthProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [customError, setCustomError] = useState<string | null>(null);

  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setCustomError(err.message);
    } else {
      setCustomError(String(err));
    }
  };

  const handleSignUp = async () => {
    try {
      setCustomError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const handleSignIn = async () => {
    try {
      setCustomError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setCustomError(null);
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err: unknown) {
      handleError(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-600 rounded shadow space-y-4">
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <>
          {(error || customError) && (
            <p className="text-red-500 text-sm">{error?.message || customError}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn} className="w-full py-2 bg-blue-500 text-white rounded">
            Sign In
          </button>
          <button onClick={handleSignUp} className="w-full py-2 bg-green-500 text-white rounded">
            Sign Up
          </button>
          <button onClick={handleGoogleAuth} className="w-full py-2 bg-yellow-400 text-black rounded">
            Sign In with Google
          </button>
        </>
      )}
    </div>
  );
};
