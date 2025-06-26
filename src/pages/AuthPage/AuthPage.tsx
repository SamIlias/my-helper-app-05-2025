import * as React from 'react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/shared/api';
import { Navigate } from 'react-router-dom';
import { AuthForm } from '@/features/auth';

type AuthProps = {
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export const AuthPage: React.FC<AuthProps> = ({ setUser }) => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setUser(user);
  }, [user]);

  if (loading) return <p>{'Loading'}</p>;
  if (user) return <Navigate to="/" replace />;

  return <AuthForm />;
};
