import { TaskFormValues, TaskType, TaskUpdateData } from './types';
import { RootState } from '../../../app/store';
export declare const fetchTasksThunk: import("@reduxjs/toolkit").AsyncThunk<TaskType[], string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addTaskThunk: import("@reduxjs/toolkit").AsyncThunk<TaskType, {
    userId: string;
    data: TaskFormValues;
}, {
    rejectValue: string;
    state: RootState;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteTaskThunk: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateTaskThunk: import("@reduxjs/toolkit").AsyncThunk<TaskType, {
    taskId: string;
    data: TaskUpdateData;
    userId: string;
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
