import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthForm } from '@/features/auth';
import { useAuthData } from '../model/useAuthData';

export const AuthPage: React.FC = () => {
  const { loading, user } = useAuthData();

  if (loading) return <p>{'Loading'}</p>;
  if (user) return <Navigate to="/" replace />;
  return <AuthForm />;
};
