import { User } from 'firebase/auth';
export declare const useAuthData: () => {
    loading: boolean;
    user: User | null | undefined;
};
export type SerializableUser = Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'>;
