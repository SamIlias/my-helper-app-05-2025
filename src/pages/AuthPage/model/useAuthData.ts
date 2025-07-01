import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { auth } from '@/shared/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { setUser } from '../../../features/auth/model/authSlice';

export const useAuthData = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return { loading, user };
};
