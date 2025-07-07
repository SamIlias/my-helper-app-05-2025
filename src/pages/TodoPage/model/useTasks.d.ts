import { TaskFormValues, TaskType } from '@/features/tasks';
export declare const useTasks: () => {
    isAddFormActive: boolean;
    isCompletedTasksHidden: boolean;
    isLoading: boolean;
    error: string | null;
    handledTasks: TaskType[];
    setIsAddFormActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    onAddTaskSubmit: (data: TaskFormValues) => Promise<void>;
    onClickHideShowButton: () => void;
    toggleCompletingOfTask: (id: string, isCompleted: boolean) => Promise<void>;
};
