import { SerializableUser } from '../../../pages/AuthPage/model/useAuthData';
export interface AuthState {
    user: SerializableUser | null | undefined;
}
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<SerializableUser | null | undefined, "auth/setUser">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
