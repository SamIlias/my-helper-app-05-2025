import { TaskType } from './types';
export interface TasksState {
    tasks: TaskType[];
    isLoading: boolean;
    error: string | null;
    newAddedTask: TaskType | undefined | null;
}
export declare const setNewAddedTask: import("@reduxjs/toolkit").ActionCreatorWithPayload<TaskType | null, "tasks/setNewAddedTask">;
declare const _default: import("redux").Reducer<TasksState>;
export default _default;
