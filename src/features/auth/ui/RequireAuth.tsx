import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import React, { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
