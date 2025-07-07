import { TaskFormValues, TaskType } from './types';
export declare const useList: (tasks: TaskType[]) => {
    activeTaskId: string | null | undefined;
    newAddedTask: TaskType | null | undefined;
    onTaskClick: (id: string) => void;
    newTaskElementAnchor: import("react").RefObject<HTMLDivElement | null>;
    onDeleteTask: (id: string) => void;
    onEditClick: (task: TaskType) => void;
    editTaskMode: {
        active: boolean;
        editedTask: TaskType | null;
    };
    closeEditForm: () => void;
    onEditFormSubmit: (data: TaskFormValues) => void;
};
