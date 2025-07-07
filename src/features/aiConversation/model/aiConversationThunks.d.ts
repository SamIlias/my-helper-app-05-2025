import { ConversationItem } from '../../../shared/api';
import { RootState } from '../../../app/store';
export declare const HISTORY_LENGTH = 10;
export declare const sendPrompt: import("@reduxjs/toolkit").AsyncThunk<ConversationItem[], string, {
    state: RootState;
    rejectValue: string;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
