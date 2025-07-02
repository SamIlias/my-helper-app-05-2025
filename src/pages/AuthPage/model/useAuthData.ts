import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { auth } from '@/shared/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { setUser } from '@/features/auth/model/authSlice';
import { User } from 'firebase/auth';

export const useAuthData = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      const cleanUser: SerializableUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      dispatch(setUser(cleanUser));
    }
  }, [user]);

  return { loading, user };
};

export type SerializableUser = Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'>;
